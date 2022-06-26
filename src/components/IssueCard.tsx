import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import remarkGfm from "remark-gfm";
import "./Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import APIClient from "../axios";
import AlertDialog from "./ConfirmationDialog";
import IssueModal from "./IssueModal";

interface IssueCardProp {
  issue: any;
  labels: any;
  fullscreen: boolean;
  // eslint-disable-next-line no-unused-vars
  setFullScreen: (id: number | null) => void;
  reloadIssues: () => void;
}

const IssueCard = ({
  issue,
  labels,
  fullscreen,
  setFullScreen,
  reloadIssues,
}: IssueCardProp) => {
  const { t } = useTranslation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const deleteIssue = () => {
    APIClient.delete(`issues/${issue.number}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("successfully_deleted_issue"));
          reloadIssues();
        } else {
          toast.error(t("errors.default_error"));
        }
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="card-title">{issue.title}</h3>
          <div>
            <Tooltip
              describeChild
              placement="top"
              title={t("comments_available_soon")}
            >
              <button type="button" className="btn btn-link p-2">
                <FontAwesomeIcon icon={solid("comment")} />
              </button>
            </Tooltip>
            {fullscreen ? (
              <button
                type="button"
                className="btn btn-link p-2"
                onClick={() => setFullScreen(null)}
              >
                <FontAwesomeIcon icon={solid("compress")} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-link p-2"
                onClick={() => setFullScreen(issue.id)}
              >
                <FontAwesomeIcon icon={solid("expand")} />
              </button>
            )}
          </div>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          {issue.labels.map((label: any) => (
            <span
              key={label.id}
              className="badge rounded-pill me-1"
              style={{
                backgroundColor: `#${label.color}`,
                color:
                  parseInt(label.color, 16) > 0xffffff / 2 ? "#000" : "#fff",
              }}
            >
              {label.name}
            </span>
          ))}
        </h6>
        <p className="card-text">
          <ReactMarkdown
            className="markdown-zone"
            components={{
              h1: "h3",
              h2: "h4",
              h3: "h5",
              h4: "h6",
              h5: "h6",
            }}
            remarkPlugins={[remarkGfm]}
          >
            {issue.body}
          </ReactMarkdown>
        </p>
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={() => setEditMode(true)}
        >
          {t("edit")}
        </button>
        <button
          type="button"
          className="btn btn-danger me-2"
          onClick={() => setOpenDeleteModal(true)}
        >
          {t("delete")}
        </button>
        <AlertDialog
          openModal={openDeleteModal}
          title={t("are_you_sure_delete_issue")}
          falseText={t("no")}
          trueText={t("yes")}
          action={deleteIssue}
          onClose={() => setOpenDeleteModal(false)}
        />
        <IssueModal
          dialogState={editMode}
          edit
          editingBody={{
            number: issue.number,
            title: issue.title,
            body: issue.body,
            labels: issue.labels,
          }}
          onClose={() => setEditMode(false)}
          reloadIssues={() => reloadIssues()}
          labels={labels}
        />
      </div>
    </div>
  );
};

export default IssueCard;
