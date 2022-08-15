import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import APIClient from "../../axios";

interface ChangePasswordData {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const AccountManager = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordData>();

  const changePassword = (data: ChangePasswordData) => {
    APIClient.post("change_password", {
      old_password: data.old_password,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
      .then((response) => {
        if (response.status === 200) {
          reset();
          toast.success(t("successfully_updated_password"));
        } else {
          toast.error(t("errors.couldn_t_update_password"));
        }
      })
      .catch(() => {
        toast.error(t("errors.couldn_t_update_password"));
      });
  };

  return (
    <div className="padding-30">
      <h1 className="text-center pt-3 fs-3-bold">{t("account_manager")}</h1>
      <h3 className="text-center fs-5-bold">{t("update_password")}</h3>
      <form onSubmit={handleSubmit(changePassword)} className="py-4">
        <div className="mb-4">
          <label htmlFor="old_password" className="form-label">
            {t("old_password")}
          </label>
          <input
            {...register("old_password", { required: t("email_required") })}
            type="password"
            className="form-control"
            id="old_password"
          />
          {errors.old_password && (
            <p className="text-danger" style={{ fontSize: 14 }}>
              {errors.old_password.message}
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
        <div className="d-grid gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            {t("update_password")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountManager;
