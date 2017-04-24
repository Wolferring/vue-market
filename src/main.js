// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './routers';
import store from './vuex';
import 'element-ui/lib/theme-default/index.css'
import './config'
Vue.config.debug = true;
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.directive('scroll',{
	bind:function(el,binding){
		window.addEventListener('scroll',()=>{
			let fn = binding.value;
			fn(el)
		})
	}
})
/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
}).$mount('#app')
