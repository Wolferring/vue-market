<template>
	<div id="cinema">
		<ul class="cinema-list">
			<div 
				v-for="item in district" 
				class="cinema-list-item item" 
				:key="item.pinyin"
			>
				<div class="cinema" @click="changeArea(item.pinyin)">
					<h3>{{item.name}} <span>{{list.length}}</span></h3>
				</div>
				<div class="list" v-if="pinyin==item.pinyin">
				<a 
					v-for="shop in list"
					v-if="shop.district.pinyin == item.pinyin" 
					@click="getSchedule(shop.id)"
				>
					<div class="shop">
						<h4>
							{{shop.name}}
							<el-tag type="danger">最低价:{{shop.minimumPrice}}</el-tag>
						</h4>
						<div class="tip">
							<el-tag type="success"  v-for="tip in shop.labels" v-if="tip.type != 'REFUNDABLE_SEAT_TICKET'" :class="tip.type.toLocaleLowerCase()">{{tip.name}}</el-tag>
						</div>						
						<p class="area">{{shop.address}}</p>
						<div v-if="currentCinema==shop.id">
							<div class="schedule" v-for="sch in schedule" v-if="sch.cinema.id==shop.id">
								<p>
									{{sch.hall.name}}
								</p>
								<p>
									{{sch.showAt|formatDate}}
								</p>
								
							</div>
						</div>
					</div>
				</a>
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
				pinyin:"",
				currentCinema:0
			}
		},
		created:function(){
			this.fetchData()
		},
		filters:{
			formatDate:function(time){
				let date = new Date(time*1),
					month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1) ,
					day = date.getDate()  > 9 ? date.getDate()  : '0' + date.getDate(),
					week = date.getDay(),
					hour = date.getHours(),
					minute = String(date.getMinutes()).length>1?date.getMinutes():('0'+date.getMinutes());
				
				let arr = ['日','一','二','三','四','五','六']
				
				return `${month}月${day}日 星期${arr[week]} ${(hour)}:${(minute)}`
			}
		},
		computed:{
			list:function(){
				return this.$store.getters.getCinemaList;
			},
			district:function(){
				return this.$store.getters.getDistrict;		
			},
			schedule:function(){
				return this.$store.getters.getScheduleList
			},
			_id:function(){
				return this.$route.params.id
			}
		},
		methods:{
			changeArea:function(area){
				if (area==this.pinyin){
					this.pinyin = null;
					return true;
				}
				this.pinyin = area
			},
			fetchData(){
				document.body.scrollTop = 0;
				let id = this.$route.params.id;
				this.$store.dispatch('getCinemaList',id)
			},
			getSchedule(cinemaid){
				if (cinemaid==this.currentCinema){
					this.currentCinema = null;
					return true;
				}				
				this.$store.dispatch('getScheduleList',{
					film:this._id,
					cinema:cinemaid
				});
				this.currentCinema = cinemaid;
			}
		}
	}
</script>
<style lang="less">
	@import url('../assets/var.less');
	#cinema{
		.cinema-list{
			.item{
				margin:2vh 0;
				.cinema{
					color:#fff;
					background-color: @maincolor;
					padding: 2vh 5vw;
					h3{
						font-size: .95rem;
						font-weight: normal;
					}
				}
				.list{
					padding: 0 5vw;
					h4{
						margin: 1vh 0;
						font-size: .75rem;
						font-weight: normal;
					}
					.shop{
						border-bottom: 1px solid lighten(@maincolor,30%);
						padding: 1vh 0;
						.tip{
							.el-tag{
								margin-right: 1vw;
							}
						}
						.area{
							margin: 1vh 0;
						}
					}
				}
			}
		}
	}
</style>