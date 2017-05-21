<template>
	<div id="app">
		
		<!-- 单页面组件的模板容器 -->
		<router-view></router-view>
		
		<!-- tabbar组件 -->
		<mt-tabbar v-model="tabFlag">
			<mt-tab-item v-for="(tabItem, index) in tabItemArr" :id="tabItem.path" :key="index">
				<span slot="icon" v-if="tabFlag!=tabItem.path" class="iconfont" :class="tabItem.iconOff"></span>
				<span slot="icon" v-if="tabFlag==tabItem.path" class="iconfont" :class="tabItem.iconOn"></span>
				 {{tabItem.title}}
			</mt-tab-item>
		</mt-tabbar>

	</div>
</template>

<script>
import './css/iconfont.css'

import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui'

import router from './router'

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);


export default {
  name: 'app',
  mounted(){
  	console.log('mounted');
  	//监听tabIndex的变化，让路由进行切换
  	this.$watch('tabFlag', function(newVal, oldVal){
  		console.log('newVal:'+newVal);
  		
		router.push('/'+newVal);
  	});
  },
  data(){
  	return {
  		tabFlag: 'sell',
  		tabItemArr: [
  			{ title: '外卖', path:'sell', iconOff: 'icon-eleme1', iconOn: 'icon-eleme2' },
  			{ title: '发现', path:'discover', iconOff: 'icon-discover1', iconOn: 'icon-discover2' },
  			{ title: '订单', path:'order', iconOff: 'icon-order1', iconOn: 'icon-order2' },
  			{ title: '我的', path:'me', iconOff: 'icon-me1', iconOn: 'icon-me2' }
  		]
  	}
  }
}
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
}
#app .content{
	width: 100%;
	position: absolute;
	top: 0;
	bottom: 49px;
	left: 0;
}
a.mint-tab-item {
	padding: 4px 0;
}
div.mint-tabbar {
	background-color: #fff;
}
div.mint-tabbar > .mint-tab-item.is-selected{
	background: none;
}
</style>
