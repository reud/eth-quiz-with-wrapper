import {SignerWithProvider} from "./index";
import {ethers} from "ethers";


class PrivateKeySwP extends SignerWithProvider {
    constructor(privateKey: string,provider: ethers.providers.Provider) {
        const wallet = new ethers.Wallet(privateKey,provider);
        super(wallet);
    }
}

export const newPrivateKeySwP = (privateKey: string,provider: ethers.providers.Provider): SignerWithProvider => {
    return new PrivateKeySwP(privateKey,provider);
};