const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('calc');
const prob = document.getElementById('prob');
let erasePart = [0, 0, 0, 0];

function drawNormal() {
ctx.beginPath();
for (let x = 0; x <= canvas.width; x++) {
    const scaledX = x / (canvas.width/8) - 4;
    const y = jStat.normal.pdf(scaledX, 0, 1);
    const scaledY = canvas.height * (1 - y * 1.35) - 1.5;

    ctx.lineTo(x, scaledY);
}
ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.stroke();
}

btn.addEventListener('click', () => {
    const mean = parseFloat( document.getElementById('mean').value );
    const std = parseFloat( document.getElementById('std').value );
    const min = parseFloat( document.getElementById('min').value );
    const max = parseFloat( document.getElementById('max').value );

    if (!isNaN(mean) &&!isNaN(std) && !isNaN(min) && !isNaN(max) && (min <= max)) {
        const p = jStat.normal.cdf(max, mean, std) - jStat.normal.cdf(min, mean, std);
        prob.textContent = `P(${min} ≤ X ≤ ${max}) = ${p.toFixed(4)}`;
        marking(mean, std, min, max);
    }
    }
)

function marking(mean, std, min, max) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNormal();

    let scaledMin = (min - mean) / std;
    let minX = (scaledMin + 4) * (canvas.width/8);
    let scaledMax = (max - mean) / std;
    let maxX = (scaledMax + 4) * (canvas.width/8);

    minX = Math.min( Math.max(minX, 0), canvas.width);
    maxX = Math.min( Math.max(maxX, 0), canvas.width);
    let minY = canvas.height * (1 - jStat.normal.pdf(scaledMin, 0, 1) * 1.35);
    let maxY = canvas.height * (1 - jStat.normal.pdf(scaledMax, 0, 1) * 1.35);

    drawLine(erasePart[0], erasePart[1], 'white');
    drawLine(erasePart[2], erasePart[3], 'white');
    drawLine(minX, minY, 'blue');
    drawLine(maxX, maxY, 'blue');

    erasePart = [minX, minY, maxX, maxY];
}

function drawLine(x, y, color) {
    ctx.beginPath();
    ctx.moveTo(x, canvas.height);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

drawNormal();