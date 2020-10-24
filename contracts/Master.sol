// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
import"./Problem.sol";
import"./Answer.sol";

contract Master {
    uint256 public p;
    uint256 public q;

    // problem addressのset型の様に振る舞う。
    mapping (address => bool) public problems;

    // tracking, 問題アドレス　=> ユーザーアドレス => 解答レコードアドレスの配列
    mapping (address => mapping(address => address[])) answer_records;
    // created
    event problemContractCreated(Problem contract_address,address created_by);

    constructor(uint256 _p, uint256 _q) public{
        p = _p;
        q = _q;
    }

    // アドレス配列を返すには工夫が必要
    // [remix-アドレス配列を確実に返すことができません-Ethereum Stack Exchange](https://ethereum.stackexchange.com/questions/64101/unable-to-return-address-array-in-solidity)
    function getAnswerCount(address problem_contract_address,address solver_address) public view returns(uint count) {
        return answer_records[problem_contract_address][solver_address].length;
    }
    function selectAnswerRecords(address problem_contract_address,address solver_address) public view returns (address[] memory) {
        address[] memory ret = new address[](getAnswerCount(problem_contract_address,solver_address));
        for(uint i=0; i<getAnswerCount(problem_contract_address,solver_address); i++) {
            ret[i] = answer_records[problem_contract_address][solver_address][i];
        }
        return ret;
    }

    // 問題解答者が呼び出すコントラクト
    function createProblem(uint256 problem_statement_hash,uint256 y,uint256 h) public {
        // hをq以下にすることでフェルマーの小定理の条件である互いに素を成立させる。
        require(h < q);
        Problem problem_contract = new Problem(problem_statement_hash,y,p,q,h);
        emit problemContractCreated(problem_contract,msg.sender);
        problems[address(problem_contract)] = true;
    }

    function setAnswerRecord(address problem_contract_address) public {
        // ProblemコントラクトアドレスがMaster配下である事
        require(problems[problem_contract_address]);
        // AnswerコントラクトアドレスがProblem配下である事
        // Warningが出るが大丈夫(信頼されたアドレスであるので)
        Problem pbm = Problem(problem_contract_address);
        // ProblemコントラクトがそのAnswerコントラクトを持っている事, (msg.senderがそのコントラクトであること)
        require(pbm.answers(msg.sender));
        // tx.origin(想定ではEOAアカウント)の解答扱いとして保存する。(なりすましのリスクは変更なしのはず)
        answer_records[problem_contract_address][tx.origin].push(msg.sender);
    }
}
