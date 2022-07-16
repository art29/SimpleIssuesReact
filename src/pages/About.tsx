import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="m-3-40">
      <h1 className="my-3 fs-3-bold">{t("about.title")}</h1>
      <p>
        {t("about.paragraph")}
        <br />
        <br />
        {t("about.paragraph2")}
      </p>
      <div className="d-grid gap-2 col-md-4">
        <Link to="/signin" className="btn btn-primary btn-lg py-2-5 disabled">
          {`${t("about.look_at_instructions")} (${t("about.soon")})`}
        </Link>
      </div>
    </div>
  );
};

export default About;
