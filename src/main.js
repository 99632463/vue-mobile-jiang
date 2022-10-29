import Vue from 'vue'
import FastClick from 'fastclick';
import App from './App.vue'
import router from './routers'
import ajax from '../service';
import components from './components';
import * as filters from './common/filters';
import controls from './common/controls';

Vue.config.productionTip = false;
Vue.prototype.eventBus = new Vue();
Vue.prototype.$http = ajax;

document.addEventListener('DOMContentLoaded', function() {
  FastClick.attach(document.body);
}, false);

components(Vue);
controls(Vue);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
