interface LabelsListProps {
  type: string;
  labels: string[];
  checkedLabels: string[];
  title: string;
  subTitle: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (label: string, add: boolean) => void;
}

const LabelsList = ({
  type,
  labels,
  checkedLabels,
  title,
  subTitle,
  onChange,
}: LabelsListProps) => {
  return labels.length && checkedLabels ? (
    <div>
      <h4>{title}</h4>
      {subTitle && <p className="text-muted">{subTitle}</p>}
      <ul className="list-group">
        {labels.map((label) => (
          <li key={`${type}-${label}`} className="list-group-item">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={checkedLabels.includes(label)}
              id={`label-${type}-${label}`}
              onChange={() => onChange(label, !checkedLabels.includes(label))}
            />
            <label
              className="form-check-label"
              htmlFor={`label-${type}-${label}`}
            >
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Put a placeholder or something</div>
  );
};

export default LabelsList;
