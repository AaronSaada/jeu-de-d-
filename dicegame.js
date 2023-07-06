let nouvellePartie = document.getElementById('new-game');
let lancerLesDes = document.getElementById('roll-dice');
let garderLeScore = document.getElementById('hold-score');
let chiffreDuDe = document.getElementById('score-current-player-display');
let des = document.getElementById('dice');
let scores;
let scoreDuRound;
let joueurActif;
let partieEnCours;

// Appelle de la fonction init.
init();

// Fonction comportant un écouteur d'événement sur le bouton 'Lancer les dés';
lancerLesDes.addEventListener('click', function() {
    // Si la partie est en cours (Si partieEnCours == true).
    if (partieEnCours) {
        // On stock dans la variable nombreAleatoire un nombre aléatoire entre 1 et 6.
        var nombreAleatoire = Math.ceil(Math.random(1)* 6);
        // On remplace la source de l'image en fonction du chiffre aléatoire tiré.
        des.src = 'images/image'+ nombreAleatoire +'.png';
        // On change le type de l'image en block.
        des.style.display = 'block';
        // Si le nombre aléatoire tiré n'est pas 1
        if (nombreAleatoire !== 1) {
            // Alors on ajoute au score du tour du joueur actif le chiffre tiré  
            scoreDuRound += nombreAleatoire;
            // Dans la partie score du round on affiche ensuite l'addition précédente.
            document.getElementById('round-score-int-' + joueurActif).textContent = scoreDuRound;
        // Si non
        }else {
            // On passe au joueur suivant.  
            joueurSuivant();
        }
    }
});

document.addEventListener('keydown', function(event) {
    // Si la partie est en cours (Si partieEnCours == true) et que la touche enfoncée est la touche "Espace" (code 32).
    if (partieEnCours && event.keyCode === 32) {
        // On stock dans la variable nombreAleatoire un nombre aléatoire entre 1 et 6.
        var nombreAleatoire = Math.ceil(Math.random() * 6);
        // On remplace la source de l'image en fonction du chiffre aléatoire tiré.
        des.src = 'images/image' + nombreAleatoire + '.png';
        // On change le type de l'image en block.
        des.style.display = 'block';
        // Si le nombre aléatoire tiré n'est pas 1
        if (nombreAleatoire !== 1) {
            // Alors on ajoute au score du tour du joueur actif le chiffre tiré
            scoreDuRound += nombreAleatoire;
            // Dans la partie score du round on affiche ensuite l'addition précédente.
            document.getElementById('round-score-int-' + joueurActif).textContent = scoreDuRound;
        } else {
            // On passe au joueur suivant.
            joueurSuivant();
        }
    }
  });


// Fonction comportant un écouteur d'événement sur le bouton 'Garder le score';
garderLeScore.addEventListener('click', function(){
    // Si la partie est en cours (Si partieEnCours == true).
    if (partieEnCours){
        // On ajoute au score global du joueur actif l'addition de son score global + son score de tour.
        scores[joueurActif] += scoreDuRound;
        // Affiche le score global.
        document.getElementById('player' + joueurActif + '-score').textContent = scores[joueurActif];
        // Si le score global du joueur actif est supérieur ou égal à 100.
        if(scores[joueurActif] >= 100){
            // On change le nom du joueur actif par 'C'est gagné !';
            document.getElementById('player' + joueurActif).textContent = 'C\'est gagné !';
            // On fait disparaître le dé;
            document.getElementById('dice').style.display = 'none';
            // On ajoute la classe winner au joueur ayant gagné pour change sa couleur de fond;
            document.getElementById('player' + joueurActif + '-interface').classList.add('winner');
            // On lui retire la classe 'current-player' pour retirer ses propriétés;
            document.getElementById('player' + joueurActif + '-interface').classList.toggle('current-player');
            // On met fin à la partie.
            partieEnCours = false;
        // Si non
        }else{
            // On passe au joueur suivant
            joueurSuivant();
        }
    }
});

// Fonction comportant un écouteur d'événement sur le bouton 'Garder le score';
document.addEventListener('keydown', function(event){
    // Si la partie est en cours (Si partieEnCours == true).
    if (partieEnCours && event.keyCode === 13){
        // On ajoute au score global du joueur actif l'addition de son score global + son score de tour.
        scores[joueurActif] += scoreDuRound;
        // Affiche le score global.
        document.getElementById('player' + joueurActif + '-score').textContent = scores[joueurActif];
        // Si le score global du joueur actif est supérieur ou égal à 100.
        if(scores[joueurActif] >= 100){
            // On change le nom du joueur actif par 'C'est gagné !';
            document.getElementById('player' + joueurActif).textContent = 'C\'est gagné !';
            // On fait disparaître le dé;
            document.getElementById('dice').style.display = 'none';
            // On ajoute la classe winner au joueur ayant gagné pour change sa couleur de fond;
            document.getElementById('player' + joueurActif + '-interface').classList.add('winner');
            // On lui retire la classe 'current-player' pour retirer ses propriétés;
            document.getElementById('player' + joueurActif + '-interface').classList.toggle('current-player');
            // On met fin à la partie.
            partieEnCours = false;
        // Si non
        }else{
            // On passe au joueur suivant
            joueurSuivant();
        }
    }
});

// Fonction permettant de passer au joueur suivant.
function joueurSuivant() {
    // Changer de joueur actif
    if(joueurActif === 0){
        joueurActif = 1;
    }else{
        joueurActif = 0;
    }

    scoreDuRound = 0;
    // Réinitialiser les scores du tour des deux joueurs
    document.getElementById('round-score-int-0').textContent = '0';
    document.getElementById('round-score-int-1').textContent = '0';

    // Changer l'apparence du joueur actif
    document.getElementById('player0-interface').classList.toggle('current-player');
    document.getElementById('player0-interface').classList.toggle('inactive');
    document.getElementById('player1-interface').classList.toggle('current-player');
    document.getElementById('player1-interface').classList.toggle('inactive');

}


// Réinitialise la partie en faisant appelle à la fonction init lors du clic sur le bouton 'Nouvelle partie'.
nouvellePartie.addEventListener('click', init);

// La fonction init sert à initialiser toutes les valeurs avant le début de la partie, et à réinitialiser les valeurs comme par exemple lorsque l'on appuie sur le bouton 'Nouvelle Partie
function init() {
    // On initialise les scores des joueurs à 0;
    scores = [0, 0];
    // On initialise les scores du tour des joueurs à 0;
    scoreDuRound = 0;
    // On dit ici que le joueur 1 commence la partie;
    joueurActif = 0;
    // Tant que cette variable a pour valeur 'true', la partie continue.
    partieEnCours = true;
    // On fait disparaître le dé;
    document.getElementById('dice').style.display = 'none';
    // On change l'affichage des scores des joueurs par 0;
    document.getElementById('player0-score').textContent = '0';
    document.getElementById('player1-score').textContent = '0';
    // On change l'affichage des scores par tours des joueurs par 0;
    document.getElementById('round-score-int-0').textContent = '0';
    document.getElementById('round-score-int-1').textContent = '0';
    // On change le noms des joueurs par 'Joueur' suivi de leurs numéros respectifs;
    document.getElementById('player0').textContent = 'Joueur 1';
    document.getElementById('player1').textContent = 'Joueur 2';

    // On retire la classe 'current-player' aux deux joueurs;
    document.getElementById('player0-interface').classList.remove('current-player');
    document.getElementById('player1-interface').classList.remove('current-player');
    // On ajoute la classe 'current-player' au joueur 1.
    document.getElementById('player0-interface').classList.add('current-player');
    document.getElementById('player1-interface').classList.add('inactive');

    document.getElementById('player0-interface').classList.remove('winner');
    document.getElementById('player1-interface').classList.remove('winner');
}

document.getElementById('game-rules').addEventListener('click', function(){
    document.getElementById('game-rules-dice-game').style.display = 'block';
});

document.getElementById('close-rules').addEventListener('click', function(){
    document.getElementById('game-rules-dice-game').style.display = 'none';
});