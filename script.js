let nouvellePartie = document.getElementById('new-game');
let lancerLesDes = document.getElementById('roll-dice');
let garderLeScore = document.getElementById('hold-score');
let scoreDuRound = document.getElementsByClassName('round-score-int');
let chiffreDuDe = document.getElementById('score-current-player-display');
let total = 0;

function ajouterResultat() {
  let chiffre = parseInt(chiffreDuDe.textContent);
  total += chiffre;
}

lancerLesDes.addEventListener('click', () => {
    chiffreDuDe.textContent = Math.ceil(Math.random() * 6);
    ajouterResultat();
});

nouvellePartie.addEventListener('click', () => {
    chiffreDuDe.textContent = '0';
});