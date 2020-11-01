import { createHash } from "crypto";

export const modHash = (str: string, mod: number) => {
    const sha256 = createHash('sha256').update(str).digest('hex');
    return Number(BigInt(`0x${sha256}`) % BigInt(mod));
};

export const hash = (str: string) => {
    const sha256 = createHash('sha256').update(str).digest('hex');
    return BigInt(`0x${sha256}`);
};

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
};
export const repeatSquaring = (a: number, n: number, mod: number): number => {
    if (n === 0) {
        return 1;
    }
    if (n % 2 === 0) {
        const t = repeatSquaring(a, n / 2, mod);
        return (t * t) % mod;
    }
    return (a * repeatSquaring(a, n - 1, mod)) % mod;
};