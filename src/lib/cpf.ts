export function formatCpf(cpf: string) {
    return cpf
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        .replace(/^(^|(?:\d{3}\.))(\d{3})(\d)/, "$1$2.$3")
        .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2")
        .replace(/[-\.]$/, "");
}

export function validateCpf(cpf: string) {
    if(!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        return false;
    }
    let split = cpf.split("-");
    let mainDigits = split[0].replaceAll(".", "").split("").map(s => parseInt(s));
    let verifierDigits = split[1].split("").map(s => parseInt(s));
    let verifyDigit1 = 0;
    for(let i = 0 ; i < mainDigits.length; ++i) {
        verifyDigit1 += mainDigits[i]*(10-i);
    }
    let mod = verifyDigit1 % 11;
    verifyDigit1 = mod < 2 ? 0 : 11 - mod;
    if(verifyDigit1 !== verifierDigits[0]) {
        return false;
    }
    mainDigits.push(verifyDigit1);
    let verifyDigit2 = 0;
    for(let i = 0; i < mainDigits.length; ++i) {
        verifyDigit2 += mainDigits[i]*(11-i);
    }
    mod = verifyDigit2 % 11;
    verifyDigit2 = mod < 2 ? 0 : 11 - mod;
    if(verifyDigit2 !== verifierDigits[1]) {
        return false;
    }
    return true;
}

export function randomCpf() {
    let digits = Array.from({length: 9}, () => Math.floor(Math.random() * 10));
    let verifyDigit1 = 0;
    for(let i = 0 ; i < digits.length; ++i) {
        verifyDigit1 += digits[i]*(10-i);
    }
    let mod = verifyDigit1 % 11;
    verifyDigit1 = mod < 2 ? 0 : 11 - mod;
    digits.push(verifyDigit1);
    let verifyDigit2 = 0;
    for(let i = 0; i < digits.length; ++i) {
        verifyDigit2 += digits[i]*(11-i);
    }
    mod = verifyDigit2 % 11;
    verifyDigit2 = mod < 2 ? 0 : 11 - mod;
    digits.push(verifyDigit2);
    return digits.join("");
}