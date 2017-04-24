import api from '../api'
import * as types from '../types'
var sort = function(arr){
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex]['grade'] < current['grade']) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }   
    return arr;
}

const state = {
    banner:[],
    nowplay:[],
    coming:[],
}

const actions = {
    //获取banner列表
    getBannerList:function({commit}){
        commit(types.COM_LOADING_STATUS,true);
        api.getBannerList(function(res){
            commit(types.HOME_GET_BANNER_LIST,res.data);
            commit(types.COM_LOADING_STATUS,false);
        })
    },
    // 获取热映
    getNowPlaying:function({commit}){
        commit(types.COM_LOADING_STATUS,true)
        api.getNowPlaying(function(res){
            var data = res.data;
            if(data.films.length){
                data.films = sort(data.films)
            }
            commit(types.HOME_GET_NOWPLAYING_LIST,data)
            commit(types.COM_LOADING_STATUS,false)
        })
    },
    // 获取即将上映
    getComingSoon:function({commit}){
        commit(types.COM_LOADING_STATUS,true)
        api.getComingSoon(function(res){
            commit(types.HOME_GET_COMINGSOON_LIST,res.data)
            commit(types.COM_LOADING_STATUS,false)
        })
    }
}
const getters = {
    getBannerList: state => state.banner,
    getNowPlaying: state => state.nowplay,
    getComingSoon: state => state.coming,
}

const mutations = {
    [types.HOME_GET_BANNER_LIST](state,res){
        state.banner = res.billboards
    },
    [types.HOME_GET_NOWPLAYING_LIST](state,res){
        state.nowplay = res.films
    },
    [types.HOME_GET_COMINGSOON_LIST](state,res){
        state.coming = res.films
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}