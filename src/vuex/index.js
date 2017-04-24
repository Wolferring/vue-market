import Vue from 'vue'
import Vuex from 'vuex'
import com from './modules/com.js'
import home from './modules/home.js'
import detail from './modules/detail.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
    	com,
    	home,
    	detail
    },
    strict:process.env.NODE_ENV !== 'production'
})

export default store;