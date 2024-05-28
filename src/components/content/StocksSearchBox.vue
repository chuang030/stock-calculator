<script setup>
import { ref, reactive, watchEffect } from 'vue';
import { 
    yahooApiAddress as stocksApiAddress,
    corsAnywhereAddress
} from '../../data/ApiData.json'

const prop = defineProps({
    corsAnywhereStatus:  {
        type: Object
    }
})

const emit = defineEmits(['checkCors', 'stocksDataUpdate'])

const stocksData = reactive({
    id        : "---",
    price     : null,
    searchTime: ""
})

const inputData = ref("")
const searchTime = ref("----\/--\/-- --:--:--")
const isLoading = ref(false)

const corsAnywhereStatus = reactive({
    isOk      : false,
    status    : -1,
    statusText: ""
})

const getDate = () => {
    const dateString = new Date()
    const options = {
        year  : 'numeric',
        month : '2-digit',
        day   : '2-digit',
        hour  : '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }
    return dateString.toLocaleString('zh-TW', options);
}

const dateFormat = (date) => {
    return date.replace(" ", "T").replace(/\//g, "-");
}

const getStocksData = async (stocksId, period1, period2) => {
    if (inputData.value === "") 
        return

    isLoading.value = true;
    stocksData.searchTime = dateFormat(period2);
    searchTime.value = period2;
    const endTime = new Date(stocksData.searchTime).getTime()
    const url = `${corsAnywhereAddress}${stocksApiAddress}${stocksId}.TW?period1=${period1}&period2=${endTime}&interval=1d&events=history&=hP2rOschxO0`

    const data = await fetch(url, { method: 'GET'})
        .then(data => {
            return data.json()
        })
        .catch(error => {
            console.log(error);
        });

    if (data.chart.error != undefined) {
        if (data.chart.error.code === "Not Found")
                stocksData.id = "查無該代號股票"
    } else {
        stocksData.id = data.chart.result[0].meta.symbol
        stocksData.price = data.chart.result[0].meta.regularMarketPrice
    }

    isLoading.value = false;
    inputData.value = ""
}

const clickInput = async () => {
    await getStocksData(inputData.value , 0, getDate())

    emit('stocksDataUpdate', {
       id         : stocksData.id,
       price      : stocksData.price,
       searchTime : stocksData.searchTime
    })
}

const enterInput = (event) => {
    if (event.keyCode === 13) 
        clickInput()
}

const checkCors = () => {
    emit('checkCors', true)
}

watchEffect(() => {
    corsAnywhereStatus.isOk       = prop.corsAnywhereStatus.isOk;
    corsAnywhereStatus.status     = prop.corsAnywhereStatus.status;
    corsAnywhereStatus.statusText = prop.corsAnywhereStatus.statusText;
})

</script>

<template>
    <div class="stocks-search-box">
        <div class="stocks-search-box-item" id="stocks-search-input-box" :class="{active: corsAnywhereStatus.isOk}">
            <div class="search-input-box">
                <label for="stocksIdGetPrice">代號：</label>
                <input type="text" name="stocksIdGetPrice" id="stocksIdGetPrice" placeholder="股票代號"
                    v-model="inputData"
                     @keydown="enterInput">
                <button type="button" class="stocks-search-btn" @click="clickInput">搜尋</button>
            </div>
            <div class="loading-box" :class="{active : isLoading}">
                <div class="loader"></div>
            </div>
            <div class="search-tiem-box">
                <h5>查詢時間：</h5>
                <p>{{ searchTime }}</p>
            </div>
            <div class="search-id">
                <h5>查詢代號：</h5>
                <p>{{ stocksData.id }}</p>
            </div>
        </div>
        <div class="stocks-search-box-item" id="search-tiem-box" :class="{active: !corsAnywhereStatus.isOk}">
            <div id="hint-box" class="hint-box theme-style-box">
                <p>請點擊下方的<br>
                    <span>「Request temporary access to the demo server」<br></span>按鈕後再按
                    <span>「繼續」</span>
                </p>
                <iframe src="https://cors-anywhere.herokuapp.com/" frameborder="0" scrolling="no" ref="corsAnywhere"></iframe>
                <div id="hint-box-continue-btn" class="hint-box-continue-btn" @click="checkCors">繼續</div>
            </div>
        </div>
    </div>
</template>