<template>
  <div class="wrap" v-scroll="showTop">
    <com-header :com="comConf" :showtop='gotop'/>
    <div class="container">
      <transition :name="transitionName"> 
        <router-view class="child-view" />
      </transition>
    </div>
    <com-sidebar />
    <com-loading v-show='loading'/> 
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from './components/Header'
import sidebar from './components/sidebar'
import loading from './components/loading'
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
    comConf:'comConf',
    loading:'loading'
  }),
  watch:{
    '$route' (to,from){
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ?"false": 'slide-left';
    }
  },  
  components:{
    comHeader:Header,
    comSidebar:sidebar,
    comLoading:loading
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

<style lang="less">
.child-view{
  width: 100%;
  transition: all .2s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active{
    opacity: 0;
    transform: translate(30px,0);
}
.slide-left-leave-active, .slide-right-enter{
    opacity: 0;
    transform: translate(-30px 0);
}
</style>
