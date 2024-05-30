<script setup>
import { ref, reactive, watchEffect } from 'vue';
import HeaderBox from './components/HeaderBox.vue';
import TopBox from './components/TopBox.vue';
import StockCalculatorContent from './components/content/StockCalculatorContent/StockCalculatorContent.vue';
import NotesContent from './components/content/NotesContent/NotesContent.vue';
import InventoryContent from './components/content/InventoryContent/InventoryContent.vue';
import DirectionsContent from './components/content/DirectionsContent/DirectionsContent.vue';

const StockCalculatorContentBox = ref();
const NotesContentBox           = ref();
const InventoryContentBox       = ref();
const DirectionsContentBox      = ref();

const contentValue = [
    'StockCalculatorContent',
    'NotesContent',
    'InventoryContent',
    'DirectionsContent'
];
const select = ref("StockCalculatorContent");

const calculationResult = reactive({
  profitAndLoss           : null,
  profitAndLossPercentage : null
})

const resultUpdate = (data) => {
  calculationResult.profitAndLoss           = data.profitAndLoss
  calculationResult.profitAndLossPercentage = data.profitAndLossPercentage
}

const contentUpdate = (data) => {
  select.value = data
}

const contentChange = (x, opacity) => {
  StockCalculatorContentBox.value.style = `transform: translateX(calc(100% * ${x[0]}));opacity:${opacity[0]}`
  NotesContentBox.value.style           = `transform: translateX(calc(100% * ${x[1]}));opacity:${opacity[1]}`
  InventoryContentBox.value.style       = `transform: translateX(calc(100% * ${x[2]}));opacity:${opacity[2]}`
  DirectionsContentBox.value.style      = `transform: translateX(calc(100% * ${x[3]}));opacity:${opacity[3]}`
}

watchEffect(() => {
  switch (select.value) {
    case contentValue[0]:
      if (StockCalculatorContentBox.value === undefined) 
        break
      contentChange([0, 0, 0, 0], [1, 0, 0, 0])
      break 
    case contentValue[1]: 
      contentChange([-1, -1, 0, 0], [0, 1, 0, 0])
      break
    case contentValue[2]:
      contentChange([-1, -2, -2, 0], [0, 0, 1, 0])
    break
    case contentValue[3]:
      contentChange([-1, -2, -3, -3], [0, 0, 0, 1])
    break
  }
})

</script>

<template>
  <HeaderBox @contentUpdate="contentUpdate"/>
  <div class="wrapper">
    <TopBox :calculationResult="calculationResult" />
    <div id="content" class="content">
      <div id="stock-calculator-content" class="sub-content" ref="StockCalculatorContentBox">
        <StockCalculatorContent @resultUpdate="resultUpdate" />
      </div>
      <div id="notes-content" class="sub-content" ref="NotesContentBox">
        <NotesContent/>
      </div>
      <div id="inventory-content" class="sub-content" ref="InventoryContentBox">
        <InventoryContent/>
      </div>
      <div id="directions-content" class="sub-content" ref="DirectionsContentBox">
        <DirectionsContent/>
      </div>
    </div>
  </div>
</template>
