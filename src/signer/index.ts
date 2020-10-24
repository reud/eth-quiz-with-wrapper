import {ethers} from "ethers";

export abstract class SignerWithProvider {
    readonly signer: ethers.Signer;
    protected constructor(signer: ethers.Signer) {
        // Providerを持つことを強制させる。
        if(!signer.provider) {
            throw new Error("The signer given to the argument does not have a provider.")
        }
        this.signer = signer;
    }
}



