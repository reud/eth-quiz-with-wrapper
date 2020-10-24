"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterFactory = void 0;
var contracts_1 = require("@ethersproject/contracts");
var MasterFactory = /** @class */ (function (_super) {
    __extends(MasterFactory, _super);
    function MasterFactory(signer) {
        return _super.call(this, _abi, _bytecode, signer) || this;
    }
    MasterFactory.prototype.deploy = function (_p, _q, overrides) {
        return _super.prototype.deploy.call(this, _p, _q, overrides || {});
    };
    MasterFactory.prototype.getDeployTransaction = function (_p, _q, overrides) {
        return _super.prototype.getDeployTransaction.call(this, _p, _q, overrides || {});
    };
    MasterFactory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    MasterFactory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    MasterFactory.connect = function (address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    };
    return MasterFactory;
}(contracts_1.ContractFactory));
exports.MasterFactory = MasterFactory;
var _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_p",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_q",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract Problem",
                name: "contract_address",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "created_by",
                type: "address",
            },
        ],
        name: "problemContractCreated",
        type: "event",
    },
    {
        constant: true,
        inputs: [],
        name: "p",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "problems",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "q",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "problem_contract_address",
                type: "address",
            },
            {
                internalType: "address",
                name: "solver_address",
                type: "address",
            },
        ],
        name: "getAnswerCount",
        outputs: [
            {
                internalType: "uint256",
                name: "count",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "problem_contract_address",
                type: "address",
            },
            {
                internalType: "address",
                name: "solver_address",
                type: "address",
            },
        ],
        name: "selectAnswerRecords",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "problem_statement_hash",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "y",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "h",
                type: "uint256",
            },
        ],
        name: "createProblem",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "problem_contract_address",
                type: "address",
            },
        ],
        name: "setAnswerRecord",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x608060405234801561001057600080fd5b506040516117b13803806117b18339818101604052604081101561003357600080fd5b810190808051906020019092919080519060200190929190505050816000819055508060018190555050506117448061006d6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636e7184a01161005b5780636e7184a0146101f757806378523205146102535780639ae8886a14610295578063fd3ab282146102b35761007d565b806337aca95d14610082578063532e4fc2146100fa5780636528e341146101b3575b600080fd5b6100e46004803603604081101561009857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102d1565b6040518082815260200191505060405180910390f35b61015c6004803603604081101561011057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061035b565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561019f578082015181840152602081019050610184565b505050509050019250505060405180910390f35b6101f5600480360360208110156101c957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104c0565b005b6102396004803603602081101561020d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106c0565b604051808215151515815260200191505060405180910390f35b6102936004803603606081101561026957600080fd5b810190808035906020019092919080359060200190929190803590602001909291905050506106e0565b005b61029d61083f565b6040518082815260200191505060405180910390f35b6102bb610845565b6040518082815260200191505060405180910390f35b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050905092915050565b60608061036884846102d1565b6040519080825280602002602001820160405280156103965781602001602082028038833980820191505090505b50905060008090505b6103a985856102d1565b8110156104b557600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020818154811061043757fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682828151811061046e57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808060010191505061039f565b508091505092915050565b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661051657600080fd5b60008190508073ffffffffffffffffffffffffffffffffffffffff16635e9618e7336040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561059857600080fd5b505afa1580156105ac573d6000803e3d6000fd5b505050506040513d60208110156105c257600080fd5b81019080805190602001909291905050506105dc57600080fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000203390806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b60026020528060005260406000206000915054906101000a900460ff1681565b60015481106106ee57600080fd5b60008383600054600154856040516107059061084b565b8086815260200185815260200184815260200183815260200182815260200195505050505050604051809103906000f080158015610747573d6000803e3d6000fd5b5090507fa0fa93112f3159f852c09d9b46df8b492e374138f92f40fdd7caf5a3249c5a6f8133604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050505050565b60005481565b60015481565b610eb7806108598339019056fe608060405234801561001057600080fd5b50604051610eb7380380610eb7833981810160405260a081101561003357600080fd5b81019080805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919050505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600281905550836003819055508260048190555081600581905550806006819055505050505050610dd3806100e46000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063a56dfe4a11610066578063a56dfe4a1461018a578063b8c9d365146101a8578063d9cdac9a146101c6578063ee7e4486146101e4578063fd3ab2821461022e57610093565b80635e9618e71461009857806360c5c972146100f45780638da5cb5b146101225780639ae8886a1461016c575b600080fd5b6100da600480360360208110156100ae57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061024c565b604051808215151515815260200191505060405180910390f35b6101206004803603602081101561010a57600080fd5b810190808035906020019092919050505061026c565b005b61012a6103bf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101746103e5565b6040518082815260200191505060405180910390f35b6101926103eb565b6040518082815260200191505060405180910390f35b6101b06103f1565b6040518082815260200191505060405180910390f35b6101ce6103f7565b6040518082815260200191505060405180910390f35b6101ec6103fd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610236610422565b6040518082815260200191505060405180910390f35b60076020528060005260406000206000915054906101000a900460ff1681565b60008160035460045460055460065460405161028790610428565b8086815260200185815260200184815260200183815260200182815260200195505050505050604051809103906000f0801580156102c9573d6000803e3d6000fd5b5090507fc0a7bc85cfa5ca92cd50ca3f9342a608bb0b4bec9b88c46ffc42549e824c50ce8133604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16001600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b60035481565b60065481565b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b610969806104368339019056fe60806040526000600a60006101000a81548160ff0219169083600281111561002357fe5b021790555034801561003457600080fd5b50604051610969380380610969833981810160405260a081101561005757600080fd5b810190808051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555032600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508460098190555083600781905550826004819055508160058190555080600681905550600554438161013f57fe5b06600281905550505050505061080f8061015a6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638cbb4fee11610097578063a56dfe4a11610066578063a56dfe4a146102f2578063b8c9d36514610310578063fd3ab2821461032e578063fdacd5761461034c576100f5565b80638cbb4fee1461024e5780638da5cb5b1461026c57806392d0d153146102b65780639ae8886a146102d4576100f5565b8063445df0ac116100d3578063445df0ac1461019a57806349a7a26d146101b85780635011eede146102025780638753367f14610220576100f5565b8063200d2ed2146100fa57806325a58b56146101265780633148f14f14610144575b600080fd5b61010261037a565b6040518082600281111561011257fe5b60ff16815260200191505060405180910390f35b61012e61038d565b6040518082815260200191505060405180910390f35b6101846004803603606081101561015a57600080fd5b81019080803590602001909291908035906020019092919080359060200190929190505050610393565b6040518082815260200191505060405180910390f35b6101a2610409565b6040518082815260200191505060405180910390f35b6101c061040f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61020a610435565b6040518082815260200191505060405180910390f35b61024c6004803603602081101561023657600080fd5b8101908080359060200190929190505050610457565b005b6102566105b1565b6040518082815260200191505060405180910390f35b6102746105b7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102be6105dc565b6040518082815260200191505060405180910390f35b6102dc6105e2565b6040518082815260200191505060405180910390f35b6102fa6105e8565b6040518082815260200191505060405180910390f35b6103186105ee565b6040518082815260200191505060405180910390f35b6103366105f4565b6040518082815260200191505060405180910390f35b6103786004803603602081101561036257600080fd5b81019080803590602001909291905050506105fa565b005b600a60009054906101000a900460ff1681565b60025481565b6000808314156103a65760019050610402565b6000600284816103b257fe5b0614156103e65760006103d085600286816103c957fe5b0485610393565b905082818202816103dd57fe5b06915050610402565b816103f5856001860385610393565b8502816103fe57fe5b0690505b9392505050565b60085481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600a60009054906101000a900460ff16600281111561045257fe5b905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156105ae5760006104b88261065b565b90506000600554806104c657fe5b6009546104da600754600254600554610393565b0990507ffa366607e86f7102db62f18adf30a6724e801f1c7c93592fb2715f54e0fe35c5600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828414604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a180821461057e576002610581565b60015b600a60006101000a81548160ff0219169083600281111561059e57fe5b02179055506105ab610673565b50505b50565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b60045481565b60075481565b60065481565b60055481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561065857806008819055505b50565b600061066c60065483600554610393565b9050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106e157600080fd5b505afa1580156106f5573d6000803e3d6000fd5b505050506040513d602081101561070b57600080fd5b810190808051906020019092919050505090508073ffffffffffffffffffffffffffffffffffffffff16636528e3416000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b1580156107be57600080fd5b505af11580156107d2573d6000803e3d6000fd5b50505050505056fea265627a7a72315820af9fc4508ca372874ebeeec2cf6d64aa555a43f304b9c5303ce1ddd0aea5684964736f6c63430005100032a265627a7a72315820ee530d5d36e7e196b6ac030b7045d02ca0d0f95b98f4675ede5c52c35b4a0a7c64736f6c63430005100032a265627a7a723158201b95a5ea82a530202ebe94285b4bc0427934f2dbb51a5e8f218c054098faa84f64736f6c63430005100032";
//# sourceMappingURL=MasterFactory.js.map