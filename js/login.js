// --------------- VARIABLES ---------------
const validation = document.getElementById('validation'); //bouton valider

// --------------- FONCTIONS ---------------

function verifyUser(){
    //1. Récupérer les données existantes dans le local storage avec localStorage.
    let localUsers = localStorage.getItem('users')
    //Définir les autres variables locales
    const login = document.getElementById('login'); //champ login
    const pwd = document.getElementById('pwd') ; //champ mdp

    //2. Si aucune données n'existent, 
    //Afficher un popup qui redirige vers la page s'enregistrer.
    if (!localUsers) {
        alert("Aucun utilisateur enregistré.Retournez sur l'onglet \"S'enregistrer\"")
        //rajouter une fonction pour faire vibrer la fenetre ? 
        return // arrêt de la fonction
    }
    //3. Si des données existent, les rendre lisibles et accessibles
    users = JSON.parse(localUsers) ;
    //4. Comparer les données du localStorage vec les valeurs saisies par l'utilisateur
    let user = users.find(user => user.id == login.value && user.password == pwd.value);
    //Si données différentes, afficher un message d'erreur
    if (!user) {
        alert("Identifiants incorrects. Veuillez réessayer.")
    }
    //sinon, arricher un message de réussite, enregistrer l'utilisateur dans le local storage et passer à la fenêtre utilisateur.
    else {
        localStorage.setItem('actualUser', login.value);
        alert("Connexion réussie !");
        window.location.assign('profile.html'); // Redirection
    }
}

//Fonction pour voir si un utilisateur est connecté
function alreadyLogged (){
    let actualUser = localStorage.getItem('actualUser')
    let divToChange=document.getElementById('divToChange')
    if (actualUser) {
        divToChange.style.display="block";
        document.getElementById('toChangeOnLogin').textContent=`Salut ${actualUser} !`
    }
    else {
        divToChange.style.display="none";
    }
}

//----------------- Initialisation de la page ------------------
function init(){
    alreadyLogged();
    validation.addEventListener('click', verifyUser)
}

window.onload = init ;