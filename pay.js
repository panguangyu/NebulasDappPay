'use strict'

const ADMIN_ADDRESS = "n1MsdXauB5jKKjMjeSXw3FcJbCR275LLaar";
const ADMIN_ADDRESS2 = "n1MsdXauB5jKKjMjeSXw3FcJbCR275LLaar";

//手续费
const TAX = new BigNumber(0.1);

var PayItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.sellerWallet = obj.sellerWallet;
		this.sellerName = obj.sellerName;
    }
}

var InfoItem = function(text){
    if(text){
        var obj = JSON.parse(text);
		this.sellerName = obj.sellerName
        this.sellerWallet = obj.sellerWallet;
    }
}

var PayContract = function () {
    //user's game data

    LocalContractStorage.defineMapProperty(this, "seller");
	

	LocalContractStorage.defineMapProperty(this, "savepay");
}

PayContract.prototype = {
	
	init:function(){
		
	},
	
	saveSeller:function(sellerName, sellerWallet){
		
	 	if(!sellerName || !sellerWallet){
            throw new Error("empty information");
        }

        var payitem = this.seller.get(sellerWallet);
		
        if(payitem){
            throw new Error("trade has been occupied");
        }

        payitem = new PayItem();
		payitem.sellerWallet = sellerWallet;
        payitem.sellerName = sellerName;			

        this.seller.put(sellerWallet, payitem);		// 保存卖家信息	
		
		
		return "提交成功";

	},
	
	savePay:function(sellerName, sellerWallet) {
		
		if(!sellerName || !sellerWallet){
            throw new Error("empty information");
        }
		
		var info = new InfoItem();
		info.sellerWallet = sellerWallet;
		info.sellerName = sellerName;
		
		this.savepay.put(sellerWallet, info);
		
	},
	
	getPay:function(sellerWallet) {
		
		if(!sellerWallet){
            throw new Error("empty trade");
        }

        return this.savepay.get(sellerWallet);
	},
	
	payNas:function(nas, sellerWallet) {
		
		    var fromUser = Blockchain.transaction.from,
            ts = Blockchain.transaction.timestamp,
            txhash = Blockchain.transaction.hash,
            value = Blockchain.transaction.value;
		
		//收取手续费
        Blockchain.transfer(ADMIN_ADDRESS, value.times(TAX).div(2));
		
//var naspay = nas*1000000000000000000;
		var nas1 = new BigNumber(parseInt((nas*1000000000000000000)-(value.times(TAX).div(2))));
       // Blockchain.transfer(address, nas1);
		//var nas1 = new BigNumber(naspay);
        Blockchain.transfer(sellerWallet, nas1);

		return "支付NAS成功";
		
	},
	
	get:function(sellerWallet) {
		
		if(!sellerWallet){
            throw new Error("empty trade");
        }

        return this.seller.get(sellerWallet);
		
	},  
	
}


module.exports = PayContract;