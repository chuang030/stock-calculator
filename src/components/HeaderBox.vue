<script setup>
import { ref } from 'vue';
import TitleIconImg from '../images/icon/TitleIcon.webp'
import HomeImg from '../images/icon/Home.webp'
import MoneyRecordImg from '../images/icon/MoneyRecord.webp'
import AccountImg from '../images/icon/Account.webp'
import DescriptionImg from '../images/icon/Description.webp'

const navBarState = ref(false);

const navButtonClick = () => {
    navBarState.value = !navBarState.value;
}
</script>

<template>
    <header>
        <div id="nav-open-btn" class="nav-open-btn" @click="navButtonClick()">
            <i class="fas fa-bars"></i>
        </div>
        <div id="nav-bar" class="nav-bar" :class="{'nav-open' : navBarState}" >
            <nav>
                <div class="nav-title"><span><img :src='TitleIconImg' alt=""></span>
                    <p>メニュー</p>
                </div>
                <ul>
                    <li class="active">
                        <a href="javascript:void(0)"><span><img :src='HomeImg' alt=""></span>　損益計算</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"><span><img :src='MoneyRecordImg' alt=""></span>　筆記</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"><span><img :src='AccountImg' alt=""></span>　分帳戶</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"><span><img :src='DescriptionImg' alt=""></span>　本站說明</a>
                    </li>
                    <li id="nav-close-btn">
                        <a href="javascript:void(0)" @click="navButtonClick()">關閉</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <div id="active-background " class="active-background" :class="{'active' : navBarState}"></div>
</template>

<style lang="scss">
    .nav-open-btn{
        width: 100%;
    }

    div[class="nav-bar nav-open"] {
        transform: scale(1);
        z-index: 110;
    }

    div[class="active-background active"] {
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
</style>