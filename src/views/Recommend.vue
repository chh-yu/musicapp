<template>
    <div class="container">
        <div class="bannerbox" :style="{'background-image': banners[banner_index] != undefined ? `url(${banners[banner_index].imageUrl}?imageView&blur=20x40)` : ''}">
            <div class="left"  @click="bannerswitch($event, (banner_index-1+banners.length)%banners.length)"><IconFont extraclass="bannerarrow" icontype="arrowleft" /></div>
            <div class="center">
                <div class="banners">
                    <img :src="banners[banner_index]!=undefined?banners[banner_index].imageUrl:''">
                    <div class="dots">
                        <div class="dot" v-for="(item, i) in banners" :key="i" @click="bannerswitch($event, i)" :class="{dotchecked: banner_index == i}"><IconFont icontype="dot" /></div>
                    </div>
                </div>
                <div class="download">
                    <div class="btn"></div>
                    <div class="tip">PC 安卓 iPhone WP iPad Mac 六大客户端</div>
                </div>
            </div>
            <div class="right"  @click="bannerswitch($event, (banner_index+1)%banners.length)"><IconFont extraclass="bannerarrow" icontype="arrowright" /></div>
        </div>
        <div class="discover_module clearfix">
            <div class="right">
                <div class="hotrecommend">
                    <div class="head">
                        <div class="title">
                            <span class="icon"><IconFont icontype="kongxinyuan" /></span>
                            <span class="text">热门推荐</span>
                        </div>
                        <div class="nav">
                            <div class="nav-item">华语</div>
                            <div class="nav-item">流行</div>
                            <div class="nav-item">摇滚</div>
                            <div class="nav-item">民谣</div>
                            <div class="nav-item">电子</div>
                        </div>
                        <div class="more">
                            <div class="text">更多</div>
                            <div class="icon"><IconFont icontype="arrowmore" /></div>
                        </div>
                    </div>
                    <div class="hrlist">
                        <!-- <div class="hrlist-item">/top/playlist</div> -->
                        <div class="hrlist-item" v-for="(item) in hrplaylists" :key="item.id">
                            <PlaylistCard :imageurl="item.coverImgUrl" :playCount="item.playCount" />
                            <div class="name">{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="newdisc">
                    <div class="head">
                        <div class="title">
                            <span class="icon"><IconFont icontype="kongxinyuan" /></span>
                            <span class="text">新碟上架</span>
                        </div>
                        <div class="more">
                            <div class="text">更多</div>
                            <div class="icon"><IconFont icontype="arrowmore" /></div>
                        </div>
                    </div>
                    <div class="ndlist">
                        <div class="ndlist-arrow"><IconFont icontype="arrowleft" /></div>
                        <div class="ndlist-center">
                            <div class="ndlist-rollbox">
                                <div class="ndlist-item" v-for="item in newalbums" :key="item.id"></div>
                            </div>
                        </div>
                        <div class="ndlist-arrow"><IconFont icontype="arrowright" /></div>
                    </div>
                </div>
                <div class="toplist">
                    <div class="head">
                        <div class="title">
                            <span class="icon"><IconFont icontype="kongxinyuan" /></span>
                            <span class="text">榜单</span>
                        </div>
                        <div class="more">
                            <div class="text">更多</div>
                            <div class="icon"><IconFont icontype="arrowmore" /></div>
                        </div>
                    </div>
                    <div class="tllist">
                        /homepage/block/page<br/>
                        /toplist
                    </div>
                </div>
            </div>
            <div class="left">
                <div class="infoarea">
                    <div class="loginnote">
                        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                        <div class="loginbtn" @click="$emit('login')">用户登录</div>
                    </div>
                    <!-- <div class="myinfo"></div> -->
                </div>
                <div class="peoplearea">
                    <div class="singerarea">
                        <div class="head clearfix">
                            <div class="title">入驻歌手</div>
                            <div class="checkall">查看全部 ></div>
                        </div>
                        <div class="singerlist">
                            <div class="singerlist-item" v-for="item in singers" :key="item.id">
                                <div class="pic" :style="{'background': `url(${item.img1v1Url}) center/100%`}"></div>
                                <div class="introduce">
                                    <div class="name">{{item.name}}</div>
                                    <div class="alias">{{item.alias[0]}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="applybtn">申请成为音乐人</div>
                    </div>
                    <div class="djarea">
                        <div class="head">
                            <div class="title">热门主播</div>
                        </div>
                        <div class="djlist">
                            <div class="djlist-item" v-for="item in populardjs" :key="item.id">
                                <div class="pic" :style="{'background': `url(${item.avatarUrl}) center/100%`}"></div>
                                <div class="introduce">
                                    <div class="name">{{item.nickName}}</div>
                                    <div class="count">{{item.userFollowedCount}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import http from "@/utils/http"
import IconFont from "@/components/IconFont"
import PlaylistCard from "@/components/PlaylistCard"
export default {
    components:{
        IconFont,
        PlaylistCard
    },
    data(){
        return{
            banners: [],
            banner_index: 0,
            banner_control: null,
            hrplaylists: [],
            singers: [],
            newalbums: [],
            populardjs: []
        }
    },
    created(){
        var that = this
        http.post("/banner").then((res)=>{that.banners = res.data.banners}).then(()=>{
            this.banner_control = setInterval(()=>{
            that.banner_index =  (that.banner_index+1)%that.banners.length
            console.log(that.banner_index)
        }, 3000)
        })
        http.post("/top/playlist", {limit: 8}).then((res)=>{that.hrplaylists = res.data.playlists})
        http.post("/top/artists", {limit: 5}).then((res)=>{that.singers = res.data.artists})
        http.post('/top/album', {limit: 10}).then((res)=>{that.newalbums  = res.data.weekData.splice(0, 10)})
        http.post('/dj/toplist/popular', {limit: 5}).then((res)=>{that.populardjs = res.data.data.list})
    },
    methods:{
        bannerswitch(event, target){
            var that = this
            if(event.target.localName == 'i'){
                clearInterval(this.banner_control)
                this.banner_index =  target
                console.log(this.banner_index)
                this.banner_control = setInterval(()=>{
                    that.banner_index =  (that.banner_index+1)%that.banners.length
                    console.log(that.banner_index)
                }, 3000)
            }
        }
    },
    computed:{
    },
    beforeDestroy(){
        clearInterval(this.banner_control)
    }
}
</script>

<style scoped>
.bannerbox{
    height: 285px;
    display: flex;
    background-size: 6000px;
    background-position: center center;
}
.bannerbox .center{
    width: 982px;
    height: 100%;
    display: flex;
}
.bannerbox .right, .bannerbox .left{
    flex-grow: 1;
}
.bannerbox .center .banners{
    width: 730px;
    height: 100%;
    position: relative;
}
.bannerbox .center .banners img{
    width: 100%;
    height: 100%;
}
.bannerbox .center .banners .dots{
    position: absolute;
    width: 200px;
    height: 20px;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.bannerbox .center .banners .dots .dot{
    color: rgba(198, 198, 198, 0.8);
    font-size: 27px;
    cursor: pointer;
}
.bannerbox .center .banners .dots .dot.dotchecked{
    color: #B41616;
}
.bannerbox .center .banners .dots .dot:hover{
    color: #B41616;
}
.bannerbox .center .download{
    flex-grow: 1;
    height: 100%;
    background: url("@/assets/image/download.png") no-repeat 0 0
}
.bannerbox .center .download .btn{
    width: 215px;
    height: 56px;
    margin-top: 186px;
    margin-left: 19px;
    cursor: pointer;
}
.bannerbox .center .download .tip{
    color: #8d8d8d;
    font-size: 12px;
    text-align: center;
    line-height: 17px;
    margin: 10px 0;
}
.bannerbox .left, .bannerbox .right{
    position: relative;
}
.bannerbox .left .bannerarrow, .bannerbox .right .bannerarrow{
    width: 37px;
    height: 63px;
    color: rgb(236, 230, 230);
    font-size: 35px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    cursor: pointer;
}
.bannerbox .left .bannerarrow{
    right: 30px;
}
.bannerbox .right .bannerarrow{
    left: 30px;
}
.bannerbox .left .bannerarrow:hover, .bannerbox .right .bannerarrow:hover{
    background: rgba(0, 0, 0, 0.2);
}
.discover_module{
    width: 982px;
    box-sizing: border-box;
    margin: 0 auto;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    background: #fff;
}
.discover_module .right{
    width: 730px;
    float: left;
    /* background: pink; */
    box-sizing: border-box;
    padding: 20px;
    border-right: 1px solid #d3d3d3;
}
.discover_module .left{
    width: 250px;
    height: 100%;
    float: left;
    /* background: lightblue; */
}
.discover_module .right .head{
    height: 35px;
    box-sizing: border-box;
    border-bottom: 2px solid #C10D0C;
    margin-bottom: 20px;
}
.discover_module .right .head .title{
    float: left;
    display: flex;
    line-height: 30px;
    font-size: 20px;
    font-weight: normal;
}
.discover_module .right .head .title .text{
    cursor: pointer;
}
.discover_module .right .head .title .icon{
    font-size: 14px;
    color: rgb(189, 24, 23);
    width: 33px;
}
.discover_module .right .hotrecommend .head .nav{
    float: left;
    display: flex;
    font-size: 12px;
    margin-top: 8px;
    margin-left: 10px;
    color: #666;
}
.discover_module .right .hotrecommend .head .nav .nav-item{
    padding: 0 15px;
    border-right: 1px #ccc solid;
    text-align: center;
    cursor: pointer;
}
.discover_module .right .hotrecommend .head .nav .nav-item:last-child{
    border-right: none;
}
.discover_module .right .hotrecommend .head .nav .nav-item:hover{
    text-decoration: underline;
}
.discover_module .right .head .more{
    float: right;
    display: flex;
    font-size: 12px;
    color: #666;
    line-height: 35px;
}
.discover_module .right .head .more .text{
    cursor: pointer;
}
.discover_module .right .head .more .text:hover{
    text-decoration: underline;
}
.discover_module .right .head .more .icon{
    color: #B41616;
    margin-left: 5px;
}
.hrlist{
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.hrlist .hrlist-item{
    height: 204px;
    width: 140px;
    margin-bottom: 20px;
}
.hrlist .hrlist-item .name{
    font-size: 14px;
    margin-top: 10px;
    cursor: pointer;
    line-height: 1.4;
}
.hrlist .hrlist-item .name:hover{
    text-decoration: underline;
}
.ndlist{
    height: 185px;
    border: 1px solid #d3d3d3;
    background: #f5f5f5;
    padding-top: 28px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.tllist{
    height: 472px;
    border: 1px solid #d3d3d3;
    background: #f5f5f5;
    margin-bottom: 20px;
}
.left .infoarea{
    border: 1px solid #fff;
    box-shadow: 0px 1px 1px #999;
    background: linear-gradient(to bottom, #fff, #dedede);
}
.left .infoarea .loginnote p{
    padding: 16px 0;
    margin: 0 22.5px;
    line-height: 22px;
    color: #666;
    font-size: 12px;
}
.left .infoarea .loginnote .loginbtn{
    height: 31px;
    line-height: 31px;
    width: 100px;
    border-radius: 3px;
    margin: 0 auto;
    margin-bottom: 15px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background: linear-gradient(to bottom, rgb(239, 38, 44), rgb(182, 20, 22));
    box-sizing: border-box;
    border: rgb(184, 23, 26);
    cursor: pointer;
}
.left .infoarea .loginnote .loginbtn:hover{
    background: linear-gradient(to bottom, rgb(250, 58, 67), rgb(210, 30, 34));
}
.left .infoarea .myinfo{
    height: 126px;
}
.left .peoplearea{
    margin-top: 15px;
    padding: 0 20px;
}
.left .peoplearea .singerarea{
    height: 455px;
}
.left .peoplearea .djarea{
    margin-top: 30px;
    height: 294px;
}
.peoplearea .head{
    font-size: 12px;
    border-bottom: 1px solid #ccc;
    height: 24px;
}
.peoplearea .head .title{
    font-weight: 700;
    float: left;
}
.peoplearea .head .checkall{
    color: #666;
    float: right;
    cursor: pointer;
}
.peoplearea .head .checkall:hover{
    text-decoration: underline;
}
.singerlist{
    margin-top: 20px;
}
.singerlist .singerlist-item{
    height: 62px;
    display: flex;
    margin: 15px 0;
    border: 1px solid #e9e9e9;
    background: #fafafa;
    cursor: pointer;
}
.singerlist .singerlist-item:hover{
    background: #f3f3f3;
}
.singerlist .singerlist-item .pic{
    width: 62px;
    height: 62px;
    flex-shrink: 0;
}
.singerlist .singerlist-item .introduce{
    flex-grow: 1;
    padding-top: 8px;
    padding-left: 14px;
    box-sizing: border-box;
}
.singerlist .singerlist-item .introduce .name{
    font-size: 14px;
    font-weight: 700;
}
.singerlist .singerlist-item .introduce .alias{
    font-size: 12px;
    color: #666;
    margin-top: 10px;
}
.singerarea .applybtn{
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    height: 29px;
    line-height: 29px;
    border: 1px solid #bababa;
    border-radius: 4px;
    background: linear-gradient(to bottom, #fff, #eee);
    cursor: pointer;
}
.singerarea .applybtn:hover{
    background: #fff;
}
.djlist{
    margin-top: 20px;
}
.djlist .djlist-item{
    height: 40px; 
    width: 100%;
    margin: 10px 0;
    display: flex;
}
.djlist .djlist-item .pic{
    height: 40px;
    width: 40px;
    flex-shrink: 0;
    cursor: pointer;
}
.djlist .djlist-item .introduce{
    flex-grow: 1;
    margin-left: 10px;
    font-size: 12px;
}
.djlist .djlist-item .introduce .name{
    cursor: pointer;
}
.djlist .djlist-item .introduce .name:hover{
    text-decoration: underline;
}
.djlist .djlist-item .introduce .count{
    margin-top: 5px;
    color: #666;
}
.ndlist .ndlist-center{
    width: 645px;
    height: 150px;
    overflow: hidden;
}
.ndlist .ndlist-arrow{
    height: 17px;
    width: 17px;
    margin-top: 45px;
    font-size: 17px;
    font-weight: 900;
    color: #8c8c8c;
    cursor: pointer;
}
.ndlist .ndlist-arrow:hover{
    color: #5a5a5a;
}
.ndlist .ndlist-center .ndlist-rollbox{
    width: calc(645px*3);
    height: 100%;
    background: lightgoldenrodyellow;
}
.ndlist .ndlist-center .ndlist-rollbox .ndlist-item{
    width: 119px;
    height: 100%;
    box-sizing: border-box;
    margin: 0 5px;
    background: lightsalmon;
    float: left;
}
</style>