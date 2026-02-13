const btn = document.querySelector('button');
const B = document.getElementById('B');
const mu = document.getElementById('mu');
const sigma = document.getElementById('sigma');
const prob = document.getElementById('prob');
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


btn.addEventListener('click', () => {
    const n = Number( document.getElementById('n').value );
    const p = Number( document.getElementById('p').value );
    let k = Number( document.getElementById('k').value );

    let calc = true;

    if (n%1 != 0  || n>10000 || n<0) {
        document.getElementById('n').value = '';
        calc = false;
    }
    if (!(0<=p && p<=1)) {
        document.getElementById('p').value = '';
        calc = false;
    }
    if (k%1 != 0 || k<0 || k>n) {
        document.getElementById('k').value = '';
        k = 'k';
    }
    else if (k == 0) {
        document.getElementById('k').value = '0';
    }

    if (calc) {
        B.textContent = `B(${n}, ${p})`;
        mu.textContent = `μ ≈ ${Math.round(1000*n*p)/1000}`;
        sigma.textContent = `σ ≈ ${Math.round(1000*Math.sqrt(n*p*(1-p)))/1000}`;
        if (isFinite(k)) {
            prob.textContent = `P(X=${k}) ≈ ${Math.round(1000*probab(n,p,k))/1000}`
        }
        else {
            prob.textContent = `P(X=k) ≈ ${n}Ck*(${p}^k)*(${1-p})^(${n}-k)`
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(n,p,k);
    }

}
)

function probab(n,p,k) {
    let result = (p**k)*((1-p)**(n-k));
    let num = Math.min(k, n-k);

    for (let i=1; i<=num; i++) {
        result *= (n-i+1)/i;
    }

    return result;
}

function draw(n,p,k) {
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    let maxCase = 0;

    for (let i=0; i<=n; i++) {
        if (probab(n,p,i) > probab(n,p,maxCase)) {
            maxCase = i
        }
    }

    /*ctx.scale(1, canvas.height/probab(n,p,maxCase));*/
    
    for(let i=0; i<=n; i++) {
        ctx.beginPath();
        ctx.moveTo(i*canvas.width/n, canvas.height);
        ctx.lineTo(i*canvas.width/n, canvas.height*(1 - probab(n,p,i)));

        if (i == k) {
            ctx.strokeStyle = 'white';
        }
        else if (i == maxCase) {
            ctx.strokeStyle = 'blue';
        }
        else {
            ctx.strokeStyle = 'black';
        }
        ctx.stroke();
    }
}