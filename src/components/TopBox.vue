<script setup>
import { reactive, watchEffect } from 'vue';

const props = defineProps({
    calculationResult: {
        Object
    }
})

const result = reactive({
    profitAndLoss: null,
    profitAndLossPercentage: null
})

watchEffect(() => {
    result.profitAndLoss = props.calculationResult.profitAndLoss
    result.profitAndLossPercentage = props.calculationResult.profitAndLossPercentage
})
</script>

<template>
    <div class="top-box">
        <div class="top-box-class">
            <div class="top-box-profit-andLoss">
                <p>損益</p><span class="not-w">：</span>
                <p class="is-r">{{ result.profitAndLoss }}</p><span class="not-w"> 元</span>
            </div>
            <div class="top-box-profit-andLoss">
                <p>報酬率</p><span class="not-w">：</span>
                <p class="is-r">{{ result.profitAndLossPercentage }}</p><span class="not-w">　%</span>
            </div>
        </div>
        <!-- <div class="top-box-class">
            <div class="top-box-charge">
                <p>計算結果</p><span class="not-w">：</span>
                <p class="is-r">""</p><span class="not-w"></span>
            </div>
        </div> -->

    </div>
</template>

<style lang="scss"></style>