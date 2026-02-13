const btn = document.querySelector("button");
const para = document.querySelector("p");

function permu(num1, num2) {
    var result = 1;
    if (num1 < num2) { result = ':(' }
    else {
        for (i = num1; i > num1 - num2; i--) {
            result *= i
            if (result >= 10**21) {
                result = null
                break
            }
        }
    }
    return result;
}

function combi(num1, num2) {
    var result = 1;
    if (num1 < num2) { result = ':(' }
    else {
        num2 = Math.min(num2, num1 - num2)
        for (i = 0; i < num2; i++) {
            result *= (num1 - i) / (num2 - i)
            if (result >= 10**21) {
                result = null
                break
            }
        }
    }
    return result;
}

function permu_rep(num1, num2) {
    var result = num1 ** num2;
    if (result >= 10 ** 21) {
        result = null;
    }
    return result;
}

function combi_rep(num1, num2) {
    return combi(num1 + num2 - 1, num2);
}

btn.addEventListener("click", () => {
    var num1 = Math.floor( Math.abs( Number(document.getElementById("num1").value)));
    var num2 = Math.floor( Math.abs( Number(document.getElementById("num2").value)));
    const oper = document.getElementById("operator").value;
    var output;

    if (isNaN(num1) || isNaN(num2)) {
        para.textContent = ':('
        document.getElementById("num1").textContent = ''
        document.getElementById("num2").textContent = ''
    }
    else {
        switch (oper) {
            case 'P': output = Math.round(permu(num1, num2));
                break;
            case 'C': output = Math.round(combi(num1, num2));
                break;
            case 'Π': output = Math.round(permu_rep(num1, num2));
                break;
            case 'H': output = Math.round(combi_rep(num1, num2));
                break;
        }

        if (output === 0) {
                output = "too big (over 10^20) :("
        }

        para.textContent = num1 + oper + num2 + ' = ' + output
    }
}
)