export default {
  path: '/search',
  component: () => import(/* webpackChunkName: "router" */ '../../views/search')
};