const { HTTPS_ERROR }           = require('../plugin/firebase');
const MDB_USER_WALLET           = require('../models/MDB_USER_WALLET');
const MDB_USER_WALLET_LOG       = require('../models/MDB_USER_WALLET_LOG');

const axios = require('axios');

module.exports =
{
    allowed_currency: ['btc', 'eth', 'xau'],

    /**
     * @param {string} uid              user_id of member to update 
     * @param {string} currency         (php, usd, or yuan)
     * @param {number} amount           amount to topup
     * @param {string} type             (received, issued, earned) type of transaction
     * @param {string} description      (optional) details about the transaction
     * @param {string} triggerred_by    user_id of member who cause the wallet change
     * @param {string} remark           (optional) this is a remark that the user entered for the transaction
     */
    async add(uid, currency, amount, type, description, triggered_by = "", remark)
    {
        currency     = currency.toLowerCase();
        let allowed_type = ['received', 'issued', 'earned', 'purchased', 'enlisted'];
        let add_promise  = [];

        amount = parseFloat(amount);

        if(!remark)
        {
            remark = "No Remarks";
        }

        if(amount <= 0)
        {
            HTTPS_ERROR('failed-precondition', 'Invalid amount has been detected.');
        }
        else if(!allowed_type.includes(type))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid type');
        }
        else if(!this.allowed_currency.includes(currency))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid currency');
        }
        else if(uid === "" || description === "")
        {
            HTTPS_ERROR('failed-precondition', 'Incomplete details');
        }
        else
        {
            let wallet     = await MDB_USER_WALLET.get(uid, currency.toUpperCase());

            let log_detail = {  amount: amount,
                                date_created: new Date(),
                                type: type, description:
                                description,
                                remark: remark,
                                method: "add",
                                triggered_by: triggered_by,
                                balance_before: wallet.wallet,
                                balance_after: wallet.wallet + amount };

            add_promise.push(MDB_USER_WALLET_LOG.add(uid, currency.toUpperCase(), log_detail));
            add_promise.push(MDB_USER_WALLET.adjustWallet(uid, currency.toUpperCase(), amount));

            await Promise.all(add_promise);
        }

        return true;
    },
    async deduct(uid, currency, amount, type, description, triggered_by = "", remark)
    {
        currency        = currency.toLowerCase();
        let allowed_type    = ['sent', 'upgrade', 'purchased'];
        let deduct_promise  = [];

        amount = parseFloat(amount);

        if(!remark)
        {
            remark = "No Remarks";
        }

        if(amount <= 0)
        {
            HTTPS_ERROR('failed-precondition', 'Invalid amount has been detected.');
        }
        else if(!allowed_type.includes(type))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid type');
        }
        else if(!this.allowed_currency.includes(currency))
        {
            HTTPS_ERROR('failed-precondition', 'Invalid currency');
        }
        else if(uid === "" || description === "")
        {
            HTTPS_ERROR('failed-precondition', 'Incomplete details');
        }
        else
        {
            let wallet     = await MDB_USER_WALLET.get(uid, currency.toUpperCase());

            let log_detail = {  amount: amount,
                                date_created: new Date(),
                                type: type, description:
                                description,
                                remark: remark,
                                method: "add",
                                triggered_by: triggered_by,
                                balance_before: wallet.wallet,
                                balance_after: wallet.wallet - amount };

            deduct_promise.push(MDB_USER_WALLET_LOG.add(uid, currency.toUpperCase(), log_detail));
            deduct_promise.push(MDB_USER_WALLET.adjustWallet(uid, currency.toUpperCase(), amount *-1));

            await Promise.all(deduct_promise);
        }

        return true;
    },
    async add_uniq(amount, address)
    {
        try
        {
            let response = await axios.post('https://uniqx.co/api/wallet/add', 
            {
                password: 'xtjDC!vLeEB*?R7k8S4Fv#AnW#8^s$9n+#bf$WPfsKchANH!RnNqSC#Pmpvnn7QNVLKeUXy&rp*um--^^PB-=*6n27FKFxha78xbM4DGeJeg74wc=bXvm@*NXy%%@E5!!&_nbVakyYt4dYu-?@^p&XX=uR@T+nDTeS@AMZct_Q8ft6R@WMzdU&8W4J&HMPk6G%uJ384ML%uCrhU8DTC6bZFD^rGy-YPS2KQ&an4d-aw=mg#Qf9ZpXeq2nFUPhRb+8$es^xVBDHSA+6UYs#%BLZVUaQ3gsFrjTgFRFL_^?a2&TsV#rk!Z8-Qf9H$*v^wNp8Yh-kfc#_5GrLP%c-&-UepcT%e_uzeCrL#2_g=v9m7Xp!W6xXQDNvhSMAjmt!Bz4zq%wQ7kNXt%p7!KSpgUqR&TqatrjNn6_yq6g=Sk5QGCrKHFJEF@r55M3&T7$VjJ9C#t5^?HTn$bN!L*SQ#^AYF*GfbmLpzX_tgm+5&wY62N!E5Pha7H9QY+dsdRHAX$JQd=FVEjP_hLSw$AXP=UzA6RZkKhE@+HYSA^SM&hGx3F#WG!tzHajhjRN%YwS3g3eUG==&e?dgUs+x6@BUSREXd6qF2G%9sQTU!_@^g5qmKV4!6ZE&aF87Zrzjt4fz!wam3HC*P$+UZ8H7mYw86#MyQB=R3RzwPkzV%dHhwEyufv&L96_P4JSExH6c94-NPX^vb-FZZerMMpqRkC^A%#KpJ*aeYjLNk5_CKYv?5xCtMs4FV!r7kctTT=HpZ3sk!pJDJ!f4$X7TM+X5%q3tCRV-GX38ZMZAW^EQg!%*B%J+d94yzWPu*-ALCvD&kY4dbX%qcq#AR^5DLTVna$4Fj$Twa6eu=A$zYB@+5hy-MmtKVcN-9VJtL2S7?%RD&*5rn#_J+teGfX_pbYw-=w7z+m7cgyvBtjJvg5hF@mkr6YA7k+ZjRakbH2!6B&NUqejR8WCxAzvg#5+Tm3q_q@+CfHUW4r9R?A8Tsg4Z3cS_Qk*yS$bq&^Hr6hSpmJE@b_YpJ+mF#FmK4gxX9sM&d?RQh%dXm$75Z_v4WD7pkSS&mb2TJH?h+b?_uK56xVzj9m+pJ7=K8G#y9e7wSEvEunrtmWbXxcqjF@9UgU&yucmeRZ?g!wTmMjUNZ+73VfT8MJ_%sw5fYKG*wG*-tED^-qt36qtFDWa2h_N&eU5Z&-emw66+VEa#ay4YfKCf+gSaZ38xUWmtkwBVy$!7bR2kBJv=XUAbAYhDEaYm!d9vvrLFCfdeb%TA=6uh?VL2%r@B8CcuwwqhzD4NC=#g4=hVMnsh7!9^zn7weRCZXQCwCwE#%KG-duQG7-F%DG3+U5wfd-$9+tRLJm3QSYxknMk+_egc3*=ucgG%F+Z52+mFfL^AekG2Kdfxd-NafGUNa@RwaX%GSmp4f+@XLDpX$dV^YfpL_yJmY?@+n?-7=J_zXcH@kDnuRJjc#92Cpz-dbQR%&mWt55ZE#+Aqe@xSa=KgAeW3EQ^^@v6GMWgWcMJu^xV!a6!x3V*Lm9DB#F2g!Pqer@mE*TfgdVFZ$3ys9Ve4dfExPQ45nE@%LDyJNZ6XZrqXAzD7$Ch+r#GdW=rJp#n?DnTWM!s*Dp!Px*Hn-@Pp^^fVEdWNtsk?-*r@WvWwy6!-SX8RQV&XH-cvu$Y-gY%hC=sV3CJY7ZWVa9DnmST3Cw=8!2xd9$NXfq8#zz@up$v7BZYE386#w$$X6cEqC?P4-$hTGXZvr?HSMKDqKsj7$D-eaW3=FCL!4wdMxXjnpy26%#ykyThhe$53q2YpUwmfSP&jpZ83qh?abw-&z!xcYJzrj^R#vbs5^w!URUWSfLEr9+2WhGZB7*=_sDmsr6d@gBW-u%vEKjJakNgVC@3+$8-3sFy=FqEbWdVs!n4HL7*w-CL^Bd*_*!HjXCfUhE!TU&fV5fBHvx@w_JgNs$YX?*+g*sHq%cG%hHJSLVeUG@hqR2GEqvDn%=%pURd6BD55&JAA*k?QkE6d!u4WYu5hCswWepG7PVw&xwggRJ7-Fehk^!Y?!v6_xEe7XYctx-jGaqWrNa',
                amount: amount,
                address: address
            });

            return response.data;
        }
        catch (e)
        {
            return null;
        }
    }
};