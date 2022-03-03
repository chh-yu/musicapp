<template>
    <div class="topnav">
        <div class="top">
            <div class="logo"><IconFont icontype="wangyiyunyinyue"/></div>
            <div class="nav-item" :class="{'nav-item-checked': $route.path.match(/^\/home/)}" @click="$router.push({path: '/'})">发现音乐</div>
            <div class="nav-item" :class="{'nav-item-checked': $route.path.match(/^\/mymusic/)}" @click="$router.push({name: 'mymusic'})">我的音乐</div>
            <div class="nav-item">关注</div>
            <a href="https://music.163.com/store/product" target="_blank"><div class="nav-item">商场</div></a>
            <a href="https://music.163.com/st/musician" target="_blank"><div class="nav-item">音乐人</div></a>
            <div class="nav-item">下载客户端</div>
            <div class="searchbox"><SearchBox :size="['158px', '32px']" /></div>
            <div class="creator">创作者中心</div>
            <div class="login" @click="$emit('login')">登录</div>
        </div>
        <div class="bottom" v-if="$route.path.match(/^\/home/)">
            <div class="bot-item" :class="{'bot-item-checked': $route.path.match(/^\/home\/recommend/)}"><div class="decor" @click="$router.push({path: '/home/recommend'})">推荐</div></div>
            <div class="bot-item" :class="{'bot-item-checked': $route.path.match(/^\/home\/toplist/)}"><div class="decor" @click="$router.push({path: '/home/toplist'})">排行榜</div></div>
            <div class="bot-item" :class="{'bot-item-checked': $route.path.match(/^\/home\/playlist/)}"><div class="decor" @click="$router.push({path: '/home/playlist'})">歌单</div></div>
            <div class="bot-item" :class="{'bot-item-checked': $route.path.match(/^\/home\/djradio/)}"><div class="decor" @click="$router.push({path: '/home/djradio'})">主播电台</div></div>
            <div class="bot-item" :class="{'bot-item-checked': $route.path.match(/^\/home\/artist/)}"><div class="decor" @click="$router.push({path: '/home/artist'})">歌手</div></div>
            <div class="bot-item" :class="{'bot-item-checked': $route.path.match(/^\/home\/album/)}"><div class="decor" @click="$router.push({path: '/home/album'})">新歌上架</div></div>
        </div>
        <div class="notbottom" v-else></div>
    </div>
</template>

<script>
import IconFont from "@/components/IconFont"
import SearchBox from "@/components/SearchBox"
export default {
    components:{
        IconFont,
        SearchBox
    },
    data(){
        return {
        }
    },
    methods:{
        
    },
    props:{
        navindex: {
            type: Number,
            default: 0
        }
    },
    created(){
    }
}
</script>

<style scoped>
.top{
    height: 70px;
    background: #242424;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #000;
    font-size: 14px;
}
.bottom, .notbottom{
    height: 35px;
    background: #C20C0C;
    border-bottom: 1px solid #a40011;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

}
.notbottom{
    height: 5px;
}
.logo{
    height: 100%;
    font-size: 165px;
    line-height: 70px;
    width: 177px;
    color: white;
    overflow: hidden;
    cursor: pointer;
}
.nav-item{
    height: 100%;
    padding: 0 19px;
    color: #ccc;
    line-height: 70px;
    position: relative;
}
.nav-item-checked::after{
    position: absolute;
    height: 0;
    width: 0;
    box-sizing: border-box;
    border-right: 6px transparent solid;
    border-left: 6px transparent solid;
    border-bottom: 4px #C20C0C solid;
    bottom: -0.5px;
    left: 0;
    right: 0;
    margin: auto;
    content: "";
}
.nav-item:hover, .nav-item-checked{
    background: #000;
    color: #fff;
    cursor: pointer;
}
.bottom{
    font-size: 12px;
    color: #fff;
}
.bot-item{
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.bot-item .decor{
    padding: 0 14px;
    height: 22px;
    line-height: 22px;
}
.bot-item:hover .decor, .bot-item-checked .decor{
    border-radius: 12px;
    background: #9B0909;
}
.searchbox{
    margin-left: 60px;
    display: flex;
    align-items: center;
}
.creator{
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    border: 1px solid #4F4F4F;
    padding: 0 16px;
    color: #ccc;
    cursor: pointer;
    font-size: 12px;
    margin: 0 10px;
}
.creator:hover{
    color: #fff;
    border-color: #fff;
}
.login{
    font-size: 12px;
    color: #787878;
    cursor: pointer;
}
.login:hover{
    text-decoration: underline;
    color: #999;
}
</style>