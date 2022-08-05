import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import APIClient from "../../axios";

interface signupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupData>();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const signup = (data: signupData) => {
    APIClient.post(
      "register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("successfully_signed_up"));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/dashboard");
        } else {
          toast.error(t("errors.default_error"));
        }
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  return (
    <div className="padding-30">
      <h1 className="text-center py-3 fs-3-bold">
        {t("create_a_simple_issues_account")}
      </h1>
      <form onSubmit={handleSubmit(signup)} className="py-4">
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            {t("name")}
          </label>
          <input
            {...register("name", { required: t("name_required") })}
            type="text"
            className="form-control"
            id="name"
          />
          {errors.name && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            {t("email")}
          </label>
          <input
            {...register("email", { required: t("email_required") })}
            type="email"
            className="form-control"
            id="email"
          />
          {errors.email && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.email.message}
            </p>
          )}
        </div>
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
            {t("signup")}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-muted mb-1">
            {t("have_an_account")} <Link to="/signin">{t("login_here")}</Link>
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

export default Signup;
