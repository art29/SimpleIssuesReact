import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Editor from "./Editor/Editor";
import APIClient from "../axios";
import LabelSelectStyleConfig from "./LabelSelectStyleConfig";

interface IssueEditingBody {
  number?: number;
  title: string;
  body: string;
  labels: any[];
}

interface IssueModalItems {
  edit?: boolean;
  editingBody?: IssueEditingBody | null;
  labels: any[];
}

interface IssueModalProps {
  refreshIssues: () => void;
}

const IssueModal = ({ refreshIssues }: IssueModalProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useLocation();
  const { edit, editingBody, labels } = state as IssueModalItems;

  const handleClose = () => {
    navigate("/dashboard");
  };

  const create = (data: IssueEditingBody) => {
    APIClient.post(
      "issues",
      {
        title: data.title,
        body: data.body,
        labels: data.labels.map((l) => l.name),
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            t(
              edit ? "successfully_updated_issue" : "successfully_created_issue"
            )
          );
          refreshIssues();
          handleClose();
        } else {
          toast.error(t("errors.default_error"));
        }
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  const update = (data: IssueEditingBody) => {
    APIClient.patch(
      `issues/${data?.number}`,
      {
        title: data.title,
        body: data.body,
        labels: data.labels.map((l) => l.name),
      },
      { withCredentials: true }
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            t(
              edit ? "successfully_updated_issue" : "successfully_created_issue"
            )
          );
          refreshIssues();
          handleClose();
        } else {
          toast.error(t("errors.default_error"));
        }
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IssueEditingBody>({
    defaultValues: {
      number: editingBody?.number,
      title: editingBody?.title ?? "",
      labels: editingBody?.labels ?? [],
      body: editingBody?.body ?? "",
    },
  });

  return (
    <>
      <div>
        <Dialog open onClose={handleClose} fullWidth>
          <DialogTitle>
            {edit
              ? t("issues.edit_github_issue")
              : t("issues.new_github_issue")}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(edit ? update : create)}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  {t("issues.title")}
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  placeholder="Title of the issue"
                  {...register("title", {
                    required: t("issues.title_required"),
                  })}
                />
                {errors.title && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="labels" className="form-label">
                  {t("issues.labels")}
                </label>
                <Select
                  id="labels"
                  isMulti
                  defaultValue={editingBody?.labels ?? []}
                  placeholder={t("issues.select_applicable_labels")}
                  options={labels}
                  styles={LabelSelectStyleConfig}
                  getOptionLabel={(l: any) => l.name}
                  getOptionValue={(l: any) => l.name}
                  onChange={(updatedLabels) =>
                    setValue("labels", updatedLabels as any[])
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  {t("issues.issue_description")}
                </label>
                <Editor
                  initalMarkdown={editingBody?.body}
                  setOutputMarkdown={(markdown) => {
                    setValue("body", markdown);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {t("submit")}
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
export default IssueModal;
