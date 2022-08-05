import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "../../index.css";
import { useEffect } from "react";
import APIClient from "../../axios";

interface loginData {
  password: string;
  password_confirmation: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");

  useEffect(() => {
    if (!hash) {
      toast.error(t("errors.invalid_link"));
      navigate("/signin");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  const resetPassword = (data: loginData) => {
    APIClient.post("reset_password", {
      password: data.password,
      password_confirmation: data.password_confirmation,
      hash,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("reset_password.successfully_reset_password"));
        } else {
          toast.error(
            t("reset_password.error_occurred_while_resetting_your_password")
          );
        }
      })
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  return (
    <div className="padding-30">
      <h1 className="text-center py-3 fs-3-bold">
        {t("reset_password.reset_your_password")}
      </h1>
      <form onSubmit={handleSubmit(resetPassword)} className="py-4">
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            {t("password")}
          </label>
          <input
            {...register("password", { required: t("password_required") })}
            type="password"
            className="form-control"
            id="password"
          />
          {errors.password && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password_confirmation" className="form-label">
            {t("password_confirmation")}
          </label>
          <input
            {...register("password_confirmation", {
              required: t("password_confirmation_required"),
            })}
            type="password"
            className="form-control"
            id="password_confirmation"
          />
          {errors.password_confirmation && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
        <div className="d-grid gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            {t("reset_password.reset_your_password")}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-muted mb-1">
            {t("dont_have_an_account")}{" "}
            <Link to="/signup">{t("signup_here")}</Link>
          </p>
          <p className="text-muted mb-1">
            {t("forgot_password.forgot_password")}{" "}
            <Link to="/forgot_password">{t("reset_it_here")}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
