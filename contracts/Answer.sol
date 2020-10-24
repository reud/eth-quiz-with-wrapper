// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./Problem.sol";
import "./Master.sol";

// TODO: 問題コントラクトからのみ呼び出せる様にしたいがどうやって・・・？ 親を持つとか？
contract Answer {

    address public owner;// 問題コントラクト
    address public solver;// =解答者 =このコントラクトの作成者

    // 生成時のブロックの高さ　ゼロ知識証明に使用
    uint public block_number;
    uint public question_id;
    uint public p;
    uint public q;

    uint public h;
    uint public y;
    uint public last_completed_migration;
    uint public t;
    AnswerStatus public status = AnswerStatus.Unanswered;

    // 解答ステータス(未解答、1: 正解, 2: 不正解 )
    enum AnswerStatus { Unanswered, Correct, InCorrect}

    //イベント設置
    event result(address answerer,bool is_correct);


    // テストのためexportしている。
    // https://github.com/monicanagent/cypherpoker/issues/5
    // TODO: エラーハンドリング(openzeppelinを用いて)
    function modExp(uint256 base, uint256 exp, uint256 mod) pure public returns (uint256 ret)  {
        if (exp == 0) return 1;
        if (exp % 2 == 0 ) {
            uint tt = modExp(base,exp/2,mod);
            return tt * tt % mod;
        }
        return base * modExp(base,exp-1,mod) % mod;
    }

    // 位数qの有限情報巡回群のexponentiation番目の値を取得する。
    function getFiniteCyclicGroup(uint256 exponentiation) private view returns (uint256 val){
        return modExp(h,exponentiation,q);
    }

    // 解答者はランダムな値rを選択して t=h^rとして公開する。
    // _yはh^x (mod q), 問題コントラクトから与えられる想定
    constructor(uint256 _t,uint256 _y,uint256 _p,uint256 _q,uint256 _h) public {
        owner = msg.sender;
        solver = tx.origin;
        t = _t;
        y = _y;
        p = _p;
        q = _q;
        h = _h;
        block_number = block.number % q;
    }

    // s \equiv xc+r (mod q)
    function verify(uint s) public restricted {
        uint256 c1 = getFiniteCyclicGroup(s);
        uint256 c2 = mulmod(modExp(y,block_number,q),t,q);
        emit result(solver,c1 == c2);
        status = (c1 == c2) ? AnswerStatus.Correct : AnswerStatus.InCorrect;
        callToMaster();
    }

    function getAnswerStatus() public view returns (uint) {
        return uint(status);
    }

    function callToMaster() internal {
        Problem pbm = Problem(owner);
        Master  mascon = Master(pbm.owner());
        mascon.setAnswerRecord(owner);
    }

    modifier restricted() {
        if (msg.sender == solver) _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}