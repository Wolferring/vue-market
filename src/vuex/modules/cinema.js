import api from '../api.js'
import * as types from '../types.js'

const state = {
	cinemas:[],
    district:[]
}

const actions = {
    //获取影片详情并设置标题
    getCinemaList:function({commit},id){
        api.getCinemaList(id,function(res){
            commit(types.CINEMA_GET_LIST,res.data);
            
        })
    },
}
const getters = {
    getCinemaList: state => state.cinemas,
    getDistrict: state => { return state.district}
}

const mutations = {
    [types.CINEMA_GET_LIST](state,res){
        let district = [],_json={};
        for(let item of res.cinemas){
            _json = {
                name:item.district.name,
                pinyin:item.district.pinyin
            }
            district.push(_json)
        }
        district = district.unique('name').sort(function(a,b){
            return a.pinyin.localeCompare(b.pinyin.charAt(0))
        });
        state.cinemas = res.cinemas
        state.district = district
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}