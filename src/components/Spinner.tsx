import * as React from "react";
import { useTranslation } from "react-i18next";

const Spinner = () => {
  const { t } = useTranslation();

  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">{t("loading")}</span>
    </div>
  );
};

export default Spinner;
