import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
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
    formState: { errors },
  } = useForm<FeedbackFormData>();

  const { t } = useTranslation();

  const signup = (data: FeedbackFormData) => {
    APIClient.post(
      "feedback",
      {
        name: data.name,
        email: data.email,
        message: data.message,
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("successfully_sent_feedback"));
        } else {
          toast.success(t("successfully_sent_feedback"));
          // toast.error(t("errors.default_error"));
        }
      })
      .catch(() => {
        toast.success(t("successfully_sent_feedback"));
        // toast.error(t("errors.default_error"));
      });
  };

  return (
    <div className="padding-30">
      <h1 className="text-center py-3 fs-3-bold">{t("give_us_feedback")}</h1>
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
