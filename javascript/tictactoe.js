const cellules = document.querySelectorAll(".cell");
const changementDuTexte = document.querySelector("#textChange");
const boutonNouvellePartie = document.querySelector("#restartButton");
// Ici on indique les différentes combinaisons possible pour gagner.
const conditionsDeVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Ici on stock les valeurs des différentes cellules
let options = ["", "", "", "", "", "", "", "", ""];
let joueurActif = "X";
let partieEnCours = false;

init();

function init(){
    cellules.forEach(cellule => cellule.addEventListener("click", celluleCliquee));
    boutonNouvellePartie.addEventListener("click", nouvellePartie);
    // Les tempates représentés par les signes `` servent à ajouter des variables à du html sans passer par la concaténation.
    changementDuTexte.textContent = `Au tour du joueur ${joueurActif}`;
    partieEnCours = true;
}

// 'this' correspond à la case cliqué.
function celluleCliquee(){
    const cellIndex = this.getAttribute("cellIndex");
    // Si la case cliquée n'est pas vide ou que la partie n'est pas en cours
    if(options[cellIndex] != "" || !partieEnCours){
        // On effectue un return
        return;
    }
    modifierLaCellule(this, cellIndex);
    verifierVainqueur();
}

function modifierLaCellule(cellule, index){
    /* Permet de changer l'espace de vide à l'index de la case cliquée dans le tableau options par le signe du joueur;
    ce qui empêche de changer la valeur d'une case. */
    options[index] = joueurActif;
    // On remplace l'affichage de cellule par le signe du joueur actif.
    cellule.textContent = joueurActif;
    if(joueurActif == "X"){
        cellule.classList.add('playerX');
        cellule.classList.remove('playerO')
    }else{
        cellule.classList.add('playerO');
        cellule.classList.remove('playerX');
    }
}

function joueurSuivant(){
    // Lorsqu'un joueur clique sur une case. Si le joueur qui vient de jouer est le joueur X alors on passe au joueur O si non on passe au joueur X.
    joueurActif = (joueurActif == "X") ? "O" : "X";
    changementDuTexte.textContent = `Au tour du joueur ${joueurActif}`;
}
function verifierVainqueur(){
    let roundWon = false;

    for(let i = 0; i < conditionsDeVictoire.length; i++){
        const condition = conditionsDeVictoire[i];
        const celluleA = options[condition[0]];
        const celluleB = options[condition[1]];
        const celluleC = options[condition[2]];
        // Si une des 3 cellules alignées est vide, la partie continue
        if(celluleA == "" || celluleB == "" || celluleC == ""){
            continue;
        }
        // Si les 3 cellules comportent le même signe 
        if(celluleA == celluleB && celluleB == celluleC){
            // Le joueur actif a gagné
            roundWon = true;
            // On sort de la boucle
            break;
        }
    }
    // Si le joueur actif a gagné
    if(roundWon){
        // On change le texte disant 'Au tour du joueur' par le message ci-dessous.
        changementDuTexte.textContent = `Le joueur ${joueurActif} a gagné !`;
        // On arrête la partie.
        partieEnCours = false;
    // Sinon si il n'y a plus de cellule vide 
    }else if(!options.includes("")){
        // On affichera 'Égalité !'
        changementDuTexte.textContent = `Égalité !`;
        // On arrête la partie.
        partieEnCours = false;
    // Sinon on passe au joueur suivant.
    }else{
        joueurSuivant();
    }
}

function nouvellePartie(){
    joueurActif = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    changementDuTexte.textContent = `Au tour du joueur ${joueurActif}`;
    cellules.forEach(cellule => cellule.textContent = "");
    partieEnCours = true;
}


document.getElementById('game-rules-open-tictactoe').addEventListener('click', function(){
    document.getElementById('game-rules-tictactoe').style.display = 'flex';
});
  
document.getElementById('close-rules-tictactoe').addEventListener('click', function(){
    document.getElementById('game-rules-tictactoe').style.display = 'none';
});