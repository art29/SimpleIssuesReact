import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { useForm } from "react-hook-form";
import APIClient from "../../axios";

interface AddUserModalBody {
  email: string;
}

const AddUserModal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserModalBody>();

  const addUser = (data: AddUserModalBody) => {
    APIClient.post("organizations/add_user", {
      email: data.email,
    })
      .then((response) => {
        toast.success(
          t(
            `organizations.manager.successfully_${
              response.data.type === "added" ? "added" : "invited"
            }_user`
          )
        );
        navigate("/organizations/manager");
      })
      .catch(() => {
        toast.error(t("organizations.manager.error_adding_user"));
      });
  };

  const handleClose = () => {
    navigate("/organizations/manager");
  };

  return (
    <>
      <div>
        <Dialog open onClose={handleClose} fullWidth>
          <DialogTitle>
            {t("organizations.manager.add_or_invite_user")}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(addUser)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  {...register("email", {
                    required: t("email_required"),
                  })}
                />
                {errors.email && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                {t("organizations.manager.add_or_invite_user")}
              </button>
            </form>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              {t("close")}
            </button>
          </DialogActions>
        </Dialog>
      </div>
      <Outlet />
    </>
  );
};

export default AddUserModal;
