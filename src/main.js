import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false



new Vue({
	//vue作用范围为页面的id=app的dom结构之内
  el: '#app',
  
//等价于：'router': router,
  router,
  
  //根组件渲染的方式1
/*
  //把el作用的dom结构替换成模板内的内容
	template: '<App/>',

//该vue实例拥有App这个组件
//components: { 
//	'App': App
//}
  components: { App }
*/

	//根组件渲染的方式2
	//render方法的意思是把render中的组件dom结构直接替换了vue实例作用的dom结构
	render: test=>test(App)

})
