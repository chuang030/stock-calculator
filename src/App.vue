<script setup>
import { reactive } from 'vue';
import HeaderBox from './components/HeaderBox.vue';
import TopBox from './components/TopBox.vue';
import Content from './components/content/Content.vue';

const calculationResult = reactive({
  profitAndLoss: null,
  profitAndLossPercentage: null
})

const resultUpdate = (data) => {
  calculationResult.profitAndLoss = data.profitAndLoss
  calculationResult.profitAndLossPercentage = data.profitAndLossPercentage
}

</script>

<template>
  <HeaderBox/>
  <div class="wrapper">
    <TopBox :calculationResult="calculationResult" />
    <Content @resultUpdate="resultUpdate"/>
  </div>
</template>
