export const mathCalculate = {
    /**
     * 四捨五入
     * @param {Number} number 欲計算的值
     * @param {Number} [decimal] 取到小數點後多少位
     * @returns 計算完的值
     */
    round: (number, decimal = 0) => {
        return Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
    },
    /**
     * 無條件進位
     * @param {Number} number 欲計算的值
     * @param {Number} [decimal] 取到小數點後多少位
     * @returns 計算完的值
     */
     ceil: (number, decimal = 0) => {
        return Math.ceil(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
    },
    /**
     * 無條件捨去
     * @param {Number} number 欲計算的值
     * @param {Number} [decimal] 取到小數點後多少位
     * @returns 計算完的值
     */
     floor: (number, decimal = 0) => {
        return Math.floor(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
    },
    /**
     * 浮點數相加計算
     * @param  {...Number} number 欲計算的值
     * @returns 計算完的值
     */
    sumFloat(...number){
        let value = 0;
        number.map(v => {
            value = parseFloat((value += v).toPrecision(12));
        })
        return value
    }
}