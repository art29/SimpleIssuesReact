import { useTranslation } from "react-i18next";
import Select from "react-select";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LabelSelectFilterStyleConfig } from "./LabelSelectStyleConfig";
import APIClient from "../axios";

export interface FilterParams {
  labels: string[];
}

export interface Organization {
  id: number;
  name: string;
}

export interface Repo {
  name: string;
  full_name: string;
}

interface FilterbarProps {
  organization: Organization;
  organizations: Organization[];
  repo: string;
  repos: Repo[];
  labels: any[];
  // eslint-disable-next-line no-unused-vars
  reTriggerFetch: (params: FilterParams) => void;
  fetchOrganizations: () => void;
  fetchRepos: () => void;
  createIssue: () => void;
}

const Filterbar = ({
  organization,
  organizations,
  repo,
  repos,
  labels,
  createIssue,
  // eslint-disable-next-line no-unused-vars
  reTriggerFetch,
  fetchOrganizations,
  fetchRepos,
}: FilterbarProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterParams>({ labels: [] });

  const setOrganization = (organizationId: number) => {
    APIClient.post("users/set_organization", {
      organization_id: organizationId,
    })
      .then((response) => {
        if (response.status === 200) {
          reTriggerFetch(filters);
          fetchOrganizations();
          fetchRepos();
        } else {
          toast.error(t("errors.error_changing_organization"));
        }
      })
      .catch(() => {
        toast.error(t("errors.error_changing_organization"));
      });
  };

  const setRepo = (repoName: string) => {
    APIClient.post("users/set_repo", {
      repo: repoName,
    })
      .then((response) => {
        if (response.status === 200) {
          reTriggerFetch(filters);
          fetchRepos();
        } else {
          toast.error(t("errors.error_changing_repo"));
        }
      })
      .catch(() => {
        toast.error(t("errors.error_changing_repo"));
      });
  };

  useEffect(() => {
    fetchOrganizations();
    fetchRepos();
  }, []);

  return (
    <header className="bg-dark text-white p-2 my-2 rounded-1">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <div className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none text-capitalize">
          <Select
            onChange={(c: any) => setOrganization(c.id)}
            getOptionLabel={(l: any) => l.name}
            getOptionValue={(l: any) => l.id}
            styles={{
              menu: (provided) => ({
                ...provided,
                backgroundColor: "black",
                color: "white",
                "min-width": "max-content",
              }),
              control: (styles) => ({
                ...styles,
                backgroundColor: "black",
                color: "white",
                "min-width": "max-content",
                ":active": {
                  ...styles[":active"],
                  backgroundColor: "black",
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                backgroundColor: "black",
                color: "white",
              }),
            }}
            value={organizations.find((o) => o.id === organization.id)}
            options={organizations}
          />
          <span className="px-2">/</span>
          <Select
            onChange={(c: any) => setRepo(c.name)}
            getOptionLabel={(l: any) => l.full_name}
            getOptionValue={(l: any) => l.name}
            styles={{
              menu: (provided) => ({
                ...provided,
                backgroundColor: "black",
                color: "white",
                "min-width": "max-content",
              }),
              control: (styles) => ({
                ...styles,
                backgroundColor: "black",
                color: "white",
                "min-width": "max-content",
                ":active": {
                  ...styles[":active"],
                  backgroundColor: "black",
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                backgroundColor: "black",
                color: "white",
              }),
            }}
            value={repos.find((r) => r.name === repo)}
            options={repos}
          />
        </div>
        <div className="ms-auto mb-2 mb-lg-0 gap-2 d-flex flex-row">
          <div className="d-flex flex-row align-items-center gap-2">
            <label htmlFor="labels">{t("issues.filter_labels")}</label>
            <Select
              id="labels"
              isMulti
              options={labels}
              styles={LabelSelectFilterStyleConfig}
              getOptionLabel={(l: any) => l.name}
              getOptionValue={(l: any) => l.name}
              onChange={(newLabels) => {
                setFilters({
                  ...filters,
                  labels: newLabels.map((l) => l.name),
                });
                reTriggerFetch({
                  ...filters,
                  labels: newLabels.map((l) => l.name),
                });
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-light me-2"
            onClick={createIssue}
          >
            {t("create_an_issue")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Filterbar;
