document.addEventListener('DOMContentLoaded', (event) => {
    const nostrText = document.querySelector('.nostrText');
    nostrText.textContent = 'find me on nostr';

    nostrText.addEventListener('animationend', (e) => {
        if (e.animationName === 'typing') {
            nostrText.style.borderRight = 'none'; 
            nostrText.classList.add('blink'); 
        }
    });

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
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
    `, styleSheet.cssRules.length);

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setCanvasSize();

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#8A2BE2';  
        ctx.font = `${fontSize}px monospace`;

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
        setCanvasSize();
        const columns = Math.floor(canvas.width / fontSize);
        drops.length = columns;
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    });
});
