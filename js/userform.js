// --------------- Variables - saisies utilisateurs  ---------------
const login = document.getElementById('login'); //champ login
const email = document.getElementById('email'); //champ e-mail
const pwd = document.getElementById('pwd') ; //champ mdp
const pwd2 = document.getElementById('pwdcheck'); //champ confirmation mdp
const validation = document.getElementById('validation'); //bouton valider
const imgLogin = document.getElementById('imgLogin'); // Image check/login
const imgEmail = document.getElementById('imgEmail'); // Image check/Email
const imgPwd = document.getElementById('imgPwd'); // Image check/Pwd
const imgPwd2 = document.getElementById('imgPwd2'); // Image check/Pwd2
const linkToLogin = document.getElementById('linkToLogin') // Lien pour aller vers la page Login dans le bouton "valider"


// --------------- Fonctions ---------------
//Fonction pour tester si le champ contient une MINUSCULE
function containsMin() {
    let isTrue = pwd.value.match(/[a-z]/)
    if (isTrue) {
        return true
    }
    else {
        return false
    }
}

//Fonction pour tester si le champ contient un CHIFFRE
function containsMaj() {
    let isTrue = pwd.value.match(/[A-Z]/)
    if (isTrue) {
        return true
    }
    else {
        return false
    }
}

//Fonction pour tester si le champ contient un CHIFFRE
function containsNumber() {
    let isTrue = pwd.value.match(/[0-9]/)
    if (isTrue) {
        return true
    }
    else {
        return false
    }
}

//Fonction pour tester si le champ contient un SYMBOLE (@$!%*?&)
function containsSymbol() {
    let isTrue = pwd.value.match(/[@$!%*?&]/)
    if (isTrue) {
        return true
    }
    else {
        return false
    }
}

//Fonction pour tester la LONGUEUR du champs >=6 
function size6() {
    let isTrue = pwd.value.length >= 6
    if (isTrue) {
        return true
    }
    else {
        return false
    }
}

//Fonction pour tester la validité du mot de passe 
function testPwd (){
    let size6Bool  = size6();
    let containsSymbolBool  = containsSymbol();
    let containsMajBool  = containsMaj();
    let containsNumberBool  = containsNumber();
    let containsMinBool  = containsMin();
     
    if(size6Bool  && containsSymbolBool  && containsMajBool  && containsNumberBool  && containsMinBool ){  
        imgPwd.style.display = "inline-block" ; //Rend visible l'image
        imgPwd.src = "/medias/check.svg" //Change l'image "check" lorsque tout est OK
        return true
    } 
    ////TODO: utiliser cett efonction dans testAll - il faudra alors rajouter un else if comme dans pwdsEquals pour ne pas afficher l'image lorsqu'on modifie un autre champ
    else {
        imgPwd.src = "/medias/error.svg" ; //Rend visible l'image
        imgPwd.style.display = "inline-block" ; //remet l'image "error" si les conditions ne sont pas remplies
        return false
    }
}

//Fonction pour tester si les 2 mots de passe sont égaux
function pwdsEquals() {
    if (pwd.value == pwd2.value && pwd.value!="") {
        imgPwd2.style.display = "inline-block" ; //Rend visible l'image    
        imgPwd2.src = "/medias/check.svg" //Change l'image "check" lorsque tout est OK
        return true
    }
    else if (pwd2.value==""){ //permet de ne pas afficher l'image lorsqu'on modifie un autre champ
        return false
    }
    else {
        imgPwd2.src = "/medias/error.svg" ; //remet l'image "error" si les conditions ne sont pas remplies
        imgPwd2.style.display = "inline-block" ;  //Rend visible l'image
        return false
    }
}

function testLogin(){
    if (login.value.match(/[A-Za-z0-9]/) &&
        login.value.length >= 3) {
            imgLogin.style.display = "inline-block" ;   //Rend visible l'image   
            imgLogin.src = "/medias/check.svg" //Change l'image "check" lorsque tout est OK
            return true
        }
    else if (login.value==""){ //permet de ne pas afficher l'image lorsqu'on modifie un autre champ
        return false
    }
    else {
        imgLogin.src = "/medias/error.svg" ; //remet l'image "error" si les conditions ne sont pas remplies
        imgLogin.style.display = "inline-block" ;//Rend visible l'image
        return false
    }
}

//Fonction pour tester la validité de l'email
function testEmail() {
    let isTrue = email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    if (isTrue) {
        imgEmail.style.display = "inline-block" ;     //Rend visible l'image 
        imgEmail.src = "/medias/check.svg" //Change l'image "check" lorsque tout est OK
        return true
    }
    else if (email.value==""){ //permet de ne pas afficher l'image lorsqu'on modifie un autre champ
        return false
    }
    else {
        imgEmail.src = "/medias/error.svg" ; //remet l'image "error" si les conditions ne sont pas remplies
        imgEmail.style.display = "inline-block" ; //Rend visible l'image
        return false
    }
}

function testAll(){
    
    let testLoginBool = testLogin();
    let testEmailBool  = testEmail();
    let pwdsEqualsBool  = pwdsEquals();
    let size6Bool  = size6(); //*
    let containsSymbolBool  = containsSymbol(); //*
    let containsMajBool  = containsMaj(); //*
    let containsNumberBool  = containsNumber(); //*
    let containsMinBool  = containsMin(); //*
 
    if(testEmailBool  && testLoginBool  && pwdsEqualsBool  && size6Bool  
        && containsSymbolBool  && containsMajBool  && containsNumberBool  
        && containsMinBool ){        
        validation.disabled = false; // Change disabled en enable - le bouton devient cliquable.
        validation.style.cursor="pointer";
    } 
    else {
        validation.disabled = true; // Laisse disable tel qu'il est. Le bouton n'est pas cliquable.
        validation.style.cursor="not-allowed";
    }
}

// --------------- Enregistrement des saisies  ---------------
let users = [] ; // Tableau de donnée des utilisateurs à compléter au fur et à mesure 
const localUsers = localStorage.getItem('users') ; // Récupération infos du LocalStorage
users = JSON.parse(localUsers) ; //Infos sous forme de tableau manipulable.

function registerUser(){
    
    //1. Récupérer les données existantes dans le local storage avec localStorage.
    let index=1;
    let newUser;
    //2. Si aucune données n'existent, 
    //ajouter le nouvel utilisateur avec l'index 1 et l'ajouter au tableau "users", puis enregistrer le tableau au format JSON dans le local storage
    if (!localUsers) {
        newUser = {user: index, id: login.value, mail: email.value, password: pwd.value};
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
    //3. Si des données existent, 
    else {
        //3.0 Vérifier que l'utilisateur ou l'email saisi ne sont pas déjà utilisé.
        //Recherche l'utilisateur :
        let foundUser = null;
        for (let element of users) {
            if (element.id === login.value) {
                foundUser = element;
                break;
            }
        }
        //recherche l'email
        let foundEmail = null;
        for (let element of users) {
            if (element.mail === email.value) {
                foundEmail = element;
                break;
            }
        }
        //Si l'utilisateur n'existe pas : 
        //4.2 ajouter le nouvel utilisateur avec la clé n+1
        //enregistrer le tableau au format JSON dans le local storage.
        //changer de fenêtre
        if (!foundUser ||  !foundEmail){
            index= users.length +1;
            newUser = {user: index, id: login.value, mail: email.value, password: pwd.value}
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            window.location.assign('login.html')
        }
        else {
            alert("Le login ou l'email est déjà utilisé. Choisis-en un autre")
        }
    }
}


//----------------- Initialisation des fonction à l'évènement ------------------
function init(){
    pwd.addEventListener('input', testPwd) 
    //TODO: à enlever si j'ai le temps de remodifier testAll.
    pwd.addEventListener('input', testAll)
    email.addEventListener('input', testAll)
    pwd2.addEventListener('input', testAll)
    login.addEventListener('input', testAll)
    validation.addEventListener('click', function(){
        registerUser();  

    })
}

window.onload = init ;