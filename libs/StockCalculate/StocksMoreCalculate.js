import Stocks from './Stocks'
/**
 * 進階計算功能模組
 * @author chi030
 * @extends Stocks 基礎計算模組
 * @version 1.0.0
 */
export default class StocksMoreCalculate extends Stocks {

    /**
     * @constructor 進階計算功能模組建構式
     * @param {Object} [valueObject] 輸入市價、成交價、購買股數、手續費折扣、股票類別所構成的Object(與父類別相同)
     * @param {Object} [calculateParameter] 計算屬性
     * @param {Boolean} [calculateParameter.isNeglectBuyCharge] 是否忽略買入手續費
     * @param {Number} [calculateParameter.carryingCosts] 直接設定持有成本
     */
    constructor(
        valueObject,
        calculateParameter = {
            isNeglectBuyCharge: false,
            carryingCosts: undefined
        }
    ) {
        super(valueObject)
        /**
         * 是否忽略買入手續費
         * @type {Boolean}
         */
        this.isNeglectBuyCharge = calculateParameter.isNeglectBuyCharge || false;
        /** 
         * 直接設定持有成本
         * @type {Number}
         */
        this.carryingCosts = calculateParameter.carryingCosts !== undefined ? calculateParameter.carryingCosts : 1;
        /**
         * 是否有設定持有成本
         * @type {Boolean}
         */
        this.carryingCostsSetting = calculateParameter.carryingCosts !== undefined ? true : false;
    }

    /**
     * 設置是否忽略買入手續費
     * @param {Boolean} isNeglect 是否忽略
     */
    setIsNeglectBuyCharge(isNeglect) {
        this.isNeglectBuyCharge = Boolean(isNeglect);
    }

    /**
     * 取得成交均價
     * 1.均價：取小數點後2位四捨五入((買進成交價金+手續費)/股數)\
     * 2.如果：購買價金、手續費、股數為0，則均價為0元
     * @returns 成交均價
     * @override
     */
    getAveragePrice() {
        const buyCharge = this.isNeglectBuyCharge ? 0 : this.getBuyCharge();
        if (this.getCostPrice() + buyCharge + this.getNumberOfPiles() !== 0) {
            return Math.round(((this.getCostPrice() + buyCharge) / this.getNumberOfPiles()) * 100) / 100;
        } else {
            return 0;
        }
    }

    /**
     * 設定持有成本，預設值為1元
     * @param {Number} carryingCosts 持有成本
     */
    setCarryingCosts(carryingCosts = 1) {
        this.carryingCosts = typeof carryingCosts !== undefined ? carryingCosts : 1;
        this.carryingCostsSetting = true;
    }

    /**
     * 取得持有成本，取個位數四捨五入(買進成交價金 + 手續費)
     * @returns 持有成本
     * @override
     */
    getCarryingCosts() {
        if (this.carryingCostsSetting) return this.carryingCosts;
        const buyCharge = this.isNeglectBuyCharge ? 0 : this.getBuyCharge();
        return Math.round(((this.getCostPrice() + buyCharge) * 100) / 100);
    }

    /**
     * 取得應付損益(預估收入 - 持有成本)
     * @returns 應付損益
     * @override
     */
    getProfitAndLoss() {
        return this.getAnticipatedRevenue() - this.getCarryingCosts();
    }

    /**
     * 取得報酬率(預估收入 - 持有成本 / 100)
     * @returns 報酬率
     * @override
     */
    getProfitAndLossPercentage() {
        if (this.getCarryingCosts() !== 0) return Math.round(this.getProfitAndLoss() / this.getCarryingCosts() * 100 * 100) / 100;
        return Infinity;
    }
}
