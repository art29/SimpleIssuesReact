import { Trans, useTranslation } from "react-i18next";
import "./Pages.css";

interface LinkTextInput {
  link: string;
  children?: string;
}

interface FAQ {
  title: string;
  components?: any[];
}

const LinkText = ({ link, children }: LinkTextInput) => {
  return (
    <a href={link || ""} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

const Help = () => {
  const { t } = useTranslation();

  const faq: FAQ[] = [
    {
      title: "what_is_simple_issues",
    },
    {
      title: "why_did_you_create_this",
    },
    {
      title: "why_do_i_need_this",
    },
    {
      title: "how_does_it_work",
      components: [
        <LinkText key={0} link="https://github.com/art29/SimpleIssues" />,
        <LinkText key={1} link="https://github.com/art29/SimpleIssuesReact" />,
      ],
    },
    {
      title: "why_is_it_a_bit_slow",
    },
    {
      title: "i_want_to_try_it",
      components: [
        <LinkText key={0} link="https://simpleissues.afetiveau.com" />,
      ],
    },
    {
      title: "i_want_to_self_host",
      components: [
        <LinkText key={0} link="https://github.com/art29/SimpleIssues" />,
        <LinkText key={1} link="https://github.com/art29/SimpleIssuesReact" />,
      ],
    },
    {
      title: "have_any_other_questions",
    },
  ];

  return (
    <div className="px-10">
      <h1 className="my-3 fs-3-bold">{t("help.title")}</h1>
      <h3>{t("help.faq.title")}</h3>
      <div className="accordion" id="accordion">
        {faq.map((key) => (
          <div className="accordion-item" key={key.title}>
            <h2 className="accordion-header" id={`${key.title}_title`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${key.title}_collapse`}
                aria-expanded="false"
                aria-controls={`${key.title}_collapse`}
              >
                {t(`help.faq.${key.title}_question`)}
              </button>
            </h2>
            <div
              id={`${key.title}_collapse`}
              className="accordion-collapse collapse"
              aria-labelledby={`${key.title}_title`}
              data-bs-parent="#accordion"
            >
              <div className="accordion-body">
                <Trans
                  i18nKey={`help.faq.${key.title}_answer`}
                  t={t}
                  components={key?.components ?? []}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
