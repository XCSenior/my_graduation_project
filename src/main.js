import Vue from 'vue'
import App from './App.vue'
import {Button,Row,Col} from 'vant';
/* 引入写好的路由器 */
import router from './router/index';

Vue.config.productionTip = false
Vue.use(Button).use(Row).use(Col)


new Vue({
	render: h => h(App),
	router,
	components:{App}
}).$mount('#app')

