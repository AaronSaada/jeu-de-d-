const cellules = document.querySelectorAll(".cell");
const changementDuTexte = document.querySelector("#textChange");
const boutonNouvellePartie = document.querySelector("#restartButton");
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
let options = ["", "", "", "", "", "", "", "", ""];
let joueurActif = "X";
let partieEnCours = false;

init();

function init(){
    cellules.forEach(cellule => cellule.addEventListener("click", celluleCliquee));
    boutonNouvellePartie.addEventListener("click", nouvellePartie);
    changementDuTexte.textContent = `Au tour du joueur ${joueurActif}`;
    partieEnCours = true;
}

function celluleCliquee(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !partieEnCours){
        return;
    }
    modifierLaCellule(this, cellIndex);
    verifierVainqueur();
}

function modifierLaCellule(cellule, index){
    options[index] = joueurActif;
    var celluleActuelle = cellule;
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

        if(celluleA == "" || celluleB == "" || celluleC == ""){
            continue;
        }
        if(celluleA == celluleB && celluleB == celluleC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        changementDuTexte.textContent = `Le joueur ${joueurActif} a gagné !`;
        partieEnCours = false;
    }else if(!options.includes("")){
        changementDuTexte.textContent = `Égalité !`;
        partieEnCours = false;
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