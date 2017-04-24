<template>
	<div id="home">
		<!--觉得没必要分离成组件-->
		<div class="banner">
			<swiper class="banner-swiper">
				<swiper-slide class='slide' v-for='item in banner'>
					<a target='_blank' :href="item.url">
						<img :src="item.imageUrl" alt="">
					</a>
				</swiper-slide>
			</swiper>
		</div>
		<div class="now-playing">
			<div class="item" v-for='item in nowplay'>
				<router-link :to="{name:'detail',params:{id:item.id}}">
					<img :src="item.cover.origin" alt="">
					<div class="desc">
						<div class="info"> 
							<h4>{{item.name}}
								<el-tag type="danger" v-if='parseFloat(item.grade)>=8.5'>荐</el-tag>
								<el-tag :type="parseFloat(item.grade)>=8.5?'success':''">{{item.grade}}</el-tag>
							</h4>
							<h3>{{item.intro}}</h3>
							<p>{{item.cinemaCount}}家影院上映</p>
							<p>{{item.watchCount|formatNumber}}人购票</p>
						</div>
					</div>
				</router-link>
			</div>
			<router-link :to="{name:'film',params:{type:'now-playing'}}" class="go-more">
				更多热映电影
			</router-link>
		</div>
		<div class="coming-title">
			<span>即将上映</span>
		</div>
		<div class="coming-soon">
			<div class="item" v-for='item in coming'>
				<router-link :to="{name:'detail',params:{id:item.id}}">
				<img :src="item.cover.origin" alt="">
				<div class="desc">
					<div class="info"> 
						<h4>{{item.name}}</h4>
					</div>
					<div class="time">{{item.premiereAt|formatDate}}</div>
				</div>
				</router-link>
			</div>
			<router-link :to="{name:'film',params:{type:'coming-soon'}}" class="go-more">
				更多即将上映电影
			</router-link>
		</div>
	</div>
</template>
<style lang="less">
	#home{
		padding-bottom: 15px;
		.go-more{
			display: block;
			background-color: #fff;

			padding: 15px;
			text-align: center;
		}
		.banner{
			width: 100%;
			overflow-x:hidden;
			text-align: center;
			img{
				max-width: 100%;
			}
		}
	}
	.now-playing,.coming-title,.coming-soon	{
		padding: 0 15px;
	}
	.coming-soon,.now-playing{
		text-align: center;
		.item{
			background-color: #fff;
			margin: 15px 0;
			img{
				max-width:100%;
			}
			padding-bottom: 15px;
			.desc{
				text-align: left;
				padding-left: 15px;
				position: relative;
				h4{
					font-size: .85rem;
					margin: .4rem 0;
				}
				&:before{
					content:"";
					display: block;
					position: absolute;
					left: 0px;
					top:3px;
					width: 3px;
					height: 20px;
					background-color: #45a1e2;
				}
			}
		}
	}
	.coming-title{
		text-align: center;
		margin: 20px 0;
		span{
			border-bottom: 3px solid #45a1e2;
			padding: 5px 0;
		}
	}
</style>
<script>
	import {mapGetters} from 'vuex'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	export default {
		name:'home',
		data(){
			return {
				swiperOption:{
					autoplay:3000,
					autoHeight:true,
				},
				type:"success"
			}
		},
		created:function(){
			this.$store.commit('COM_CONF',{
				title:'卖座电影'
			});
			if(this.banner.length == 0){
				this.$store.dispatch('getBannerList')
			}
			if(this.nowplay.length == 0){
				this.$store.dispatch('getNowPlaying')
			}
			if(this.coming.length == 0){
				this.$store.dispatch('getComingSoon')
			}
		},
		computed:mapGetters({
			banner:'getBannerList',
			nowplay:'getNowPlaying',
			coming:'getComingSoon'
		}),
		filters:{
			formatDate:function(time){
				let date = new Date(time*1),
					month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
					day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
				
				return `${month}月${day}日上映`
			},
			formatNumber:function(num){
				return parseInt(num).toLocaleString();
			}
		},
		components:{
			swiper,swiperSlide
		}
	}
</script>