// --------------- VARIABLES ---------------
const localUsers = localStorage.getItem('users'); //récup nom utilisateur en cours.
const actualUser = localStorage.getItem('actualUser'); // Récup info utilisateurs 
const validation = document.getElementById('validation'); //bouton valider
const memoryChoice = document.getElementById('memoryChoice') ;
const memorySize = document.getElementById('memorySize');


// --------------- FONCTIONS ---------------

//Fonction pour voir si un utilisateur est connecté
function alreadyLogged (){
        if (actualUser) {
        document.getElementById('toChangeOnLogin').textContent=`Salut ${actualUser} !`
    }
    else {
        alert("Vous n'êtes pas connectés")
        window.location.assign('login.html')
    }
}

//Afficher les infos utilisateurs 
function getInfos() {
    //1. Récupérer les infos de localusers de manière lisible.
    users = JSON.parse(localUsers);

    //2. Stocker les données de l'utilisateur en cours dans un tableau à part.
    let foundUser = null;
    for (let user of users) {
        if (user.id === actualUser) {
            foundUser = user;
            break;
        }
    }
    //3. Ajouter nom d'utilisateur à ID=login
    document.getElementById('login').value = `${actualUser}`;
    //4. Ajouter email à ID=email.
    document.getElementById('email').value = `${foundUser.mail}`;
}

//Fonction pour enregistrer les infos de l'utilisateur
function designMemory(){
    const memoryChoice = document.getElementById('memoryChoice') ;
    const memorySize = document.getElementById('memorySize');
    let newDesign;
    newDesign = {user: actualUser, memoryChoice: memoryChoice.value, memorySize: memorySize.value};
    // localDesign.push(newDesign);
    localStorage.setItem('localDesign', JSON.stringify(newDesign));
}


//----------------- Initialisation de la page ------------------
function init () {
    alreadyLogged();
    getInfos();
    validation.addEventListener('click', function(){
        designMemory();
        window.location.assign('game.html');
    });
}

window.onload = init ;