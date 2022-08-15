import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface AlertProps {
  text: string;
  icon?: IconDefinition;
}

const Alert = ({ text, icon = solid("triangle-exclamation") }: AlertProps) => {
  return (
    <div className="alert alert-warning w-100 text-center">
      <FontAwesomeIcon className="mx-2" icon={icon} />
      {text}
      <FontAwesomeIcon className="mx-2" icon={icon} />
    </div>
  );
};

export default Alert;
