export default {
  path: '/mine',
  component: () => import(/* webpackChunkName: "router" */ '../../views/mine')
};