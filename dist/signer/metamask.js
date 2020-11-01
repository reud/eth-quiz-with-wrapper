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
var index_1 = require("./index");
var MetaMaskSwP = /** @class */ (function (_super) {
    __extends(MetaMaskSwP, _super);
    function MetaMaskSwP(provider) {
        return _super.call(this, provider.getSigner()) || this;
    }
    return MetaMaskSwP;
}(index_1.SignerWithProvider));
/* TBD
export const newMetaMaskSwP = async (): SignerWithProvider => {
    // @ts-ignore
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum!);
    return new MetaMaskSwP(provider);
};
 */ 
//# sourceMappingURL=metamask.js.map