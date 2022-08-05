import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import IssueCard from "../components/IssueCard";
import "./Pages.css";
import Filterbar, {
  FilterParams,
  Organization,
  Repo,
} from "../components/Filterbar";
import ErrorPage from "../components/ErrorPage";

interface DashboardProps {
  issues: any[];
  labels: any[];
  organization: Organization | null;
  organizations: Organization[];
  repo: string;
  repos: Repo[];
  loadingIssues: boolean;
  error: number | null;
  // eslint-disable-next-line no-unused-vars
  refreshIssues: (filters?: FilterParams) => void;
  refreshOrganizations: () => void;
  refreshRepos: () => void;
}

const Dashboard = ({
  issues,
  labels,
  organization,
  organizations,
  repo,
  repos,
  loadingIssues,
  error,
  refreshIssues,
  refreshOrganizations,
  refreshRepos,
}: DashboardProps) => {
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openModal = () => {
    navigate("/dashboard/issues", {
      state: {
        labels,
      },
    });
  };

  return (
    <>
      <div className="mx-3">
        {error === null && (
          <h1 className="my-3 fs-3-bold">{t("my_dashboard")}</h1>
        )}
        {!issues ||
        !labels ||
        !organization ||
        !repo ||
        error !== null ||
        loadingIssues ? (
          <div className="d-flex justify-content-center">
            {error != null ? (
              <ErrorPage
                title={t(
                  "errors.sorry_you_are_not_allowed_to_access_this_page"
                )}
                paragraph={[
                  t("errors.please_make_sure_you_have_the_right_permissions"),
                  t("errors.if_you_think_this_is_an_error"),
                ]}
                linkText={t(
                  "errors.click_here_to_be_redirected_to_the_home_page"
                )}
              />
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <Filterbar
              organization={organization}
              organizations={organizations}
              repo={repo}
              repos={repos}
              labels={labels}
              reTriggerFetch={(filters: FilterParams) => refreshIssues(filters)}
              createIssue={() => openModal()}
              fetchRepos={() => refreshRepos()}
              fetchOrganizations={() => refreshOrganizations()}
            />
            <div className="mb-4">
              {fullscreen !== null ? (
                <div className="px-10">
                  <IssueCard
                    reloadIssues={() => refreshIssues()}
                    key={issues.find((i: any) => i.id === fullscreen)}
                    issue={issues.find((i: any) => i.id === fullscreen)}
                    labels={labels}
                    fullscreen
                    setFullScreen={(id) => setFullscreen(id)}
                  />
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4" key={1}>
                  {issues.map((issue: any) => (
                    <div key={issue.id} className="col">
                      <IssueCard
                        labels={labels}
                        issue={issue}
                        fullscreen={false}
                        setFullScreen={(id) => setFullscreen(id)}
                        reloadIssues={() => refreshIssues()}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
