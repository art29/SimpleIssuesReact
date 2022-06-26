import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="w-100 bg-dark text-white py-2 text-center">
      {t("footer.text")}{" "}
      <a
        className="link-light"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/art29/SimpleIssuesReact"
      >
        {t("footer.here")}
      </a>{" "}
      |{" "}
      <Link className="link-light" to="/feedback">
        {t("footer.feedback_text")}
      </Link>
    </div>
  );
};

export default Footer;
