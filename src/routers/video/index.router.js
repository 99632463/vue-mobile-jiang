export default {
  path: '/video',
  component: () => import(/* webpackChunkName: "router" */ '../../views/video')
};