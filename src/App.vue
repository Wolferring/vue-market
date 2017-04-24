<template>
  <div class="wrap" v-scroll="showTop">
    <com-header :com="comConf" />
    <div class="container">
      <transition :name="transitionName"> 
        <router-view class="child-view" />
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from './components/Header'
import './assets/style.less'
export default {
  name:"App",
  data(){
    return {
      transitionName:'slide-left',
      goTop:false
    }
  },
  created:function(){
    if(this.$route.name == undefined){
      return this.$router.push('home')
    }
    this.$store.commit('COM_CONF')
  },
  computed:mapGetters({
    comConf:'comConf'
  }),
  watch:{
    '$route' (to,from){
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },  
  components:{
    comHeader:Header
  },
  methods:{
    showTop:function(){
      if(document.body.scrollTop>200){
        this.goTop = true
      }else{
        this.goTop = false
      }
    },
    gotop:function(){
      let speed = 10;
      let timer = setInterval(function(){
        if(document.body.scrollTop>0){
          document.body.scrollTop = document.body.scrollTop-speed > 0 ? document.body.scrollTop-speed : 0 ;
          speed += 20;      
        }else{
          clearInterval(timer)
        }       
      },16)
    }    
  }
};
</script>

<style>
</style>
