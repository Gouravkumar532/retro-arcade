const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Size of one square
let score = 0;

// 1. Define the Snake (an array of coordinates)
let snake = [{ x: 9 * box, y: 10 * box }];

// 2. Define the Food
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let d; // Direction

// 3. Listen for key presses
document.addEventListener("keydown", direction);
function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

// 4. The Draw Loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#00ffcc" : "white"; // Head is green, body is white
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move head based on direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // 5. Check if snake eats food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop(); // Remove the tail
    }

    let newHead = { x: snakeX, y: snakeY };

    // 6. Game Over Rules
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("GAME OVER! Score: " + score);
        location.reload(); // Restart
    }

    snake.unshift(newHead); // Add new head
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

let game = setInterval(draw, 100); // Run every 100ms