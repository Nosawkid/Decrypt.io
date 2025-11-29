export const encrypt = (text, key = 1) => {
    text = text.toUpperCase();
    let res = "";

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch >= "A" && ch <= "Z") {
            const coded = ((ch.charCodeAt(0) - 65 + key) % 26) + 65;
            res += String.fromCharCode(coded);
        } else {
            res += ch;
        }
    }

    return res;
};

export const decrypt = (text, key = 1) => {
    text = text.toUpperCase();
    let res = "";
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch >= "A" && ch <= "Z") {
            const coded = ((ch.charCodeAt(0) - 65 - key + 26) % 26) + 65;
            res += String.fromCharCode(coded);
        } else {
            res += ch;
        }
    }
    return res;
}