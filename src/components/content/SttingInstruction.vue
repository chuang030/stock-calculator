<script setup>
defineProps({
    isShow: {
        type: Boolean,
        default: true
    }
})

</script>

<template>
    <div id="stting-instruction" class="stting-instruction" 
    :class="{ active: isShow }">
        <div class="stting-instruction-class">
            <h4>說明</h4>
        </div>
        <div class="stting-instruction-class">
            <h5>計算提示：</h5>
            <p>整股及零股之手續費為分開計算(等同於兩者是分開購買)，故同時有輸入整股及零股時，兩者手續費會直接相加。</p>
            <h5>預設值如下：</h5>
            <p>手續費折扣<span>6折</span>。</p>
            <p><span>整股</span>整股最低手續費：<span>20元</span>，<span>零股</span>最低手續費：<span>1元</span>。</p>
            <p>交易方式為<span>「普通」</span>，證券交易稅為<span>0.3%</span>。</p>
        </div>
        <div class="stting-instruction-class">
            <h4>簡單計算</h4>
            <p>此模式下僅需輸入股數、買賣價即可其餘皆使用預設值。</p>
        </div>
        <div class="stting-instruction-class">
            <h4>詳細計算</h4>
            <p>此模式下，可以調整「最低手續費」、「交易方式」</p>
        </div>
    </div>
</template>
