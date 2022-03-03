<template>
    <div class="scrhbox" :style="{'width': size[0], 'height': size[1], 'border-radius': `${parseInt(size[1])/2}px`}">
        <div class="icon" :style="{'height': size[1], 'line-height': size[1]}"><IconFont icontype="search" /></div>
        <input type="text" :style="{'width': `${parseInt(size[0])-25}px`}" placeholder="音乐/视频/电台/用户" />
    </div>
</template>
 
<script>
import IconFont from "@/components/IconFont"
export default {
    components:{
        IconFont
    },
    created(){
    },
    props:{
        size: {
            default: []
        }
    },
    data(){
        return{
            
        }
    }
}
</script>

<style scoped>
.scrhbox{
    background: white;
    overflow: hidden;
    /* padding: 0 5px; */
}
.icon{
    width: 20px;
    font-size: 20px;
    margin-left: 5px;
    float: left;
}
.scrhbox input{
    display: block;
    height: 100%;
    padding-right: 10px;
    padding-left: 5px;
    box-sizing: border-box;
    font-size: 12px;
}
</style>