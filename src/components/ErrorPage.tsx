import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ErrorPageLink {
  link?: string;
  linkText: string;
}

interface ErrorPageProps {
  icon?: IconProp;
  iconType?: string;
  title: string;
  paragraph: string[] | string;
  links?: ErrorPageLink[];
}

const ErrorPage = ({
  icon = solid("triangle-exclamation"),
  iconType = "danger",
  title,
  paragraph,
  links,
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
      {links &&
        links.map((l) => (
          <Link key={l.link} to={l.link ?? "/home"}>
            {l.linkText}
          </Link>
        ))}
    </div>
  );
};

export default ErrorPage;
