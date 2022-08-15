import { useTranslation } from "react-i18next";
import Select from "react-select";
import * as React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LabelSelectFilterStyleConfig } from "./LabelSelectStyleConfig";
import APIClient from "../axios";
import { FilterParams } from "../pages/Dashboard";

export interface Organization {
  id: number;
  name: string;
}

export interface Repo {
  name: string;
  full_name: string;
}

interface FilterBarProps {
  organization: Organization;
  organizations: Organization[];
  repo: string;
  repos: Repo[];
  labels: any[];
  filters: FilterParams;
  // eslint-disable-next-line no-unused-vars
  setFilters: (filters: FilterParams) => void;
  reTriggerFetch: () => void;
  fetchOrganizations: () => void;
  fetchRepos: () => void;
}

const FilterBar = ({
  organization,
  organizations,
  repo,
  repos,
  labels,
  filters,
  setFilters,
  // eslint-disable-next-line no-unused-vars
  reTriggerFetch,
  fetchOrganizations,
  fetchRepos,
}: FilterBarProps) => {
  const { t } = useTranslation();

  const setOrganization = (organizationId: number) => {
    APIClient.post("users/set_organization", {
      organization_id: organizationId,
    })
      .then((response) => {
        if (response.status === 200) {
          reTriggerFetch();
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
          reTriggerFetch();
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
      <div className="d-flex flex-wrap justify-content-between">
        <div className="align-items-center mb-2 mb-lg-0 text-white text-decoration-none text-capitalize">
          <div className="row">
            <div className="col-md-6 mb-2 mb-lg-0 pe-lg-0 ps-lg-3 d-flex align-items-center">
              <Select
                className="w-100"
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
              <div className="mx-lg-2 d-none d-lg-block">/</div>
            </div>
            <div className="col-md-6 p-lg-0">
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
          </div>
        </div>
        <div className="mb-2 mb-lg-0 gap-2 d-flex flex-row">
          <div>
            <div className="d-flex flex-row align-items-center gap-2">
              <label htmlFor="labels">{t("issues.filter_labels")}</label>
              <Select
                id="labels"
                isMulti
                options={labels}
                value={labels.filter((l) => filters.labels.includes(l.name))}
                styles={LabelSelectFilterStyleConfig}
                getOptionLabel={(l: any) => l.name}
                getOptionValue={(l: any) => l.name}
                onChange={(newLabels) => {
                  setFilters({
                    ...filters,
                    labels: newLabels.map((l) => l.name),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FilterBar;
