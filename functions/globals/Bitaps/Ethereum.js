const Bitaps = require('./Bitaps');

class Ethereum extends Bitaps
{
    constructor(uid = null)
    {
        /* Staging */
        const wallet_id = "ETHv8RRYiHtbuskGGpMkHRq6FnyA56CQtSo8XvWuye6RgZErti4Nh";
        const wallet_id_hash = "";

        /* Production */
        // const wallet_id = "";
        // const wallet_id_hash = "";

        const currency = "eth";
        const confirmation = 12;

        super(uid, wallet_id, wallet_id_hash, currency, confirmation);
    }
}

module.exports = Ethereum;