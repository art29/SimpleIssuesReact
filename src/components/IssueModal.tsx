import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Editor from "./Editor/Editor";
import APIClient from "../axios";
import LabelSelectStyleConfig from "./LabelSelectStyleConfig";

interface IssueEditingBody {
  number?: number;
  title: string;
  body: string;
  labels: any[];
}

interface IssueModalProps {
  dialogState: boolean;
  edit?: boolean;
  editingBody?: IssueEditingBody | null;
  labels: any[];
  onClose: () => void;
  reloadIssues: () => void;
}

const IssueModal = ({
  dialogState,
  labels,
  edit = false,
  editingBody = null,
  onClose,
  reloadIssues,
}: IssueModalProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(dialogState);
  }, [dialogState]);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const submit = (data: IssueEditingBody) => {
    APIClient.patch(
      edit ? `issues/${data?.number}` : "issues",
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
          handleClose();
          reloadIssues();
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
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {edit ? t("issues.edit_github_issue") : t("issues.new_github_issue")}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                {t("issues.title")}
              </label>
              <input
                id="title"
                type="text"
                className="form-control"
                placeholder="Title of the issue"
                {...register("title", { required: t("issues.title_required") })}
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
                options={labels}
                styles={LabelSelectStyleConfig}
                getOptionLabel={(l: any) => l.name}
                getOptionValue={(l: any) => l.name}
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
  );
};
export default IssueModal;
