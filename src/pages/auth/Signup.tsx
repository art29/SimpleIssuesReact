import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import APIClient from "../../axios";

interface signupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface signupProps {
  refreshEverything: () => void;
}

const Signup = ({ refreshEverything }: signupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupData>();

  const { t } = useTranslation();
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const reRef = useRef<ReCAPTCHA>(null);

  const signup = async (data: signupData) => {
    const token = await reRef.current?.executeAsync();
    reRef.current?.reset();

    APIClient.post(
      "register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        token,
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("successfully_signed_up"));
          localStorage.setItem("token", response.data.token.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          refreshEverything();
          navigate(
            state?.pathname ? `${state.pathname}${state.search}` : "/dashboard"
          );
        } else {
          toast.error(t("errors.default_error"));
        }
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
            autoComplete="username"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />
          {errors.password_confirmation && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <ReCAPTCHA
          sitekey="6Lc3LoAhAAAAAIdHqGyhZvCz8zJdq03R7AqOH7OF"
          size="invisible"
          ref={reRef}
        />

        <div className="d-grid gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            {t("signup")}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-muted mb-1">
            {t("have_an_account")}{" "}
            <Link
              to="/signin"
              state={
                state?.pathname
                  ? { pathname: state.pathname, search: state.search }
                  : {}
              }
            >
              {t("login_here")}
            </Link>
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
