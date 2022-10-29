import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const r = require.context('./', true, /\.router\./i);
const routes = [];

r.keys().forEach(key => {
  routes.push(r(key).default);
});

export default new Router({
  routes: [
    ...routes,
    {
      path: '/',
      redirect: '/find'
    }
  ]
});