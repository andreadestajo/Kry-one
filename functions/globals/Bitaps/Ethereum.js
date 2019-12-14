const Bitaps = require('./Bitaps');
const keccak256 = require('js-sha3').keccak256;

class Ethereum extends Bitaps
{
    constructor(uid = null)
    {
        /* Staging */
        // const wallet_id = "ETHv8RRYiHtbuskGGpMkHRq6FnyA56CQtSo8XvWuye6RgZErti4Nh";
        // const wallet_id_hash = "";

        /* Production */
        const wallet_id = "ETHuL1RrSzpANXmoqmaHeaVZMs9zmpJrLErigzHwAHsTENK2YYVkL";
        const wallet_id_hash = "";

        const currency = "eth";
        const confirmation = 12;

        super(uid, wallet_id, wallet_id_hash, currency, confirmation);
    }

    checkAddress(address)
    {
        /**
         * Checks if the given string is an address
         *
         * @method isAddress
         * @param {String} address the given HEX adress
         * @return {Boolean}
        */
        var isAddress = function (address) {
            if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
                // check if it has the basic requirements of an address
                return false;
            } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
                // If it's all small caps or all all caps, return true
                return true;
            } else {
                // Otherwise check each case
                return isChecksumAddress(address);
            }
        };

        /**
         * Checks if the given string is a checksummed address
         *
         * @method isChecksumAddress
         * @param {String} address the given HEX adress
         * @return {Boolean}
        */
        var isChecksumAddress = function (address) {
            // Check each case
            address = address.replace('0x','');
            var addressHash = keccak256(address.toLowerCase());
            for (var i = 0; i < 40; i++ ) {
                // the nth letter should be uppercase if the nth digit of casemap is 1
                if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                    return false;
                }
            }
            return true;
        };

        return isAddress(address);
    }
}

module.exports = Ethereum;