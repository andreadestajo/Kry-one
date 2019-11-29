const Bitaps = require('./Bitaps');

class Bitcoin extends Bitaps
{
    constructor(uid = null)
    {
        /* Staging */
        const wallet_id = "BTCvhH72c2mfYPDRs5s4gRFAanYbebmwPLhdMxCaHFMo5jhNbZNS1";
        const wallet_id_hash = "f82d113d81655e88879ae01df3a29971fa91b3532ca9929ec3b733574fa38a9b";
        
        /* Production */
        // const wallet_id = "BTCuwLB2aUMaWUq9SBwuazTtydDvgyjg8XLakgdkKHNRyfpXqjwz1";
        // const wallet_id_hash = "412c1ece26658a67e4a91e3afa757a4773ea1f5fe41a6ee1088fbffb2ef89d37";

        const currency = "btc";
        const confirmation = 6;

        super(uid, wallet_id, wallet_id_hash, currency, confirmation);
    }
}

module.exports = Bitcoin;