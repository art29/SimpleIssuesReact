import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./i18n";
import { Route, Routes } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Home from "./pages/Home";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Dashboard, { FilterParams } from "./pages/Dashboard";
import About from "./pages/About";
import Footer from "./components/Footer";
import Feedback from "./pages/Feedback";
import Help from "./pages/Help";
import IssueModal from "./components/IssueModal";
import { Organization, Repo } from "./components/FilterBar";
import APIClient from "./axios";
import Activate from "./pages/organizations/Activate";
import OrganizationManager from "./pages/organizations/OrganizationManager";
import ErrorPage from "./components/ErrorPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AccountManager from "./pages/auth/AccountManager";
import AddUserModal from "./pages/organizations/AddUserModal";

function App() {
  const [issues, setIssues] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [repo, setRepo] = useState<string>("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchOrganizations = () => {
    APIClient.get("users/organizations")
      .then((response) => {
        setOrganizations(response.data.organizations);
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  const fetchRepos = () => {
    APIClient.get("users/repos")
      .then((response) => {
        setRepos(response.data.repos);
      })
      .catch(() => {
        toast.error(t("errors.default_error"));
      });
  };

  const fetchIssues = (filters?: FilterParams) => {
    setLoading(true);
    APIClient.get("issues", { params: filters ?? {} })
      .then((response) => {
        setIssues(response.data.issues);
        setLabels(response.data.labels);
        setOrganization(response.data.organization);
        setRepo(response.data.repo);
        setMaxPage(Number(response.data.max_page) ?? 1);
        setError(null);
      })
      .catch((e) => {
        setError(e.response.status);
      })
      .then(() => setLoading(false));
  };

  const refreshEverything = () => {
    fetchIssues();
    fetchOrganizations();
    fetchRepos();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      refreshEverything();
    }
  }, []);

  return (
    <div className="d-flex min-vh-100 flex-column">
      <Header />
      <div className="flex flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <AccountManager />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={<Signin refreshIssues={() => fetchIssues()} />}
          />
          <Route
            path="/signup"
            element={<Signup refreshEverything={() => refreshEverything()} />}
          />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/organizations/activate"
            element={
              <PrivateRoute>
                <Activate refreshEverything={() => refreshEverything()} />
              </PrivateRoute>
            }
          />
          <Route
            path="/organizations/manager"
            element={
              <PrivateRoute>
                <OrganizationManager labels={labels.map((l) => l.name)} />
              </PrivateRoute>
            }
          >
            <Route
              path="/organizations/manager/add_user"
              element={
                <PrivateRoute>
                  <AddUserModal />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard
                  issues={issues}
                  labels={labels}
                  organization={organization}
                  organizations={organizations}
                  repo={repo}
                  repos={repos}
                  error={error}
                  loadingIssues={loading}
                  maxPage={maxPage}
                  refreshIssues={(filters?: FilterParams) =>
                    fetchIssues(filters)
                  }
                  refreshOrganizations={() => fetchOrganizations()}
                  refreshRepos={() => fetchRepos()}
                />
              </PrivateRoute>
            }
          >
            <Route
              path="/dashboard/issues"
              element={
                <PrivateRoute>
                  <IssueModal
                    refreshIssues={(filters?: FilterParams) =>
                      fetchIssues(filters)
                    }
                  />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <ErrorPage
                iconType="warning"
                title={t("errors.404_error")}
                paragraph={t("errors.404_paragraph")}
                links={[
                  {
                    linkText: t(
                      "errors.click_here_to_be_redirected_to_the_home_page"
                    ),
                  },
                ]}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
      />
    </div>
  );
}

export default App;
