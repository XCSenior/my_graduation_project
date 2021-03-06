import Vue from 'vue';
import VueRouter from 'vue-router';
import ShoppingMall from '@/components/pages/ShoppingMall';
import Register from '../components/pages/Register';
import Login from '../components/pages/Login';
import Goods from '../components/pages/Goods.vue';
import CategoryList from '../components/pages/CategoryList.vue';
import Cart from '../components/pages/Cart.vue';
import Main from '../components/pages/Main.vue';
import Member from '../components/pages/Member.vue';

Vue.use(VueRouter)

export default new VueRouter({
	routes:[
		{
			path:"/", name:"Main", component:Main,
			children:[
				{	path:"/", name:"ShoppingMall", component:ShoppingMall},
				{	path:"/CategoryList", name:"CategoryList", component:CategoryList},
				{	path:"/Cart", name:"Cart", component:Cart},
				{	path:"/Member", name:"Member", component:Member},
			]
		},
		{	path:"/register", name:"Register", component:Register},
		{	path:"/login", name:"Login", component:Login},
		{	path:"/goods", name:"Goods", component:Goods},
	]
})