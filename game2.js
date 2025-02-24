const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
});








document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let screenWidth = canvas.width;
    let screenHeight = canvas.height;
    const playerWidth = 60;
    const playerHeight = 60;
    const playerElevation = 5;
    const gemSize = 40;

    let playerX = (screenWidth - playerWidth) / 2;
    let score = 0;
    let lives = 3;
    let isPaused = false;
    let isGameOver = false;

    let showDamageEffect = false; // Nouvelle variable pour l'effet de transition
    let damageEffectStartTime = 0;

    const playerImage = new Image();
    playerImage.src = "https://cdn.icon-icons.com/icons2/1632/PNG/512/63013moai_109367.png";

    const blueGemImage = new Image();
    blueGemImage.src = "https://cdn-icons-png.flaticon.com/512/1414/1414344.png";

    const redGemImage = new Image();
    redGemImage.src = "https://static.vecteezy.com/system/resources/previews/010/252/103/original/cute-cartoon-hamburger-file-free-png.png";
    
    let gemInterval;
    let time = 1000;
    let gems = [];

    function drawPlayer() {
        ctx.drawImage(playerImage, playerX, screenHeight - playerHeight - playerElevation, playerWidth, playerHeight);
    }

    function drawGem(gem) {
        const gemImage = gem.type === "blue" ? blueGemImage : redGemImage;
        ctx.drawImage(gemImage, gem.x - gemSize / 2, gem.y - gemSize / 2, gemSize, gemSize);
    }

    function movePlayer(event) {
        const rect = canvas.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        playerX = clientX - rect.left - playerWidth / 2;
    }

    function collisionDetection() {
        gems = gems.filter(gem => {
            if (gem.y + gemSize / 2 > screenHeight - playerHeight / 2) {
                const collisionX = gem.x > playerX && gem.x < playerX + playerWidth;
                if (collisionX) {
                    if (gem.type === "blue") score++;
                    else {
                        lives--;
                        showDamageEffect = true; // Activer l'effet de transition
                        damageEffectStartTime = Date.now(); // Enregistrer l'heure de début
                    }
                } else if (gem.type === "blue") {
                    lives--;
                    showDamageEffect = true;
                    damageEffectStartTime = Date.now();
                }
                return false;
            }
            return true;
        });
    }

    function moveGems() {
        const speed = 2 + 0.1 * score;
        gems.forEach(gem => {
            gem.y += speed;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, screenWidth, screenHeight);

        if (showDamageEffect) {
            const elapsed = Date.now() - damageEffectStartTime;
            const transitionDuration = 1000; // Durée totale de la transition en ms
            const fadeDuration = 500; // Durée du fondu en ms
            const alpha = Math.max(0, Math.min((elapsed / fadeDuration), 1));
            const effectColor = `rgba(255,0,0,${0.3 * (1 - alpha)})`;
            
            ctx.fillStyle = effectColor;
            ctx.fillRect(0, 0, screenWidth, screenHeight);

            if (elapsed >= transitionDuration) {
                showDamageEffect = false; // Désactiver l'effet après la transition complète
            }
        }

        drawPlayer();
        gems.forEach(drawGem);

        const fixedFontSize = "16px"; // Taille fixe et plus petite pour les compteurs
        ctx.fillStyle = "#fff";
        ctx.font = `${fixedFontSize} 'Archivo Black', sans-serif`;
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 10, screenHeight - 50);
        ctx.fillText(`Lives: ${lives}`, screenWidth - 160, screenHeight - 50);
        ctx.fillText(`Speed: ${1000 - time}`, 10, screenHeight - 20);

        if (lives <= 0) {
            ctx.clearRect(0, 0, screenWidth, screenHeight);
            isGameOver = true;
            ctx.fillStyle = "#fff"; // Texte en blanc pour Game Over et Restart
            ctx.font = `${screenWidth / 50 + 35}px 'Archivo Black', sans-serif`;
            ctx.textAlign = "center";
            ctx.fillText("Game Over", screenWidth / 2, screenHeight / 2);
            ctx.font = `${screenWidth / 90 + 20}px 'Archivo Black', sans-serif`;
            ctx.fillText("Click to restart", screenWidth / 2, screenHeight / 2 + 40);
            ctx.fillText(`Score: ${score}`, screenWidth / 2, screenHeight / 2 + 80);
        } else if (!isPaused) {
            collisionDetection();
            moveGems();
            requestAnimationFrame(draw);
        } else {
            ctx.fillStyle = "#fff"; 
            ctx.font = `${screenWidth / 35 * 1.5}px 'Archivo Black', sans-serif`;
            ctx.textAlign = "center";
            ctx.fillText("Game Paused", screenWidth / 2, screenHeight / 2);
        }
    }

    function createGem() {
        const gemTypes = ["blue", "red"];
        const gemType = gemTypes[Math.floor(Math.random() * gemTypes.length)];

        gems.push({
            x: Math.random() * (screenWidth - gemSize) + gemSize / 2,
            y: 0,
            type: gemType
        });

        time = Math.max(1000 - score * 10, 50);
        clearInterval(gemInterval);
        gemInterval = setInterval(createGem, time);
    }

    function startGame() {
        canvas.addEventListener("touchmove", movePlayer, false);
        canvas.addEventListener("mousemove", movePlayer, false);

        gemInterval = setInterval(createGem, time);
        isGameOver = false;
        score = 0;
        lives = 3;
        gems = [];
        draw();
    }

    function resizeCanvas() {
        screenWidth = window.innerWidth * 0.9;
        screenHeight = window.innerHeight * 0.9;

        canvas.width = screenWidth;
        canvas.height = screenHeight;

        playerX = (screenWidth - playerWidth) / 2;
    }

    function resetGame() {
        if (isGameOver) {
            startGame();
        }
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        draw();
    });

    canvas.addEventListener("click", resetGame);

    resizeCanvas();
    startGame();
});
