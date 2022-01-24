import Vue from 'vue'
import App from './App.vue'
/* 引入写好的路由器 */
import router from './router/index';
import {Button,Row,Col,Swipe,SwipeItem,Lazyload,List} from 'vant';


Vue.config.productionTip = false
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)
.use(List)



new Vue({
	render: h => h(App),
	router,
	components:{App}
}).$mount('#app')

console.log("😂main.js");