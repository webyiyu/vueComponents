import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Alert from "../src/components/alert/alert.js";

Vue.use(router);

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert

new Vue({
  render: h => h(App),
  router
}).$mount('#app')