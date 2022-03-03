<template>
    <div class="playlistcard" :style="{background: `url(${imageurl}) center/100%`}">
        <div class="bottom">
            <div class="subscribedCount">
                <div class="icon"><icon-font icontype="erji" /></div>
                <div class="playCount">{{playCount > 10000 ? `${Math.floor(playCount/10000)}万` : playCount}}</div>
            </div>
            <div class="playbtn">
                <icon-font icontype="playbtn" />
            </div>
        </div>
    </div>
</template>

<script>
import IconFont from "@/components/IconFont"
export default {
    components:{
        IconFont
    },
    props:{
        imageurl: {
            type: String,
            required: true
        },
        playCount: {
            required: true
        }
    }
}
</script>

<style scoped>
.playlistcard{
    width: 140px;
    height: 140px;
    background: lightblue;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #ccc;
    cursor: pointer;
}
.playlistcard .bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    border: 1px #000 solid;
    color: #ccc;
    display: flex;
    cursor: initial;
}
.playlistcard .bottom .subscribedCount{
    flex-grow: 1;
    height: 100%;
    display: flex;
}
.playlistcard .bottom .subscribedCount .icon{
    font-size: 15px;
    margin: 0 8px;
}
.playlistcard .bottom .subscribedCount .playcount{
    flex-grow: 1;
}
.playlistcard .bottom .playbtn{
    font-size: 24px;
    cursor: pointer;
    margin-right: 6px;
}
.playlistcard .bottom .playbtn:hover{
    color: #fff;
}
</style>