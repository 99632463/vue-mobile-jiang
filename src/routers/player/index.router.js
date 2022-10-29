export default {
  path: '/player',
  component: () => import(/* webpackChunkName: "router" */ '../../views/player'),
  meta: {
    hideFooter: true
  }
};