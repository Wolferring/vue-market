<template>
	<div id="sidebar" @touchmove.stop.prevent>
		<div class="sidebar-container" @click='hideNav' v-show="show">
			<div class="sidebar-overlay">
				<transition name="tranlate" mode="">
					<nav v-show='show'>
						<h3>菜单</h3>
						<ul>
							<li v-for='menu in menuList'>
								<router-link :to='menu.path'>
									<span>{{menu.name}}</span>
									<i class="icon iconfont icon-right"></i>
								</router-link>
							</li>
						</ul>
					</nav>
				</transition>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import '../assets/var.less';
	.tranlate-enter-active, .tranlate-leave-active {
	  transform:translate(10px,0)
	}
	.tranlate-enter, .tranlate-leave-active {
	  transform:translate(-100%,0)
	}
	#sidebar{
		transition:all .3s ease;
		.sidebar-container{
			background-color: rgba(0,0,0,.7);
			position: fixed;
			left:0;
			right:0;
			top:0;
			bottom:0;
			z-index: 501;
			nav{
				background-color: @maincolor;
				position: absolute;
				display: block;
				top: 2rem;
				right: 110px;
				bottom: 0;
				left: 0;
				color:#fff;
				padding: 0 15px;
				transition: all .5s ease;
				li{
					padding:.5rem 0;
					padding-left: 0;
					font-size: .75rem;
					line-height: 2rem;
					border-bottom: 1px solid #fff;
					position: relative;
					&:after{
						content: "\E602";
						font-family: element-icons!important;
						position: absolute;
						right: 0;
						top:50%;
						transform:translate(0,-50%)
					}
					a{
						display: block;
					}
				}
			}
		}
	}
</style>
<script>
	export default{
		data(){
			let menuList = [
				{
					name:'首页',
					path:'/home'
				},
				{
					name:'正在上映',
					path:'/film/now'
				}
			]
			return {
				menuList:menuList
			}
		},
		computed:{
			show:function(){
				return this.$store.getters.leftNavState;
			}
		},
		methods:{
			hideNav(){
				this.$store.dispatch('changeLeftNavState',false)
			},
			scroll:function(e){
				e.preventDefault();
				e.stopPropagation();
				console.log(e)
			}
		}
	}
</script>