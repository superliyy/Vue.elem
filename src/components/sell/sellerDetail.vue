<template>
	<transition enter-active-class="slideInRight sell-animated" leave-active-class="slideOutRight sell-animated">
	<div class="seller-detail">
		<detail-header @activity-click="activityAction" @back-click="backAction" :data="headerData" v-if="headerData"></detail-header>
		
		
		

		
		<div class="detail-content">
			<div class="tabs">
				<div class="tab-item" v-for="(tabTitle, index) in tabArr" :key="index" :class="{'active': selectIndex==index}" @click="tabAction(index)">
					<span>{{tabTitle}}</span>
				</div>
			</div>
			
			<div class="tab-content">
			<goods-list v-show="selectIndex==0"></goods-list>
			
			<div v-if="selectIndex==1" class="rating">
				评价
			</div>
			</div>
		</div>
		

		<seller-activity @hide-page="activityAction" v-if="isShowAct"></seller-activity>
		
		<cover-select @item-selected="addToCart" v-if="isShowSelect" :data="selectObj"></cover-select>
		
	</div>
	</transition>
</template>

<script>
import Vue from 'vue'
import http from 'vue-resource'

import detailHeader from './detailHeader.vue'
import sellerActivity from './sellerActivity.vue'
import coverSelect from './coverSelect.vue'
import goodsList from './goodsList.vue'
import router from './../../router'
import Event from './../../event.js'



Vue.use(http)

export default {
	data(){
		return {
			headerData: null,
			isShowAct: false,
			selectIndex: 0,
			tabArr: ['商品', '评价'],
			selectObj: null,
			isShowSelect: false
		}
	},
	methods: {
		backAction(){
			console.log(router);
			router.back();
		},
		tabAction(index){
			this.selectIndex = index;
//			console.log(this.selectIndex)
		},
		activityAction(){
			this.isShowAct = !this.isShowAct;
		},
		addToCart(obj){
			//选择了规格到购物车
			setTimeout(function(){
				this.isShowSelect = false;
			}.bind(this), 400);
			console.log('添加到购物车的内容：')
//			console.log(obj)
		}
	},
	components: {
		'detail-header': detailHeader,
		'seller-activity': sellerActivity,
		'goods-list': goodsList,
		'cover-select': coverSelect
	},
	mounted(){
		this.$http.get('./static/server-data/sellInfo.json').then(
			function(res){
//				console.log(res.data)
				this.headerData = res.data;
				
			},
			function(){
				
			}
		)
		
		var that = this;
		//监听选规格的事件
		Event.$on('show-select', function(obj){
//			console.log('选规格');
			console.log(obj+'0000');
			that.selectObj = obj;
			that.isShowSelect = true;
			
		});
		
		
		
	}
}

	
</script>

<style>
	
.seller-detail{
	position: absolute;
	left: 0;
	width: 100%;
	top: 0;
	bottom: -49px;
	z-index: 5;
	background: #fff;
}
.seller-detail .detail-content{
	position: absolute;
	top: 115px;
	left: 0;
	width: 100%;
	bottom: 0;
}
.seller-detail .detail-content .tabs{
	width: 100%;
	height: 36px;
	display: flex;
	border-bottom: 1px solid #eee;
}	
.seller-detail .detail-content .tabs .tab-item{
	flex: 1;
	text-align: center;
	line-height: 36px;
	font-size: 12px;
	color: #666;
}
.seller-detail .detail-content .tabs .tab-item.active{
	color: #3190e8;
}
.seller-detail .detail-content .tabs .tab-item>span{
	padding-bottom: 4px;
}
.seller-detail .detail-content .tabs .tab-item.active>span{
	border-bottom: 1px solid #3190e8;
}
.seller-detail .detail-content .tab-content{
	position: absolute;
	top: 36px;
	bottom: 0;
	width: 100%;
	left: 0;
}
</style>