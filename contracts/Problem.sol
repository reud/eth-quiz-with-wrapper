// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import "./Answer.sol";

contract Problem {

    address public master_contract_address;
    // TODO: masterコントラクトのアドレスを埋め込んで直接操作する。
    // TODO: 使用可能回数を設ける？その分問題の投稿が複数必要になるけど・・・
    address public owner; // MasterContract
    uint256 public problem_statement_hash;
    uint256 public y;
    uint256 public p;
    uint256 public q;
    uint256 public h;
    // set型の様に振舞う。要素が存在しないならfalseを返す。
    mapping (address => bool) public answers;

    // created
    event answerContractCreated(Answer contract_address,address created_by);

    // 問題文のハッシュ と暗号化された答え
    constructor (uint256 _problem_statement_hash,uint256 _y,uint256 _p,uint256 _q,uint256 _h) public {
        owner = msg.sender;
        problem_statement_hash = _problem_statement_hash;
        y = _y;
        p = _p;
        q = _q;
        h = _h;
    }

    // 解答者が呼び出すコントラクト
    function createAnswer(uint256 t) public {
        Answer answer_contract = new Answer(t,y,p,q,h);
        emit answerContractCreated(answer_contract,msg.sender);
        answers[address(answer_contract)] = true;
    }

}