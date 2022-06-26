import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import APIClient from "../axios";

function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const getNavLinkClass = (path: string) => {
    return `nav-link px-3 ${
      (location.pathname.includes(path) && path !== "/") ||
      location.pathname === path
        ? "text-secondary"
        : "text-white"
    }`;
  };

  const logout = () => {
    APIClient.post("logout", {}).then((data) => {
      if (data.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(t("successfully_signed_out"));
        navigate("/signin");
      } else {
        toast.error(t("errors.default_error"));
      }
    });
  };

  return (
    <header className="py-3 bg-dark text-white">
      <div className="navbar navbar-expand-lg">
        <div className="container-fluid fs-1-15">
          <Link to="/" className="d-flex text-white text-decoration-none px-3">
            <b>SimpleIssues</b>
          </Link>

          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <Link to="/" className={getNavLinkClass("/")}>
                  {t("navbar.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className={getNavLinkClass("/about")}>
                  {t("navbar.about")}
                </Link>
              </li>
              {localStorage.getItem("token") && (
                <li>
                  <Link to="/dashboard" className="nav-link px-3 text-white">
                    {t("dashboard")}
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") && (
                <>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to="#" className="nav-link px-3 text-white">
                      {`${t("hello")}, ${
                        JSON.parse(localStorage.getItem("user") ?? "{}")?.name
                      }`}
                    </Link>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                      to="#"
                      onClick={logout}
                      className="nav-link px-3 text-white"
                    >
                      {t("logout")}
                    </Link>
                  </li>
                </>
              )}
              {!localStorage.getItem("token") && (
                <li>
                  <Link to="/signin" className="nav-link px-3 text-white">
                    {t("signin")}
                  </Link>
                </li>
              )}
              <li>
                <div className="nav-item dropdown px-3">
                  <span
                    className="nav-link dropdown-toggle text-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("language")}
                  </span>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => i18n.changeLanguage("en")}
                        className="dropdown-item"
                      >
                        {t("english")}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => i18n.changeLanguage("fr")}
                        className="dropdown-item"
                      >
                        {t("french")}
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
