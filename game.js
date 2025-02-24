const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
});








var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var width = window.innerWidth * 0.9;
var height = window.innerHeight * 0.9;
canvas.width = width;
canvas.height = height;

// Largeur de référence pour la vitesse des obstacles
var referenceWidth = 1000;
var baseObstacleSpeed = 3.5; // Vitesse des obstacles à la largeur de référence

// Calculer la vitesse des obstacles en fonction de la largeur du canevas (inversé)
var obstacleSpeed = baseObstacleSpeed * (width / referenceWidth);

var x = 50;
var y = height / 2 - 30;
var velocity = 0;
var gravity = 0.08;
var obstacleX = width;
var obstacleY = 0;
var obstacleWidth = 150;
var obstacleHeight = Math.random() * (height - 250) + 50;
var gap = 250;
var score = 0;
var isGameOver = false;
var isCountingDown = false;
var countdownSeconds = 3;
var gigachadImage = new Image();

gigachadImage.src = "https://cdn.icon-icons.com/icons2/1632/PNG/512/63013moai_109367.png";

// Initialiser le jeu
function initializeGame() {
    document.addEventListener("click", handleGameClick);
    resetGame();
    drawMenu();
}

// Gérer les clics du jeu
function handleGameClick() {
    if (isGameOver && !isCountingDown) {
        resetGame();
    } else if (!isCountingDown) {
        velocity = -4;
    }
}

// Compte à rebours
function countdown() {
    isCountingDown = true;
    draw();

    var countdownInterval = setInterval(function() {
        countdownSeconds--;

        if (countdownSeconds === 0) {
            clearInterval(countdownInterval);
            isCountingDown = false;
            draw();
            requestAnimationFrame(draw);
        } else {
            draw();
        }
    }, 1000);
}

// Réinitialiser le jeu après game over
function resetGame() {
    x = 50;
    y = height / 2 - 30;
    obstacleX = width;
    velocity = 0;
    score = 0;
    isGameOver = false;
    countdownSeconds = 3;
    obstacleHeight = Math.random() * (height - 250) + 50;

    // Recalculer la vitesse des obstacles lors du reset
    obstacleSpeed = baseObstacleSpeed * (width / referenceWidth);

    countdown();
}

// Dessiner le menu
function drawMenu() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#FFF"; // Texte en blanc
    context.font = "2.5rem 'Archivo Black', sans-serif"; // Style de texte
    context.textAlign = "center";
    context.fillText("Flappy Chad", width / 2, height / 2 - 54);
}

// Dessiner le jeu
function draw() {
    // Effacer le canevas
    context.clearRect(0, 0, width, height);

    if (isCountingDown) {
        // Afficher le compte à rebours
        context.fillStyle = "#FFF"; // Texte en blanc
        context.font = "2.5rem 'Archivo Black', sans-serif"; // Style de texte
        context.textAlign = "center";
        context.fillText(countdownSeconds, width / 2, height / 2);
    } else {
        // Dessiner le Gigachad
        context.save();
        context.scale(-1, 1); // Inverser horizontalement
        context.drawImage(gigachadImage, -x - 60, y, 60, 60);
        context.restore();

        // Dessiner les obstacles avec le style demandé
        context.fillStyle = "rgba(200, 200, 255, 0.1)";
        context.strokeStyle = "rgba(200, 200, 255, 0.2)";
        context.lineWidth = 2;
        context.beginPath();
        context.roundRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight, 20);
        context.fill();
        context.stroke();
        context.beginPath();
        context.roundRect(obstacleX, obstacleY + obstacleHeight + gap, obstacleWidth, height - obstacleHeight - gap, 20);
        context.fill();
        context.stroke();

        // Dessiner le score en bas au centre avec une marge inférieure
        context.fillStyle = "#FFF"; // Texte en blanc
        context.font = "2rem 'Archivo Black', sans-serif"; // Taille du texte réduite à 2rem
        context.textAlign = "center";
        context.fillText("Score: " + score, width / 2, height - 20); // Déplacer le score en bas avec une marge

    }

    if (isGameOver) {
        // Afficher l'écran de Game Over
        context.fillStyle = "#FFF"; // Texte en blanc
        context.font = "2.5rem 'Archivo Black', sans-serif"; // Style de texte
        context.textAlign = "center";
        context.fillText("Game Over", width / 2, height / 2 - 36);
        context.font = "2rem 'Archivo Black', sans-serif";
        context.fillText("Click to Continue", width / 2, height / 2 + 14);
    }

    if (!isGameOver && !isCountingDown) {
        // Mettre à jour la position du Gigachad
        velocity += gravity;
        y += velocity;

        // Mettre à jour la position des obstacles
        obstacleX -= obstacleSpeed;

        // Augmenter la vitesse des obstacles en fonction du score
        var speedIncreaseFactor = 0.02; // Facteur d'augmentation de la vitesse en fonction du score
        obstacleSpeed = baseObstacleSpeed * (width / referenceWidth) + speedIncreaseFactor * score;

        // Vérifier les collisions
        if (y + 60 > height || y < 0 || (x + 60 > obstacleX && x < obstacleX + obstacleWidth && (y < obstacleY + obstacleHeight || y + 60 > obstacleY + obstacleHeight + gap))) {
            isGameOver = true;
            obstacleX = -obstacleWidth; // Effacer les obstacles lors d'une collision
        }

        // Passer l'obstacle et augmenter le score
        if (obstacleX + obstacleWidth < x) {
            score++;
            obstacleX = width;
            obstacleHeight = Math.random() * (height - 250) + 50;
        }

        requestAnimationFrame(draw);
    }
}

// Démarrer le jeu lors du chargement de la page
window.onload = initializeGame;