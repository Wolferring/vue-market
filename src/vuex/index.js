import Vue from 'vue'
import Vuex from 'vuex'
import com from './modules/com.js'
import home from './modules/home.js'
import detail from './modules/detail.js'
import film from './modules/film.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
    	com,
    	home,
    	detail,
    	film
    },
    strict:process.env.NODE_ENV !== 'production'
})

export default store;