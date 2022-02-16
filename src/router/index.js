import Vue from 'vue';
import VueRouter from 'vue-router';
import ShoppingMall from '@/components/pages/ShoppingMall';
import Register from '../components/pages/Register';
import Login from '../components/pages/Login';
import Goods from '../components/pages/Goods.vue';
import CategoryList from '../components/pages/CategoryList.vue';

Vue.use(VueRouter)

export default new VueRouter({
	routes:[
		{ path:"/", name:"ShoppingMall", component:ShoppingMall},
		{ path:"/register", name:"Register", component:Register},
		{ path:"/login", name:"Login", component:Login},
		{ path:"/goods", name:"Goods", component:Goods},
		{ path:"/CategoryList", name:"CategoryList", component:CategoryList},
	]
})