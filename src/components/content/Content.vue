<script setup>
import { reactive, watchEffect } from 'vue';
import SettingBox from './SettingBox.vue';
import SttingInstruction from './SttingInstruction.vue';
import BuyBox from './BuyBox.vue';
import SellBox from './SellBox.vue';
import DiscountAndTypeBox from './DiscountAndTypeBox.vue';
import DetailBox from './DetailBox.vue';

import { StocksMoreCalculate } from '../../../libs/StockCalculate/main'

const emit = defineEmits(["resultUpdate"])

const calculationData = reactive({
    buyBoardLot             : null,
    buyOddLot               : null,
    sharePrice              : null,
    buyDiscount             : 6,
    stockType               : "普通",
    boardLotBaseCharge      : 20,
    oddLottBaseCharge       : 1,
    buyCharge               : null,
    carryingCosts           : null,
    costPrice               : null,
    sellCharge              : null,
    averagePrice            : null,
    taxes                   : null,
    marketCosts             : null,
    marketValue             : null,
    anticipatedRevenue      : null,
    profitAndLoss           : null,
    profitAndLossPercentage : null,
    isNeglectCharge         : false
})

const modelBox = reactive({
    simple                  : true,
    full                    : false,
    sttingInstructionIsShow : false
})

const sc = new StocksMoreCalculate()

watchEffect(() => {
    sc.setIsNeglectBuyCharge(calculationData.isNeglectCharge)
    sc.setType(calculationData.stockType)
    sc.setNumberOfPilesDetailed(calculationData.buyBoardLot, calculationData.buyOddLot)
    sc.setCost(calculationData.sharePrice)
    sc.setMarketPrice(calculationData.marketCosts)
    sc.setLowestCharge(calculationData.boardLotBaseCharge, calculationData.oddLottBaseCharge)
    sc.setChargeDiscount(calculationData.buyDiscount)
    calculationData.buyCharge               = sc.getBuyCharge();
    calculationData.carryingCosts           = sc.getCarryingCosts();
    calculationData.costPrice               = sc.getCostPrice();
    calculationData.sellCharge              = sc.getSellCharge();
    calculationData.averagePrice            = sc.getAveragePrice();
    calculationData.taxes                   = sc.getTaxes();
    calculationData.marketValue             = sc.getMarketValue();
    calculationData.anticipatedRevenue      = sc.getAnticipatedRevenue();
    calculationData.profitAndLoss           = sc.getProfitAndLoss();
    calculationData.profitAndLossPercentage = sc.getProfitAndLossPercentage();

    emit('resultUpdate', {
        profitAndLoss: calculationData.profitAndLoss,
        profitAndLossPercentage: calculationData.profitAndLossPercentage
    })
})

const settingBoxUpdate = (data) => {
    modelBox.simple                  = data.simple
    modelBox.full                    = data.full
    modelBox.sttingInstructionIsShow = data.sttingInstructionIsShow
}

const otherUpdate = (data) => {
    calculationData.isNeglectCharge = data.isNeglectCharge
}

const stocksDataUpdate = (data) => {
    calculationData.marketCosts = data.price
}

const buyBoxUpdate = (data) => {
    calculationData.buyBoardLot = data.buyBoardLot
    calculationData.buyOddLot   = data.buyOddLot
    calculationData.sharePrice  = data.sharePrice
}

const sellBoxUpdate = (data) => {
    calculationData.marketCosts = data.marketCosts
}

const discountUpdate = (data) => {
    calculationData.buyDiscount        = data.buyDiscount
    calculationData.boardLotBaseCharge = data.boardLotBaseCharge
    calculationData.oddLottBaseCharge  = data.oddLottBaseCharge
}

const stockTypeUpdate = (data) => {
    calculationData.stockType = data
}

</script>

<template>
    <div id="content" class="content">
        <SettingBox
            @modelUpdate="settingBoxUpdate"
            @otherUpdate="otherUpdate"
            @stocksDataUpdate="stocksDataUpdate" />
        <SttingInstruction :isShow="modelBox.sttingInstructionIsShow" />
        <BuyBox @update="buyBoxUpdate" />
        <SellBox 
            @update="sellBoxUpdate"
            :marketCosts="calculationData.marketCosts" />
        <DiscountAndTypeBox 
            :modelBox="modelBox"
            :buyDiscount="calculationData.buyDiscount"
            :boardLotBaseCharge="calculationData.boardLotBaseCharge"
            :oddLottBaseCharge="calculationData.oddLottBaseCharge"
            :stockType="calculationData.stockType"
            @discountUpdate="discountUpdate"
            @stockTypeUpdate="stockTypeUpdate"
        />
        <DetailBox :data="calculationData"/>
    </div>
</template>
