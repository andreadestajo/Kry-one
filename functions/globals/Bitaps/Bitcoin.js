const Bitaps = require('./Bitaps');

class Bitcoin extends Bitaps
{
    constructor(uid = null)
    {
        /* Staging */
        const wallet_id = "BTCvhH72c2mfYPDRs5s4gRFAanYbebmwPLhdMxCaHFMo5jhNbZNS1";
        const wallet_id_hash = "f82d113d81655e88879ae01df3a29971fa91b3532ca9929ec3b733574fa38a9b";
        
        /* Production */
        // const wallet_id = "BTCw2m4WqrVwzE4K8CqU72mwGUn13fKKiA4EmvdcrHLshHo6x94r5";
        // const wallet_id_hash = "5c78f3104454df89d5f84f1181d8d7451f88bc5f390564b6c749b630028ba5ae";

        const currency = "btc";
        const confirmation = 6;

        super(uid, wallet_id, wallet_id_hash, currency, confirmation);
    }
}

module.exports = Bitcoin;