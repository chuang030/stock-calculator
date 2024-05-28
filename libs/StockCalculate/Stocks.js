import typeJson from './stocksTaxes.json'
/**
 * 股票計算基礎模組
 * @author chi030
 * @version 1.0.1
 */
export default class Stocks {

    /**
     * @constructor 股價計算類別建構式
     * @param {Object} [valueObject] 輸入市價、成交價、購買股數、手續費折扣、股票類別所構成的Object
     * @param {Number} [valueObject.marketPrice] 輸入市價，預設為0元
     * @param {Number} [valueObject.sharePrice] 輸入成交價，預設為0元
     * @param {Number} [valueObject.numberOfPiles] 輸入購買股數，預設為0股
     * @param {Number} [valueObject.boardLotLowestNumberOfPiles] 輸入購買整股股數，預設為0股
     * @param {Number} [valueObject.oddLotLowestNumberOfPiles] 輸入購買零股股數，預設為0股
     * @param {Number} [valueObject.chargeRate] 輸入"手續費"收取比例，四捨五入至小數第2位，預設1.425(千分比)
     * @param {Number} [valueObject.chargeDiscount] 輸入手續費折扣，ex:手續費6折，輸入6，預設值為10(無折扣)
     * @param {Number} [valueObject.meansOfTransaction] 輸入交易方式(0整股、1零股)，控制純股數輸入計算模式(影響999股以上計算)，預設為0
     * @param {Number} [valueObject.boardLotLowestCharge] 整股最低手續費，預設20元
     * @param {Number} [valueObject.oddLotLowestCharge] 零股最低手續費，預設1元
     * @param {String | Number} [valueObject.type] 輸入股票類別，預設值為編號0：普通股票Common Stocks(縮寫CS)，輸入中文、英文全名、英文縮寫、編號皆可);，編號0：普通股票Common Stocks(縮寫CS)、編號1：當沖Day-Trading(縮寫DT)、編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
     * @param {Number} [valueObject.buyOtherTransactionLevy] 股票買入之其他費用，預設為0元
     * @param {Number} [valueObject.sellOtherTransactionLevy] 股票賣出之其他費用，預設為0元
     * - marketPrice：輸入市價，預設為0元
     * - sharePrice：輸入成交價，預設為0元
     * - numberOfPiles：輸入購買股數，預設為0股
     * - boardLotLowestNumberOfPiles：輸入購買整股股數，預設為0股(選填，並與numberOfPiles擇一輸入)
     * - oddLotLowestNumberOfPiles：輸入購買零股股數，預設為0股(選填，並與numberOfPiles擇一輸入)
     * - chargeDiscount：輸入手續費折扣，ex:手續費6折，輸入6，預設值為10(無折扣)
     * - meansOfTransaction：輸入交易方式(0整股、1零股)
     * - type：輸入股票類別，預設值為編號0
     * - 編號0：普通股票Common Stocks(縮寫CS)
     * - 編號1：當沖Day-Trading(縮寫DT)
     * - 編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)
     * - 編號3：權證Warrant
     * @example 
     * const obj = 
     *  {
            marketPrice: 100,
            sharePrice: 100,
            numberOfPiles: 100,
            boardLotLowestNumberOfPiles: 0,
            oddLotLowestNumberOfPiles: 0,
            chargeRate: 1.425,
            chargeDiscount: 10,
            meansOfTransaction: 0,
            boardLotLowestCharge: 20,
            oddLotLowestCharge: 1,
            type: 0
        }
        const stocks = new Stocks(obj);
     */
    constructor(
        valueObject = {
            marketPrice: 0,
            sharePrice: 0,
            numberOfPiles: 0,
            boardLotLowestNumberOfPiles: 0,
            oddLotLowestNumberOfPiles: 0,
            chargeRate: 1.425,
            chargeDiscount: 10,
            meansOfTransaction: 0,
            boardLotLowestCharge: 20,
            oddLotLowestCharge: 1,
            type: 0,
            buyOtherTransactionLevy: 0,
            sellOtherTransactionLevy: 0
        }
    ) {
        /**
         * 市價
         * @type {Number}
         */
        this.marketPrice = valueObject.marketPrice || 0;
        /**
         * 成交價
         * @type {Number}
         */
        this.sharePrice = valueObject.sharePrice || 0;
        /**
         * 股數(純股數輸入)
         * @type {Number}
         */
        this.numberOfPiles = valueObject.numberOfPiles || 0;
        /**
         * 整股張數(整股、零股分開輸入)
         * @type {Number}
         */
        this.boardLotLowestNumberOfPiles = (valueObject.boardLotLowestNumberOfPiles || 0) * 1000;
        /**
         * 零股股數(整股、零股分開輸入)
         * @type {Number}
         */
        this.oddLotLowestNumberOfPiles = valueObject.oddLotLowestNumberOfPiles || 0;
        /**
         * "手續費"收取比例(千分比)
         * @type {Number}
         */
        this.chargeRate = valueObject.chargeRate || 1.425;
        /**
         * 手續費折扣
         * @type {Number}
         */
        this.chargeDiscount = (valueObject.chargeDiscount || 10) / 10;
        /**
         * 整股最低手續費
         * @type {Number}
         */
        this.boardLotLowestCharge = valueObject.boardLotLowestCharge || 20;
        /**
         * 零股最低手續費
         */
        this.oddLotLowestCharge = valueObject.oddLotLowestCharge || 1;
        /**
         * 交易方式(0整股、1零股)
         * @type {Number}
         */
        this.meansOfTransaction = valueObject.meansOfTransaction || 0;
        /**
         * 股票類別
         * @type {Number | String}
         */
        this.type = valueObject.type || 0;
        /**
         * 股票買入之其他費用
         * @type {Number}
         */
        this.buyOtherTransactionLevy = valueObject.buyOtherTransactionLevy || 0;
        /**
         * 股票賣出之其他費用
         * @type {Number}
         */
        this.sellOtherTransactionLevy = valueObject.sellOtherTransactionLevy || 0;
    }

    /**
     * 設定成交價
     * 
     * 單純輸入成交價，不區分整股或零股
     * @param {Number} sharePrice 輸入成交價
     */
    setCost(sharePrice = 0) {
        this.sharePrice = sharePrice;
    }

    /**
     * 取得成交價
     * @returns {Number} 成交價
     */
    getCost() {
        return this.sharePrice;
    }

    /**
     * 設定股數
     * 
     * 單純輸入股數，不區分整股或零股，零股等於1000時會以整股最低手續費計算
     * @param {Number} numberOfPiles 輸入購買股數
     */
    setNumberOfPiles(numberOfPiles = 0) {
        this.numberOfPiles = numberOfPiles;
    }

    /**
     * 設定股數
     * 
     * 區分整股及零股，分別輸入，零股即使超過1000仍以零股最低手續費計算
     * @param {Number} boardLotLowestNumberOfPiles 輸入購買股數(整股)
     * @param {Number} oddLotLowestNumberOfPiles 輸入購買股數(零股)
     */
    setNumberOfPilesDetailed(boardLotLowestNumberOfPiles = 0, oddLotLowestNumberOfPiles = 0) {
        this.boardLotLowestNumberOfPiles = boardLotLowestNumberOfPiles * 1000 || 0;
        this.oddLotLowestNumberOfPiles = oddLotLowestNumberOfPiles || 0;
    }

    /**
     * 取得股數
     * 
     * 1.自動判斷以「單純輸入股數模式」或「整股、零股分別輸入模式」\
     * 2.單純輸入股數模式：回傳輸入股數\
     * 3.整股、零股分別輸入模式：回傳整股、零股加總股數
     * @returns 股數
     */
    getNumberOfPiles() {
        const numberOfPiles = (this.boardLotLowestNumberOfPiles) + this.oddLotLowestNumberOfPiles;
        if (numberOfPiles === 0 || numberOfPiles === null) return this.numberOfPiles;
        return numberOfPiles;
    }

    /**
     * 設定購買價金(市價、股數)
     * @param {Number} sharePrice 輸入成交價
     * @param {Number} numberOfPiles 輸入購買股數
     */
    setCostPrice(sharePrice = 0, numberOfPiles = 0) {
        this.sharePrice = sharePrice;
        this.numberOfPiles = numberOfPiles;
    }

    /**
     * 取得購買價金(買價*股數)
     * @returns 購買價金
     */
    getCostPrice() {
        return Math.round(this.sharePrice * this.getNumberOfPiles());
    }

    /**
     * 設定市價，單純輸入市價，不區分整股或零股
     * @param {Number} marketPrice 輸入市值
     */
    setMarketPrice(marketPrice) {
        this.marketPrice = marketPrice;
    }

    /**
     * 取得市價
     * @returns 市價
     */
    getMarketPrice() {
        return this.marketPrice;
    }

    /**
     * 設定市值
     * @param {Number} marketPrice 輸入市值
     * @param {Number} numberOfPiles 輸入市值
     */
    setMarketValue(marketPrice = 0, numberOfPiles = 0) {
        this.marketPrice = marketPrice;
        this.numberOfPiles = numberOfPiles;
    }

    /**
     * 取得市值(市價*股數)
     * @returns 市值
     */
    getMarketValue() {
        return Math.round(this.marketPrice * this.getNumberOfPiles());
    }

    /**
     * 設定交易方式
     * @param {Number} meansOfTransaction 輸入交易模式(0整股、1零股)
     */
    setMeansOfTransaction(meansOfTransaction = 0) {
        this.meansOfTransaction = meansOfTransaction;
    }

    /**
     * 取得交易方式
     * @returns 交易方式(0整股、1零股)
     */
    getMeansOfTransaction() {
        return this.meansOfTransaction;
    }

     /**
     * 設定整股最低手續費
     * @param {Number} boardLotLowestCharge 輸入整股最低手續費(預設20元)
     */
    setBoardLotLowestCharge(boardLotLowestCharge) {
        this.setLowestCharge(boardLotLowestCharge, undefined);
    }

    /**
     * 設定零股最低手續費
     * @param {Number} oddLotLowestCharge 輸入零股最低手續費(預設1元)
     */
    setOddLotLowestCharge(oddLotLowestCharge) {
        this.setLowestCharge(undefined, oddLotLowestCharge);
    }

    /**
     * 設定最低手續費
     * @param {Number} boardLotLowestCharge 輸入整股最低手續費(預設20元)
     * @param {Number} oddLotLowestCharge 輸入零股最低手續費(預設1元)
     */
    setLowestCharge(boardLotLowestCharge, oddLotLowestCharge) {
        if (boardLotLowestCharge != null || boardLotLowestCharge != undefined)
            this.boardLotLowestCharge = boardLotLowestCharge;
        if (oddLotLowestCharge != null || oddLotLowestCharge != undefined)
            this.oddLotLowestCharge = oddLotLowestCharge;
    }

    /**
     * 取得整股或零股(以設定之股票類型取得)最低手續費
     * @returns {Number} 整股或零股(以設定之股票類型取得)最低手續費
     */
    getLowestCharge() {
        if (this.meansOfTransaction === 0) return this.boardLotLowestCharge;
        return this.oddLotLowestCharge;
    }

    /**
     * 取得整股(以設定之股票類型取得)最低手續費
     * @returns {Number} 整股(以設定之股票類型取得)最低手續費
     */
    getBoardLotLowestCharge() {
        return this.boardLotLowestCharge;
    }

    /**
     * 取得零股(以設定之股票類型取得)最低手續費
     * @returns {Number} 零股(以設定之股票類型取得)最低手續費
     */
    getOddLotLowestCharge() {
        return this.oddLotLowestCharge;
    }

    /**
     * 設定手續費收取比例(千分比)
     * @param {Number} chargeRate 手續費收取比例(千分比)
     */
    setChargeRate(chargeRate = 1.425) {
        this.chargeRate = chargeRate;
    }

    /**
     * 取得手續費收取比例(千分比)
     * @returns 手續費收取比例(千分比)
     */
    getChargeRate() {
        return this.chargeRate;
    }

    /**
     * 設定手續費折扣\
     * EX：手續費6折，輸入6，預設值為10(無折扣)
     * @param {Number} chargeDiscount 輸入手續費折扣
     * @example
     * //設定手續費折扣6折
     * setChargeDiscount(6);
     */
    setChargeDiscount(chargeDiscount = 10) {
        this.chargeDiscount = chargeDiscount / 10;
    }

    /**
     * 取得手續費折扣
     * @returns 取得手續費折扣
     */
    getChargeDiscount() {
        return this.chargeDiscount;
    }

    /**
     * 取得手續費
     * @param {Number} price0 輸入價金或市值
     * @param {Number} price1 輸入買價或市價
     * 1.取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)\
     * 2.分別以「單純輸入股數模式」與「整股、零股分別輸入模式」進行計算\
     * 3.「單純輸入股數模式」下如果交易模式設為「整股」，則股數需要大於999股才會以整股手續費機算\
     * 4.如果手續費金額小於最低手續費則以最低手續費計算\
     * 5.如果輸入股數、買價為0，手續費為0
     * @returns {Number} 買進/賣出手續費
     */
    chargeSelector(price0, price1) {
        let charge = Math.floor(price0 * (this.chargeRate * this.chargeDiscount / 1000));
        let boardLotLowestCharge = Math.floor(this.boardLotLowestNumberOfPiles * price1 * (this.chargeRate * this.chargeDiscount / 1000));
        let oddLotLowestCharge = Math.floor(this.oddLotLowestNumberOfPiles * price1 * (this.chargeRate * this.chargeDiscount / 1000));
        let numberOfPiles = this.boardLotLowestNumberOfPiles + this.oddLotLowestNumberOfPiles;
        if (numberOfPiles === 0 || numberOfPiles === null) {
            //用單純輸入股數方式
            if (this.numberOfPiles === 0 || price1 === 0) return charge = 0;
            if (this.getMeansOfTransaction() === 0) {
                if (this.numberOfPiles < 1000) this.boardLotLowestCharge = this.oddLotLowestCharge;
                return charge <= this.boardLotLowestCharge ? this.boardLotLowestCharge : charge;
            } else {
                return charge <= this.oddLotLowestCharge ? this.oddLotLowestCharge : charge;
            }
        } else {
            //整股、零股分別輸入方式
            if (this.boardLotLowestNumberOfPiles !== 0 && price1 !== 0) {
                boardLotLowestCharge <= this.boardLotLowestCharge ? boardLotLowestCharge = this.boardLotLowestCharge : boardLotLowestCharge;
            } else {
                boardLotLowestCharge = 0;
            }
            if (this.oddLotLowestNumberOfPiles !== 0 && price1 !== 0) {
                oddLotLowestCharge <= this.oddLotLowestCharge ? oddLotLowestCharge = this.oddLotLowestCharge : oddLotLowestCharge;
            } else {
                oddLotLowestCharge = 0;
            }
            return boardLotLowestCharge + oddLotLowestCharge;
        }
    }

    /**
     * 取得買入手續費
     * 
     * 1.取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)\
     * 2.分別以「單純輸入股數模式」與「整股、零股分別輸入模式」進行計算\
     * 3.「單純輸入股數模式」下如果交易模式設為「整股」，則股數需要大於999股才會以整股手續費機算\
     * 4.如果手續費金額小於最低手續費則以最低手續費計算\
     * 5.如果輸入股數、買價為0，手續費為0
     * @returns {Number} 買入手續費
     */
    getBuyCharge() {
        return this.chargeSelector(this.getCostPrice(), this.getCost());
    }

    /**
     * 取得賣出手續費
     * 
     * 1.取個位數無條件捨去(買進、賣出成交價金x1.425x手續費折扣/1000)\
     * 2.分別以「單純輸入股數模式」與「整股、零股分別輸入模式」進行計算\
     * 3.「單純輸入股數模式」下如果交易模式設為「整股」，則股數需要大於999股才會以整股手續費機算\
     * 4.如果手續費金額小於最低手續費則以最低手續費計算\
     * 5.如果輸入股數、買價為0，手續費為0
     * @returns {Number} 賣出手續費
     */
    getSellCharge() {
        return this.chargeSelector(this.getMarketValue(), this.getMarketPrice());
    }

    /**
     * 設定股票類別
     * @param {Number|String} type 輸入股票類別，預設值為編號0：普通股票Common Stocks(縮寫CS)
     * 
     * 輸入中文、英文全名、英文縮寫、編號皆可\
     * 編號0：普通股票Common Stocks(縮寫CS)\
     * 編號1：當沖Day-Trading(縮寫DT)\
     * 編號2：指數股票型基金Exchange Traded Funds(縮寫ETF)\
     * 編號3：權證Warrant
     */
    setType(type = 0) {
        this.type = type;
    }

    /**
     * 取得股票類別
     * @returns 股票類別
     */
    getType() {
        return this.type;
    }

    /**
     * 取得股票證交稅金
     * 
     * 1.取個位數無條件捨去(市價x3/1000)\
     * 2.如果稅金金額小於1(即為0)則以最低稅金計算，最低稅金為1元\
     * 3.如果市價(賣價)為0，稅金為0元
     * @returns 稅金
     */
    getTaxes() {
        let rate = -1;
        let taxes = 0;
        const typeData = Object.values(typeJson)
        typeData.map(data => {
            if (data.typeName.includes(this.type)) rate = data.typeRate
        })
        if (rate === -1) {
            console.error(`value: ${this.type} is not defined`)
            return NaN;
        }
        taxes = Math.floor((this.getMarketValue() * rate / 1000))
        taxes <= 0 ? taxes = 1 : taxes;
        return this.getMarketPrice() !== 0 ? taxes : 0;
    }

    /**
     * 設定股票買入之其他費用
     * @param  {...Number} fee 其他費用
     */
    setBuyOtherTransactionLevy(...fee) {
        let buyOtherTransactionLevy = 0;
        fee.map(value => {
            buyOtherTransactionLevy += value;
        })
        this.buyOtherTransactionLevy = buyOtherTransactionLevy;
    }

    /**
     * 取得股票買入之其他費用
     * @returns 買入之其他費用
     */
    getBuyOtherTransactionLevy() {
        return this.buyOtherTransactionLevy;
    }

    /**
     * 設定股票賣出之其他費用
     * @param  {...Number} fee 其他費用
     */
    setSellOtherTransactionLevy(...fee) {
        let sellOtherTransactionLevy = 0;
        fee.map(value => {
            sellOtherTransactionLevy += value;
        })
        this.sellOtherTransactionLevy = sellOtherTransactionLevy;
    }

    /**
     * 取得股票賣出之其他費用
     * @returns 賣出之其他費用
     */
    getSellOtherTransactionLevy() {
        return this.sellOtherTransactionLevy;
    }

    /**
     * 取得成交均價
     * 
     * 1.均價：取小數點後2位四捨五入((買進成交價金+手續費)/股數)\
     * 2.如果：購買價金、手續費、股數為0，則均價為0元
     * @returns 成交均價
     */
    getAveragePrice() {
        if (this.getCostPrice() + this.getBuyCharge() + this.getNumberOfPiles() !== 0) {
            return Math.round(((this.getCostPrice() + this.getBuyCharge() + this.getBuyOtherTransactionLevy()) / this.getNumberOfPiles()) * 100) / 100;
        } else {
            return 0;
        }
    }

    /**
     * 取得持有成本
     * 
     * 取個位數四捨五入(買進成交價金 + 手續費 + 其他費用)
     * @returns 持有成本
     */
    getCarryingCosts() {
        return Math.round(((this.getCostPrice() + this.getBuyCharge() + this.getBuyOtherTransactionLevy()) * 100) / 100);
    }

    /**
     * 取得預估收入
     * 
     * 取個位數四捨五入(市值 - 手續費 - 稅金)
     * @returns 預估收入
     */
    getAnticipatedRevenue() {
        return Math.round(((this.getMarketValue() - this.getSellCharge() - this.getTaxes() - this.getSellOtherTransactionLevy()) * 100) / 100);
    }

    /**
     * 取得應付損益
     * 
     * 預估收入 - 持有成本
     * @returns 應付損益
     */
    getProfitAndLoss() {
        return this.getAnticipatedRevenue() - this.getCarryingCosts();
    }

    /**
     * 取得報酬率
     * 
     * 預估收入 - 持有成本 / 100
     * @returns 報酬率
     */
    getProfitAndLossPercentage() {
        if (this.getCarryingCosts() !== 0) {
            return Math.round(this.getProfitAndLoss() / this.getCarryingCosts() * 100 * 100) / 100;
        } else {
            return Infinity;
        }
    }
}
