import Vue from 'vue'
import Router from 'vue-router'

//外卖
import SellMain from './../components/sell/sellMain.vue'
import SearchAddress from './../components/sell/searchAddress.vue'
import SellerDetail from './../components/sell/sellerDetail.vue'
//发现
import DiscoverMain from './../components/discover/discoverMain.vue'
//订单
import OrderMain from './../components/order/orderMain.vue'
//我的
import MeMain from './../components/me/meMain.vue'


Vue.use(Router)

export default new Router({
  routes: [
    //外卖
    {
    	path: '/sell',
    	component: SellMain,
    	children: [
    		//外卖的地址搜索
		    {
		    	path: 'searchAddress',
		    	component: SearchAddress
		    },
		    //商家详情
		    {
		    	path: 'sellerDetail/:id',
		    	component: SellerDetail
		    }
    	]
    },
    //发现
    {
    	path: '/discover',
    	component: DiscoverMain
    },
    //订单
    {
    	path: '/order',
    	component: OrderMain
    },
    //我的
    {
    	path: '/me',
    	component: MeMain
    },
    {
    	path: '*',
    	redirect: '/sell'
    }
  ]
})
