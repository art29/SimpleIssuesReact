import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import APIClient from "../axios";

interface FeedbackFormData {
  email: string;
  name: string;
  message: string;
}

const Feedback = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>();

  const { t } = useTranslation();
  const reRef = useRef<ReCAPTCHA>(null);

  const sendFeedback = async (data: FeedbackFormData) => {
    const token = await reRef.current?.executeAsync();
    reRef.current?.reset();

    APIClient.post("feedback/send", {
      name: data.name,
      email: data.email,
      message: data.message,
      token,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("successfully_sent_feedback"));
          reset();
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
      <h1 className="text-center py-3 fs-3-bold">{t("give_us_feedback")}</h1>
      <form onSubmit={handleSubmit(sendFeedback)} className="py-4">
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
          <label htmlFor="message" className="form-label">
            {t("message")}
          </label>
          <textarea
            {...register("message", { required: t("message_required") })}
            className="form-control"
            id="message"
          />
          {errors.message && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.message.message}
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
            {t("send_feedback")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
