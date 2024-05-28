import StocksMoreCalculate from './StocksMoreCalculate'
import {mathCalculate} from './MathCalculate'

/**
 * 多次買入計算模組
 * @author chi030
 * @extends StocksMoreCalculate 基礎計算模組
 * @version 1.0.0
 */
export default class StocksMixCalculate extends StocksMoreCalculate {

    /**
     * @constructor 多次買入計算模組建構式
     * @param {Object} [calculateDefaultParameter] 預設參數Object
     * @param {Number} [calculateDefaultParameter.price] 預設成交價
     * @param {Number} [calculateDefaultParameter.numberOfPiles] 預設股數
     * @param {Number} [calculateDefaultParameter.chargeRate] 預設手續費收取比例，四捨五入至小數第2位，預設1.425(千分比)
     * @param {Number} [calculateDefaultParameter.chargeDiscount]  預設手續費折扣
     * @param {Number} [calculateDefaultParameter.boardLotLowestCharge] 預設整股最低手續費
     * @param {Number} [calculateDefaultParameter.oddLotLowestCharge] 預設零股手續費
     * @param {Number} [calculateDefaultParameter.type] 預設股票類別
     * @param {Number} [calculateDefaultParameter.otherTransactionLevy] 預設其他費用金額
     */
    constructor(calculateDefaultParameter = {
        price: 0,
        numberOfPiles: 0,
        chargeRate: 1.425,
        chargeDiscount: 6,
        boardLotLowestCharge: 20,
        oddLotLowestCharge: 1,
        type: 0,
        otherTransactionLevy: 0
    }) {
        super();
        const {
            price, numberOfPiles, chargeRate, chargeDiscount, boardLotLowestCharge,
            oddLotLowestCharge, type, otherTransactionLevy
        } = calculateDefaultParameter;
        /**
         * 預設參數
         * @type {Object}
         */
        this.defaultParameter = {
            price: price || 0,
            numberOfPiles: numberOfPiles || 0,
            chargeRate: chargeRate || 1.425,
            chargeDiscount: chargeDiscount || 6,
            boardLotLowestCharge: boardLotLowestCharge || 20,
            oddLotLowestCharge: oddLotLowestCharge || 1,
            type: type || 0,
            otherTransactionLevy: otherTransactionLevy || 0
        };
        /**
         * 總股數
         * @type {Number}
         */
        this.numberOfPilesCount = 0;
        /**
         * 記錄每筆買入手續費的陣列
         * @type {Array}
         */
        this.buyChargeArray = [];
        /**
         * 記錄每筆買入其他費用的陣列
         * @type {Array}
         */
        this.otherTransactionLevy = [];
        /**
         * 記錄每筆買入價金的陣列
         * @type {Array}
         */
        this.costPriceArray = [];
        /**
         * 記錄每筆買入均價的陣列
         * @type {Array}
         */
        this.averagePriceArray = [];
        /**
         * 記錄每筆買入成本的陣列
         * @type {Array}
         */
        this.carryingCostsArray = [];
        /**
         * 總和買入均價
         * @type {Number}
         */
        this.mixBuyAveragePrice = 0;
        /**
         * 總成本金額
         * @type {Number}
         */
        this.mixBuyTotalPrice = 0;
    }

    /**
     * 設定預設參數
     * @param {Object} [calculateDefaultParameter] 預設參數Object
     * @param {Number} [calculateDefaultParameter.price] 預設成交價
     * @param {Number} [calculateDefaultParameter.numberOfPiles] 預設股數
     * @param {Number} [calculateDefaultParameter.chargeRate] 預設手續費收取比例，四捨五入至小數第2位，預設1.425(千分比)
     * @param {Number} [calculateDefaultParameter.chargeDiscount]  預設手續費折扣
     * @param {Number} [calculateDefaultParameter.boardLotLowestCharge] 預設整股最低手續費
     * @param {Number} [calculateDefaultParameter.oddLotLowestCharge] 預設零股手續費
     * @param {Number} [calculateDefaultParameter.type] 預設股票類別
     * @param {Number} [calculateDefaultParameter.otherTransactionLevy] 預設其他費用金額
     */
    setDefaultParameter(calculateDefaultParameter = {
        price: 0,
        numberOfPiles: 0,
        chargeRate: 1.425,
        chargeDiscount: 6,
        boardLotLowestCharge: 20,
        oddLotLowestCharge: 1,
        type: 0,
        otherTransactionLevy: 0
    }) {
        const {
            price, numberOfPiles, chargeRate, chargeDiscount, boardLotLowestCharge,
            oddLotLowestCharge, type, otherTransactionLevy
        } = calculateDefaultParameter;
        this.defaultParameter = {
            price: price || 0,
            numberOfPiles: numberOfPiles || 0,
            chargeRate: chargeRate || 1.425,
            chargeDiscount: chargeDiscount || 6,
            boardLotLowestCharge: boardLotLowestCharge || 20,
            oddLotLowestCharge: oddLotLowestCharge || 1,
            type: type || 0,
            otherTransactionLevy: otherTransactionLevy || 0
        };
    }
    /**
     * @callback calculateFunction
     * @param {Object} data 計算值物件
     */

    /**
     * 計算多次購買的總金額、均價、總股數、每筆的持有成本(Array)
     * @param {Array} priceNumberOfPilesArray 由價格、股數等構成的陣列\
     * priceNumberOfPilesArray屬性預設值如下：
     * - price：1  -Number
     * - numberOfPiles：1  -Number
     * - chargeDiscount：6  -Number
     * - boardLotLowestCharge：20  -Number
     * - oddLotLowestCharge：1  -Number
     * - type：0  -Number
     * - otherTransactionLevy：0  -Number
     * @param {calculateFunction} calculateFunction 計算方法
     */
    multipleBuyCalculate(priceNumberOfPilesArray = [{
        price: 0,
        numberOfPiles: 0,
        chargeRate: 1.425,
        chargeDiscount: 6,
        boardLotLowestCharge: 20,
        oddLotLowestCharge: 1,
        type: 0,
        otherTransactionLevy: 0
    }], calculateFunction) {
        const {
            price, numberOfPiles, chargeRate, chargeDiscount, boardLotLowestCharge,
            oddLotLowestCharge, type, otherTransactionLevy
        } = this.defaultParameter;
        priceNumberOfPilesArray.map(data => {
            data.price === undefined ? data.price = price : data.price;
            data.numberOfPiles === undefined ? data.numberOfPiles = numberOfPiles : data.numberOfPiles;
            data.chargeRate === undefined ? data.chargeRate = chargeRate : data.chargeRate;
            data.chargeDiscount === undefined ? data.chargeDiscount = chargeDiscount : data.chargeDiscount;
            data.boardLotLowestCharge === undefined ? data.boardLotLowestCharge = boardLotLowestCharge : data.boardLotLowestCharge;
            data.oddLotLowestCharge === undefined ? data.oddLotLowestCharge = oddLotLowestCharge : data.oddLotLowestCharge;
            data.type === undefined ? data.type = type : data.type;
            data.otherTransactionLevy === undefined ? data.otherTransactionLevy = otherTransactionLevy : data.otherTransactionLevy;
            calculateFunction(data);
        })
    }

    /**
     * 計算多次購買的總金額、均價、總股數、每筆的持有成本(Array)
     * @param {Array<Object>} priceNumberOfPilesArray 由價格、股數等構成的陣列，說明如下
     * - price：購買價格，預設1元
     * - numberOfPiles：購買故數，預設1股
     * - chargeDiscount：手續費折扣，ex:手續費6折，預設6折
     * - boardLotLowestCharge：最低整股手續費，預設20元
     * - oddLotLowestCharge：最低零股手續費，預設1元
     * - type：交易類別，預設普通(0)
     * - otherTransactionLevy：其他費用，預設0元
     * @param {?String | ?Number} value 要取得的值，說明如下
     * - "all" or 0：取以下所有(object)
     * - "buyCharge" or 1：取每筆的買入手續費(Array)
     * - "costPrice" or 2：取每筆的買入價金(Array)
     * - "otherTransactionLevy" or 3：取每筆的買入其他費用(Array)
     * - "averagePrice" or 4：取每筆買入均價(Array)
     * - "carryingCosts" or 5：取每筆的持有成本(Array)
     * - "numberOfPiles" or 6：取總股數
     * - "totalPrice" or 7：取成本總金額
     * - "totalAveragePrice" or 8：取成本均價
     * @returns 各項計算後的結果
     * @example
     * let priceNumberOfPilesArray = [
     *      {
     *          price: 10,
     *          numberOfPiles: 20,
     *          setChargeRate: 1.425,
     *          chargeDiscount: 6,
     *          boardLotLowestCharge: 20,
     *          oddLotLowestCharge: 1,
     *          type: 0,
     *          otherTransactionLevy: 0
     *      }
     * ]
     * const stocksMoreCalculate = new StocksMoreCalculate()
     * const data = stocksMoreCalculate.multipleBuyCalculate(priceNumberOfPilesArray, "all")
     *      ...
     */
    getMultipleBuyValue(priceNumberOfPilesArray, value = "all" || 0) {
        this.multipleBuyCalculate(priceNumberOfPilesArray, data => {
            this.numberOfPilesCount += data.numberOfPiles;
            this.setCostPrice(data.price, data.numberOfPiles);
            this.setChargeRate(data.chargeRate);
            this.setChargeDiscount(data.chargeDiscount);
            this.setLowestCharge(data.boardLotLowestCharge, data.oddLotLowestCharge);
            this.setBuyOtherTransactionLevy(data.otherTransactionLevy);
            this.buyChargeArray.push(this.getBuyCharge());
            this.costPriceArray.push(this.getCostPrice());
            this.otherTransactionLevy.push(this.getBuyOtherTransactionLevy())
            this.averagePriceArray.push(this.getAveragePrice());
            this.carryingCostsArray.push(this.getCarryingCosts());
        });
        // switch (value) {
        //     default: case "all": case 0:
        //         return {
        //             buyCharge: this.getMultipleBuyChargeArray(),
        //             costPrice: this.getMultipleBuyCostPriceArray(),
        //             averagePriceArray: this.getMultipleBuyAveragePriceArray(),
        //             carryingCosts: this.getMultipleBuyCarryingCostsArray(),
        //             totalNumberOfPiles: this.getMultipleBuyTotalNumberOfPiles(),
        //             totalPrice: this.getMultipleBuyPrice(),
        //             totalAveragePrice: this.getMultipleBuyAveragePrice(),
        //         }
        //     case "buyCharge": case 1:
        //         return this.getMultipleBuyChargeArray();
        //     case "costPrice": case 2:
        //         return this.getMultipleBuyCostPriceArray();
        //     case "otherTransactionLevy": case 3:
        //         return this.getMultipleBuyOtherTransactionLevyArray();
        //     case "averagePrice": case 4:
        //         return this.getMultipleBuyAveragePriceArray();
        //     case "carryingCosts": case 5:
        //         return this.getMultipleBuyCarryingCostsArray();
        //     case "totalnumberOfPiles": case 6:
        //         return this.getMultipleBuyTotalNumberOfPiles();
        //     case "totalPrice": case 7:
        //         return this.getMultipleBuyPrice();
        //     case "totalAveragePrice": case 8:
        //         return this.getMultipleBuyAveragePrice();
        // }
        return this;
    }

    /**
     * 多次買入總股數
     * @returns 總股數
     */
    getMultipleBuyTotalNumberOfPiles() {
        return this.numberOfPilesCount;
    }

    /**
     * 多次買入買入手續費
     * @returns 買入手續費(Array)
     */
    getMultipleBuyChargeArray() {
        return this.buyChargeArray;
    }

    /**
     * 多次買入買入價金
     * @returns 買入價金(Array)
     */
    getMultipleBuyCostPriceArray() {
        return this.costPriceArray;
    }

    /**
     * 多次買入其他費用
     * @returns 其他費用(Array)
     */
    getMultipleBuyOtherTransactionLevyArray() {
        return this.otherTransactionLevy;
    }

    /**
     * 多次買入均價
     * @returns 均價(Array)
     */
    getMultipleBuyAveragePriceArray() {
        return this.averagePriceArray;
    }

    /**
     * 多次買入成本總金額
     * @returns 成本總金額
     */
    getMultipleBuyPrice() {
        return mathCalculate.sumFloat(...this.carryingCostsArray);
    }

    /**
     * 多次買入成本均價
     * @returns 成本均價
     */
    getMultipleBuyAveragePrice() {
        return mathCalculate.round(this.mixBuyTotalPrice / this.numberOfPilesCount, 6);
    }

    /**
     * 多次買入成本，每筆成本獨立
     * @returns 成本均價(Array)
     */
    getMultipleBuyCarryingCostsArray() {
        return this.carryingCostsArray;
    }
}
