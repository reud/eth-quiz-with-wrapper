import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Problem } from "./Problem";
export declare class ProblemFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_problem_statement_hash: BigNumberish, _y: BigNumberish, _p: BigNumberish, _q: BigNumberish, _h: BigNumberish, overrides?: Overrides): Promise<Problem>;
    getDeployTransaction(_problem_statement_hash: BigNumberish, _y: BigNumberish, _p: BigNumberish, _q: BigNumberish, _h: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): Problem;
    connect(signer: Signer): ProblemFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Problem;
}
//# sourceMappingURL=ProblemFactory.d.ts.map