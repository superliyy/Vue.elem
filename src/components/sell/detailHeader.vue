<template>
	<header class="detail-header" :style="{backgroundImage: bgImg}">
		<div class="back"><span @click="backAction()">返回</span></div>
		<div class="main">
			<img class="main-img" :src="mainImg"/>
			<div class="main-content">
				<h2 class="title">{{data.name}}</h2>
				<p class="send-info">{{data.delivery_mode.text}}/{{data.order_lead_time}}分钟送达/{{data.piecewise_agent_fee.description}}<span>></span></p>
				<p class="promotion">公告：{{data.promotion_info}}</p>
			</div>
		</div>
		<div class="activity" @click="activityAction()"></div>
	</header>
	
</template>

<script>
export default {
	props: ['data'],
	data(){
		return {
			bgImg: '',
			mainImg: ''
		}
	},
	methods: {
		backAction(){
			this.$emit('back-click');
		},
		activityAction(){
			this.$emit('activity-click');
		}
	},
	mounted(){
		this.bgImg = 'url(http://fuss10.elemecdn.com/'+this.data.image_path+'.png?imageMogr/format/webp/thumbnail/!40p/blur/50x40/)';
		this.mainImg = 'http://fuss10.elemecdn.com/'+this.data.image_path+'.png?imageMogr/format/webp/';
	}
	
}
	
	
</script>


<style>
.detail-header{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 115px;
	background-size: 100%;
}
.back{
	height: 30px;
	width: 100%;
	background: transparent;
	position: relative;
}
.back span{
	position: absolute;
	left: 0;
	line-height: 30px;
	font-size: 14px;
	padding: 0 20px;
	color: #fff;
}
.detail-header .main{
	height: 55px;
	padding: 0 10px;
	display: flex;
}	
.detail-header .main .main-img{
	display: block;
	width: 55px;
	height: 55px;
	
}
.detail-header .main .main-content{
	flex: 1;
	padding-left: 10px;
}	
.detail-header .main .main-content .title{
	font-size: 16px;
	color: #fff;
	line-height: 16px;
}
.detail-header .main .main-content p{
	color: #fff;
	font-size: 12px;
	transform: scale(0.9);
	transform-origin: left;
	width: 110%;
}
.detail-header .main .main-content .send-info{
	line-height: 27px;
	position: relative;
}
.detail-header .main .main-content .send-info>span{
	position: absolute;
	right: 0;
}
.detail-header .main .main-content .promotion{
	line-height: 12px;
}
.detail-header .activity{
	width: 100%;
	height: 24px;
	margin-top: 4px;
	background: #fff;
}
</style>