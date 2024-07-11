const gameContainer = document.getElementById('gameContainer');
const background1 = document.createElement('div');
const background2 = document.createElement('div');
background1.className = 'background';
background2.className = 'background second';
gameContainer.appendChild(background1);
gameContainer.appendChild(background2);

const character = document.getElementById('character');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScore');
const currentTimeDisplay = document.getElementById('currentTime');
const backgroundMusic = document.getElementById('backgroundMusic');
const gameOverMusic = document.getElementById('gameOverMusic');
const jumpSound = document.getElementById('jumpSound');
const secondJumpSound = document.getElementById('secondJumpSound');
const gameOverSound = document.getElementById('gameOverSound');

let characterX = 300;
let characterY = 60;
let isJumping = false;
let jumpVelocity = 0;
let jumpCount = 0;
const maxJumps = 2;
const gravity = 0.3;
const jumpPower = 8;
let score = 0;
let gameRunning = false;
let animationFrameId;
let obstacleSpeed = 1;
let obstacleSpawnInterval = 4000;
let startTime = 0;
let elapsedTime = 0;

const runningFrames = ['./images/run1.png', './images/run2.png', './images/run3.png', './images/run4.png'];
const jumpingFrames = ['./images/jump1.png', './images/jump2.png'];

let runningFrameIndex = 0;
let runningFrameTimer = 0;
const runningFrameDelay = 10;

jumpSound.volume = 0.5;
secondJumpSound.volume = 0.5;
gameOverSound.volume = 0.5;

character.style.left = characterX + 'px';
character.style.bottom = characterY + 'px';

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

muteButton.addEventListener('click', () => {
    const isMuted = !backgroundMusic.muted;
    backgroundMusic.muted = isMuted;
    gameOverMusic.muted = isMuted;
    jumpSound.muted = isMuted;
    secondJumpSound.muted = isMuted;
    gameOverSound.muted = isMuted;
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
});

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    backgroundMusic.volume = volume;
    gameOverMusic.volume = volume;
    jumpSound.volume = volume * 0.5;
    secondJumpSound.volume = volume * 0.5;
    gameOverSound.volume = volume * 0.5;
});

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'd', 'a', 'w', ' '].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowRight' || e.key === 'd') {
            characterX += 20;
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            characterX -= 20;
        }

        if ((e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') && jumpCount < maxJumps) {
            isJumping = true;
            jumpVelocity = jumpPower;
            jumpCount++;
            character.style.backgroundImage = `url(${jumpingFrames[jumpCount - 1]})`;

            if (jumpCount === 1) {
                jumpSound.play();
            } else if (jumpCount === 2) {
                secondJumpSound.play();
            }
        }
        character.style.left = characterX + 'px';
    }
});

function startGame() {
    resetGame();
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameRunning = true;
    background1.style.animationPlayState = 'running';
    background2.style.animationPlayState = 'running';
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play().then(() => {
        console.log('Background music started.');
    }).catch((error) => {
        console.log('Error playing background music:', error);
    });
    startTime = Date.now();
    updateTimer();
    spawnObstacles();
    gameLoop();
}

function restartGame() {
    resetGame();
    gameOverScreen.style.display = 'none';
    gameRunning = true;
    background1.style.animationPlayState = 'running';
    background2.style.animationPlayState = 'running';
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play().then(() => {
        console.log('Background music started.');
    }).catch((error) => {
        console.log('Error playing background music:', error);
    });
    startTime = Date.now();
    updateTimer();
    spawnObstacles();
    gameLoop();
}

function resetGame() {
    console.log('Resetting game...');
    characterX = 300;
    characterY = 60;
    isJumping = false;
    jumpVelocity = 0;
    jumpCount = 0;
    score = 0;
    character.style.left = characterX + 'px';
    character.style.bottom = characterY + 'px';
    character.style.backgroundImage = `url(${runningFrames[0]})`;
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    console.log('Game reset complete.');
}

function gameOver() {
    console.log('Game over.');
    gameRunning = false;
    elapsedTime = (Date.now() - startTime) / 1000;
    finalScore.textContent = elapsedTime.toFixed(2) + ' seconds';

    const highScore = localStorage.getItem('highScore');
    if (!highScore || elapsedTime > parseFloat(highScore)) {
        localStorage.setItem('highScore', elapsedTime);
    }
    highScoreDisplay.textContent = localStorage.getItem('highScore') + ' seconds';

    gameOverScreen.style.display = 'flex';
    background1.style.animationPlayState = 'paused';
    background2.style.animationPlayState = 'paused';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameOverMusic.currentTime = 0;
    gameOverMusic.play().then(() => {
        console.log('Game over music started.');
    }).catch((error) => {
        console.log('Error playing game over music:', error);
    });
    gameOverSound.play();
}

function gameLoop() {
    if (!gameRunning) return;

    if (isJumping) {
        characterY += jumpVelocity;
        jumpVelocity -= gravity;

        if (characterY <= 60) {
            characterY = 60;
            isJumping = false;
            jumpVelocity = 0;
            jumpCount = 0;
            character.style.backgroundImage = `url(${runningFrames[0]})`;
        }
    } else {
        runningFrameTimer++;
        if (runningFrameTimer >= runningFrameDelay) {
            runningFrameIndex = (runningFrameIndex + 1) % runningFrames.length;
            character.style.backgroundImage = `url(${runningFrames[runningFrameIndex]})`;
            runningFrameTimer = 0;
        }
    }

    character.style.left = characterX + 'px';
    character.style.bottom = characterY + 'px';

    const characterRect = character.getBoundingClientRect();
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.querySelector('.obstacleHitbox').getBoundingClientRect();
        if (characterRect.left < obstacleRect.left + obstacleRect.width &&
            characterRect.left + characterRect.width > obstacleRect.left &&
            characterRect.top < obstacleRect.top + obstacleRect.height &&
            characterRect.top + characterRect.height > obstacleRect.top) {
            gameOver();
            return;
        }
    });

    animationFrameId = requestAnimationFrame(gameLoop);
}

function updateTimer() {
    if (gameRunning) {
        elapsedTime = (Date.now() - startTime) / 1000;
        currentTimeDisplay.textContent = 'Time: ' + elapsedTime.toFixed(2) + ' seconds';
        requestAnimationFrame(updateTimer);
    }
}

function spawnObstacles() {
    if (!gameRunning) return;

    const obstacleTypes = ['rock', 'troll', 'mushroom'];
    const randomObstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const obstacle = document.createElement('div');
    obstacle.className = `obstacle ${randomObstacle}`;
    obstacle.style.left = '800px';
    obstacle.style.backgroundImage = `url(./images/${randomObstacle}.png)`;
    obstacle.style.position = 'absolute';
    obstacle.style.bottom = randomObstacle === 'troll' ? '60px' : '40px';
    obstacle.style.width = randomObstacle === 'troll' ? '100px' : '50px';
    obstacle.style.height = randomObstacle === 'troll' ? '70px' : '50px';

    const hitbox = document.createElement('div');
    hitbox.className = 'obstacleHitbox';
    hitbox.style.position = 'absolute';
    hitbox.style.bottom = '0';
    hitbox.style.left = '20%';
    hitbox.style.width = '20%';
    hitbox.style.height = '90%';

    obstacle.appendChild(hitbox);
    gameContainer.appendChild(obstacle);

    const moveObstacle = () => {
        if (!gameRunning) {
            obstacle.remove();
            return;
        }

        let obstacleX = parseInt(obstacle.style.left, 10);
        obstacleX -= obstacleSpeed;
        if (obstacleX < -50) {
            obstacle.remove();
        } else {
            obstacle.style.left = `${obstacleX}px`;
            requestAnimationFrame(moveObstacle);
        }
    };

    requestAnimationFrame(moveObstacle);

    setTimeout(spawnObstacles, obstacleSpawnInterval);

    // Increase difficulty over time (every 3 minutes)
    setTimeout(() => {
        obstacleSpeed += 0.1;
        if (obstacleSpawnInterval > 500) {
            obstacleSpawnInterval -= 50;
        }
    }, 180000);
}
