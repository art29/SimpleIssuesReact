import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./i18n";
import { Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Home from "./pages/Home";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Footer from "./components/Footer";
import Feedback from "./pages/Feedback";
import Help from "./pages/Help";
import IssueModal from "./components/IssueModal";
import { FilterParams } from "./components/Filterbar";
import APIClient from "./axios";
import Activate from "./pages/organizations/Activate";

function App() {
  const [issues, setIssues] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [organization, setOrganization] = useState<string>("");
  const [repo, setRepo] = useState<string>("");

  const fetchIssues = (filters?: FilterParams) => {
    APIClient.get("issues", { params: filters ?? {} }).then((response) => {
      setIssues(response.data.issues);
      setLabels(response.data.labels);
      setOrganization(response.data.organization);
      setRepo(response.data.repo);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchIssues();
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
            path="/signin"
            element={<Signin refreshIssues={() => fetchIssues()} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<Help />} />
          <Route path="/organizations">
            <Route
              path="activate"
              element={
                <PrivateRoute>
                  <Activate />
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
                  repo={repo}
                  refreshIssues={(filters?: FilterParams) =>
                    fetchIssues(filters)
                  }
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
