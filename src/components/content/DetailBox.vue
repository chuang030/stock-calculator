<script setup>
import { reactive, watchEffect } from 'vue';

const props = defineProps({
    data: {
        type: Object
    }
})

const calculationData = reactive({
    buyCharge               : null,
    carryingCosts           : null,
    costPrice               : null,
    sellCharge              : null,
    averagePrice            : null,
    taxes                   : null,
    marketValue             : null,
    anticipatedRevenue      : null,
    profitAndLoss           : null,
    profitAndLossPercentage : null,
    isNeglectCharge         : false
})

watchEffect(() => {
    calculationData.buyCharge               = props.data.buyCharge
    calculationData.carryingCosts           = props.data.carryingCosts
    calculationData.costPrice               = props.data.costPrice
    calculationData.sellCharge              = props.data.sellCharge
    calculationData.averagePrice            = props.data.averagePrice
    calculationData.taxes                   = props.data.taxes
    calculationData.marketValue             = props.data.marketValue
    calculationData.anticipatedRevenue      = props.data.anticipatedRevenue
    calculationData.profitAndLoss           = props.data.profitAndLoss
    calculationData.profitAndLossPercentage = props.data.profitAndLossPercentage
    calculationData.isNeglectCharge         = props.data.isNeglectCharge
})

</script>

<template>
    <div class="detail-box theme-style-box">
        <div class="title-box">
            <h4>試算明細</h4>
        </div>
        <div class="detail-box-class">
            <div class="detail-box-title">
                <h5>買入明細</h5>
            </div>
            <div id="buyCharge" class="detail-box-item" :class="{remove: calculationData.isNeglectCharge}">
                <p>手續費<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.buyCharge }}</span></p>
            </div>
            <div id="averagePrice" class="detail-box-item">
                <p>均價<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.averagePrice }}</span></p>
            </div>
            <div id="costPrice" class="detail-box-item">
                <p>價金<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.costPrice }}</span></p>
            </div>
            <div id="carryingCosts" class="detail-box-item">
                <p>成本<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.carryingCosts }}</span></p>
            </div>
        </div>
        <div class="detail-box-class">
            <div class="detail-box-title">
                <h5>賣出明細</h5>
            </div>
            <div id="sellCharge" class="detail-box-item">
                <p>手續費<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.sellCharge }}</span></p>
            </div>
            <div id="taxes" class="detail-box-item">
                <p>交易稅<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.taxes }}</span></p>
            </div>
            <div id="marketValue" class="detail-box-item">
                <p>價金<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.marketValue }}</span></p>
            </div>
            <div id="taxes" class="detail-box-item">
                <p>收益<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.anticipatedRevenue }}</span></p>
            </div>
            <div id="profitAndLoss" class="detail-box-item">
                <p>損益<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.profitAndLoss }}</span></p>
            </div>
            <div id="profitAndLossPercentage" class="detail-box-item">
                <p>報酬率<span class="detail-lable">：</span></p>
                <p><span>{{ calculationData.profitAndLossPercentage }}%</span></p>
            </div>
        </div>
    </div>
</template>