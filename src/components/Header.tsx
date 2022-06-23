import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const getNavLinkClass = (path: string) => {
    return `nav-link px-3 ${
      (location.pathname.includes(path) && path !== "/") ||
      location.pathname === path
        ? "text-secondary"
        : "text-white"
    }`;
  };

  return (
    <header className="py-3 bg-dark text-white">
      <div className="navbar navbar-expand-lg">
        <div className="container-fluid fs-1-15">
          <Link to="/" className="d-flex text-white text-decoration-none px-3">
            SimpleIssues
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
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className={getNavLinkClass("/about")}>
                  {t("about")}
                </Link>
              </li>
            </ul>
            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle text-white"
                role="button"
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
