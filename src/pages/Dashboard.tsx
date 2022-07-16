import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import IssueCard from "../components/IssueCard";
import "./Pages.css";
import Filterbar, { FilterParams } from "../components/Filterbar";

interface DashboardProps {
  issues: any[];
  labels: any[];
  organization: string;
  repo: string;
  // eslint-disable-next-line no-unused-vars
  refreshIssues: (filters?: FilterParams) => void;
}

const Dashboard = ({
  issues,
  labels,
  organization,
  repo,
  refreshIssues,
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
        <h1 className="my-3 fs-3-bold">{t("my_dashboard")}</h1>
        {!issues || !labels || !organization || !repo ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Filterbar
              organization={organization}
              repo={repo}
              labels={labels}
              reTriggerFetch={(filters: FilterParams) => refreshIssues(filters)}
              createIssue={() => openModal()}
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
