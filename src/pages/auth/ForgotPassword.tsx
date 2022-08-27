import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../index.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import APIClient from "../../axios";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>();

  const { t } = useTranslation();
  const reRef = useRef<ReCAPTCHA>(null);

  const forgotPassword = async (data: { email: string }) => {
    const token = await reRef.current?.executeAsync();
    reRef.current?.reset();

    await APIClient.post("forgot_password", {
      email: data.email,
      token,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("forgot_password.successfully_sent_reset_email"));
        } else {
          toast.error(
            t("forgot_password.error_occurred_while_resetting_your_password")
          );
        }
      })
      .then(() => reset())
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  return (
    <div className="padding-30">
      <h1 className="text-center py-3 fs-3-bold">
        {t("forgot_password.forgot_password")}
      </h1>
      <form onSubmit={handleSubmit(forgotPassword)} className="py-4">
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

        <ReCAPTCHA
          sitekey="6Lc3LoAhAAAAAIdHqGyhZvCz8zJdq03R7AqOH7OF"
          size="invisible"
          ref={reRef}
        />

        <div className="d-grid gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            {t("forgot_password.reset_your_password")}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-muted">
            {t("dont_have_an_account")}{" "}
            <Link to="/signup">{t("signup_here")}</Link>
          </p>
        </div>
        <div className="mb-4">
          <p className="text-muted">
            {t("have_an_account")} <Link to="/signin">{t("login_here")}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
