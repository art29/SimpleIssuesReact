import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "../../index.css";
import APIClient from "../../axios";

interface loginData {
  email: string;
  password: string;
}

interface signinProps {
  refreshIssues: () => void;
}

const Signin = ({ refreshIssues }: signinProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  const { state }: any = useLocation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const login = (data: loginData) => {
    APIClient.post("login", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          refreshIssues();
          toast.success(t("successfully_logged_in"));
        } else {
          toast.error(t("errors.default_error"));
        }
      })
      .then(() => {
        navigate(
          state.pathname ? `${state.pathname}${state.search}` : "/dashboard"
        );
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  return (
    <div className="padding-30">
      <h1 className="text-center py-3 fs-3-bold">
        {t("signin_to_your_account")}
      </h1>
      <form onSubmit={handleSubmit(login)} className="py-4">
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
        <div className="d-grid gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            {t("signin")}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-muted">
            {t("dont_have_an_account")}{" "}
            <Link to="/signup">{t("signup_here")}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
