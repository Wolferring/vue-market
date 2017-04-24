<template>
	<div id="header" :class="" @click='showtop'>
		<a @click.stop="showNav" class="go-menu" :class="{active:this.$store.getters.leftNavState}">
			<i class="el-icon-menu"></i>
		</a>
		<div class="title">
			<p>{{com.title}}</p>
			<!-- <a class="go-city">广州<i class="icon iconfont icon-bottom"></i></a> -->
		</div>
	</div>
</template>
<script>
	require('../assets/header.less')
	export default {
		data(){
			return {

			}
		},
		props:{
			com:Object,
			showtop:Function
		},
		methods:{
			showNav:function(){
				var current = this.$store.getters.leftNavState;
				return this.$store.dispatch('changeLeftNavState',!current)
			},
		}
	}
</script>
<style lang='less'>

</style>