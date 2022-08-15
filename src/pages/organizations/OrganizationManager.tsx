import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, Outlet } from "react-router-dom";
import * as React from "react";
import APIClient from "../../axios";
import ErrorPage from "../../components/ErrorPage";
import QuestionTooltip from "../../components/QuestionTooltip";
import LabelsList from "../../components/LabelsList";
import Spinner from "../../components/Spinner";

interface OrganizationUser {
  id: number;
  user_id: number;
  role: "admin" | "regular";
  name: string;
  email: string;
}

interface RoleOption {
  readonly value: "admin" | "regular";
  readonly label: string;
}

interface OrganizationManagerProps {
  labels: string[];
}

const OrganizationManager = ({ labels }: OrganizationManagerProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [organizationUsers, setOrganizationUsers] = useState<
    OrganizationUser[]
  >([]);
  const [organization, setOrganization] = useState<any>(null);
  const [mandatoryLabels, setMandatoryLabels] = useState<string[]>([]);
  const [addedLabels, setAddedLabels] = useState<string[]>([]);
  const currentUserId = JSON.parse(localStorage.getItem("user") ?? "{}")?.id;

  const roleOptions: RoleOption[] = [
    {
      value: "regular",
      label: t("organizations.manager.regular"),
    },
    {
      value: "admin",
      label: t("organizations.manager.admin"),
    },
  ];

  const fetchOrganizations = () => {
    APIClient.get("organizations")
      .then((response) => {
        setError(false);
        setUnauthorized(false);
        setOrganizationUsers(response.data.users);
        setOrganization(response.data.organization);
        setMandatoryLabels(response.data.mandatory_labels ?? []);
        setAddedLabels(response.data.added_labels ?? []);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          setUnauthorized(true);
          setError(false);
        } else {
          setUnauthorized(false);
          setError(true);
        }
      });
  };

  const changeRole = (userId: number, role: "admin" | "regular") => {
    APIClient.post("organizations/change_role", {
      user_id: userId,
      role,
    })
      .then(() => {
        toast.success(t("organizations.manager.successfully_updated_role"));
        fetchOrganizations();
      })
      .catch(() => {
        toast.error(t("organizations.manager.error_update_role"));
      });
  };

  const removeUser = (userId: number) => {
    APIClient.post("organizations/remove_user", {
      user_id: userId,
    })
      .then(() => {
        toast.success(t("organizations.manager.successfully_removed_user"));
        fetchOrganizations();
      })
      .catch(() => {
        toast.error(t("organizations.manager.error_removing_user"));
      });
  };

  const updateMandatoryLabels = (label: string, add: boolean) => {
    const tmpMandatoryLabels = add
      ? [...mandatoryLabels, label]
      : [...mandatoryLabels.filter((l) => l !== label)];
    setMandatoryLabels(tmpMandatoryLabels);
    APIClient.put("organizations/mandatory_labels", {
      mandatory_labels: tmpMandatoryLabels.join(","),
    })
      .then(() => {
        toast.success(t("organizations.manager.successfully_updated_labels"));
      })
      .catch(() => {
        toast.error(t("organizations.manager.error_updating_labels"));
      });
  };

  const updateAddedLabels = (label: string, add: boolean) => {
    const tmpAddedLabels = add
      ? [...addedLabels, label]
      : [...addedLabels.filter((l) => l !== label)];

    setAddedLabels(tmpAddedLabels);
    APIClient.put("organizations/added_labels", {
      added_labels: tmpAddedLabels.join(","),
    })
      .then(() => {
        toast.success(t("organizations.manager.successfully_updated_labels"));
      })
      .catch(() => {
        toast.error(t("organizations.manager.error_updating_labels"));
      });
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <>
      <div>
        {error || unauthorized ? (
          <div className="d-flex justify-content-center">
            {error != null ? (
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
            ) : (
              <ErrorPage
                title={t(
                  "errors.sorry_an_error_occurred_while_trying_to_access_this_page"
                )}
                paragraph={[t("errors.please_try_again_later")]}
                links={[
                  {
                    linkText: t(
                      "errors.click_here_to_be_redirected_to_the_home_page"
                    ),
                  },
                ]}
              />
            )}
          </div>
        ) : (
          <div className="py-3">
            {!organization ? (
              <div className="d-flex justify-content-center">
                <Spinner />
              </div>
            ) : (
              <div className="px-10">
                <h2 className="my-0">
                  {t("organizations.manager.organization_colon")}{" "}
                  {organization.name}
                </h2>
                <div className="my-4">
                  <div className="row">
                    <div className="col-md-6">
                      <LabelsList
                        type="mandatory"
                        labels={labels}
                        checkedLabels={mandatoryLabels}
                        title={t("organizations.manager.mandatory_labels")}
                        subTitle={t(
                          "organizations.manager.mandatory_labels_subtitle"
                        )}
                        onChange={(label, add) =>
                          updateMandatoryLabels(label, add)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <LabelsList
                        type="added"
                        labels={labels}
                        checkedLabels={addedLabels}
                        title={t("organizations.manager.added_labels")}
                        subTitle={t(
                          "organizations.manager.added_labels_subtitle"
                        )}
                        onChange={(label, add) => updateAddedLabels(label, add)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>{t("users")}</h4>
                    <Link
                      className="btn btn-primary"
                      to="/organizations/manager/add_user"
                    >
                      <FontAwesomeIcon size="lg" icon={solid("plus")} />
                    </Link>
                  </div>
                  <div className="table-responsive-md">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">{t("organizations.manager.name")}</th>
                          <th scope="col">
                            {t("organizations.manager.email")}
                          </th>
                          <th scope="col">{t("organizations.manager.role")}</th>
                          <th scope="col">
                            {t("organizations.manager.remove_user")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {organizationUsers.map((user) => (
                          <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <div className="d-flex">
                                <Select
                                  isDisabled={user.user_id === currentUserId}
                                  onChange={(c: any) =>
                                    changeRole(user.user_id, c.value)
                                  }
                                  styles={{
                                    menu: (provided) => ({
                                      ...provided,
                                      "min-width": "max-content",
                                    }),
                                    control: (styles) => ({
                                      ...styles,
                                      "min-width": "max-content",
                                    }),
                                  }}
                                  value={roleOptions.find(
                                    (v) => v.value === user.role
                                  )}
                                  options={roleOptions}
                                />
                                {currentUserId === user.user_id && (
                                  <QuestionTooltip textKey="organizations.manager.cannot_change_your_own_role" />
                                )}
                              </div>
                            </td>
                            <td>
                              <button
                                onClick={() => removeUser(user.user_id)}
                                type="button"
                                className={`btn btn-link p-2 ${
                                  user.user_id === currentUserId
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <FontAwesomeIcon
                                  size="lg"
                                  className="text-danger"
                                  icon={solid("trash-can")}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default OrganizationManager;
