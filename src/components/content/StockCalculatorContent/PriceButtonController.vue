<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    inputPrice: {
        type: Number
    }
})
const emit = defineEmits(['priceUpdate', 'valueClear']);

const price = ref(null);

watchEffect(() => {
    price.value = props.inputPrice
})

const priceLevel = (price) => {
    if (price <= 10)
        return 0.01
    else if (price >= 10 && price < 50)
        return 0.05
    else if (price >= 50 && price < 100)
        return 0.1
    else if (price >= 100 && price < 500)
        return 0.5
    else if (price >= 500 && price < 1000)
        return 1
    else 
        return 5
}

const add = () => {
    let currentPrice = price.value
    price.value = Math.round((currentPrice += priceLevel(currentPrice)) * 100) / 100
}

const sub = () => {
    let currentPrice = price.value

    if (currentPrice <= 0) {
        price.value = 0
        return
    }

    price.value = Math.round((currentPrice -= priceLevel(currentPrice)) * 100) / 100
}

const valueClear = () => {
    price.value = null

    emit('valueClear', {
        buyBoardLot: null,
        buyOddLot  : null,
        newPrice   : price.value
    })
}

watchEffect(() => {
    emit('priceUpdate', price.value)
})

</script>

<template>
    <div class="input-box-class">
        <input type="button" class="priceBtn" value="+" @click="add">
        <input type="button" class="priceBtn" value="-" @click="sub">
        <input type="button" class="priceBtn" value="x" @click="valueClear">
    </div>
</template>