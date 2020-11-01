import {SignerWithProvider} from "./signer";
import {Answer, Master, Problem} from './types';
import {ContractReceipt, ethers, Overrides} from 'ethers';
import {getRandomInt, hash, modHash, repeatSquaring} from "./math";

type NETWORK = 'main' | 'ropsten' | 'local'

const masterAbi = require('./contracts/Master.json');
const problemAbi = require('./contracts/Problem.json');
const answerAbi = require('./contracts/Answer.json');

function sleep(milliseconds: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), milliseconds);
    });
}

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
    swp: SignerWithProvider;
    master: Master;
    p: number;
    q: number;
    private constructor(swp: SignerWithProvider,master: Master, p: number, q: number) {
        this.swp = swp;
        this.master = master;
        this.p = p;
        this.q = q;
    }

    public static initialize = async (swp: SignerWithProvider, network: NETWORK) => {
        const masterAddress = getMasterContractAddress(network);
        const master = (new ethers.Contract(masterAddress, masterAbi.abi, swp.signer) as any) as Master;
        const p = await master.p();
        const q = await master.q();
        return new QuizClient(swp,master,p.toNumber(), q.toNumber());
    }

    private getProvider() {
        return this.swp.signer.provider!;
    }
    async isCodeExist(address: string) {
        return await this.getProvider().getCode(address);
    }
    fetchProblemContract = (address: string): Problem => {
        return (new ethers.Contract(address, problemAbi.abi, this.getProvider()) as any) as Problem;
    };
    fetchAnswerContract = (address: string): Answer => {
        return (new ethers.Contract(address, answerAbi.abi, this.getProvider()) as any) as Answer;
    };
    rawDeployProblemContract = async (
        statementHash: BigInt,
        y: number,
        h: number,
        overrides?: Overrides
    ): Promise<ContractReceipt> => {
        const option: Overrides = {
            gasLimit: 4700000,
            ...overrides,
        };

        const transaction = await this.master.createProblem(statementHash.toString(), y, h, option);

        return await transaction.wait();
    };


    deployProblemContract = async (problemStatement: string,answerStatement: string) => {
        const h = getRandomInt(this.q);
        const problemStatementHash = hash(problemStatement);
        const answerStatementHash = modHash(answerStatement,this.q);
        const y = repeatSquaring(h, answerStatementHash, this.q);
        return await this.rawDeployProblemContract(problemStatementHash,y,h);
    }

    answerProblemContract = async (problemAddress: string, yourAnswer: string) => {
        const problem = this.fetchProblemContract(problemAddress);
        const h = (await problem.h()).toNumber();
        const r = getRandomInt(this.p);
        const t = repeatSquaring(h,r,this.q);

        const x = modHash(yourAnswer,this.q);
        const tran = await problem.createAnswer(t);
        const receipt = await tran.wait();
        const address = receipt.events![0].args!.contract_address;
        const inValidCode = '0x';

        let code　= await this.isCodeExist(address);
        while(code === inValidCode) {
            console.warn("contractの情報がブロックチェーンネットワークに共有されきっていないため、少し待ちます。");
            await sleep(5000);
            code = await this.isCodeExist(address);
        }

        const answerContract = this.fetchAnswerContract(address);
        const c = await answerContract.block_number();
        const s = x * c.toNumber() + r;

        const transaction = await answerContract.verify(s);
        const ansReceipt = await transaction.wait();
        return ansReceipt.events![0].args!.is_correct as boolean;
    }

}

export const newQuizClient = (swp: SignerWithProvider,network: NETWORK) => {
    return QuizClient.initialize(swp,network);
}

export * from './signer';