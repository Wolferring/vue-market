<template>
	<div id="header" :class="{fix:goTop}">
		<a @click="showNav" class="go-menu">
			<i class="el-icon-menu"></i>
		</a>
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
			com:{
				type:Object
			}
		},
		methods:{
			showNav:function(){
				return this.$store.dispatch('changeLeftNavState',true)
			}
		}
	}
</script>
<style lang='less'>

</style>