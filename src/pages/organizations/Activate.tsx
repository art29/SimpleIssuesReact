import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import APIClient from "../../axios";

const Activate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const installationId = searchParams.get("installation_id");

  useEffect(() => {
    if (!installationId) {
      toast.error(t("errors.missing_installation_id"));
      navigate("/dashboard");
    }
  }, []);

  const activate = () => {
    APIClient.post("organizations/activate", {
      installation_id: installationId,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("organizations.activate.activate_success"));
        } else {
          toast.error(t("organizations.activate.activate_error"));
        }
      })
      .catch(() => {
        toast.error(t("organizations.activate.activate_error"));
      });
    navigate("/dashboard");
  };

  const refuse = () => {
    navigate("/dashboard");
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">{t("organizations.activate.title")}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">{t("organizations.activate.paragraph")}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg px-4 gap-3"
            onClick={() => activate()}
          >
            {t("organizations.activate.activate")}
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-lg px-4"
            onClick={() => refuse()}
          >
            {t("organizations.activate.refuse")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activate;
