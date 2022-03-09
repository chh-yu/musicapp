<template>
    <div class="srchbox" :style="{'width': size[0], 'height': size[1], 'border-radius': `${parseInt(size[1])/2}px`}">
        <div class="icon" :style="{'height': size[1], 'line-height': size[1]}"><IconFont icontype="search" /></div>
        <input type="text" v-model="keywords" :style="{'width': `${parseInt(size[0])-25}px`}" placeholder="音乐/视频/电台/用户" />
        <div class="srchlist">
            <div class="srchuser-btn" :style="{display: `${judgesrchresult?`block`:`none`}`}">
                搜"{{keywords.length &lt; 17 ? keywords:`${keywords.slice(0,17)}...`}}"相关用户 >
            </div>
            <div class="srchlist-class" v-if="srchresult.songs.length">
                <div class="title">
                    <IconFont icontype="song-srch" words="单曲" />
                </div>
                <div class="srchlist-ls">
                    <div class="srchlist-itm" v-for="item in srchresult.songs" :key="item.id">{{item.name}}</div>
                </div>
            </div>
            <div class="srchlist-class" v-if="srchresult.artists.length">
                <div class="title">
                    <IconFont icontype="artist-srch" words="歌手" />
                </div>
                <div class="srchlist-ls">
                    <div class="srchlist-itm" v-for="item in srchresult.artists" :key="item.id">{{item.name}}</div>
                </div>
            </div>
            <div class="srchlist-class" v-if="srchresult.albums.length">
                <div class="title">
                    <IconFont icontype="album-srch" words="专辑" />
                </div>
                <div class="srchlist-ls">
                    <div class="srchlist-itm" v-for="item in srchresult.albums" :key="item.id">{{item.name}}</div>
                </div>
            </div>
            <div class="srchlist-class" v-if="srchresult.playlists.length">
                <div class="title">
                    <IconFont icontype="playlist-srch" words="歌单" />
                </div>
                <div class="srchlist-ls">
                    <div class="srchlist-itm" v-for="item in srchresult.playlists" :key="item.id">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import IconFont from "@/components/IconFont"
import {debounce} from '@/utils/util'
import http from '@/utils/http'
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
            keywords: "",
            srchresult: {
                songs: [],
                artists: [],
                albums: [],
                playlists: []
            }
        }
    },
    methods:{
        search: debounce(function(){
            let kw = arguments[0]
            if(kw.length > 0){
                let allsearch=[
                    http.post(`/search?timestamp=${new Date().getTime()}`, {'keywords': kw, limit: 4, type: 1}),
                    http.post(`/search?timestamp=${new Date().getTime()}`, {'keywords': kw, limit: 1, type: 100}),
                    http.post(`/search?timestamp=${new Date().getTime()}`, {'keywords': kw, limit: 2, type: 10}),
                    http.post(`/search?timestamp=${new Date().getTime()}`, {'keywords': kw, limit: 2, type: 1000})
                ]
                Promise.all(allsearch).then((res)=>{
                    // console.log(res)
                    this.srchresult.songs = res[0].data.result.songs
                    this.srchresult.artists = res[1].data.result.artists
                    this.srchresult.albums = res[2].data.result.albums
                    this.srchresult.playlists = res[3].data.result.playlists
                    console.log(this.srchresult)
                })
            }
            else
                this.srchresult = {songs: [],artists: [],albums: [],playlists: []}
        }, 300)
    },
    watch:{
        keywords(){
            this.search(this.keywords)
        }
    },
    computed:{
        judgesrchresult(){
            if(this.srchresult.songs.length || this.srchresult.artists.length || this.srchresult.albums.length || this.srchresult.playlists.length)
                return true
            else
                return false
        }
    }
}
</script>

<style scoped>
.srchbox{
    background: white;
    /* overflow: hidden; */
    /* padding: 0 5px; */
    position: relative;
}
.icon{
    width: 20px;
    font-size: 20px;
    margin-left: 5px;
    float: left;
}
.srchbox input{
    display: block;
    height: 100%;
    padding-right: 10px;
    padding-left: 5px;
    box-sizing: border-box;
    font-size: 12px;
    border-radius: 16px;
}
.srchbox .srchlist{
    position: absolute;
    top: 40px;
    width: 240px;
    box-sizing: border-box;
    background: #fff;
    z-index: 9;
    border-radius: 4px;
    box-shadow: 0 4px 7px #555;
    display: none;
    font-size: 12px;
    overflow: hidden;
}
.srchbox input:focus+.srchlist{
    display: block;
}
.srchbox .srchuser-btn{
    height: 40px;
    /* line-height: 18px; */
    padding: 11px 10px;
    /* margin: 11px 10px; */
    box-sizing: border-box;
    color: #666;
    cursor: pointer;
    border-bottom: 0.5px solid #ccc;
}
.srchbox .srchuser-btn:hover{
    background: rgb(227, 229, 231);
}
.srchlist-class:first-of-type{
    border-top: 0.8px solid #555;
}
.srchlist-class{
    display: flex;
    width: 100%;
}
.srchlist-class .title{
    width: 62px;
    flex-shrink: 0;
    margin-top: 5px;
}
.srchlist-class .srchlist-ls{
    flex-grow: 1;
    border-left: 0.8px solid #ccc;
    width: 0;
    border-bottom: 0.8px solid #ccc;
}
.srchlist-class .srchlist-ls .srchlist-itm{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0;
    padding-left: 1em;
    line-height: 24px;
    cursor: pointer;
}
.srchlist-class .srchlist-ls .srchlist-itm:hover{
    background: rgb(227, 229, 231);
}
</style>