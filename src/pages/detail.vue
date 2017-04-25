<template>
	<div id="detail" v-if="detail">
		<div class="cover"><img :src="detail.cover.origin" alt=""></div>
		<div class="box">
			<article class="introduction">
				<h2 class="film-name">
					{{detail.name}} 
					<span class="label">{{detail.grade}}分</span>
					<a :href="'http://v.youku.com/v_show/id_'+detail.trailer.youkuId+'.html'" class="label" target="_blank">预告</a>
				</h2>
				<p>{{detail.category.replace(/\|/g," - ")}}</p>
				<h3 class="title">影片简介</h3>
				<p><span>导演:</span>{{detail.director}}</p>
				<p class="actor"><span>主演:<br></span>
				<a v-for="item in detail.actors" class="label" :href="'https://www.baidu.com/s?word='+item.name" target="_blank">
					<span  >
						{{item.name}}
					</span>
				</a>
				</p>
				<p class="brief">{{detail.synopsis}}</p>
				<el-row type="flex" justify="center">
					<router-link v-if="detail.isNowPlaying" :to="{name:'cinema',params:{id:detail.id}}" class="go-pay">
						<el-button  type="primary">立即购票</el-button>
					</router-link>
				</el-row>
			</article>
		</div>
		<div class="box">
			<div class="introduction">
				<h3 class="title">剧照</h3>
				<div class="image" v-for='item in detail.photos'>
					<img :src="item.bigPictureAddress" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		created:function(){
			// if(!this.detail){
				let id = this.$route.params.id;
				this.$store.dispatch('getFilmDetail',id)
				document.body.scrollTop = 0;
			// }
		},		
		computed:mapGetters({
			detail:'getFilmDetail'
		})		
	}
</script>
<style lang="less">
	@import url('../assets/var.less');
	#detail{
		.box{
			padding: 0 15px;
		}
		.introduction{
			background-color: #fff;
			padding:15px;
			margin: 15px 0;
			p{
				font-size: .75rem;
				line-height: 2;
			}
			.title{
				position: relative;
				font-size: 1rem;
				&:before{
					content: " ";
					display: block;
					height: 1.2rem;
					left: -15px;
					top:5px;
					position: absolute;
					width: 5px;
					background-color: @maincolor;
				}
			}
			.film-name{
				line-height: 1rem;
				font-size: 1rem;
				margin: 0;
				.label{
					display: inline-block;
					font-size: .65rem;
					background-color: @maincolor;
					color: #fff;
					height: ;
					padding: 0 5px;
					vertical-align: top;
					line-height: 1rem;
				}
			}
			.brief{
				text-indent:1.5rem;
			}
			.actor{
				.label{
					display: inline-block;
					padding: 5px;
					background: darken(@maincolor,20%);
					margin: 5px;
					margin-left: 0;
					color: #fff;
				}
			}
		}
	}
</style>