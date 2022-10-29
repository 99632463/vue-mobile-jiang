export default {
  path: '/account',
  component: () => import(/* webpackChunkName: "router" */ '../../views/account')
};