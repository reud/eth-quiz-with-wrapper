const Master = artifacts.require("Master");
const Answer = artifacts.require("Answer");
const Problem = artifacts.require("Problem");
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

contract("Answer", (accounts) => {
    let masterInstance;
    let problemInstance;
    let x;
    let y;
    let problem_statement_hash;
    let answerInstance;
    let h;
    let t;
    let r;
    beforeEach('setup contracts for each test', async function () {
        masterInstance = await Master.new(P,Q);

        // 問題の作成
        problem_statement_hash = hash(PROBLEM_STATEMENT);
        x = modHash(ANSWER,Q); // 解の作成
        h = getRandomInt(Q); // 情報群の生成
        y = repeatSquaring(h,x,Q) // 暗号化された解答の作成
        const tran = await masterInstance.createProblem(problem_statement_hash.toString(),y,h);
        const problem_contract_address = tran.logs[0].args.contract_address;
        // ここから解答の投稿・検証
        const problemInstance = await Problem.at(problem_contract_address);
        r = getRandomInt(Q);
        // 実際のhは問題コントラクトから取得する。
        t = repeatSquaring(h,r,Q);
        const createAnswerTransaction = await problemInstance.createAnswer(t);
        const  answer_contract_address = createAnswerTransaction.logs[0].args.contract_address;
        answerInstance = await Answer.at(answer_contract_address);

    })


    it("冪剰余計算を行うmodExp: フェルマーの小定理が成立していること",async () => {
        const a = 118147;
        const p = 9999943;
        const instance = await Answer.new(1,1,P,Q,h);
        const val = await instance.modExp.call(a,p-1,p);
        console.log(val)
        assert.equal(val.toNumber(),1);
    });

    it("冪剰余計算を行うmodExp: h^x = y (mod q)が手元の計算と正しい事",async () => {
        const instance = await Answer.new(1,1,P,Q,h);
        const val = await instance.modExp.call(h,x,Q);
        assert.equal(val.toNumber(),y);
    });

    it("解答の検証を行う verify が正しいイベントを発行する事",async () => {

        // メモ用、(instance).<member var>(); でコントラクトのメンバ変数を取得出来る。
        const p = await answerInstance.p();
        console.log(`p:　${p}`);

        const c = await answerInstance.block_number();
        console.log(`c:　${c}`);
        // 参考論文はここでmodを取ってるが取ると計算結果がおかしくなる。
        // 等式変形で導けるが、xc+r > qの時に成立しなくなるのでmod取る必要はない(桁数も最大q^2+q程度なので)
        const s = x*c+r;
        console.log(`s:　${s}`);

        // イベントを発行するメソッドを呼び出してアサートに使う。
        const ev = await answerInstance.verify(s);
        // 採点結果が正解になっていること
        assert.isTrue(ev.logs[0].args.is_correct);
    });

    it("解答の検証を行う verify が正しいイベントを発行する事 (失敗)",async () => {

        // メモ用、(instance).<member var>(); でコントラクトのメンバ変数を取得出来る。
        const p = await answerInstance.p();
        console.log(`p:　${p}`);

        const c = await answerInstance.block_number();
        console.log(`c:　${c}`);

        const s = 1*c+r;
        console.log(`s:　${s}`);

        // イベントを発行するメソッドを呼び出してアサートに使う。
        const ev = await answerInstance.verify(s);
        assert.isFalse(ev.logs[0].args.is_correct);
    });
});