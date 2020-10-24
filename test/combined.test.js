const Master = artifacts.require("Master");
const Problem = artifacts.require("Problem");
const Answer = artifacts.require("Answer");
const crypto = require('crypto');

// 大きな素数p,q
const P = 9999971;
const Q = 9999943;
const PROBLEM_STATEMENT="パンはパンでも食べられないパンはな〜〜〜んだ？";
const ANSWER = "フライパン";


const modHash = (str,mod) => {
    const sha256 = crypto.createHash('sha256').update(str).digest('hex');
    return Number(BigInt(`0x${sha256}`) % BigInt(mod));
}
const hash = (str) => {
    const sha256 = crypto.createHash('sha256').update(str).digest('hex');
    return BigInt(`0x${sha256}`);
}
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
const repeatSquaring = (a,n,mod) => {
    if (n === 0) {
        return 1;
    }
    if (n % 2 === 0) {
        const t = repeatSquaring(a,n/2,mod);
        return t*t % mod;
    }
    return a * repeatSquaring(a,n-1,mod) % mod;
}

contract("結合テスト", (accounts) => {
    it("正常系: 問題の投稿、解答、解答の記録、解答履歴が追えること", async () => {
        const masterInstance = await Master.new(P,Q);

        // 問題の作成
        const problem_statement_hash = hash(PROBLEM_STATEMENT);
        const x = modHash(ANSWER,Q); // 解の作成
        const h = getRandomInt(Q); // 情報群の生成
        const y = repeatSquaring(h,x,Q) // 暗号化された解答の作成
        console.log(y);
        console.log(problem_statement_hash.toString());
        const tran = await masterInstance.createProblem(problem_statement_hash.toString(),y,h);
        console.log(tran);
        const createdBy = tran.logs[0].args.created_by;

        // イベントが発火され、そのイベントのcreatedByがaccounts[0]と同じで有ること
        assert.equal(accounts[0],createdBy);

        const problem_contract_address = tran.logs[0].args.contract_address;

        // Masterコントラクトが作成した問題コントラクトのアドレスを持っていること
        assert.isTrue(await masterInstance.problems(problem_contract_address));
        // accounts[0]は問題コントラクトでないので登録されていないこと
        assert.isFalse(await masterInstance.problems(accounts[0]));

        // ここから解答の投稿・検証
        const problemInstance = await Problem.at(problem_contract_address);
        const r = getRandomInt(Q);
        // 実際のhは問題コントラクトから取得する。
        const t = repeatSquaring(h,r,Q);
        const createAnswerTransaction = await problemInstance.createAnswer(t);
        console.log(createAnswerTransaction);

        // イベントが発行されていること
        const  answerer = createAnswerTransaction.logs[0].args.created_by;
        assert.equal(answerer,accounts[0]);

        const  answer_contract_address = createAnswerTransaction.logs[0].args.contract_address;

        // 問題コントラクトが作成した解答コントラクトを把握していること
        assert.isTrue(await problemInstance.answers(answer_contract_address));
        // accounts[0]は解答コントラクトでないので登録されていないこと
        assert.isFalse(await problemInstance.answers(accounts[0]));

        // ここから解答の投稿・検証
        const answerInstance = await Answer.at(answer_contract_address);
        const c = await answerInstance.block_number();
        console.log(`x: ${x} c: ${c} r: ${r}`);
        const s = x * c + r;
        const verifyTransaction = await answerInstance.verify(s);

        console.log(`tran: ${JSON.stringify(verifyTransaction.logs)}`);
        // イベントが発火され、answeerが解答者になっていること。
        assert.equal(verifyTransaction.logs[0].args.answerer,accounts[0]);
        // 採点結果が正解になっていること
        assert.isTrue(verifyTransaction.logs[0].args.is_correct);

        const answerRecords = await masterInstance.selectAnswerRecords(problem_contract_address,accounts[0]);


        assert.equal(answerRecords.length,1);
        assert.equal(answerRecords[0],answer_contract_address);

        // 解答履歴が追えること
        console.log(await masterInstance.selectAnswerRecords(problem_contract_address,accounts[0]));
    })

});