<template>
<div id="film" v-scroll='getMore'>
	<div class="tabs">
		<div class="item" 
			@click="changeTab('now')" 
			:class="currentTab=='now'?'active':''">
			正在热映
		</div>
		<div class="item" 
			@click="changeTab('coming')" 
			:class="currentTab=='coming'?'active':''">
			即将上映
		</div>
	</div>
	<div class="tab-content">
		<transition-group
			tag="div"
			name="list-complete"
			class="now-playing-list"
			v-if="currentTab=='now'"
		>
			<router-link
				v-for="item in nowList"
				:key="item"
				class="item list-complete-item"
				:to="{name:'cinema',params:{id:item.id,film:item.name}}"
			>
				<div class="cover">
					<img :src="item.poster.thumbnail" alt="">
				</div>
				<div class="info">
					<h3>{{item.name}}</h3>
					<p>{{item.intro}}</p>
					<p><span>{{item.cinemaCount}}</span>家影院上映</p>
					<p><span>{{item.watchCount}}</span>人看过</p>
				</div>
				<div class="score">
					{{item.grade}}
				</div>
			</router-link>
		</transition-group>
		<transition-group
			tag="div"
			name="list-complete"
			class="coming-list"
			v-if="currentTab=='coming'"
		>
			<router-link
				v-for="item in comingList"
				:key="item"
				class="item list-complete-item"
				:to="{name:'cinema',params:{id:item.id}}"
			>
				<div class="cover">
					<img :src="item.poster.thumbnail" alt="">
				</div>
				<div class="info">
					<h3>{{item.name}}</h3>
					<p>{{item.intro}}</p>
					<p>{{item.premiereAt|dateFilter}}</p>
				</div>
				<div class="score">
					{{item.grade}}
				</div>
			</router-link>
		</transition-group>		
	</div>
</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
		  return {
		    currentTab: 'now'
		  };
		},
		created:function(){
			document.body.scrollTop = 0;
			this.currentTab = this.$route.params.type
			this.$store.commit('COM_CONF',{
				title:'卖座电影'
			});			
			if(this.currentTab == 'now' && this.nowList.length == 0){
				this.$store.dispatch('getNowPlayList')
			}else if(this.currentTab == 'coming' && this.comingList.length == 0){
				this.$store.dispatch('getComingList')
			}
		},		
		methods: {
		  getMore(el) {
			if(document.body.scrollTop + window.innerHeight >= el.clientHeight - 100){
				//由于路由及自定义滚动指令，故返回时还会记录着滚动要素而使得在其他页面滚动时同时出发此处，
				//故用this.$route.params.type来进行判断
				if(this.$route.params.type == 'now'){
					this.$store.dispatch('getNowPlayList')
				}else if(this.$route.params.type == 'coming'){
					this.$store.dispatch('getComingList')
				}
				
			}
		  },
		  changeTab(name){
		  	if(this.currentTab==name) return false;
		  	this.currentTab = name;
		  	this.$router.replace({params:{type:name}})
			if(this.currentTab == 'now' && this.nowList.length == 0){
				this.$store.dispatch('getNowPlayList')
			}else if(this.currentTab == 'coming' && this.comingList.length == 0){
				this.$store.dispatch('getComingList')
			}
		  }
		},
		filters:{
			dateFilter:function(time){
				let date = new Date(time*1),
					month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
					day = date.getDate()  > 9 ? date.getDate()  : '0' + date.getDate(),
					week = date.getDay();
				
				let arr = ['日','一','二','三','四','五','六']
				
				return `${month}月${day}日上映 星期${arr[week]}`
			}
		},
		computed:mapGetters({
			nowList:'getNowPlayList',
			comingList:'getComingList'
		})
	};
</script>
<style lang="less">
	@import url('../assets/var.less');
	.list-complete-item{
	  transition: all .6s;
	  display: inline-block;
	}
	.list-complete-enter, .list-complete-leave-active{
	  opacity: 0;
	  transform: translateY(30px);
	}

	.list-complete-leave-active{
	  position: absolute;
		
	}
	#film{
		.tabs{
			border-bottom: 1px solid @maincolor;
			margin: 0 5vw;
			display: flex;
			.item{
				flex:1;
				display: inline-block;
				text-align: center;
				padding: 2vh 0;
				font-size: .75rem;
				&.active{
					font-weight: bold;
					color: @maincolor;
					border-bottom: 2px solid @maincolor;
				}
			}
		}
		.tab-content{
			margin:0 5vw;
			.item{
				padding: 2vh 0;
				display: flex;
				.cover{
					width: 25vw;
					margin-right: 2vw;
					img{
						width: 100%;
					}
				}
				.info{
					width: 58vw;
					h3{
						font-size: .8rem;
						line-height: 2;
						font-weight: normal;
					}
					p{
						font-size: .65rem;
						line-height: 2;
						color:#8C8C8C
					}
					span{
						color: @maincolor;
					}
				}
				.score{
					width: 15vw;
					font-size: 1.3rem;
					text-align: right;
					color:@maincolor;
				}
			}
		}
	}
</style>
