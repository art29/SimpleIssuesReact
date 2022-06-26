import { useTranslation } from "react-i18next";
import "./Pages.css";
import { Link } from "react-router-dom";

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="m-3-40">
        <h1 className="my-3 fs-3-bold">{t("home.title")}</h1>
        <p>{t("home.paragraph")}</p>
      </div>
      <div className="d-grid gap-2 col-md-4 px-2 mx-auto text-center">
        {!localStorage.getItem("token") ? (
          <>
            <Link to="/signin" className="btn btn-primary btn-lg py-2-5">
              {t("signin")}
            </Link>
            <Link to="/signup" className="btn btn-secondary btn-lg py-2-5">
              {t("signup")}
            </Link>
          </>
        ) : (
          <Link to="/dashboard" className="btn btn-primary btn-lg py-2-5 my-3">
            {t("home.go_to_my_dashboard")}
          </Link>
        )}
      </div>
    </>
  );
}

export default Home;
