"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newQuizClient = void 0;
var ethers_1 = require("ethers");
var masterAbi = require('../build/contracts/Master.json');
var problemAbi = require('../build/contracts/Problem.json');
var answerAbi = require('../build/contracts/Answer.json');
var getMasterContractAddress = function (network) {
    switch (network) {
        case "main":
            return "TBD";
        case "ropsten":
            return "0xcb1807aFac1d8A4aB528B746b35b099e55813674";
        case "local":
            if (!process.env.LOCAL_CONTRACT_ADDRESS)
                throw new Error("Process env");
            return process.env.LOCAL_CONTRACT_ADDRESS;
    }
};
var QuizClient = /** @class */ (function () {
    function QuizClient(swp, network) {
        var _this = this;
        this.fetchProblemContract = function (address) {
            return new ethers_1.ethers.Contract(address, problemAbi.abi, _this.getProvider());
        };
        this.fetchAnswerContract = function (address) {
            return new ethers_1.ethers.Contract(address, answerAbi.abi, _this.getProvider());
        };
        this.deployProblemContract = function (master, statementHash, y, h, overrides) { return __awaiter(_this, void 0, void 0, function () {
            var option, transaction, t, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        option = __assign({ gasLimit: 4700000 }, overrides);
                        return [4 /*yield*/, master.createProblem(statementHash.toString(), y, h, option)];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, transaction.wait()];
                    case 2:
                        t = _a.sent();
                        events = t.events;
                        if (!events)
                            return [2 /*return*/, null];
                        return [2 /*return*/, events[0].args.contract_address];
                }
            });
        }); };
        this.swp = swp;
        this.network = network;
        this.masterAddress = getMasterContractAddress(network);
    }
    QuizClient.prototype.getProvider = function () {
        return this.swp.signer.provider;
    };
    QuizClient.prototype.isCodeExist = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProvider().getCode(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QuizClient.prototype.fetchMasterContract = function () {
        return new ethers_1.ethers.Contract(this.masterAddress, masterAbi.abi, this.getProvider());
    };
    return QuizClient;
}());
exports.newQuizClient = function (swp, network) {
    return new QuizClient(swp, network);
};
__exportStar(require("./signer"), exports);
//# sourceMappingURL=index.js.map