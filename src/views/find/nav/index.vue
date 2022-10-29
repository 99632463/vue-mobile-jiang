<template>
  <div class="nav">
    <ul>
      <li>
        <p>
          <img src="../../../assets/images/home-it666-rl.png" />
          <span>{{new Date().getDate()}}</span>
        </p>
        <span>每日推荐</span>
      </li>
      <li>
        <img src="../../../assets/images/home-it666-gd.png" />
        <span>歌单</span>
      </li>
      <li>
        <img src="../../../assets/images/home-it666-phb.png" />
        <span>排行榜</span>
      </li>
      <li>
        <img src="../../../assets/images/home-it666-dt.png" />
        <span>电台</span>
      </li>
      <li>
        <img src="../../../assets/images/home-it666-zb.png" />
        <span>直播</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='less'>
.nav {
  width: 100%;
  padding: 44/100rem 0;
  ul {
    display: flex;
    li {
      margin-right: 50/100rem;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 98/100rem;
        background: #fd271b;
        border-radius: 50%;
        margin-bottom: 20/100rem;
      }
      p {
        position: relative;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 22/100rem;
          color: #fd271b;
        }
      }
      span {
        font-size: 22/100rem;
      }
    }
  }
}
</style>
