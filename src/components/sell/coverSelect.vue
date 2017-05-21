<template>
	
	<div class="cover-select">
		
	<transition enter-active-class="sell-animated zoomIn" leave-active-class="sell-animated zoomOut">
		
		<div class="popup" v-show="isShow">
				<h3 class="title">
					{{data.name}}
				</h3>
				<p class="sub">规格</p>
				<div class="select">
					<span v-for="(item, index) in data.specfoods" :key="index" :class="{'active': index==subIndex}" @click="subAction(index)">{{item.specs[0].value}}</span>
				</div>
				<div class="cart">
					<p><em>￥</em> {{data.specfoods[subIndex].price}}</p>
					<span @click="addToCart()">加入购物车</span>
				</div>
				<span class="cancel" @click="cancelAction()">
					X
				</span>
		</div>
		
	</transition>
		
	</div>
	
	
</template>
<script>
export default {
	props: ['data'],
	data(){
		return {
			isShow: false,
			subIndex : 0
		}
	},
	methods: {
		subAction(index){
			this.subIndex = index;
		},
		addToCart(){
			//将商品加入购物车
			//关闭弹出的选规格页面
			this.isShow = false;
			this.$emit('item-selected', {
				name: this.data.name,
				specfood: this.data.specfoods[this.subIndex]
			});
			
		},
		cancelAction(){
			//关闭弹出的选规格页面
			this.isShow = false;
			this.$emit('item-selected');
		}
	},
	mounted(){
		this.isShow = true
	}
}

	
</script>
<style>
.cover-select{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
}	
.cover-select .popup{
	width: 255px;
	height: 147px;
	background: #fff;
	margin: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	box-sizing: border-box;
	border-radius: 6px;
}	
.cover-select .popup .title{
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #666;
	font-weight: bold;
	font-size: 14px;
}	
.cover-select .popup .cancel{
	position: absolute;
	top: 0px;
	right: 0px;
	padding: 10px;
	color: #ccc;
}	
.cover-select .popup .sub{
	font-size: 12px;
	color: #666;
	padding-left: 10px;
}
.cover-select .popup .select{
	padding: 4px 0;
	padding-left: 10px;
}
.cover-select .popup .select>span{
	padding: 2px 4px;
	font-size: 12px;
	color: #666;
	border: 1px solid #999;
	border-radius: 9px;
	margin-right: 15px;
}
.cover-select .popup .select>span.active{
	background: #f6fbff;
	color: #3199e8;
	border: #3199e8 1px solid;
}
.cover-select .popup .cart{
	height: 50px;
	margin-top: 20px;
	background: #f9f9f9;
	border-top: 1px solid #eee;
	position: relative;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
}
.cover-select .popup .cart p{
	line-height: 50px;
	color: #ff6000;
	font-size: 16px;
	font-weight: bold;
	padding-left: 20px;
}
.cover-select .popup .cart p>em{
	font-size: 12px;
}
.cover-select .popup .cart span{
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	padding: 8px;
	background: #0096FF;
	color: #fff;
	border-radius: 4px;
}
</style>