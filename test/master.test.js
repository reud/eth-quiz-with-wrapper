const Master = artifacts.require("Master");
const Answer = artifacts.require("Answer");

// 大きな素数p,q
const public_h = 100000;
const y = 176706;
const mock_problem_statement_hash = 1;

contract("Master", (accounts) => {
    it("Masterコントラクトが問題コントラクトを作成出来ること", async () => {
        const instance = await Master.deployed();

        const tran = await instance.createProblem(mock_problem_statement_hash,y,public_h);
        const contract_address = tran.logs[0].args.contract_address;
        console.log(`deploy to :${contract_address}`);
        // Masterコントラクトが問題のデプロイ先情報を保存していること
        assert.isTrue(await instance.problems(contract_address));

    })
})