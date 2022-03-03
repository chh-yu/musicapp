<template>
  <i class="iconfont" :class="[icon, extraclass]"></i>
</template>

<script>
var iconmap={
    "wangyiyunyinyue": "icon-wangyiyunyinyue",
    "search": "icon-search",
    "close": "icon-close",
    "qq": "icon-QQ",
    "weixin": "icon-weixin",
    "weibo": "icon-weibo",
    "wangyi": "icon-wangyi",
    "arrowright": "icon-arrowright",
    "arrowleft": "icon-arrowleft",
    "dot": "icon-dian",
    "erji": "icon-erji",
    "kongxinyuan": "icon-kongxinyuan",
    "arrowmore": "icon-more",
    "playbtn": "icon-play"
}
export default {
    props:{
        icontype:{
            type: String,
            required: true,
        },
        extraclass:{
            type: String,
            default: "",
        }

    },
    computed:{
        icon(){
            return iconmap[this.icontype];
        }
    }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_3196183_njifdomywbj.css";
.iconfont{
    font-size: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
