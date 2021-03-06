import Vue from 'vue'
import App from './App.vue'
/* 引入写好的路由器 */
import router from './router/index';
import {Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar,Tab,Tabs,Tabbar,TabbarItem,PullRefresh,Stepper,Cell } from 'vant';


Vue.config.productionTip = false
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(Cell);



new Vue({
	render: h => h(App),
	router,
	components:{App}
}).$mount('#app')

// console.log("😂main.js");