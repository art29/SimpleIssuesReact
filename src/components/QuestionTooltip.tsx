import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface QuestionTooltipProps {
  textKey: string;
  iconSize?: SizeProp;
}

const QuestionTooltip = ({
  textKey,
  iconSize = "1x",
}: QuestionTooltipProps) => {
  const { t } = useTranslation();

  return (
    <Tooltip describeChild placement="top" title={t(textKey)}>
      <button type="button" className="btn btn-link p-2">
        <FontAwesomeIcon size={iconSize} icon={solid("question-circle")} />
      </button>
    </Tooltip>
  );
};
export default QuestionTooltip;
