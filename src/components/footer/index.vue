<template>
  <div class="footer">
    <ul>
      <router-link :class="{active: $route.path === '/find'}" tag="li" to="/find">
        <img src="../../assets/images/toolbar-it666-discovery-normal.png">
        <span>发现</span>
      </router-link>
      <router-link :class="{active: $route.path === '/video'}" tag="li" to="/video">
        <img src="../../assets/images/toolbar-it666-video-normal.png">
        <span>视频</span>
      </router-link>
      <router-link :class="{active: $route.path === '/mine'}" tag="li" to="/mine">
        <img src="../../assets/images/toolbar-it666-me-normal.png">
        <span>我的</span>
      </router-link>
      <router-link :class="{active: $route.path === '/friend'}" tag="li" to="/friend">
        <img src="../../assets/images/toolbar-it666-friend-normal.png">
        <span>朋友</span>
      </router-link>
      <router-link :class="{active: $route.path === '/account'}" tag="li" to="/account">
        <img src="../../assets/images/toolbar-it666-account-normal.png">
        <span>账户</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang='less'>
.footer {
  width: 100%;
  height: 98/100rem;
  position: fixed;
  background: #ccc;
  left: 0;
  bottom: 0;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    li {
      font-size: 18/100rem;
      text-align: center;
      margin: 0px 46/100rem;
      img {
        width: 56/100rem;
        height: 56/100rem;
        margin-top: 10/100rem;
        display: block;
      }
      &.active {
        color: #fd271b;
        img {
          background: #fd271b;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
