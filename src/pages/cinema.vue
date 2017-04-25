<template>
	<div id="cinema">
		<ul class="cinema-list">
			<div v-for="item in district" class="cinema-list-item item">
				<h3 @click="changeArea(item.pinyin)">{{item.name}}</h3>
				<div class="list" v-if="pinyin==item.pinyin">
					<div class="shop" v-for="shop in cinemaList" v-if="shop.district.pinyin == item.pinyin">
						<h4>
							{{shop.name}}
						</h4>
					</div>
				</div>
			</div>
		</ul>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'

	export default{
		data(){
			return {
				pinyin:""
			}
		},
		created:function(){
			document.body.scrollTop = 0;
			let id = this.$route.params.id;
			let	filmName = this.$route.params.film;
			this.$store.dispatch('getCinemaList',id)
			this.$store.commit('COM_CONF',{
				title:filmName+'-查看影院'
			});
		},
		computed:{
			cinemaList:function(){
				return this.$store.getters.getCinemaList;
				
			},
			district:function(){
				this.pinyin = this.$store.getters.getDistrict[0].pinyin
				return this.$store.getters.getDistrict				
			}
		},
		methods:{
			changeArea:function(area){
				if (area==this.pinyin){
					this.pinyin = null;
					return true;
				}
				this.pinyin = area
			}
		}
	}
</script>
<style lang="less">
	@import url('../assets/var.less');
	#cinema{
		.cinema-list{
			.item{
				padding: 2vh 5vw;
				margin:2vh 0;
				background-color: @maincolor;
				color:#fff;
				h3{
					font-size: .95rem;
					font-weight: normal;
				}
				.list{
					h4{
						font-size: .65rem;
						font-weight: normal;
						margin: 2vh 0;
					}
				}
			}
		}
	}
</style>