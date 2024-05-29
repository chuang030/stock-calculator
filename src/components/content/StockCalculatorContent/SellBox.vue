<script setup>
import { reactive, watchEffect } from 'vue'
import PriceButtonController from './PriceButtonController.vue'

const props = defineProps({
    marketCosts: {
        type: Number
    }
})

const emit = defineEmits(['update'])

const calculationData = reactive({
    marketCosts: null,
})

watchEffect(() => {
    calculationData.marketCosts = props.marketCosts
})

watchEffect(() => {
    if (calculationData.marketCosts < 0)
        calculationData.marketCosts = 0

    emit('update', { marketCosts: calculationData.marketCosts })
})

const priceUpdate = (data) => {
    calculationData.marketCosts = data
}
const valueClear = (data) => {
    calculationData.marketCosts = data.newPrice
}

</script>

<template>
    <div class="sell-box theme-style-box">
        <div class="title-box">
            <h4>賣出</h4>
        </div>
        <div class="input-box">
            <div class="input-box-class">
                <label for="marketCosts">賣價：</label>
                <input type="number" id="marketCosts" 
                    v-model.number="calculationData.marketCosts">
                <span>元</span>
            </div>
            <PriceButtonController 
                :inputPrice="calculationData.marketCosts"
                @priceUpdate="priceUpdate" @valueClear="valueClear" />
        </div>
    </div>
</template>