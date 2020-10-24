"use strict";
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
exports.newPrivateKeySwP = void 0;
var index_1 = require("./index");
var ethers_1 = require("ethers");
var PrivateKeySwP = /** @class */ (function (_super) {
    __extends(PrivateKeySwP, _super);
    function PrivateKeySwP(privateKey, provider) {
        var _this = this;
        var wallet = new ethers_1.ethers.Wallet(privateKey, provider);
        _this = _super.call(this, wallet) || this;
        return _this;
    }
    return PrivateKeySwP;
}(index_1.SignerWithProvider));
exports.newPrivateKeySwP = function (privateKey, provider) {
    return new PrivateKeySwP(privateKey, provider);
};
//# sourceMappingURL=privatekey.js.map