import {SignerWithProvider} from "./signer";
import { Master } from './types';
import { Problem } from './types';
import { Answer } from './types';
import { ethers,Overrides } from 'ethers';

type NETWORK = 'main' | 'ropsten' | 'local'

const masterAbi = require('../build/contracts/Master.json');
const problemAbi = require('../build/contracts/Problem.json');
const answerAbi = require('../build/contracts/Answer.json');

const getMasterContractAddress = (network: NETWORK) => {
    switch (network) {
        case "main":
            return "TBD"
        case "ropsten":
            return "0xcb1807aFac1d8A4aB528B746b35b099e55813674"
        case "local":
            if(!process.env.LOCAL_CONTRACT_ADDRESS) throw new Error("Process env");
            return process.env.LOCAL_CONTRACT_ADDRESS;
    }
}

class QuizClient {
    swp: SignerWithProvider
    network: NETWORK
    masterAddress: string
    constructor(swp: SignerWithProvider,network: NETWORK) {
        this.swp = swp;
        this.network = network;
        this.masterAddress = getMasterContractAddress(network);
    }
    private getProvider() {
        return this.swp.signer.provider!;
    }
    async isCodeExist(address: string) {
        return await this.getProvider().getCode(address);
    }
    fetchMasterContract():Master {
        return (new ethers.Contract(this.masterAddress, masterAbi.abi, this.getProvider()) as any) as Master;
    }
    fetchProblemContract = (address: string): Problem => {
        return (new ethers.Contract(address, problemAbi.abi, this.getProvider()) as any) as Problem;
    };
    fetchAnswerContract = (address: string): Answer => {
        return (new ethers.Contract(address, answerAbi.abi, this.getProvider()) as any) as Answer;
    };
    deployProblemContract = async (
        master: Master,
        statementHash: BigInt,
        y: number,
        h: number,
        overrides?: Overrides
    ): Promise<null | string> => {
        const option: Overrides = {
            gasLimit: 4700000,
            ...overrides,
        };

        const transaction = await master.createProblem(statementHash.toString(), y, h, option);

        const t = await transaction.wait();
        const events = t.events;
        if (!events) return null;
        return events[0].args!.contract_address;
    };
}

export const newQuizClient = (swp: SignerWithProvider,network: NETWORK) => {
    return new QuizClient(swp,network);
}