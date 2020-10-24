import { SignerWithProvider } from "./signer";
import { Master } from './types';
import { Problem } from './types';
import { Answer } from './types';
import { ethers } from 'ethers';
declare type NETWORK = 'main' | 'ropsten' | 'local';
declare class QuizClient {
    swp: SignerWithProvider;
    network: NETWORK;
    masterAddress: string;
    constructor(swp: SignerWithProvider, network: NETWORK);
    private getProvider;
    isCodeExist(address: string): Promise<string>;
    fetchMasterContract(): Master;
    fetchProblemContract: (address: string) => Problem;
    fetchAnswerContract: (address: string) => Answer;
    deployProblemContract: (master: Master, statementHash: BigInt, y: number, h: number, overrides?: ethers.Overrides | undefined) => Promise<null | string>;
}
export declare const newQuizClient: (swp: SignerWithProvider, network: NETWORK) => QuizClient;
export {};
//# sourceMappingURL=index.d.ts.map