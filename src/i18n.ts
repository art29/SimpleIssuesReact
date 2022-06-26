import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
      },
      language: "Language",
      english: "English",
      french: "French",
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
      signin_to_your_account: "Sign In into your account",
      signup: "Sign Up",
      create_a_simple_issues_account: "Create a SimpleIssues Account",
      name: "Name",
      name_required: "Please enter a valid name",
      email: "Email Address",
      email_required: "An email address is required.",
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
      comments_available_soon: "Comments will be available soon!",
      enter_a_bug_report_or_improvement:
        "Enter a bug report or improvement request",
      errors: {
        default_error: "An error occurred, please try again later...",
        error_issue:
          "An error occurred while processing the issue... Please try again later.",
      },
      home: {
        title: "Simple Issues",
        paragraph:
          "Simple Issues is a website that can be used to easily create and modify Github Issues from an easier user interface for the clients that want an easy way to create Bug Reports or Features Requests for developers to see in their own interface. This works really well with ZenHub or Github’s own project management system.",
        go_to_my_dashboard: "Go to my Dashboard",
      },
      about: {
        look_at_instructions: "Look at instructions",
        soon: "Soon",
        paragraph:
          "Simple Issues is a website that can be used to easily create and modify Github Issues from an easier user interface for the clients that want an easy way to create Bug Reports or Features Requests for developers to see in their own interface. This works really well with ZenHub or Github’s own project management system.",
        paragraph2:
          "It can be installed easily for your Github Repository with the instructions on the Github Page linked below. The application is made with React and needs very little modification to work. You just need to input your Github Credentials to create the issues on as well as to choose the repository you want to add issues on. You can also restrict issues to a list of emails to make sure only your clients or colleagues can connect.",
      },
      issues: {
        new_github_issue: "New Github (Simple) Issue",
        edit_github_issue: "Edit (Simple) Issue",
        title: "Title",
        title_required: "Please enter a valid title",
        label: "Label",
        labels: "Labels",
        issue_description: "Description of the Issue",
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
      },
      language: "Langue",
      english: "Anglais",
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
      signin_to_your_account: "Connectez-vous à votre compte",
      signup: "Créer un compte",
      create_a_simple_issues_account: "Creez un compte SimpleIssues",
      name: "Nom",
      name_required: "Veuillez entrer un nom valide",
      email: "Addresse courriel",
      email_required: "Veuillez entrer une addresse courriel valide.",
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
      comments_available_soon:
        "Les commententaires seront disponibles bientôt !",
      enter_a_bug_report_or_improvement:
        "Entrez un rapport de bogues ou une demande d'amélioration",
      errors: {
        default_error:
          "Une erreur s'est produite, veuillez re-essayer plus tard...",
        error_issue: "Une erreur s'est produite lors du traitement de l'issue",
      },
      home: {
        title: "Simple Issues",
        paragraph:
          "Simple Issues est un site web qui peut être utilisé pour créer et modifier facilement des Issues Github à partir d'une interface utilisateur plus simple pour les clients qui veulent un moyen facile de créer des rapports de bogue ou des demandes de fonctionnalités pour les développeurs à voir dans leur propre interface. Cela fonctionne très bien avec ZenHub ou le système de gestion de projet propre à Github.",
        go_to_my_dashboard: "Voir mon tableau de bord",
      },
      about: {
        look_at_instructions: "Voir des instructions",
        soon: "Bientot",
        paragraph:
          "Simple Issues est un site web qui peut être utilisé pour créer et modifier facilement des Issues Github à partir d'une interface utilisateur plus simple pour les clients qui veulent un moyen facile de créer des rapports de bogue ou des demandes de fonctionnalités pour les développeurs à voir dans leur propre interface. Cela fonctionne très bien avec ZenHub ou le système de gestion de projet propre à Github.",
        paragraph2:
          "Il peut être installé facilement pour votre dépôt Github avec les instructions sur la page Github liée ci-dessous. L'application est réalisée avec React et nécessite très peu de modifications pour fonctionner. Il vous suffit de saisir vos identifiants Github pour créer les problèmes et de choisir le dépôt sur lequel vous souhaitez ajouter des problèmes. Vous pouvez également restreindre les Issues à une liste d'addresses courriels pour vous assurer que seuls vos clients ou collègues peuvent se connecter.",
      },
      issues: {
        new_github_issue: "Nouvelle Issue (Simple) Github",
        edit_github_issue: "Edition de l'Issue (Simple)",
        title: "Titre",
        title_required: "Veuillez entrer un titre valide.",
        label: "Etiquette",
        labels: "Etiquette",
        issue_description: "Description du problème",
      },
      footer: {
        text: "Ce projet est sous la license AGPL-3, le code est disponible",
        here: "ici",
        feedback_text: "Vous avez des retours ?",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
