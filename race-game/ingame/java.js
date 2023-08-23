let score = 0;
let previousCarPosition = 0;
const scoreDisplay = document.querySelector('.Score');
// Get references to the car element and the container
const car = document.querySelector('.car');
const container = document.querySelector('.max-area');

// Set initial car position
let carHorizontalPosition = 50; // 50% - centered
let carVerticalPosition = 0; // Start lower on the screen

// Calculate the maximum and minimum positions for the car
const maxHorizontalCarPosition = 96 - (car.offsetWidth / container.offsetWidth) * 100;
const minCarPosition = 0;
const maxVerticalCarPosition = 96 - (car.offsetHeight / container.offsetHeight) * 100;
const minVerticalCarPosition = 0;

// Track the state of arrow keys
let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;

// Set the car's position
function setCarPosition() {
    car.style.left = carHorizontalPosition + '%';
    car.style.bottom = carVerticalPosition + '%';
}

// Handle keydown and keyup events for arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = true;
    } else if (event.key === 'ArrowRight') {
        rightKey = true;
    } else if (event.key === 'ArrowUp') {
        upKey = true;
    } else if (event.key === 'ArrowDown') {
        downKey = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = false;
    } else if (event.key === 'ArrowRight') {
        rightKey = false;
    } else if (event.key === 'ArrowUp') {
        upKey = false;
    } else if (event.key === 'ArrowDown') {
        downKey = false;
    }
});

let lastPosition = 0;
let isMovingForward = true;

function updateScore(currentCarPosition) {
    const distanceTraveled = currentCarPosition - lastPosition;

    if (distanceTraveled > 0 && isMovingForward) {
        const scoreIncrease = distanceTraveled * 0.5; // Adjust this factor as needed
        score += scoreIncrease;
    }

    lastPosition = currentCarPosition;

    scoreDisplay.textContent = `Score: ${Math.floor(score)}`;
}



  function setCarPosition() {
    car.style.left = carHorizontalPosition + '%';
    car.style.bottom = carVerticalPosition + '%';
}

// Update car position based on arrow key state
function updateCarPosition() {
    if (leftKey) {
        carHorizontalPosition -= 0.3;
        if (carHorizontalPosition < minCarPosition) {
            carHorizontalPosition = minCarPosition;
        }
    }
    if (rightKey) {
        carHorizontalPosition += 0.3;
        if (carHorizontalPosition > maxHorizontalCarPosition) {
            carHorizontalPosition = maxHorizontalCarPosition;
        }
    }
    if (upKey) {
        carVerticalPosition += 0.3;
        if (carVerticalPosition > maxVerticalCarPosition) {
            carVerticalPosition = maxVerticalCarPosition;
        }
        if (upKey || downKey) {
            isMovingForward = upKey; // Set isMovingForward to true when moving up
        } else {
            isMovingForward = false;
        }
    }
    if (downKey) {
        carVerticalPosition -= 0.3;
        if (carVerticalPosition < minVerticalCarPosition) {
            carVerticalPosition = minVerticalCarPosition;
        }
    }
    setCarPosition();
}
function getCurrentCarPosition() {
    const carStyle = getComputedStyle(car);
    return parseFloat(carStyle.bottom);
}

// Update car position on each frame
function animate() {
    updateCarPosition();
    const currentCarPosition = getCurrentCarPosition();
    updateScore(currentCarPosition);
    requestAnimationFrame(animate);
}

// Initial car position setup
setCarPosition();
animate();


function moveRoadLines() {
    const roadLines = document.querySelectorAll('.leftline,.l-line,.le-line,.left-last-line,.rightline,.r-line,.re-line,.right-last-line');
    const speed = 0.2;
  
    let offset = 1;
  
    roadLines.forEach(roadLine => {
      let topPosition = parseFloat(getComputedStyle(roadLine).top);
      topPosition += speed + offset;
  
      if (topPosition > window.innerHeight) {
        topPosition -= window.innerHeight + 20;
        offset += 0;
      }
  
      roadLine.style.top = `${topPosition}px`;
    });
  
    requestAnimationFrame(moveRoadLines);
  }
  
  moveRoadLines();



  
function moveMidRoadLines() {
    const roadLines = document.querySelectorAll('.lineone,.line-one,.line-one2,.line-one3,.linetwo,.line-two,.line-two2,.line-two3');
    const speed = 0.2;
  
    let offset = 1;
  
    roadLines.forEach(roadLine => {
      let topPosition = parseFloat(getComputedStyle(roadLine).top);
      topPosition += speed + offset;
  
      if (topPosition > window.innerHeight) {
        topPosition -= window.innerHeight + 20;
        offset -= 0;
      }
  
      roadLine.style.top = `${topPosition}px`;
    });
  
    requestAnimationFrame(moveMidRoadLines);
  }
  
  moveMidRoadLines();
  

  
  function moveMidRoadLines2() {
    const roadLines = document.querySelectorAll('.linethree,.line-three,.line-three2,.line-three3');
    const speed = 0.2;
  
    let offset = 1;
  
    roadLines.forEach(roadLine => {
      let topPosition = parseFloat(getComputedStyle(roadLine).top);
      topPosition += speed + offset;
  
      if (topPosition > window.innerHeight) {
        topPosition -= window.innerHeight + 20;
        offset -= 0;
      }
  
      roadLine.style.top = `${topPosition}px`;
    });
  
    requestAnimationFrame(moveMidRoadLines2);
  }
  
moveMidRoadLines2();
  



  const carImages = [
    '../gamepics/car1.png',
    '../gamepics/car3.png',
    '../gamepics/car4.png'
    // Add more image paths as needed
];


let fuelPercentage = 100;
let highestScore = 0;


    // Function to decrease the fuel and update the display
    function decreaseFuel() {
        if (fuelPercentage > 0) {
            fuelPercentage -= 5; // Decrease fuel percentage by 5
            updateFuelDisplay();
        } else {
            endGame();
        }
    }

    // Function to end the game
    function endGame() {
        if (score > highestScore) {
            highestScore = score; // Update highest score if needed
        }
        showGameOverButtons();
    }

    // Function to update the fuel display
    function updateFuelDisplay() {
        const fuelBar = document.getElementById('fuel-bar');
        fuelBar.textContent = `Fuel: ${fuelPercentage}%`;
        // You might want to add more visual updates to the fuel bar styling here
    }

    // Function to update the score display
    function updateScoreDisplay() {
        const scoreDisplay = document.querySelector('.Highest-Score');
        scoreDisplay.textContent = `Highest Score: ${parseInt(highestScore)}`;
    }

    // Call decreaseFuel() every 5 seconds
    setInterval(decreaseFuel, 1000);


    function startNewGame() {
        fuelPercentage = 100;
        score = 0; // Reset the score
        updateFuelDisplay();
        updateScoreDisplay();
        hideGameOverButtons();
    }

    // Function to go back to the menu
    function goToMenu() {
        // Add your logic to navigate to the menu page
            window.location.href = '../menugame/menu.html';
    }
    function showGameOverButtons() {
        const gameOverButtons = document.querySelector('.game-over-buttons');
        gameOverButtons.style.display = 'block';
    }

    // Function to hide game over buttons
    function hideGameOverButtons() {
        const gameOverButtons = document.querySelector('.game-over-buttons');
        gameOverButtons.style.display = 'none';
    }

    // Call decreaseFuel() every 5 seconds
    setInterval(decreaseFuel, 1000)