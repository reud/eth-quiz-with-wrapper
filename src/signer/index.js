"use strict";
exports.__esModule = true;
exports.SignerWithProvider = void 0;
var SignerWithProvider = /** @class */ (function () {
    function SignerWithProvider(signer) {
        // Providerを持つことを強制させる。
        if (!signer.provider) {
            throw new Error("The signer given to the argument does not have a provider.");
        }
    }
    return SignerWithProvider;
}());
exports.SignerWithProvider = SignerWithProvider;
