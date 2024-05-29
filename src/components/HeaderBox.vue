<script setup>
import { ref, watchEffect } from 'vue';
import TitleIconImg from '../images/icon/TitleIcon.webp'
import HomeImg from '../images/icon/Home.webp'
import MoneyRecordImg from '../images/icon/MoneyRecord.webp'
import AccountImg from '../images/icon/Account.webp'
import DescriptionImg from '../images/icon/Description.webp'

const emit = defineEmits(['contentUpdate']);

const navBarState = ref(false);
const contentValue = [
    'StockCalculatorContent',
    'NotesContent',
    'InventoryContent',
    'DirectionsContent'
];
const select = ref("StockCalculatorContent");

const navButtonClick = () => {
    navBarState.value = !navBarState.value;
}

const selectedContentClick = () => {
    navBarState.value = false
}

const selectedContent = (selected) => {
    select.value = selected
    selectedContentClick()
}

watchEffect(() => {
    emit('contentUpdate', select.value)
})

</script>

<template>
    <header>
        <div id="nav-open-btn" class="nav-open-btn" @click="navButtonClick">
            <i class="fas fa-bars"></i>
        </div>
        <div id="nav-bar" class="nav-bar" :class="{'nav-open' : navBarState}" >
            <nav>
                <div class="nav-title"><span><img :src='TitleIconImg' alt=""></span>
                    <p>メニュー</p>
                </div>
                <ul>
                    <li :class="{active: select === contentValue[0]}" @click="selectedContent(contentValue[0])">
                        <a href="javascript:void(0)"><span><img :src='HomeImg' alt=""></span>　損益計算</a>
                    </li>
                    <li :class="{active: select === contentValue[1]}" @click="selectedContent(contentValue[1])">
                        <a href="javascript:void(0)"><span><img :src='MoneyRecordImg' alt=""></span>　筆記</a>
                    </li>
                    <li :class="{active: select === contentValue[2]}" @click="selectedContent(contentValue[2])">
                        <a href="javascript:void(0)"><span><img :src='AccountImg' alt=""></span>　分帳戶</a>
                    </li>
                    <li :class="{active: select === contentValue[3]}" @click="selectedContent(contentValue[3])">
                        <a href="javascript:void(0)"><span><img :src='DescriptionImg' alt=""></span>　本站說明</a>
                    </li>
                    <li id="nav-close-btn">
                        <a href="javascript:void(0)" @click="navButtonClick">關閉</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <div id="active-background " class="active-background" :class="{'active' : navBarState}"></div>
</template>

