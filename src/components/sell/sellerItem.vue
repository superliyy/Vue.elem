<template>
	<div class="seller-item" @click="itemTapAction()">
		<div class="main-img">
			<img :src="data.mainImg" />
		</div>
		<div class="main-content">
			<h3 class="title">
				{{data.name}}
			</h3>
			<p class="rating">
				<span>{{data.rating}}</span>&nbsp;<span>月售{{data.count}}单</span>
			</p>
			<p class="info">
				￥{{data.minmumPrice}}起送/ 配送费￥{{data.fee}}/ {{data.avg}}
			</p>
			<p class="dis-min">
				<span class="distance">{{data.distance | distanceFilter}}/</span>
				<span class="minute">{{data.time}}分钟</span>
			</p>
		</div>
	</div>
</template>

<script>

import filter from './../../filter.js'

export default {
	props: ['data'],
	methods: {
		itemTapAction(){
			this.$emit('seller-item-click', this.data.id);
		}
	}
}
	
	
	
</script>

<style>
.seller-item{
	padding: 10px;
	border-bottom: 1px solid #eee;
	display: flex;
}	
.seller-item .main-img{
	width: 55px;
	height: 55px;
	
}
.seller-item .main-img>img{
	width: 100%;
	height: 100%;
	border: none;
}
.seller-item .main-content{
	margin-left: 10px;
	flex: 1;
	position: relative;
}
.seller-item .main-content .title{
	font-size: 12px;
	font-weight: bold;
	line-height: 12px;
}	
.seller-item .main-content .rating{
	font-size: 12px;
	line-height: 31px;
	height: 31px;
	
}
.seller-item .main-content .rating span{
	font-size: 12px;
	transform: scale(0.8);
	display: inline-block;
}
.seller-item .main-content .rating span:first-of-type{
	color: #ff6000;
	
}
.seller-item .main-content .info{
	font-size: 12px;
	line-height: 12px;
	transform: scale(0.8);
	float: left;
	transform-origin: left;
}
.seller-item .main-content .dis-min{
	position: absolute;
	right: 0;
	bottom: 0;
}
.seller-item .main-content .dis-min .distance{
	font-size: 12px;
	color: #999;
	display: inline-block;
	transform: scale(0.9) translateX(15px);
}
.seller-item .main-content .dis-min .minute{
	font-size: 12px;
	color: #2395ff;
	display: inline-block;
	transform: scale(0.8);
}
</style>