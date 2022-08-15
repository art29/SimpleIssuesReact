import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import Select from "react-select";
import * as React from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import IssueCard from "../components/IssueCard";
import "./Pages.css";
import FilterBar, { Organization, Repo } from "../components/FilterBar";
import ErrorPage from "../components/ErrorPage";
import APIClient from "../axios";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

export interface FilterParams {
  page?: number;
  labels: string[];
}

interface DashboardProps {
  issues: any[];
  labels: any[];
  organization: Organization | null;
  organizations: Organization[];
  repo: string;
  repos: Repo[];
  loadingIssues: boolean;
  error: number | null;
  maxPage: number;
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
  maxPage,
  refreshIssues,
  refreshOrganizations,
  refreshRepos,
}: DashboardProps) => {
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterParams>({ labels: [] });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openModal = () => {
    navigate("/dashboard/issues", {
      state: {
        labels,
      },
    });
  };

  const setOrganization = (organizationId: number) => {
    APIClient.post("users/set_organization", {
      organization_id: organizationId,
    })
      .then((response) => {
        if (response.status === 200) {
          refreshIssues();
          refreshOrganizations();
          refreshRepos();
          navigate("/dashboard");
        } else {
          toast.error(t("errors.error_changing_organization"));
        }
      })
      .catch(() => {
        toast.error(t("errors.error_changing_organization"));
      });
  };

  return (
    <>
      <div className="mx-3 mt-3 mb-0">
        {error === null && (
          <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row">
            <h1 className="fs-3-bold mb-0">{t("my_dashboard")}</h1>
            <button
              type="button"
              className="btn btn-outline-dark me-2"
              onClick={() => openModal()}
            >
              <FontAwesomeIcon size="lg" icon={solid("plus")} />
            </button>
          </div>
        )}
        {!issues ||
        !labels ||
        !organization ||
        !repo ||
        error !== null ||
        loadingIssues ? (
          <div className="d-flex justify-content-center">
            {error != null ? (
              <div>
                <ErrorPage
                  title={t(
                    "errors.sorry_you_are_not_allowed_to_access_this_page"
                  )}
                  paragraph={[
                    t("errors.please_make_sure_you_have_the_right_permissions"),
                    t("errors.if_you_think_this_is_an_error"),
                  ]}
                  links={[
                    {
                      linkText: t(
                        "errors.click_here_to_be_redirected_to_the_home_page"
                      ),
                    },
                  ]}
                />
                <div className="text-center">
                  <h5>
                    {t("you_can_try_selecting_an_organization_from_the_list")}
                  </h5>
                  <Select
                    onChange={(c: any) => setOrganization(c.id)}
                    getOptionLabel={(l: any) => l.name}
                    getOptionValue={(l: any) => l.id}
                    value={organizations.find((o) => o.id === organization?.id)}
                    options={organizations}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <Spinner />
              </div>
            )}
          </div>
        ) : (
          <>
            <FilterBar
              organization={organization}
              organizations={organizations}
              repo={repo}
              repos={repos}
              labels={labels}
              filters={filters}
              setFilters={(f) => {
                setFilters(f);
                refreshIssues(f);
              }}
              reTriggerFetch={() => refreshIssues(filters)}
              fetchRepos={() => refreshRepos()}
              fetchOrganizations={() => refreshOrganizations()}
            />
            <div>
              {fullscreen !== null ? (
                <div className="px-10">
                  <IssueCard
                    reloadIssues={() => refreshIssues(filters)}
                    key={issues.find((i: any) => i.id === fullscreen)}
                    issue={issues.find((i: any) => i.id === fullscreen)}
                    labels={labels}
                    fullscreen
                    setFullScreen={(id) => setFullscreen(id)}
                  />
                </div>
              ) : (
                <div>
                  {issues.length ? (
                    <div>
                      <div className="row row-cols-1 row-cols-md-3 g-4" key={1}>
                        {issues.map((issue: any) => (
                          <div key={issue.id} className="col">
                            <IssueCard
                              labels={labels}
                              issue={issue}
                              fullscreen={false}
                              setFullScreen={(id) => setFullscreen(id)}
                              reloadIssues={() => refreshIssues(filters)}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="d-flex flex-column align-items-center mt-3">
                        <ReactPaginate
                          previousLabel={t("previous")}
                          nextLabel={t("next")}
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={maxPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={({ selected }) => {
                            setFilters({ ...filters, page: selected + 1 });
                            refreshIssues({ ...filters, page: selected + 1 });
                          }}
                          containerClassName="pagination"
                          activeClassName="active"
                          forcePage={filters.page ? filters.page - 1 : 0}
                        />
                      </div>
                    </div>
                  ) : (
                    <Alert text={t("errors.error_no_issues")} />
                  )}
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
