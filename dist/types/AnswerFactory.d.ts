import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Answer } from "./Answer";
export declare class AnswerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_t: BigNumberish, _y: BigNumberish, _p: BigNumberish, _q: BigNumberish, _h: BigNumberish, overrides?: Overrides): Promise<Answer>;
    getDeployTransaction(_t: BigNumberish, _y: BigNumberish, _p: BigNumberish, _q: BigNumberish, _h: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): Answer;
    connect(signer: Signer): AnswerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Answer;
}
//# sourceMappingURL=AnswerFactory.d.ts.map