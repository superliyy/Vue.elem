<template>
	<div id="sell" class="content">
		<div class="sell-wrapper">
		<mt-loadmore :bottom-method="loadMore" :autoFill="false" :bottomAllLoaded="allLoaded" ref="loadmore" bottomPullText="" bottomDropText="" bottomLoadingText="">
			<!-- 外卖的头部 -->
			<sell-header @get-address="getAddress"></sell-header>
			
			<!-- 外卖的轮播 -->
			<mt-swipe :auto="0">
			  <mt-swipe-item v-for="(bannerPage, index) in bannerArr" :key="index">
			  	<div class="banner-page">
			  		<div class="banner-item" v-for="bannerItem in bannerPage">
			  			<img :src="'http://fuss10.elemecdn.com'+bannerItem.image_url"/>
			  			<span>{{bannerItem.title}}</span>
			  		</div>
			  	</div>
			  </mt-swipe-item>
			</mt-swipe>
			
			<!-- 外卖的推荐商家列表 -->
			<div class="seller-list">
				<h3 class="title">
					推荐商家
				</h3>
				<!--<mt-cell v-for="item in arr" :title="'标题文字'+item"></mt-cell>-->
				<seller-item @seller-item-click="toItemDetail" v-for="(sellerItem, index) in sellerArr" :key="index" :data="sellerItem"></seller-item>
			</div>
			
		</mt-loadmore>
		</div>
		
		<!-- 子页面 -->
		<router-view></router-view>
		
	</div>
</template>

  
<script>
import Vue from 'vue'
import http from 'vue-resource'
Vue.use(http)
import { Swipe, SwipeItem, Cell, Loadmore } from 'mint-ui';
import sellHeader from './sellHeader.vue'
import sellerItem from './sellerItem.vue'
import router from './../../router'

Vue.component(Cell.name, Cell);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


export default {
	name: 'sell-main',
	components: {
		'sell-header': sellHeader,
		'seller-item': sellerItem
	},
	data(){
		return {
			bannerArr: [],
			sellerArr: [],
			allLoaded: false
		}
	},
	methods: {
		getAddress(val){
			console.log('头部的地址点击了'+val);
			router.push('/sell/searchAddress');
		},
		toItemDetail(id){
			console.log('父级执行去到详情页'+id)	
			router.push('/sell/sellerDetail/'+id);
		},
		loadMore(){
			console.log('上拉加载更多');
			//改变请求的条件，发送请求，请求下一页的数据
			this.getSellerData('/static/server-data/top-seller1.json', true);
		},
		getSellerData(url, flag){
			//请求推荐商家的数据
			this.$http.get(url).then(
				function(res){
					
					res.data.map(function(item, index){
						var obj = {};
						obj.name = item.name;
						if(item.image_path.endsWith('png')){
							obj.mainImg = 'http://fuss10.elemecdn.com/'+item.image_path+'.png';
						}else if(item.image_path.endsWith('jpeg')){
							obj.mainImg = 'http://fuss10.elemecdn.com/'+item.image_path+'.jpeg';
						}
						obj.rating = item.rating;
						obj.count = item.recent_order_num;
						obj.minmumPrice = item.float_minimum_order_amount;
						obj.fee = item.float_delivery_fee;
						obj.avg = item.average_cost;
						obj.distance = item.distance;
						obj.time = item.order_lead_time;
						obj.premium = item.is_premium;
						obj.isNew = item.is_new;
						obj.id = item.id;
						
						this.sellerArr.push(obj);
					}.bind(this))
//					console.log(res.data);
					//关闭加载更多的动画的方法
//					this.allLoaded = false;
					if(flag){
						this.$refs.loadmore.onBottomLoaded()
					}
				}, function(){
					if(flag){
						this.$refs.loadmore.onBottomLoaded()
					}
				}
			)
		}
	},
	mounted(){
		
		console.log()
		
		//请求banner数据
		this.$http.get('/static/server-data/banner.json').then(
			function(res){
				var data = res.data;
				//通过while循环，将banner数据按8条切割成一页banner
				while(data.length>0){
					var subData = data.splice(0, 8);
					this.bannerArr.push(subData);
				}
				
			},
			function(){
				
			}
		)
		
		
		//请求推荐商家的数据第一页数据
		this.getSellerData('/static/server-data/top-seller.json', false);
		
		
	}
}	
</script>


<style>
#sell{
	background: #ddd;
}
.sell-wrapper{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	overflow: auto;
}
div.mint-swipe, div.mint-swipe-items-wrap, div.mint-swipe-items-wrap > div{
	height: 150px;
}
.mint-swipe-items-wrap .banner-page{
	background: #fff;
	width: 100%;
	height: 100%;
}
.mint-swipe-items-wrap .banner-page .banner-item{
	width: 25%;
	height: 45%;
	float: left;
}	
.mint-swipe-items-wrap .banner-page .banner-item img{
	display: block;
	width: 50px;
	height: 50px;
	margin: 0 auto;
}	
.mint-swipe-items-wrap .banner-page .banner-item span{
	display: block;
	text-align: center;
	font-size: 12px;
}
div.mint-swipe-indicators{
	bottom: 2px;
}
div.mint-swipe-indicator{
	opacity: 0.8;
	width: 6px;
	height: 6px;
	background: #ddd;
}
div.mint-swipe-indicator.is-active{
	background: #000;
}
div.mint-loadmore-bottom{
	background: #fff;
}
div.mint-loadmore-spinner > div::before{
	background-color: #26a2ff;
}
.seller-list{
	margin-top: 10px;
	background: #fff;
}
.seller-list>.title{
	font-weight: bold;
	font-size: 12px;
	padding-left: 10px;
	line-height: 24px;
	border-bottom: 1px solid #eee;
}
</style>





