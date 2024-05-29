<script setup>
import { reactive, watchEffect } from 'vue';

const props = defineProps({
    modelBox: {
        type: Object
    },
    buyDiscount: {
        type: Number
    },
    boardLotBaseCharge: {
        type: Number
    },
    oddLottBaseCharge: {
        type: Number
    },
    stockType: {
        type: String,
        default: "普通"
    }
});

const emit = defineEmits([
    'discountUpdate', 
    'stockTypeUpdate'
]);

const calculationData = reactive({
    buyDiscount       : null,
    boardLotBaseCharge: null,
    oddLottBaseCharge : null,
});

const modelBox = reactive({
    simple                  : true,
    full                    : false,
    sttingInstructionIsShow : false
});

const stockTypeData = reactive({
    commonStocks        : true,
    dayTrading          : false,
    exchangeTradedFunds : false,
    selected            : null
});

watchEffect(() => {
    modelBox.simple                    = props.modelBox.simple
    modelBox.full                      = props.modelBox.full
    modelBox.sttingInstructionIsShow   = props.modelBox.sttingInstructionIsShow
    calculationData.buyDiscount        = props.buyDiscount
    calculationData.boardLotBaseCharge = props.boardLotBaseCharge
    calculationData.oddLottBaseCharge  = props.oddLottBaseCharge
    stockTypeData.selected             = props.stockType
});

const isCheckboxItem = (v) => {
    switch (v) {
        case "普通":
            stockTypeData.commonStocks        = true;
            stockTypeData.dayTrading          = false;
            stockTypeData.exchangeTradedFunds = false;
            break;
        case "當沖":
            stockTypeData.commonStocks        = false;
            stockTypeData.dayTrading          = true;
            stockTypeData.exchangeTradedFunds = false;
            break;
        case "ETF":
            stockTypeData.commonStocks        = false;
            stockTypeData.dayTrading          = false;
            stockTypeData.exchangeTradedFunds = true;
            break;
    }
    stockTypeData.selected = v;
}

watchEffect(() => {
    if (calculationData.buyDiscount < 0)
        calculationData.buyDiscount = 0

    if (calculationData.buyDiscount > 100)
        calculationData.buyDiscount = 100
    
    if (calculationData.boardLotBaseCharge < 0)
        calculationData.boardLotBaseCharge = 0

    if (calculationData.oddLottBaseCharge < 0)
        calculationData.oddLottBaseCharge = 0

    emit("discountUpdate", {
        buyDiscount       : calculationData.buyDiscount,
        boardLotBaseCharge: calculationData.boardLotBaseCharge,
        oddLottBaseCharge : calculationData.oddLottBaseCharge,
    });
    emit("stockTypeUpdate", stockTypeData.selected);
});
</script>

<template>
    <div class="set-type-box theme-style-box">
        <div class="title-box">
            <h4>手續費及交易形式</h4>
        </div>
        <div class="discount-and-type-box">
            <div id="discount-box" class="set-type-box-class">
                <div class="set-type-box-class-item">
                    <p>手續費折扣</p>
                    <label for="buy-discount">折扣<span>：</span></label>
                    <input type="number" name="buy-discount" id="buy-discount"
                        v-model.number="calculationData.buyDiscount">
                    <span>折</span>
                </div>
                <div id="lowestCharge" class="set-type-box-class-item" :class="{ active: modelBox.full }">
                    <p>最低手續費</p>
                    <label for="Charge">整股<span>：</span></label>
                    <input type="number" id="boardLotBaseCharge" name="boardLotBaseCharge"
                        v-model.number="calculationData.boardLotBaseCharge">
                    <span>元</span>
                    <label for="Charge">零股<span>：</span></label>
                    <input type="number" id="oddLottBaseCharge" name="oddLottBaseCharge"
                        v-model.number="calculationData.oddLottBaseCharge">
                    <span>元</span>
                </div>
            </div>
            <div id="stock-type" class="set-type-box-class" :class="{ active: modelBox.full }">
                <p>交易形式</p>
                <form name="set-type-box-form" id="set-type-box-form">
                    <div class="form-item">
                        <label for="commonStocks" class="label-checkbox"
                            :class="{ active: stockTypeData.commonStocks }">普通</label>
                        <input type="radio" name="commonStocks" id="commonStocks" class="checkboxItem" value="普通"
                            v-model="stockTypeData.stockType" @click="isCheckboxItem('普通')">
                    </div>
                    <div class="form-item">
                        <label for="dayTrading" class="label-checkbox"
                            :class="{ active: stockTypeData.dayTrading }">當沖</label>
                        <input type="radio" name="dayTrading" id="dayTrading" class="checkboxItem" value="當沖"
                            v-model="stockTypeData.stockType" @click="isCheckboxItem('當沖')">
                    </div>
                    <div class="form-item">
                        <label for="exchangeTradedFunds" class="label-checkbox"
                            :class="{ active: stockTypeData.exchangeTradedFunds }">ETF</label>
                        <input type="radio" name="exchangeTradedFunds" id="exchangeTradedFunds" class="checkboxItem"
                            value="ETF" v-model="stockTypeData.stockType" @click="isCheckboxItem('ETF')">
                    </div>
                </form>
            </div>
        </div>
        <div class="type-detail-box" v-show="modelBox.full">
            <h4>證券交易稅</h4>
            <p>普通<span>：</span></p>
            <span>0.3%</span>
            <p>當沖<span>：</span></p>
            <span>0.15%</span>
            <p>ETF<span>：</span></p>
            <span>0.1%</span>
        </div>
    </div>
</template>
