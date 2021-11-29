const resources = {
    en: {
      translation: {
        "hello.label": "Hello",
        "thankyou.label": "Thank you",
        "darkmode.label": "Dark",
        "lightmode.label": "Light",
        "changeLanguageButton.label": "Change to French",
        "buttonExample.label": "Example themed button",
        "soto.description" : "Hey you are new on Soto ? Sort criterias according to your convictions, select your filters and start your shopping. It's very easy, type an article name, without specifying its brand. Soto will always select the best for you !",
        "textfieldExample.label" : "Enter your text here",
        "loginSoto.label" : "Connect to Soto",
        "baseline" : "Buy only the best",
        "aboutUs" : "About us",
        "privacyPolicy" : "Privacy policy",
        "conditionsOfUse" : "Conditions of use",
        "contactUs" : "Contact us",
        "settings.personalInfos" : "Personal info",
        "settings.personalization" : "Personalization",
        "language" : "language",
        "email.label" : "Email",
        "password.label" : "Password",
        "newPassword.label" : "New password",
        "confirmNewPassword.label" : "Confirm new password",
        "button.criteria.label" : "Preferences",
        "button.obligation.label" : "Diet",
        "searchbar.placeholder.label" : "Milk, pastas, fruits, ...",
        "obligation.vegetarian" : "Vegetarian",
        "obligation.vegan" : "Vegan",
        "obligation.peanut_free" : "Peanut free",
        "obligation.lactose_free" : "Lactose free",
        "obligation.halal" : "Halal",
        "obligation.kosher" : "Kosher",
        "obligation.gluten_free" : "Gluten Free",
        "obligation.bio" : "Bio",
        "criteria.health" : "Health Impact",
        "criteria.environmental_impact" : "Environmental Impact",
        "criteria.price" : "Price",
        "criteria.promotion": "Discounts",
        "criteria.nutritional_value" : "Nutritional Value",
        "criteria.product_proximity" : "Product Proximity",
        "shop.tooltip.label" : "The colored dot defines whether the product matches your criteria or not",
        "shop.banner.myBasket" : "My basket",
        "shop.banner.savedListButton.label" : "My lists saved",
        "shop.totalPrice.label" : "Total price :",
        "shop.payButton.label" : "Pay",

        "label.showMore": "Show more",
        "label.showLess": "Show less",
        "label.cart": "My cart",
        "label.saved_list": "Saved lists",
        "label.total": "Total price:",

        "label.project": "The project",
        "label.project.l1": "Class your criteria according to your convictions, put up your filters, and start your shopping.",
        "label.project.l2": "It's really easy, start by typing the name of an item, without specifying its brand",
        "label.project.l3": "Soto will always  offer you the best choice!",
        "label.startShopping" : "Start shopping",
        "label.team": "The team",
        "label.team.front": "Front End Developer",
        "label.team.back": "Back End Developer",
        "label.team.mobile": "Mobile Developer",

        // Months
        "label.january.short" : "Jan.",
        "label.february.short" : "Feb.",
        "label.march.short" : "Mar.",
        "label.april.short" : "Apr.",
        "label.may.short" : "May",
        "label.june.short" : "Jun.",
        "label.july.short" : "Jul.",
        "label.august.short" : "Aug.",
        "label.september.short" : "Sep.",
        "label.october.short" : "Oct.",
        "label.november.short" : "Nov.",
        "label.december.short" : "Dec.",

        "label.history" : "History",
        "label.fullHistory" : "Full history",
        "label.products_number" : "Products number:",
        "label.continue_shopping" : "Continue shopping",
        "label.history.cart" : "Cart history",
        "label.addToCart" : "Add to Cart",

        "label.boughtOn" : "Bought on the ",
        "label.at" : "at",
        "label.history.paid" : "You paid:",
        "label.history.orderedProducts" : "Ordered products:",

        "label.quantity": "Quantity:",
        "label.price": "Price:",
        "label.score.final": "Final score:",

        "title.profile" : "Profile",

        // Labels de la page profile/email
        "label.email" : "Email address",
        "label.changeEmail" : "Change your email address",
        "label.helperText.emailInvalid" : "Email entered is invalid",

        // Labels de la page profile/password
        "label.password" : "Password",
        "label.changePassword" : "Change your password",
        "label.helperText.passwordsDifferent" : "Passwords are different",

        // Labels de la page profile/language
        "label.language" : "Language",
        "label.usedLanguage" : "Used Language",

        // Labels de la page profile/accessibility
        "label.accessibility" : "Accessibility",
        "label.lightTheme" : "Light theme",
        "label.darkTheme" : "Dark theme",
        "label.changeTheme" : "Choose your theme",
        "label.themeSelection.helperText" : "If this field is activated, the dark theme will be applied. Otherwise it will be the light one",

        // Labels de la page profile/criteriaAndObligations
        "label.criteriaAndObligations" : "Criteria and Obligations",
        "description.criteriaAndObligations" : "Change your selection of criteria and obligations",

        "label.discount.return" : "Go back shopping",
        "label.searchBar" : "Search Bar",

        "label.driveSelection" : "Change your drive",
        "description.driveSelection" : "Choose your drive",

        "language.french" : "Français",
        "language.location.fr" : "France",
        "language.english" : "English",
        "language.location.us" : "United States",
        "language.location.uk" : "United Kingdom",

        "label.general.cancel" : "Cancel",
        "label.general.validate" : "Validate",
        "label.general.back" : "Back",
        "label.general.finish" : "Finish",
        "label.general.next" : "Next",

        "label.confirmPassword": "Confirm Password",

        "label.login" : "Connect to Soto",
        "label.login.connect" : "Connect",
        "label.login.signUp" : "Sign up",
        "label.login.registerToLogin" : "You already have an account ? Sign in",
        "label.login.step1.title" : "Personal information",
        "label.login.step2.title" : "Criteria and obligations",
        "label.login.step3.title" : "Drive selection",

        "notification.label.registered" : "Registered",
        "notification.label.loggedIn" : "Logged In",

        "error.notloggedin" : "Please login",
        "error.invalidcredentails": "Invalid email or password",
        "error.emailalreadyinuse": "Email already in use",
        "error.badparams": "Bad parameters",

        // -------------------- ABOVE IS TESTED -------------------- //

        "label.listName" : "List Name",
        "label.milestones" : "Project Milestones",
        "label.milestones.step1" : "Start of the project",
        "label.milestones.step2" : "1st version of the website in production",
        "label.milestones.step3" : "1st functional version of the site",
        "label.milestones.step4" : "1st beta for the 3 applications",
        "label.milestones.step5.date" : "January 2022",
        "label.milestones.step5" : " Presentation of the project to a jury",
        "label.copyEmail" : "Copy this email",
        "notification.copyEmail" : "Email copied",

      }
    },
    fr: {
      translation: {
        "hello.label": "Bonjour",
        "thankyou.label": "Merci",
        "darkmode.label": "Sombre",
        "lightmode.label": "Clair",
        "changeLanguageButton.label": "Changer pour anglais",
        "buttonExample.label": "Bouton d'exemple",
        "soto.description" : "Hey, t'es nouveau sur Soto ? Classe tes critères selon tes convictions, mets en place tes filtres, et commence tes courses. C'est tout simple, essaye de taper le nom d'un article, sans spéficier sa marque. Soto te proposera toujours le meilleur !",
        "textfieldExample.label" : "Entrez votre texte ici",
        "loginSoto.label" : "Se connecter à Soto",
        "baseline" : "N'achetez que le meilleur",
        "aboutUs" : "À propos de nous",
        "privacyPolicy" : "Politique de confidentialité",
        "conditionsOfUse" : "Conditions d'utilisations",
        "contactUs" : "Nous contacter",
        "settings.personalInfos" : "Vos informations personnelles",
        "settings.personalization" : "Personnalisation",
        "language" : "Langue",
        "email.label" : "Adresse e-mail",
        "password.label" : "Mot de passe",
        "newPassword.label" : "Nouveau mot de passe",
        "confirmNewPassword.label" : "Confirmer le nouveau mot de passe",
        "button.criteria.label" : "Préférences",
        "button.obligation.label" : "Régime alimentaire",
        "searchbar.placeholder.label" : "Lait, pâtes, fruits, ...",
        "obligation.vegetarian" : "Végétarien",
        "obligation.vegan" : "Végan",
        "obligation.peanut_free" : "Sans arachide",
        "obligation.lactose_free" : "Sans lactose",
        "obligation.halal" : "Halal",
        "obligation.kosher" : "Casher",
        "obligation.gluten_free" : "Sans gluten",
        "obligation.bio" : "Bio",
        "criteria.health" : "Impact sur la santé",
        "criteria.environmental_impact" : "Impact sur l'environnement",
        "criteria.price" : "Prix",
        "criteria.promotion": "Promotions",
        "criteria.nutritional_value" : "Valeur nutritionnelle",
        "criteria.product_proximity" : "Proximité du produit",
        "shop.tooltip.label" : "La pastille de couleur définit si le produit correspond bien à vos critères ou non",
        "shop.banner.myBasket" : "Mon panier",
        "shop.banner.savedListButton.label" : "Mes listes sauvegardées",
        "shop.totalPrice.label" : "Prix total :",
        "shop.payButton.label" : "Payer",

        "label.showMore": "Afficher plus",
        "label.showLess": "Afficher moins",
        "label.cart": "Mon panier",
        "label.saved_list": "Listes sauvegardées",
        "label.total": "Prix total :",

        "label.project": "Le projet",
        "label.project.l1": "Classe tes critères selon tes convictions, mets en place tes filtres, et commence tes courses.",
        "label.project.l2": "C'est tout simple, essaye de taper le nom d'un article, sans spécifier sa marque",
        "label.project.l3": "Soto te proposera toujours le meilleur choix !",
        "label.startShopping" : "Commencer les courses",
        "label.team": "Notre équipe",
        "label.team.front": "Développeur Front End",
        "label.team.back": "Développeur Back End",
        "label.team.mobile": "Développeur mobile",

        // Months
        "label.january.short" : "janv.",
        "label.february.short" : "févr.",
        "label.march.short" : "mars",
        "label.april.short" : "avr.",
        "label.may.short" : "mai",
        "label.june.short" : "juin",
        "label.july.short" : "juill.",
        "label.august.short" : "août.",
        "label.september.short" : "sept",
        "label.october.short" : "oct.",
        "label.november.short" : "nov.",
        "label.december.short" : "déc.",

        "label.history" : "Historique",
        "label.fullHistory" : "Historique complet",
        "label.products_number" : "Total de produits :",
        "label.continue_shopping" : "Retourner faire ses courses",
        "label.history.cart" : "Historique de vos courses",
        "label.addToCart" : "Ajouter au panier",

        "label.boughtOn" : "Achat fait le ",
        "label.at" : "à",
        "label.history.paid" : "Vous avez payé :",
        "label.history.orderedProducts" : "Total de produits commandés :",

        "label.quantity": "Quantité :",
        "label.price": "Prix :",
        "label.score.final": "Score total :",

        "title.profile" : "Profil",

        // Labels de la page profile/email
        "label.emailPage" : "Adresses e-mail",
        "label.changeEmail" : "Changer son adresse e-mail",
        "label.helperText.emailInvalid" : "L'adresse e-mail n'est pas conforme",

        // Labels de la page profile/password
        "label.password" : "Mot de passe",
        "label.changePassword" : "Changer son mot de passe",
        "label.helperText.passwordsDifferent" : "Les mots de passe sont différents",

        // Labels de la page profile/language
        "label.language" : "Langue",
        "label.usedLanguage" : "Langue utilisée",

        // Labels de la page profile/accessibility
        "label.accessibility" : "Accessibilité",
        "label.lightTheme" : "Thème clair",
        "label.darkTheme" : "Thème sombre",
        "label.changeTheme" : "Choisir son thème",
        "label.themeSelection.helperText" : "Si ce champ est activé, le thème sombre sera appliqué. Sinon ce sera le thème clair",

        "label.discount.return" : "Retour",
        "label.searchBar" : "Barre de recherche",

        "label.criteriaAndObligations" : "Critères et obligations",
        "description.criteriaAndObligations" : "Changer sa sélection de critères et d'obligations",

        "label.driveSelection" : "Changer de drive",
        "description.driveSelection" : "Choisir son drive",

        "language.french" : "Français",
        "language.location.fr" : "France",
        "language.english" : "English",
        "language.location.us" : "United States",
        "language.location.uk" : "United Kingdom",

        "label.general.cancel" : "Annuler",
        "label.general.validate" : "Valider",
        "label.general.back" : "Retour",
        "label.general.finish" : "Finir",
        "label.general.next" : "Suivant",

        "label.confirmPassword": "Confirmer le mot de passe",

        "label.login" : "Se connecter à Soto",
        "label.login.connect" : "Se connecter",
        "label.login.signUp" : "Créer un compte",
        "label.login.registerToLogin" : "Vous avez déja un compte ? Connectez vous",
        "label.login.step1.title" : "Informations personnelles",
        "label.login.step2.title" : "Préférences et obligations",
        "label.login.step3.title" : "Sélection du drive",

        "notification.label.registered" : "Inscription réussie",
        "notification.label.loggedIn" : "Connecté",

        "error.notloggedin" : "Veuillez vous connecter",
        "error.invalidcredentails": "Email ou mot de passe invalides",
        "error.emailalreadyinuse": "Email déjà utilisé",
        "error.badparams": "Mauvais paramètres",

        // -------------------- ABOVE IS TESTED -------------------- //

        "label.listName" : "Nom de la liste",
        "notification.noFavList" : "Pas de listes favorites",
        "label.milestones" : "Étapes du projet",
        "label.milestones.step1" : "Début du projet",
        "label.milestones.step2" : "1ère version du site en production",
        "label.milestones.step3" : "1ère version fonctionnelle du site",
        "label.milestones.step4" : "1ère bêta pour les 3 applications",
        "label.milestones.step5.date" : "Janvier 2022",
        "label.milestones.step5" : "Présentation du projet devant un jury",
        "label.copyEmail" : "Copier cet email",
        "notification.copyEmail" : "Email copié",
      }
    },
  test: {
    translation: {
      "hello.label": "AAA",
      "thankyou.label": "AAA",
      "darkmode.label": "AAA",
      "lightmode.label": "AAA",
      "changeLanguageButton.label": "AAA",
      "buttonExample.label": "AAA",
      "soto.description" : "AAA",
      "textfieldExample.label" : "AAA",
      "loginSoto.label" : "AAA",
      "baseline" : "AAA",
      "aboutUs" : "AAA",
      "privacyPolicy" : "AAA",
      "conditionsOfUse" : "AAA",
      "contactUs" : "AAA",
      "settings.personalInfos" : "AAA",
      "settings.personalization" : "AAA",
      "language" : "AAA",
      "email.label" : "AAA",
      "password.label" : "AAA",
      "newPassword.label" : "AAA",
      "confirmNewPassword.label" : "AAA ",
      "button.criteria.label" : "AAA",
      "button.obligation.label" : "AAA",
      "searchbar.placeholder.label" : "AAA",
      "obligation.vegetarian" : "AAA",
      "obligation.vegan" : "AAA",
      "obligation.peanut_free" : "AAA",
      "obligation.lactose_free" : "AAA",
      "obligation.halal" : "AAA",
      "obligation.kosher" : "AAA",
      "obligation.gluten_free" : "AAA",
      "obligation.bio" : "AAA",
      "criteria.health" : "AAA",
      "criteria.environmental_impact" : "AAA",
      "criteria.price" : "AAA",
      "criteria.nutritional_value" : "AAA",
      "criteria.product_proximity" : "AAA",
      "shop.tooltip.label" : "AAA",
      "shop.banner.myBasket" : "AAA",
      "shop.banner.savedListButton.label" : "AAA",
      "shop.totalPrice.label" : "AAA",
      "shop.payButton.label" : "AAA",

      "label.showMore": "AAA",
      "label.showLess": "AAA",
      "label.cart": "AAA",
      "label.saved_list": "AAA",
      "label.total": "AAA",

      "label.project": "AAA",
      "label.project.l1": "AAA",
      "label.project.l2": "AAA",
      "label.project.l3": "AAA",
      "label.startShopping" : "AAA",
      "label.team": "AAA",
      "label.team.front": "AAA",
      "label.team.back": "AAA",
      "label.team.mobile": "AAA",

      // Months
      "label.january.short" : "AAA.",
      "label.february.short" : "AAA.",
      "label.march.short" : "AAA.",
      "label.april.short" : "AAA.",
      "label.may.short" : "AAA",
      "label.june.short" : "AAA.",
      "label.july.short" : "AAA.",
      "label.august.short" : "AAA.",
      "label.september.short" : "AAA.",
      "label.october.short" : "AAA.",
      "label.november.short" : "AAA.",
      "label.december.short" : "AAA.",

      "label.history" : "AAA",
      "label.fullHistory" : "AAA",
      "label.products_number" : "AAA",
      "label.continue_shopping" : "AAA",
      "label.history.cart" : "AAA",
      "label.addToCart" : "AAA",

      "label.boughtOn" : "AAA",
      "label.at" : "AAA",
      "label.history.paid" : "AAA",
      "label.history.orderedProducts" : "AAA",

      "label.quantity": "AAA :",
      "label.price": "AAA :",
      "label.score.final": "AAA:",
      "title.profile" : "AAA",

      // Labels de la page profile/email
      "label.email" : "AAA",
      "label.changeEmail" : "AAA",
      "label.helperText.emailInvalid" : "AAA",

      // Labels de la page profile/password
      "label.password" : "AAA",
      "label.changePassword" : "AAA",
      "label.helperText.passwordsDifferent" : "AAA",

      // Labels de la page profile/language
      "label.language" : "AAA",
      "label.usedLanguage" : "AAA",

      // Labels de la page profile/accessibility
      "label.accessibility" : "AAA",
      "label.lightTheme" : "AAA",
      "label.darkTheme" : "AAA",
      "label.changeTheme" : "AAA",
      "label.themeSelection.helperText" : "AAA",

      // Labels de la page profile/criteriaAndObligations
      "label.criteriaAndObligations" : "AAA",
      "description.criteriaAndObligations" : "AAA",

      "label.driveSelection" : "AAA",
      "description.driveSelection" : "AAA",

      "language.french" : "AAA",
      "language.location.fr" : "AAA",
      "language.english" : "AAA",
      "language.location.us" : "AAA",
      "language.location.uk" : "AAA",

      "label.general.cancel" : "AAA",
      "label.general.validate" : "AAA",
      "label.general.back" : "AAA",
      "label.general.finish" : "AAA",
      "label.general.next" : "AAA",

      "label.confirmPassword": "AAA",

      "label.login" : "AAA",
      "label.login.connect" : "AAA",
      "label.login.signUp" : "AAA",
      "label.login.registerToLogin" : "AAA",
      "label.login.step1.title" : "AAA",
      "label.login.step2.title" : "AAA",
      "label.login.step3.title" : "AAA",

      "notification.label.registered" : "AAA",
      "notification.label.loggedIn" : "AAA",

      "error.notloggedin" : "AAA",
      "error.invalidcredentails": "AAA",
      "error.emailalreadyinuse": "AAA",
      "error.badparams": "AAA",

      // -------------------- ABOVE IS TESTED -------------------- //

      "label.listName" : "AAA",

      "label.discount.return" : "AAA",
      "label.searchBar" : "AAA",
    }
  }
};

export default resources;
