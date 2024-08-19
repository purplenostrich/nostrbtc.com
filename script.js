document.addEventListener('DOMContentLoaded', (event) => {
    const nostrText = document.querySelector('.nostrText');


    nostrText.addEventListener('animationend', (e) => {
        if (e.animationName === 'typing') {
            nostrText.style.borderRight = 'none'; 
            nostrText.classList.add('blink'); 
        }
    });
});


document.styleSheets[0].insertRule(`
    .blink::after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 1em;
        background-color: #FF00FF;
        margin-left: 5px;
        vertical-align: middle;
        animation: blink-cursor 0.7s steps(2) infinite;
    }
`, document.styleSheets[0].cssRules.length);

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#8A2BE2';  
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   
    const columns = canvas.width / fontSize;
    drops.length = 0;
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
});
