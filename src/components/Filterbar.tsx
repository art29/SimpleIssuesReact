import { useTranslation } from "react-i18next";
import Select from "react-select";
import * as React from "react";
import { useState } from "react";
import { LabelSelectFilterStyleConfig } from "./LabelSelectStyleConfig";

export interface FilterParams {
  labels: string[];
}

interface FilterbarProps {
  organization: string;
  repo: string;
  labels: any[];
  // eslint-disable-next-line no-unused-vars
  reTriggerFetch: (params: FilterParams) => void;
  createIssue: () => void;
}

const Filterbar = ({
  organization,
  repo,
  labels,
  createIssue,
  // eslint-disable-next-line no-unused-vars
  reTriggerFetch,
}: FilterbarProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterParams>({ labels: [] });

  return (
    <header className="bg-dark text-white p-2 my-2 rounded-1">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <span className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none text-capitalize">
          {organization} / {repo}
        </span>
        <div className="ms-auto mb-2 mb-lg-0 gap-2 d-flex flex-row">
          <div className="d-flex flex-row align-items-center gap-2">
            <label htmlFor="labels">{t("issues.labels")}</label>
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
