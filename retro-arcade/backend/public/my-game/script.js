const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 200;
let y = 200;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simple player square
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(x, y, 30, 30);

    ctx.fillStyle = 'white';
    ctx.fillText("Move with Arrow Keys!", 10, 20);

    requestAnimationFrame(draw);
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') y -= 10;
    if (e.key === 'ArrowDown') y += 10;
    if (e.key === 'ArrowLeft') x -= 10;
    if (e.key === 'ArrowRight') x += 10;
});

draw();
