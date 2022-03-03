<template>
    <div class="loginbox">
        <div class="top">
            <div class="title">登录</div>
            <div class="close" @click="$emit('close')"><IconFont icontype="close" /></div>
        </div>
        <div class="container" @click="listenclick">
            <div class="index" v-if="index=='index'">
                <div class="left">
                    <div class="pic"></div>
                    <div class="login" @click="index='phonelogin'">手机号登录</div>
                    <div class="register">注 册</div>
                </div>
                <div class="alt">
                    <div class="item">
                        <div class="icon" style="color: rgb(124, 181, 74)"><IconFont icontype="weixin" /></div>
                        <div class="text">微信登录</div>
                    </div>
                    <div class="item">
                        <div class="icon" style="color: rgb(85, 159, 217)"><IconFont icontype="qq" /></div>
                        <div class="text">QQ登录</div>
                    </div>
                    <div class="item">
                        <div class="icon" style="color: rgb(216, 89, 77)"><IconFont icontype="weibo" /></div>
                        <div class="text">微博登录</div>
                    </div>
                    <div class="item">
                        <div class="icon" style="color: rgb(204, 100, 85)"><IconFont icontype="wangyi" /></div>
                        <div class="text">网易邮箱账号登录</div>
                    </div>
                </div>
                <div class="agree"><input type="checkbox" v-model="agree"> 同意<a href="https://st.music.163.com/official-terms/service" target="_blank">《服务条款》</a><a href="http://st.music.163.com/official-terms/privacy" target="_blank">《隐私政策》</a><a href="https://st.music.163.com/official-terms/children" target="_blank">《儿童隐私政策》</a></div>
                <div class="qrloginicon" @click="index = 'qrlogin'"></div>
            </div>
            <div class="qrlogin" v-else-if="index=='qrlogin'">
                <div class="loginarea">
                    <div class="left"></div>
                    <div class="right">
                        <div class="title" @click="loadqr">扫码登录</div>
                        <div class="qr" :style="{'background-image': `url(${qr.qrimg})`}"></div>
                        <div class="tip">使用 <a href="https://music.163.com/#/download" target="_blank">网易云音乐APP</a> 扫码登录</div>
                    </div>
                </div>
                <div class="others" @click="index='index'">选择其他方式登录</div>
            </div>
            <div class="phonelogin" v-else-if="index=='phonelogin'">
                手机登录
            </div>
        </div>
    </div>
</template>

<script>
import IconFont from "@/components/IconFont"
import http from "@/utils/http.js"
export default {
    components:{
        IconFont
    },
    data(){
        return{
            agree: false,
            index: "qrlogin",
            qr: {
                unikey: "",
                qrimg: "",
                qrurl: ""
            }
        }
    },
    methods:{
        listenclick(e){
            // console.log(e)
        },
        loadqr(){
            http.post('/login/qr/key')
            .then((res)=> {return(this.qr.unikey=res.data.data.unikey)})
            .then((unikey)=>{return http.post('/login/qr/create', {'key': unikey, 'qrimg': 'image/png'})})
            .then((res)=>{
                this.qr.qrimg = res.data.data.qrimg
                this.qr.qrurl = res.data.data.qrurl
            })
        }
    },
    created(){
        this.loadqr()
    },
    watch:{
        index(){
            if(this.index=="qrlogin"){
                this.loadqr()
            }
        }
    }
    
}
</script>

<style scoped>
.loginbox{
    position: fixed;
    z-index: 99999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 372px;
    width: 530px;
    background: #fff;
    margin: auto;
    border-radius: 4px;
    box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
    overflow: hidden;
}
.top{
    background: #2d2d2d;
    height: 39px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    cursor: all-scroll;
}
.top .title{
    font-size: 14px;
    color: #fff;
    font-weight: bold;
}
.top .close{
    font-size: 14px;
    color: #ccc;
    cursor: pointer;
}
.container{
    padding: 40px 0;
    height: 252.562px;
    font-size: 12px;
}
.container .index{
    width: 100%;
    height: 100%;
    font-size: 12px;
    position: relative;
}
.container .index .left, .container .index .alt{
    height: 205px;
    float: left;
    box-sizing: border-box;
    border-left: 1px dotted #ccc;
}
.container .index .left{
    width: 300px;
    padding: 0 38px;
}
.container .index .alt{
    width: 230px;
    padding-left: 39px;
}
.container .index .agree{
    float: left;
    margin-top: 30px;
    margin-left: 40px;
    height: 16px;
    line-height: 16px;
    font-size: 10px;
}
a{
    color: #507DAF;
}
.container .index .left .pic, .container .index .left .login, .container .index .left .register{
    width: 224px;
    box-sizing: border-box;
    font-size: 12px;
}
.container .index .left .pic{
    height: 120px;
    background: url("@/assets/image/platform.png")  center/100% no-repeat;
}
.container .index .left .login{
    height: 31px;
    line-height: 31px;
    text-align: center;
    /* background: rgba(91, 147, 215); */
    background-image: linear-gradient(to bottom, rgba(91, 147, 215), rgba(67, 114, 186));
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #DADADA;
    cursor: pointer;
    color: #fff;
}
.container .index .left .login:hover{
    background-image: linear-gradient(to bottom, rgba(116, 167, 223), rgba(74, 129, 200));
}
.container .index .left .register{
    height: 31px;
    line-height: 31px;
    text-align: center;
    /* background: #507DAF; */
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #DADADA;
    cursor: pointer;
    background-color: #f5f5f5;
}
.container .index .left .register:hover{
    background-color: #fff;
}
.container .index .alt .item{
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.container .index .alt .item .icon{
    width: 38px;
    height: 38px;
    border-radius: 38px;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    line-height: 38px;
    font-size: 21px;
}
.container .index .alt .item .text{
    margin-left: 15px;
}
.container .index .alt .item:hover .text{
    text-decoration: underline;
}
.container .index .qrloginicon{
    position: absolute;
    right: 0;
    bottom: -40px;
    background: url("@/assets/image/qr_login_icon.png") center/100%;
    width: 52px;
    height: 52px;
    cursor: pointer;
}
.container .qrlogin{
    height: 100%;
    text-align: center;
}
.container .qrlogin .loginarea{
    height: 220px;
    padding-left: 101px;
}
.container .qrlogin .loginarea .left{
    background: url("@/assets/image/qr_guide.png") center/100%;
    height: 100%;
    width: 125px;
    float: left;
}
.container .qrlogin .loginarea .right{
    height: 100%;
    width: 206px;
    float: left;
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container .qrlogin .loginarea .right .title{
    font-size: 18px;
    font-weight: 500;
}
.container .qrlogin .loginarea .right .qr{
    width: 130px;
    height: 130px;
    margin: 17px 0;
    background: center/100%;
}
.container .qrlogin .loginarea .right .tip{
    color: rgba(0, 0, 0, 0.4);
}
.container .qrlogin .others{
    display: inline-block;
    border: 1px solid #979797;
    line-height: 28px;
    padding: 0 1em;
    border-radius: 28px;
    position: relative;
    top: 20px;
    cursor: pointer;
}
</style>