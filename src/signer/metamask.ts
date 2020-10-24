import {SignerWithProvider} from "./index";
import {ethers} from "ethers";

class MetaMaskSwP extends SignerWithProvider {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider.getSigner());
    }
}

export const newMetaMaskSwP = (): SignerWithProvider => {
    // @ts-ignore
    await window.ethereum.enable();
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new MetaMaskSwP(provider);
};