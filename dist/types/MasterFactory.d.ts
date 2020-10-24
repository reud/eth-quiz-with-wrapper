import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Master } from "./Master";
export declare class MasterFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_p: BigNumberish, _q: BigNumberish, overrides?: Overrides): Promise<Master>;
    getDeployTransaction(_p: BigNumberish, _q: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): Master;
    connect(signer: Signer): MasterFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Master;
}
//# sourceMappingURL=MasterFactory.d.ts.map