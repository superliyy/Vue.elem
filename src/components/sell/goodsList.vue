<template>
<div class="goods">
	<ul class="nav">
		<li @click="navItemAction(index)" v-for="(item, index) in listData" :key="index" :class="{'active': index==navIndex}" >
			{{item.name}}
		</li>
	</ul>
	<div class="goods-list" id="goods-list">
		<div class="wrapper">
			
			<div class="item-section" v-for="(sectionData, i) in listData" :key="i">
				<p>{{sectionData.name}}</p>
				<good-item v-for="(itemData, i) in sectionData.foods" :key="i" :data="itemData" @item-ready="refreshScroll"></good-item>
				
			</div>
			
		</div>
	</div>
</div>
	
	
</template>


<script>
import Vue from 'vue'
import http from 'vue-resource'
import goodItem from './goodItem'
Vue.use(http)

export default {
	data(){
		return {
			listData: [],
			goodsScroll: null,
			sectionHeightArr: [],
			navIndex: 0
		}
	},
	methods: {
		refreshScroll(){
			this.goodsScroll.refresh();
		},
		navItemAction(index){
			this.navIndex = index;
			
			if(this.sectionHeightArr.length==0){
				//获得所有section的高度
				var sections = document.getElementsByClassName('item-section');
//				console.log(sections)
				for(var section of sections){
					this.sectionHeightArr.push(section.offsetHeight)
				}
//				console.log(...this.sectionHeightArr)
			}
			//让列表滚动到对应的位置
			var offY = 0;
			for(var i = 0; i < index; i++){
				offY -= this.sectionHeightArr[i];
			}
			offY = this.goodsScroll.maxScrollY>offY? this.goodsScroll.maxScrollY : offY;
			this.goodsScroll.scrollTo(0, offY);
		}
	},
	components: {
		'good-item': goodItem
	},
	mounted(){
		//请求列表数据
		this.$http.get('./static/server-data/goods.json').then(
			function(res){
				this.listData = res.data;
			},
			function(){
				
			}
		)
		
		this.goodsScroll = new IScroll('#goods-list', {
			probeType: 3,
			click: true,
			tap: true
		})
		//监听列表的滚动
		this.goodsScroll.on('scroll', function(){
			
			if(this.sectionHeightArr.length==0){
				//获得所有section的高度
				var sections = document.getElementsByClassName('item-section');
				for(var section of sections){
					this.sectionHeightArr.push(section.offsetHeight)
				}
//				console.log(...this.sectionHeightArr)
			}

			//820 292 380 716 204 804 460 2148 978 588 348 748 508 348 188
			//0  ~  -820  index = 0
			//-820  ~   -820-292  index = 1
			//-820-292 ~ -820-292-380  index = 2
			
			//0  0  -820  1  -1112    -1492
			
			var y = this.goodsScroll.y;
			//计算每个section所在的偏移量
			for(var i = 0; i < this.sectionHeightArr.length; i++){
				var min = 0;
				var max = 0;
				for(var j = 0; j < i; j++){
					max -= this.sectionHeightArr[j];
				}
				min = max-this.sectionHeightArr[i];
				
				console.log(min+'~~~~~'+max);
				//如果处在该section偏移量之间，说明该nav的按钮选中
				if(y<=max && y>min){
					this.navIndex = i;
//					console.log(this.navIndex)
					break;
				}
				
				
			}
			
			
			
		}.bind(this))
		
		
		
		
		
		
		
	}
	
	
	
}
	
</script>


<style>
.goods{
	width: 100%;
	height: 100%;
	display: flex;
}
.goods .nav{
	width: 80px;
	overflow: auto;
}
.goods .nav li{
	background: #f8f8f8;
	border-bottom: 1px solid #ededed;
	height: 45px;
	color: #666;
	font-size: 12px;
	line-height: 45px;
	border-left: 2px solid #f8f8f8;
}
.goods .nav li.active{
	border-left: 2px solid #3190e8;
	background: #fff;
	font-weight: bold;
}
.goods .goods-list{
	flex: 1;
	height: 100%;
	overflow: hidden;
}	
.goods .goods-list .item-section>p{
	background: #f1f1f1;
	font-size: 12px;
	font-weight: bold;
	height: 28px;
	line-height: 28px;
	padding-left: 5px;
	color: #666;
}
</style>