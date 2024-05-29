<script setup>
import { reactive, watchEffect } from 'vue';
import StocksSearchBox from './StocksSearchBox.vue'

const modelBox = reactive({
    simple: true,
    full: false,
    sttingInstructionIsShow: false
})

const otherSetting = reactive({
    isNeglectCharge    : false,
    isStocksIdGetPrice : false
})

const modelBoxItemIsShow = () => {
    modelBox.simple = !modelBox.simple,
    modelBox.full   = !modelBox.full
}

const corsAnywhereStatus = reactive({
    isOk      : false,
    status    : -1,
    statusText: ""
})

const stocksData = reactive({
    id        : null,
    price     : null,
    searchTime: null
})

const showSttingInstruction = () => {
    modelBox.sttingInstructionIsShow = !modelBox.sttingInstructionIsShow
}

const isNeglectCharge = () => {
    otherSetting.isNeglectCharge = !otherSetting.isNeglectCharge
}

const isStocksIdGetPrice = () => {
    otherSetting.isStocksIdGetPrice = !otherSetting.isStocksIdGetPrice
    checkCors(true)
}

const checkCors = async (data) => {
    if (data) {
        await fetch("https://cors-anywhere.herokuapp.com/")
            .then(data => {
                corsAnywhereStatus.isOk = data.ok;
                corsAnywhereStatus.status = data.status;
                corsAnywhereStatus.statusText = data.statusText;
            })
            .catch(error => console.error(error))
    }
}

const stocksDataUpdate = (data) => {
    stocksData.id         = data.id
    stocksData.price      = data.price
    stocksData.statusText = data.statusText
}

const emit = defineEmits(['modelUpdate', 'otherUpdate' , 'stocksDataUpdate'])

watchEffect(() => {
    emit('modelUpdate', {
        simple                  : modelBox.simple,
        full                    : modelBox.full,
        sttingInstructionIsShow : modelBox.sttingInstructionIsShow
    })
    emit('otherUpdate', {
        isNeglectCharge: otherSetting.isNeglectCharge
    })
    emit('stocksDataUpdate', {
        id         : stocksData.id,
        price      : stocksData.price,
        searchTime : stocksData.searchTime
    })
})

</script>

<template>
    <div class="setting-box">
        <div class="title-box">
            <h4>設置</h4>
        </div>
        <div id="model-box" class="set-model-box">
            <div class="set-model-box-item" @click="modelBoxItemIsShow()">
                <div id="simple" class="model-item-btn" :class="{ active: modelBox.simple }">
                    <p>簡單計算</p>
                </div>
                <div id="full" class="model-item-btn" :class="{ active: modelBox.full }">
                    <p>詳細計算</p>
                </div>
            </div>
            <div id="icon" class="set-model-box-item" @click="showSttingInstruction"
                :class="{ active: modelBox.sttingInstructionIsShow }">
                <i class="fas fa-exclamation"></i>
            </div>
        </div>
        <div class="other-setting">
            <div class="other-setting-title">
                <div class="title-box">
                    <h4>其他</h4>
                </div>
            </div>
            <div class="other-setting-item-box">
                <div class="other-setting-item">
                    <label for="isNeglectCharge">是否忽略買入手續費</label>
                    <input type="checkbox" name="isNeglectCharge" id="isNeglectCharge"
                        @click="isNeglectCharge">
                </div>
                <div class="other-setting-item">
                    <label for="isStocksIdGetPrice">以股票代號取得價格</label>
                    <input type="checkbox" name="isStocksIdGetPrice" id="isStocksIdGetPrice"
                        @click="isStocksIdGetPrice">
                        <StocksSearchBox 
                            :class="{active: otherSetting.isStocksIdGetPrice}"
                            :corsAnywhereStatus="corsAnywhereStatus"
                            @checkCors="checkCors"
                            @stocksDataUpdate="stocksDataUpdate" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>