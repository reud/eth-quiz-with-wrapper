"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignerWithProvider = void 0;
var SignerWithProvider = /** @class */ (function () {
    function SignerWithProvider(signer) {
        // Providerを持つことを強制させる。
        if (!signer.provider) {
            throw new Error("The signer given to the argument does not have a provider.");
        }
        this.signer = signer;
    }
    return SignerWithProvider;
}());
exports.SignerWithProvider = SignerWithProvider;
__exportStar(require("./metamask"), exports);
__exportStar(require("./privatekey"), exports);
//# sourceMappingURL=index.js.map