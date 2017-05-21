<template>
	<header class="sell-header">
		<div class="info">
			<div class="address" @click="addressAction()">
				深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳
			</div>
			<div class="weather">
				<img :src="weather.img" />
				<div>
					<span>{{weather.temperature}}</span>
					<span>{{weather.description}}</span>
				</div>
			</div>
		</div>
		<form class="search">
			<input type="text" placeholder="搜索商家、商品" />
		</form>
		<div class="tips">
			<div class="tips-wrapper" :style="wrapperStyle">
				<span v-for="tip in tipArr">{{tip.word}}</span>
			</div>
		</div>
	</header>
	
</template>

<script>
import Vue from 'vue'
import http from 'vue-resource'
Vue.use(http)

export default {
	name: 'sell-header',
	data(){
		return {
			weather: {temperature: '', description: '', img: ''},
			tipArr:[],
			wrapperStyle: {
				width: ''
			}
		}
	},
	methods: {
		addressAction(){
			this.$emit('get-address', '深圳');
		}
	},
	mounted(){
		//请求天气
		this.$http.get('/static/server-data/weather.json').then(
			function(res){
				this.weather.temperature = res.data.temperature+'°';
				this.weather.description = res.data.description;
				this.weather.img = 'http://fuss10.elemecdn.com/'+res.data.image_hash+'.png';
			},
			function(res){
				
			}
		);
		
		//请求热门关键字
		this.$http.get('/static/server-data/hot-words.json').then(
			function(res){
//				console.log(res)
				this.tipArr = res.data;
				var width = 0;
				res.data.map(function(val){
					width += val.word.length * 12 + 14;
				})
				this.wrapperStyle.width = width + 'px';
				
			}
		)
	}
}
	
</script>

<style>
.sell-header{
	background-color: #0096ff;
	padding: 6px 10px;
}
.sell-header .info{
	height: 30px;
	width: 100%;
}
.sell-header .info .address{
	width: 160px;
	height: 30px;
	float: left;
	line-height: 30px;
	overflow: hidden;
	color: #fff;
	font-weight: bold;
}
.sell-header .info .weather{
	float: right;
	width: 100px;
	height: 30px;
}
.sell-header .info .weather img{
	width: 30px;
	height: 30px;
	float: right;
}
.sell-header .info .weather div{
	float: right;
}
.sell-header .info .weather span{
	font-size: 12px;
	color: #fff;
	display: block;
}
.sell-header .search input{
	width: 100%;
	background: #fff;
	height: 28px;
	border: 0;
	border-radius: 14px;
	outline: none;
	text-align: center;
	margin: 4px auto;
	display: block;
}
.sell-header .tips{
	color: #fff;
	height: 20px;
	width: 100%;
	overflow: auto;
}
.sell-header .tips .tips-wrapper{
	line-height: 20px;
	color: #fff;
	overflow: hidden;
}
.sell-header .tips .tips-wrapper>span{
	margin-right: 14px;
	float: left;
	font-size: 12px;
}
</style>


