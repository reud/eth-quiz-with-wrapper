import { ethers } from "ethers";
export declare abstract class SignerWithProvider {
    readonly signer: ethers.Signer;
    protected constructor(signer: ethers.Signer);
}
export * from './metamask';
export * from './privatekey';
//# sourceMappingURL=index.d.ts.map