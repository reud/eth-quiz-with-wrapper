const Master = artifacts.require("Master");

module.exports = function(deployer) {
    deployer.deploy(Master,302009,302053);
};
