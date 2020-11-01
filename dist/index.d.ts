import { SignerWithProvider } from "./signer";
import { Answer, Master, Problem } from './types';
import { ContractReceipt, ethers } from 'ethers';
declare type NETWORK = 'main' | 'ropsten' | 'local';
declare class QuizClient {
    swp: SignerWithProvider;
    master: Master;
    p: number;
    q: number;
    private constructor();
    static initialize: (swp: SignerWithProvider, network: NETWORK) => Promise<QuizClient>;
    private getProvider;
    isCodeExist(address: string): Promise<string>;
    fetchProblemContract: (address: string) => Problem;
    fetchAnswerContract: (address: string) => Answer;
    rawDeployProblemContract: (statementHash: BigInt, y: number, h: number, overrides?: ethers.Overrides | undefined) => Promise<ContractReceipt>;
    deployProblemContract: (problemStatement: string, answerStatement: string) => Promise<ContractReceipt>;
    answerProblemContract: (problemAddress: string, yourAnswer: string) => Promise<boolean>;
}
export declare const newQuizClient: (swp: SignerWithProvider, network: NETWORK) => Promise<QuizClient>;
export * from './signer';
//# sourceMappingURL=index.d.ts.map