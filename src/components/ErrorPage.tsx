import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ErrorPageProps {
  icon?: IconProp;
  iconType?: string;
  title: string;
  paragraph: string[] | string;
  link?: string;
  linkText: string;
}

const ErrorPage = ({
  icon = solid("triangle-exclamation"),
  iconType = "danger",
  title,
  paragraph,
  link = "/",
  linkText,
}: ErrorPageProps) => {
  return (
    <div className="text-center my-5">
      <FontAwesomeIcon
        icon={icon}
        size="5x"
        className={`text-${iconType} mb-2`}
      />
      <h2 className="mb-3">{title}</h2>
      {typeof paragraph !== "string" ? (
        paragraph.map((p) => (
          <h5 key={p} className="mb-2">
            {p}
          </h5>
        ))
      ) : (
        <h5 className="mb-2">{paragraph}</h5>
      )}
      <Link to={link}>{linkText}</Link>
    </div>
  );
};

export default ErrorPage;
