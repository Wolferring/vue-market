<template>
	<div id="detail" v-if="detail">
		<div class="cover"><img :src="detail.cover.origin" alt=""></div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		created:function(){
			// if(!this.detail){
				let id = this.$route.params.id;
				this.$store.dispatch('getFilmDetail',id)
				console.log(this.detail)
			// }
		},		
		computed:mapGetters({
			detail:'getFilmDetail'
		})		
	}
</script>