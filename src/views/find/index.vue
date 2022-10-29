<template>
  <div style="width:100%;height:100%;">
    <Header />
    <Scroller :handleScroll="handleScroll" :handleScrollEnd="handleScrollEnd" ref="ScrollerRef">
      <Swiper />
      <Nav />
      <Gd />
      <Exclusive />
      <Album />
      <MV />
      <DJ />
    </Scroller>
  </div>
</template>

<script>
import Swiper from "./swiper";
import Nav from "./nav";
import Gd from "./gd";
import Exclusive from "./exclusive";
import Album from "./album";
import MV from "./mv";
import DJ from "./dj";

const components = { Swiper, Nav, Gd, Exclusive, Album, MV, DJ };

export default {
  name: "Find",
  data() {
    return {
      isRefreshing: false,
      maxScrollY: 0,
      isPullUp: false
    };
  },
  mounted() {},
  methods: {
    handleScroll(offset, scroll) {
      this.maxScrollY = scroll.maxScrollY - 120;

      if (offset.y <= this.maxScrollY) {
        scroll.maxScrollY = this.maxScrollY;
        this.isPullUp = true;
      }
    },
    handleScrollEnd(pos, scroll) {
      if (pos.y >= 170 && !this.isRefreshing) {
        console.log("正在请求数据中...");
        this.isRefreshing = true;

        setTimeout(() => {
          console.log("数据已更新完！");
          this.isRefreshing = false;
        }, 2000);
      } else if (this.isPullUp && !this.isRefreshing) {
        console.log("loading......");
        this.isRefreshing = true;
        scroll.maxScrollY = -7140;

        setTimeout(() => {
          console.log("loading complete");
          this.isRefreshing = false;
          this.isPullUp = false;
        }, 2000);
      }
    }
  },
  components
};
</script>

<style lang='less'>
.category {
  width: 100%;
  border-top: 1px solid #ccc;
  .category-top {
    width: 100%;
    height: 120/100rem;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 34/100rem;
      font-weight: bold;
      color: #333;
      line-height: 120/100rem;
    }
    span {
      font-size: 26/100rem;
      padding: 10/100rem 20/100rem;
      border: 1px solid #ccc;
      height: 66/100rem;
      line-height: 45/100rem;
      box-sizing: border-box;
      border-radius: 33/100rem;
      text-align: center;
      font-weight: bold;
      margin-top: 27/100rem;
    }
  }
  .category-bottom {
    width: 100%;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        margin-bottom: 40/100rem;
        div {
          width: 216/100rem;
          height: 216/100rem;
          border-radius: 15/100rem;
          overflow: hidden;
          position: relative;
          p {
            position: absolute;
            top: 7/100rem;
            right: 7/100rem;
            img {
              width: 26/100rem;
              vertical-align: -1px;
            }
            span {
              font-size: 26/100rem;
              color: #ffffff;
            }
          }
        }
        & > p {
          width: 216/100rem;
          margin-top: 15/100rem;
          font-size: 26/100rem;
          color: #333;
        }
      }
    }
  }
}
</style>
