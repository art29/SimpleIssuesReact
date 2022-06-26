import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import APIClient from "../axios";
import IssueCard from "../components/IssueCard";
import "./Pages.css";
import Filterbar, { FilterParams } from "../components/Filterbar";
import IssueModal from "../components/IssueModal";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createMode, setCreateMode] = useState(false);
  const [organization, setOrganization] = useState("");
  const [repo, setRepo] = useState("");
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const { t } = useTranslation();

  const fetchIssues = (filters?: FilterParams) => {
    APIClient.get("issues", { params: filters ?? {} })
      .then((response) => {
        setIssues(response.data.issues);
        setLabels(response.data.labels);
        setOrganization(response.data.organization);
        setRepo(response.data.repo);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="mx-3">
      <h1 className="my-3 fs-3-bold">{t("my_dashboard")}</h1>
      {loading ? (
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
            reTriggerFetch={(filters: FilterParams) => fetchIssues(filters)}
            createIssue={() => setCreateMode(true)}
          />
          <div className="mb-4">
            {fullscreen !== null ? (
              <div className="px-10">
                <IssueCard
                  reloadIssues={() => fetchIssues()}
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
                      reloadIssues={() => fetchIssues()}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <IssueModal
            dialogState={createMode}
            onClose={() => setCreateMode(false)}
            reloadIssues={() => fetchIssues()}
            labels={labels}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
