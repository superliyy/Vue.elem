<template>
<div class="goods-item">
	<div class="main">
		<img :src="mainImg" v-if="mainImg!=''"/>
		<div class="goods-content">
			<h3>{{data.name}}</h3>
			<p>月售{{data.month_sales}}份</p>
		</div>
	</div>
	<div class="info">
		<p><span>￥{{price}}</span><span v-if="data.specfoods.length>1">起</span></p>
		<div class="handle" v-if="data.specfoods.length>1" @click="selectAction()">选规格</div>
		<div class="handle" v-if="data.specfoods.length==1">add</div>
	</div>
</div>
</template>


<script>
import Event from './../../event.js'
export default {
	props: ['data'],
	data(){
		//取得价格表中的最小值
		var price = this.data.specfoods[0].price;
		this.data.specfoods.map(function(item){
			price = item.price>price? price : item.price;
		})
		
		return {
			mainImg: this.data.image_path?'http://fuss10.elemecdn.com/'+this.data.image_path+'.jpeg':'',
			//赋值最小价格
			price
		}
	},
	methods: {
		selectAction(){
			//触发事件
			var data = this.data;
			Event.$emit('show-select', {
				name : data.name,
				specfoods: data.specfoods
			});
		}
	},
	mounted(){
		console.log('data'+this.data);
		//告诉父级组件dom创建完毕，可以刷新滚动视图
		this.$emit('item-ready');
	}
	
}
</script>

<style>
.goods-item{
	padding: 8px;
}
.goods-item .main{
	display: flex;
}
.goods-item .main>img{
	width: 44px;
	height: 44px;
}	
.goods-item .main>.goods-content{
	flex: 1;
	padding-left: 8px;
}	
.goods-item .main>.goods-content>h3{
	font-weight: bold;
	font-size: 14px;
	color: #333;
}
.goods-item .main>.goods-content>p{
	font-size: 12px;
	line-height: 22px;
	color: #666;
}
.goods-item .info{
	line-height: 28px;
	padding-left: 44px;
	position: relative;
}
.goods-item .info>p{
	line-height: 28px;
	font-size: 12px;
	color: #666;
}
.goods-item .info>p>span{
	padding-left: 8px;
}
.goods-item .info>p>span:first-child{
	font-size: 14px;
	font-weight: bold;
	color: #f60;
}
.goods-item .info>.handle{
	background: #2395FF;
	font-size: 12px;
	color: #fff;
	border: none;
	border-radius: 11px;
	height: 20px;
	line-height: 20px;
	position: absolute;
	right: 0;
	bottom: 3px;
	padding: 2px;
}
</style>