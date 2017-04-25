import api from '../api'
import * as types from '../types'

const state = {
    nowPlayingList:[],
    comingSoonList:[],
    nowPage:0,
    comingPage:0,
    getNowMore:true,
    getComingMore:true,
}
const sort = function(arr){
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
const actions = {
    //获取热映列表
    //偷懒没有弄加载更多的效果，故去掉loading
    getNowPlayList:function({commit}){
        if(state.getNowMore){
            // commit(types.COM_LOADING_STATUS,true);
            commit(types.FILE_NOWPLAYING_NUM);
            api.getNowPlayList(state.nowPage,function(res){
                var data = res.data;
                if(data.films.length){
                    data.films = sort(data.films)
                }
                commit(types.FILM_GET_NOWPLAYING,data)
                // commit(types.COM_LOADING_STATUS,false);
            })
        }
        
    },
    //获取即将上映列表
    getComingList:function({commit}){
        if(state.getComingMore){
            // commit(types.COM_LOADING_STATUS,true);
            commit(types.FILM_COMINGSOON_NUM);
            api.getComingList(state.comingPage,function(res){
                var data = res.data;
                if(data.films.length){
                    data.films = sort(data.films)
                }                
                commit(types.FILM_GET_COMINGSOON,data)
                // commit(types.COM_LOADING_STATUS,false);
            })
        }
    }
}
const getters = {
    getNowPlayList: state => { return state.nowPlayingList},
    getComingList: state => {return  state.comingSoonList},
}

const mutations = {
    [types.FILM_GET_NOWPLAYING](state,res){
        state.nowPlayingList = state.nowPlayingList.concat(res.films)
        //根据current跟total的关系判断是否还有下一页
        state.getNowMore = res.page.current<res.page.total ? true : false
        
    },
    [types.FILE_NOWPLAYING_NUM](state){
        state.nowPage += 1
        state.getNowMore = false
    },
    [types.FILM_GET_COMINGSOON](state,res){
        state.comingSoonList = state.comingSoonList.concat(res.films)
        state.getComingMore = res.page.current<res.page.total ? true : false
    },
    [types.FILM_COMINGSOON_NUM](state){
        state.comingPage += 1
        state.getComingMore = false
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}