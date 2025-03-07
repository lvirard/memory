//********************VARIABLES********************* */
const actualUser = localStorage.getItem('actualUser'); // Récup info utilisateurs 
//Nombres de coups
let counter = 0 ;
const counterDisplay = document.getElementById('counter');
//Variable pour enregistrer la position aléatoire des images 
let imgPosition ;
//constante pour appeler les boîtes d'images à retourner au click
const images = document.querySelectorAll('.gameimg');
//Variables pour enregistré les chemins par paires : 
let odd ;
let even ;
//Variables pour enregistré les index par paires
let oddIndex ;
let evenIndex;

//***Collections d'images***
const vegetables = [0, 1, 2, 3, 4, 5]
const alphabet = [];
for (let i=0 ; i<26; i++) {
    alphabet[i]=i;
};
const animals = [];
for (let i=0 ; i<28; i++) {
    animals[i]=i;
};
const animated = [0, 1, 2, 3, 4, 5, 6, 7];
const domestics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const dogs = [];
for (let i=0 ; i<23; i++) {
    dogs[i]=i;
};
const dinosaurs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const labeledDinosaurs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//Variable pour stocker la collection utilisée
let array = vegetables ;
//Variable pour stocker la taille
let cases = 12 ;

//Bouton Valider pour changer la collection d'image depuis la page
const validation = document.getElementById('validation'); //bouton valider

//********************FONCTIONS********************* */
//Fonction pour récupérer le choix des images et de la taille du mémory
function getDesign() {
    //1. Récupérer les infos de localusers
    const localDesign = localStorage.getItem('localDesign')
    design = JSON.parse(localDesign);
    //si localDesign n'est pas vide
    if(design.memorySize) {
        cases = design.memorySize // association du nombre de cases au gameplay
    }
    if(design.memoryChoice=="alphabet") {
        array = alphabet ;
    }
    else if (design.memoryChoice=="animals") {
        array = animals;
    }
    else if (design.memoryChoice=="animated") {
        array = animated;
    }
    else if (design.memoryChoice=="domestics") {
        array = domestics;
    }
    else if (design.memoryChoice=="dogs") {
        array = dogs;
    }
    else if (design.memoryChoice=="dinosaurs") {
        array = dinosaurs;
    }
    else if (design.memoryChoice=="labeledDinosaurs") {
        array = labeledDinosaurs;
    }
    else {
        array = vegetables;
    }
}

//Fonction pour vérifier si un utilisateur est connecté
function alreadyLogged (){
    let actualUser = localStorage.getItem('actualUser')
    if (!actualUser) {
        alert("Vous n'êtes pas connectés")
        window.location.assign('login.html')
    }
}

//FONCTION POUR INITIALISER La GRILLE 
function displayGrid(){
    const adjustRaw = document.getElementById("adjustRaw");
    for (let i=0; i<cases; i++){
        images[i].src="/medias/question.svg";
    }
    if (cases==8) {
        adjustRaw.style.display="none";
    }
    else {
        adjustRaw.style.display="table-row";
    }
}

//Fonction pour mélanger la position des images.
//Chaque image est associée à un nombre.
//Attention, l'association des images avec les chiffres se fera plus tard.
function shuffle(array) {
    for (let i = 0 ; i < array.length - 1; i++) {
        // Génère un indice aléatoire entre 0 et i
        let j = Math.floor(Math.random() * (i + 1));
        // Échange les éléments array[i] et array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Fonction pour initialiser la position des images choisies de manière aléatoire.
function setPositions() {
    //1. Randomiser les positions de la collection d'image/nombres pour n'en choisir que 6 au hasard
    shuffle(array);
    // choisir les 6 dernières images avec la fonction slice.
    let slicedArray
    if (cases==12) {
        slicedArray = array.slice(-6);
    }
    else {
        slicedArray = array.slice(-4);
    }
    //Dupliquer les 6 images avec la méthode concat.
    imgPosition = slicedArray.concat(slicedArray);
    //Maintenant que les images sont choisies il faut leur associer des positions aléatoires.
    shuffle(imgPosition);
}

//Fonction pour faire apparaître l'image au click.
function afficherImage(image, index) { // element : se réfère à l'élément cliqué, index à son index. 
    const imageIndex = imgPosition[index];  // Récupérer l'image correspondante dans le tableau créé dans setPositions
    switch (array) {
        case vegetables:
            imagePath = `/medias/vegetables/${imageIndex}.svg`;  
            break;
        case alphabet:
            imagePath = `/medias/alphabet/${imageIndex}.png`;  
            break;
        case animals:
            imagePath = `/medias/animals/${imageIndex}.webp`;  
            break;
        case animated:
            imagePath = `/medias/animated/${imageIndex}.webp`;  
            break;    
        case dogs:
            imagePath = `/medias/dogs/${imageIndex}.webp`;  
            break;
        case domestics:
            imagePath = `/medias/domestics/${imageIndex}.jpg`;  
            break;
        case dinosaurs:
            imagePath = `/medias/dinosaurs/${imageIndex}.jpg`;  
            break;
        case labeledDinosaurs:
            imagePath = `/medias/labeledDinosaurs/${imageIndex}.jpg`;  
            break;       
    } 
    image.src = imagePath;  // Modifier le src de l'image affichée
    //Stocker temporairement le chemin de l'image pour le comparer ensuite dans la fonction gamePlay
    if (counter%2 === 0) { // Si le compteur est pair
        even=image.src ; //On stocke l'image dans even (=pair en anglais)
        evenIndex=image.id //On stock sa position dans evenIndex
    }
    else {
        odd=image.src ; //Sinon, on stocke l'image dans odd (=impair en anglais)
        oddIndex=image.id; //On stock sa position dans evenIndex
    }
} 

//Fonction pour compter le nombre de coup et l'afficher au fur et à mesure sur la page
function count(){
    counter = counter + 1;
    counterDisplay.textContent = `Nombre de coups : ${Math.floor(counter/2)}`;
}

//Fonction pour comparer les deux derniers coups tirés.
function compare(){
    //Au click, appel de la fonction gamePlay
    //Utiliser le compteur pour savoir le nombre de coup tiré. 
    //Si le nombre est pair : 
    if (counter%2 === 0) {
        //comparer les chemins des deux derniers coups tirés (odd et even)
        //S'ils sont différents :
        if (even!=odd){ 
            //Attendre 5 secondes (5000ms) et remettre les sources des deux dernières images à 0. Pendant ce temps là, empêcher les clicks
            document.querySelector('.game').classList.add('noClick'); // empêche les clicks
            setTimeout(function (){
                document.getElementById(`${oddIndex}`).src="/medias/question.svg";
                document.getElementById(`${evenIndex}`).src="/medias/question.svg";
                document.querySelector('.game').classList.remove('noClick') // remet les clicks
            }, 5000)
        }
    } 
}

//Fonction pour dire qu'on a gagné
function win(){
    const imagesArray = Array.from(images); // Transformer mon tableau d'objet d'images en tableau
    const sources = imagesArray.map((img) => img.src); // Récupérer les sources du tableau dans un nouveau tableau
    //Si plus aucune des sources ne termine par question.svg, BRAVO!
    if (!sources.some((src) => src.endsWith("question.svg")))  {
        setTimeout(() => {
            alert(`Bravo ! Vous avez gagné en ${Math.floor(counter/2)} coups !`)
            console.log("Bravo")
        }, 200);

    }
}
//Fonction pour récupérer les nouveaux choix de design du memory
function designMemory(){
    const memoryChoice = document.getElementById('memoryChoice') ;
    const memorySize = document.getElementById('memorySize');
    let newDesign;
    newDesign = {user: actualUser, memoryChoice: memoryChoice.value, memorySize: memorySize.value};
    // localDesign.push(newDesign);
    localStorage.setItem('localDesign', JSON.stringify(newDesign));
}

//********************EVENTS********************* */
function init(){
    alreadyLogged ();
    getDesign();
    //Initialiser la grille au lancement.
    displayGrid();
    //Initialiser les positions aléatoires des images au lancement
    setPositions();
    //Appui sur la barre d'espace pour remettre à 0 la grille et la position des images
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
          displayGrid();
          setPositions();
          counter = 0;
        }
    }); 
    //Appel des fonctions count, afficherImage, compare et win au click sur une image.
    images.forEach((element, index) => { // Pour chaque element de ma collection d'image, associé à son index.
        element.addEventListener('click', (event) => {
            count();
            afficherImage(event.target, index);
            //event est là pour passer la variable, sans lui redonner le même nom "element" (ou alors "image" qui est utilisée dans la fonction afficherImage) sinon ça bug.
            //event.target permet de cibler uniquement l'image qui a été cliquée.
            compare();
            win()
          });
        
    });
    validation.addEventListener('click', function(){
        designMemory();
        getDesign();
        displayGrid();
        setPositions();
        counter = 0;
    });
}

window.onload = init ;