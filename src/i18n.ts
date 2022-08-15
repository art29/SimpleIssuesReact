import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
        help: "Help",
      },
      organization: "Organization",
      users: "Users",
      previous: "Previous",
      next: "Next",
      loading: "Loading",
      language: "Language",
      english: "English",
      french: "Français (French)",
      cancel: "Cancel",
      submit: "Submit",
      close: "Close",
      hello: "Hello",
      dashboard: "Dashboard",
      my_dashboard: "My Dashboard",
      edit: "Edit",
      delete: "Delete",
      update: "Update",
      logout: "Logout",
      signin: "Sign In",
      reset_it_here: "Reset it here",
      signin_to_your_account: "Sign In into your account",
      signup: "Sign Up",
      create_a_simple_issues_account: "Create an Account",
      create_an_issue: "Create an issue",
      name: "Name",
      name_required: "Please enter a valid name",
      email: "Email Address",
      email_required: "An email address is required.",
      old_password: "Old Password",
      old_password_required: "Please enter your old password.",
      password: "Password",
      password_required: "A password is required.",
      password_confirmation: "Password Confirmation",
      password_confirmation_required: "Please enter the same password.",
      message: "Message",
      message_required: "Please enter a valid message.",
      send_feedback: "Send Feedback",
      give_us_feedback: "Want to give us some feedback?",
      successfully_sent_feedback:
        "We got your feedback! We'll get back to you soon!",
      dont_have_an_account: "Don't have an account?",
      signup_here: "Create one here!",
      have_an_account: "Have an account?",
      login_here: "Sign In here!",
      are_you_sure_delete_issue: "Are you sure you want to delete the issue?",
      yes: "Yes",
      no: "No",
      successfully_signed_out: "Successfully signed out!",
      successfully_logged_in: "Successfully logged in!",
      successfully_signed_up: "Successfully signed up!",
      successfully_updated_issue: "Successfully updated the issue!",
      successfully_created_issue: "Successfully created the issue!",
      successfully_deleted_issue: "Successfully deleted the issue!",
      successfully_updated_password: "Successfully updated your password!",
      update_password: "Update Password",
      account_manager: "Account Manager",
      comments_available_soon: "Comments will be available soon!",
      enter_a_bug_report_or_improvement:
        "Enter a bug report or improvement request",
      you_can_try_selecting_an_organization_from_the_list:
        "You can try selecting another organization from the list",
      errors: {
        default_error: "An error occurred, please try again later...",
        error_issue:
          "An error occurred while processing the issue... Please try again later.",
        missing_installation_id:
          "An error occurred since the installation ID given by GitHub is missing...",
        sorry_you_are_not_allowed_to_access_this_page:
          "Sorry... You are not allowed to access this page.",
        please_make_sure_you_have_the_right_permissions:
          "Please make sure you have the right permissions.",
        if_you_think_this_is_an_error:
          "If you think this is an error, please contact your organization's administrator.",
        click_here_to_be_redirected_to_the_home_page:
          "Click here to be redirected to the Home Page",
        sorry_an_error_occurred_while_trying_to_access_this_page:
          "Sorry, an error occurred while trying to access this page.",
        please_try_again_later: "Please try again later.",
        "404_error": "404 Error",
        "404_paragraph":
          "Sorry... The requested page was not found. Please make sure you enter a valid URL.",
        error_changing_organization:
          "There was an error while changing the organization, please try again later.",
        error_changing_repo:
          "There was an error while changing the repo, please try again later.",
        error_no_issues:
          "No Issues found for these specific filters. Try removing filters or creating new issues!",
        couldn_t_update_password:
          "Sorry... We couldn't update your password. Please try again later.",
      },
      home: {
        title: "Simple Issues",
        paragraph:
          "Simple Issues is a website that can be used to easily create and modify Github Issues from an easier user interface for the clients that want an easy way to create Bug Reports or Features Requests for developers to see in their own interface. This works really well with ZenHub or Github’s own project management system.",
        go_to_my_dashboard: "Go to my Dashboard",
      },
      about: {
        title: "About Simple Issues",
        look_at_instructions: "Look at instructions",
        soon: "Soon",
        paragraph:
          "Simple Issues is a website that can be used to easily create and modify Github Issues from an easier user interface for the clients that want an easy way to create Bug Reports or Features Requests for developers to see in their own interface. This works really well with ZenHub or Github’s own project management system.",
        paragraph2:
          "It can be installed easily for your Github Repository with the instructions on the Github Page linked below. The application is made with React and needs very little modification to work. You just need to input your Github Credentials to create the issues on as well as to choose the repository you want to add issues on. You can also restrict issues to a list of emails to make sure only your clients or colleagues can connect.",
      },
      help: {
        title: "Help",
        faq: {
          title: "Frequently Asked Questions",
          what_is_simple_issues_question: "What is Simple Issues?",
          why_did_you_create_this_question: "Why did you create this?",
          why_do_i_need_this_question: "Why do I need this?",
          how_does_it_work_question: "How does it work?",
          why_is_it_a_bit_slow_question: "Why is it a bit slow?",
          i_want_to_try_it_question: "I want to try it! How do I go about it?",
          i_want_to_self_host_question:
            "I want to Self-Host this, is it possible?",
          have_any_other_questions_question: "Have any other questions?",
          what_is_simple_issues_answer:
            "Simple Issues is a web app made to connect to Github Issues to be able to let non-technical users (clients, managers and others) send issues without needing to use two different platforms to manage tickets (For example: JIRA and a Google Forms). This solves the issue by giving users an easy to use interface to see and edit issues!",
          why_did_you_create_this_answer:
            "As said in the previous question, this was made to make my life easier when managing a project and wanting non-technical users to give feedback and report bugs without using a To-Do List or a Google Form.",
          why_do_i_need_this_answer:
            "You don't! It's just a tool that can help you improve your productivity when managing a project!",
          how_does_it_work_answer:
            "It works by connecting a GitHub Repository or Organization to Simple Issues who can then fetch all the issues of the repository and create new ones through the API. You can see how the <0>back-end code works here</0> and how the <1>front-end works here</1>!",
          why_is_it_a_bit_slow_answer:
            "Currently Simple Issues is still in Alpha stage, which means not all bugs or performances fixes have been completed. Over time, this will improve as we find better way to work on the app!",
          i_want_to_try_it_answer:
            "We want you try it too! You can create an account <0>here</0> and then activate the Simple Issues Github App soon! We will be ready for you to try it fully within a few weeks or months!",
          i_want_to_self_host_answer:
            "Self hosting is available by looking at the our Github ReadMEs for our <0>Back-End</0> and <1>Front-End</1> repos. In the future, specific documentation related to this might be created!",
          have_any_other_questions_answer:
            "Email us at simpleissues[at]afetiveau.com and we'll be able to answer all of your questions!",
        },
      },
      issues: {
        new_github_issue: "New Github (Simple) Issue",
        edit_github_issue: "Edit (Simple) Issue",
        title: "Title",
        title_required: "Please enter a valid title",
        label: "Label",
        labels: "Labels",
        filter_labels: "Filter Labels",
        issue_description: "Description of the Issue",
        select_applicable_labels: "Select applicable labels",
      },
      organizations: {
        activate: {
          title: "Are you sure you want to activate this repo/organization ?",
          paragraph:
            "This will let you manage the GitHub issues easily from this repo or organization through Simple Issues. You can withdraw this approval at anytime through the Github App Settings.",
          activate: "Activate",
          refuse: "Refuse",
          activate_success:
            "Congratulations! You have successfully activated Simple Issues!",
          activate_error:
            "Sorry... An error occurred while we tried activating your repo with Github. Please try again later.",
          organization_name: "Organization Name",
          please_make_sure_you_enter_a_valid_organization_name:
            "Please make sure you enter a valid organization name.",
        },
        manager: {
          name: "Name",
          email: "Email Address",
          role: "Role",
          admin: "Admin",
          regular: "Regular",
          save: "Save",
          successfully_updated_labels:
            "The labels have been successfully updated!",
          error_updating_labels:
            "An error occurred while updating labels. Please try again later.",
          mandatory_labels: "Mandatory Labels",
          mandatory_labels_subtitle:
            "Labels that are required on issues to show up on Simple Issues",
          added_labels: "Added Labels",
          added_labels_subtitle:
            "Labels that will be automatically added to issues created on Simple Issues",
          add_or_invite_user: "Add or invite user",
          successfully_added_user: "The user has been successfully added!",
          successfully_invited_user:
            "The user has been successfully invited to Simple Issues!",
          successfully_updated_role: "The role has been successfully updated!",
          error_update_role:
            "An error occurred while updating the role. Please try again later.",
          error_adding_user:
            "An error occurred while adding the user. Please try again later.",
          cannot_change_your_own_role: "You cannot update your own role.",
          remove: "Remove",
          remove_user: "Remove User",
          successfully_removed_user: "The user has been successfully removed!",
          error_removing_user:
            "An error occurred while removing the user. Please try again later.",
          organization_colon: "Organization:",
        },
      },
      forgot_password: {
        forgot_password: "Forgot your password?",
        reset_your_password: "Reset your password now",
        successfully_sent_reset_email:
          "Successfully sent your password reset link by email!",
        error_occurred_while_resetting_your_password:
          "An error occurred while trying to reset your password. Please try again later...",
      },
      reset_password: {
        reset_your_password: "Reset your password",
        successfully_reset_password:
          "Successfully reset your password! You can now Sign In!",
        error_occurred_while_resetting_your_password:
          "An error occurred while trying to reset your password. Please try again later...",
      },
      footer: {
        text: "This project is under the AGPL-3 License, the code is available",
        here: "here",
        feedback_text: "Have any feedback to give us?",
      },
    },
  },
  fr: {
    translation: {
      navbar: {
        home: "Accueil",
        about: "À Propos",
        help: "Aide",
      },
      organization: "Organization",
      users: "Utilisateurs",
      previous: "Précédent",
      next: "Suivant",
      loading: "Chargement",
      language: "Langue",
      english: "English (Anglais)",
      french: "Français",
      hello: "Bonjour",
      dashboard: "Tableau de bord",
      my_dashboard: "Mon tableau de bord",
      cancel: "Annuler",
      submit: "Soumettre",
      close: "Fermer",
      edit: "Éditer",
      delete: "Supprimer",
      update: "Mettre à jour",
      logout: "Se déconnecter",
      signin: "Se connecter",
      reset_it_here: "Réinitaliser le ici",
      signin_to_your_account: "Connectez-vous à votre compte",
      signup: "Créer un compte",
      create_a_simple_issues_account: "Créer un compte",
      create_an_issue: "Créer une issue",
      name: "Nom",
      name_required: "Veuillez entrer un nom valide",
      email: "Addresse courriel",
      email_required: "Veuillez entrer une addresse courriel valide.",
      old_password: "Ancien mot de passe",
      old_password_required: "Veuillez entrer votre ancien mot de passe.",
      password: "Mot de passe",
      password_required: "Veuillez entrer un mot de passe valide.",
      password_confirmation: "Confirmation du mot de passe",
      password_confirmation_required: "Veuillez entrer le même mot de passe.",
      dont_have_an_account: "Vous n'avez pas de compte ?",
      message: "Message",
      message_required: "Veuillez entrer un message valide.",
      send_feedback: "Envoyer vos retours",
      give_us_feedback: "Vous voulez nous donner des retours ?",
      successfully_sent_feedback:
        "Nous avons bien reçu vos retours ! Nous vous re-contacterons prochainement !",
      signup_here: "Créez-en un ici !",
      have_an_account: "Vous avez un compte ?",
      login_here: "Connectez-vous ici !",
      are_you_sure_delete_issue: "Êtes-vous sûr de vouloir supprimer l'issue ?",
      yes: "Oui",
      no: "Non",
      successfully_signed_out: "Vous vous êtes deconnecté avec succès !",
      successfully_logged_in: "Vous vous êtes connecté avec succès !",
      successfully_signed_up: "Vous avez créé un compte avec succès !",
      successfully_updated_issue: "L'issue a été mise à jour avec succès !",
      successfully_deleted_issue: "L'issue a été supprimée avec succès !",
      successfully_created_issue: "L'issue a été créée avec succès !",
      successfully_updated_password:
        "Votre mot de passe a été modifé avec succès !",
      update_password: "Mettre à jour le mot de passe",
      account_manager: "Gestionnaire de compte",
      comments_available_soon:
        "Les commententaires seront disponibles bientôt !",
      enter_a_bug_report_or_improvement:
        "Entrez un rapport de bogues ou une demande d'amélioration",
      you_can_try_selecting_an_organization_from_the_list:
        "Vous pouvez essayer de selectionner une autre organization dans la liste",
      errors: {
        default_error:
          "Une erreur s'est produite, veuillez re-essayer plus tard...",
        error_issue: "Une erreur s'est produite lors du traitement de l'issue",
        missing_installation_id:
          "Une erreur s'est produite car la clé d'installation fournie par GitHub est manquante...",
        sorry_you_are_not_allowed_to_access_this_page:
          "Désolé... Vous n'avez pas le droit d'accéder à cette page.",
        please_make_sure_you_have_the_right_permissions:
          "Veuillez vous assurez d'avoir les permissions valides.",
        if_you_think_this_is_an_error:
          "Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur de votre organisation.",
        click_here_to_be_redirected_to_the_home_page:
          "Cliquez ici pour être redirigé vers la page d'accueil",
        sorry_an_error_occurred_while_trying_to_access_this_page:
          "Désolé, une erreur s'est produite lorsque nous avons essayé d'accéder à cette page. error occurred while trying to access this page.",
        please_try_again_later: "Veuillez réessayer plus tard.",
        "404_error": "Erreur 404",
        "404_paragraph":
          "Désolé... La page demandée n'a pas été trouvée. Veuillez vous assurer que L'URL rentré est valide.",
        error_changing_organization:
          "Il y a eu une erreur lors du changement d'organization, veuillez réessayer plus tard",
        error_changing_repo:
          "Il y a eu une erreur lors du changement de repo, veuillez réessayer plus tard",
        error_no_issues:
          "Aucunes issues pour les filtres selectionnés ont été trouvées. Essayez d'enlever les filtres ou de créer une nouvelle issue !",
        couldn_t_update_password:
          "Désolé... Nous avons pas pu changer votre mot de passe. Veuillez réessayer plus tard.",
      },
      home: {
        title: "Simple Issues",
        paragraph:
          "Simple Issues est un site web qui peut être utilisé pour créer et modifier facilement des Issues Github à partir d'une interface utilisateur plus simple pour les clients qui veulent un moyen facile de créer des rapports de bogue ou des demandes de fonctionnalités pour les développeurs à voir dans leur propre interface. Cela fonctionne très bien avec ZenHub ou le système de gestion de projet propre à Github.",
        go_to_my_dashboard: "Voir mon tableau de bord",
      },
      about: {
        title: "À propos de Simple Issues",
        look_at_instructions: "Voir des instructions",
        soon: "Bientot",
        paragraph:
          "Simple Issues est un site web qui peut être utilisé pour créer et modifier facilement des Issues Github à partir d'une interface utilisateur plus simple pour les clients qui veulent un moyen facile de créer des rapports de bogue ou des demandes de fonctionnalités pour les développeurs à voir dans leur propre interface. Cela fonctionne très bien avec ZenHub ou le système de gestion de projet propre à Github.",
        paragraph2:
          "Il peut être installé facilement pour votre dépôt Github avec les instructions sur la page Github liée ci-dessous. L'application est réalisée avec React et nécessite très peu de modifications pour fonctionner. Il vous suffit de saisir vos identifiants Github pour créer les problèmes et de choisir le dépôt sur lequel vous souhaitez ajouter des problèmes. Vous pouvez également restreindre les Issues à une liste d'addresses courriels pour vous assurer que seuls vos clients ou collègues peuvent se connecter.",
      },
      help: {
        title: "Aide",
        faq: {
          title: "Foire aux questions",
          what_is_simple_issues_question: "Qu'est-ce que Simple Issues ?",
          why_did_you_create_this_question: "Pourquoi avez-vous créé cela ?",
          why_do_i_need_this_question: "Pourquoi aurais-je besoin de ça ?",
          how_does_it_work_question: "Comment ca fonctionne ?",
          why_is_it_a_bit_slow_question:
            "Pourquoi est-ce un peu lent présentement ?",
          i_want_to_try_it_question:
            "Je veux essayer ! Comment dois-je procéder ?",
          i_want_to_self_host_question:
            "Je veux héberger ça moi-même, est-ce possible ?",
          have_any_other_questions_question: "Vous avez d'autres questions ?",
          what_is_simple_issues_answer:
            "  est une application web conçue pour se connecter aux Issues GitHub afin de permettre aux utilisateurs non techniques (clients, managers et autres) d'envoyer des problèmes sans avoir à utiliser deux plateformes différentes pour gérer les tickets (par exemple : JIRA et Google Forms). Cela résout le problème en donnant aux utilisateurs une interface facile à utiliser pour voir et modifier les issues !",
          why_did_you_create_this_answer:
            "Comme mentionné dans la question précédente, il a été créé pour me faciliter la vie lorsque je gère un projet et que je souhaite que les utilisateurs non techniques puissent donner leur avis et signaler les bogues sans utiliser une liste de tâches ou un formulaire Google.",
          why_do_i_need_this_answer:
            "Vous n'en avez pas besoin ! C'est juste un outil qui peut vous aider à améliorer votre productivité lors de la gestion d'un projet !",
          how_does_it_work_answer:
            "Il fonctionne en connectant un dépôt ou une organisation GitHub à Simple Issues qui peut alors récupérer tous les enjeux du dépôt et en créer de nouveaux via l'API. Vous pouvez voir comment le <0>code back-end fonctionne ici</0> et comment le <1>front-end fonctionne ici</1> !",
          why_is_it_a_bit_slow_answer:
            "Actuellement, Simple Issues est toujours en phase Alpha, ce qui signifie que tous les bugs et toutes les performances n'ont pas été corrigés. Au fil du temps, cela s'améliorera car nous trouverons de meilleures façons de travailler sur l'application !",
          i_want_to_try_it_answer:
            "Nous voulons que vous l'essayiez aussi ! Vous pouvez créer un compte <0>ici</0> et ensuite activer l'application Github de Simple Issues bientôt ! Nous serons prêts pour que vous puissiez l'essayer pleinement d'ici quelques semaines ou mois !",
          i_want_to_self_host_answer:
            "L'auto-hébergement est disponible en regardant nos ReadMEs Github pour nos <0>Back-End</0> et <1>Front-End</1> repos. Dans le futur, de la documentation spécifique à ce sujet pourrait être créée !",
          have_any_other_questions_answer:
            "Envoyez nous un courriel a simpleissues[at]afetiveau.com et nous serons ravis de répondre à vos questions !",
        },
      },
      issues: {
        new_github_issue: "Nouvelle Issue (Simple) Github",
        edit_github_issue: "Edition de l'Issue (Simple)",
        title: "Titre",
        title_required: "Veuillez entrer un titre valide.",
        label: "Etiquette",
        labels: "Etiquette",
        filter_labels: "Filtrer les étiquettes",
        issue_description: "Description du problème",
        select_applicable_labels: "Choisissez les étiquettes qui s'appliquent",
      },
      organizations: {
        activate: {
          title: "Êtes-vous sur de vouloir activer ce repo ou organization ?",
          paragraph:
            "Cela vous permettra de gérer facilement les Issues GitHub à partir de ce repo ou de cette organisation via Simple Issues. Vous pouvez retirer cette approbation à tout moment dans les paramètres de l'application Github.",
          activate: "Activer",
          refuse: "Refuser",
          activate_success:
            "Félicitations! Vous avez activé Simple Issues avec succès !",
          activate_error:
            "Désolé... Une erreur s'est produite lorsque nous avons essayer d'activer votre repo avec Github. Veuillez re-essayer plus tard.",
          organization_name: "Nom de l'organization",
          please_make_sure_you_enter_a_valid_organization_name:
            "Veuillez entrer un nom valide pour l'organization.",
        },
        manager: {
          name: "Nom",
          email: "Addresse Courriel",
          role: "Role",
          admin: "Administrateur",
          regular: "Regulier",
          save: "Sauvegarder",
          successfully_updated_labels:
            "Les étiquettes ont été mises à jour avec succès !",
          error_updating_labels:
            "Une erreur est survenue lors de la mise à jour des étiquettes. Veuillez réessayer plus tard.",
          mandatory_labels: "Étiquettes requises",
          mandatory_labels_subtitle:
            "Étiquettes qui doivent être attachées à l'issue pour être affichées sur Simple Issues",
          added_labels: "Étiquettes ajoutées",
          added_labels_subtitle:
            "Étiquettes qui seront automatiquement ajoutées lorsque les issues seront créées à partir de Simple Issues.",
          add_or_invite_user: "Ajouter ou inviter l'utilisateur",
          successfully_added_user: "L'utilisateur à été ajouté avec succès !",
          successfully_invited_user:
            "Le role à été invité à utiliser Simple Issues avec succès !",
          successfully_updated_role: "Le role à été mis à jour avec succès !",
          error_update_role:
            "Une erreur est survenue lors de la mise à jour du role. Veuillez réessayer plus tard.",
          error_adding_user:
            "Une erreur est survenue lors de l'ajout de l'utilisateur. Veuillez réessayer plus tard.",
          cannot_change_your_own_role:
            "Vous ne pouvez pas modifier votre propre role.",
          remove: "Supprimer",
          remove_user: "Supprimer l'utilisateur",
          successfully_removed_user:
            "L'utilisateur a été supprimé avec succès!",
          error_removing_user:
            "Une erreur est survenue lors de la suppression de l'utilisateur. Veuillez réessayer plus tard.",
          organization_colon: "Organization :",
        },
      },
      forgot_password: {
        forgot_password: "Vous avez oublié votre mot de passe ?",
        reset_your_password: "Reinitialiser votre mot de passe maintenant",
        successfully_sent_reset_email:
          "Un lien pour reinitialiser votre mot de passe vient de vous être envoyé par courriel !",
        error_occurred_while_resetting_your_password:
          "Une erreur s'est produite lorsque nous avons essayés de reinitaliser votre mot de passe. Veuilez réessayer plus tard...",
      },
      reset_password: {
        reset_your_password: "Reinitaliser votre mot de passe",
        successfully_reset_password:
          "Nous avons reinitalisés votre mot de passe avec succès ! Vous pouvez maintenant vous connecter !",
        error_occurred_while_resetting_your_password:
          "Une erreur s'est produite lorsque nous avons essayés de reinitaliser votre mot de passe. Veuilez réessayer plus tard...",
      },
      footer: {
        text: "Ce projet est sous la license AGPL-3, le code est disponible",
        here: "ici",
        feedback_text: "Vous avez des retours ?",
      },
    },
  },
};

const defaultLang: string = localStorage.getItem("defaultLang") ?? "en";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defaultLang,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
