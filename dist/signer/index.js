"use strict";
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
//# sourceMappingURL=index.js.map