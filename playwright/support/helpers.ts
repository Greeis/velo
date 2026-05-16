export function generateCode() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alfanumerico = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const parte1 = Array.from({ length: 3 }, () =>
        letras.charAt(Math.floor(Math.random() * letras.length))
    ).join('');

    const parte2 = Array.from({ length: 6 }, () =>
        alfanumerico.charAt(Math.floor(Math.random() * alfanumerico.length))
    ).join('');

    return `VLO-${parte1}${parte2}`;
}