const Problem = artifacts.require("Problem");

// 大きな素数p,q
const public_p = 302009;
const public_q = 302053;
const public_h = 100000;


contract("Problem", (accounts) => {
    it("解答コントラクト作成時にイベントが呼び出される事",async () => {
        const mock_num = 1;
        const instance = await Problem.new(mock_num,mock_num,public_p,public_q,public_h);
        const ev = await instance.createAnswer(mock_num);
        // 発火したイベントがLogs[0]に入る
        const address = ev.logs[0].args.contract_address;
        const is_exist = await instance.answers(address);
        assert.equal(is_exist,true);
    });
});