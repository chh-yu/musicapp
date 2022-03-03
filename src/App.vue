<template>
  <div id="app">
    <div id="topnav">
      <Topnav @login="existLoginBox = true" />
      <LoginBox @close="existLoginBox = false" v-if="existLoginBox"/>
    </div>
    <div class="mainarea">
      <router-view @login="existLoginBox = true"></router-view>
    </div>
  </div>
</template>

<script>
import "@/assets/css/reset.css"
import Topnav from "@/components/Topnav"
import LoginBox from "@/components/LoginBox"
export default{
  components:{
    Topnav,
    LoginBox
  },
  data(){
    return{
      existLoginBox: false
    }
  },
  created(){
    console.log("App is created...")
  },
  methods: {
  }
}
</script>

<style>
#app{
  min-width: 1042px;
  background: #f3f3f3;
}
</style>
