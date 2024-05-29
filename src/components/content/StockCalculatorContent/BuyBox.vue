<script setup>
import { reactive, watchEffect } from 'vue'
import PriceButtonController from './PriceButtonController.vue'

const emit = defineEmits(['update'])

const calculationData = reactive({
    buyBoardLot: null,
    buyOddLot  : null,
    sharePrice : null,
})

watchEffect(() => {
    if (calculationData.buyBoardLot < 0)
        calculationData.buyBoardLot = 0

    if (calculationData.buyOddLot < 0)
        calculationData.buyOddLot = 0

    if (calculationData.buyOddLot > 999)
        calculationData.buyOddLot = 999

    if (calculationData.sharePrice < 0)
        calculationData.sharePrice = 0

    emit('update', {
        buyBoardLot: calculationData.buyBoardLot,
        buyOddLot  : calculationData.buyOddLot,
        sharePrice : calculationData.sharePrice,
    })
})

const priceUpdate = (data) => {
    calculationData.sharePrice = data
}

const valueClear = (data) => {
    calculationData.buyBoardLot = data.buyBoardLot
    calculationData.buyOddLot   = data.buyOddLot
    calculationData.sharePrice  = data.newPrice
}


</script>

<template>
    <div class="buy-box theme-style-box">
        <div class="title-box">
            <h4>買入</h4>
        </div>
        <div class="input-box">
            <div class="input-box-class">
                <label for="buyBoardLot">整股：</label>
                <input type="number" id="buyBoardLot"
                    v-model.number="calculationData.buyBoardLot">
                <span>張</span>
            </div>
            <div class="input-box-class">
                <label for="buyOddLot">零股：</label>
                <input type="number" id="buyOddLot"
                    v-model.number="calculationData.buyOddLot">
                <span>股</span>
            </div>
            <div class="input-box-class">
                <label for="sharePrice">買價：</label>
                <input type="number" id="sharePrice"
                    v-model.number="calculationData.sharePrice">
                <span>元</span>
            </div>
            <PriceButtonController 
                :inputPrice="calculationData.sharePrice"
                 @priceUpdate="priceUpdate" @valueClear="valueClear"/>
        </div>
    </div>
</template>