export default {
  path: '/friend',
  component: () => import(/* webpackChunkName: "router" */ '../../views/friend')
};