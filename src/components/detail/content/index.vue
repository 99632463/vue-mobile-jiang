<template>
  <div class="detail-main" ref="detail-main">
    <div class="detail-main-in">
      <div class="detail-main-top" ref="detail-main-top"></div>
      <div class="detail-main-bottom" ref="detail-main-bottom">
        <div class="detail-bottom-header">
          <p :class="{active:tabType === 1}" @tap="toggleTab(1)">
            <span ref="desc">详情</span>
          </p>
          <p :class="{active:tabType === 2}" @tap="toggleTab(2)">
            <span ref="program">节目88</span>
          </p>
          <i ref="line"></i>
        </div>
        <div class="detail-bottom-content">
          <ul>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
            <li>我是第1个li</li>
            <li>我是第2个li</li>
            <li>我是第40个li</li>
            <li>我是第41个li</li>
            <li>我是第42个li</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail-main-bg">
      <img
        ref="scaleImg"
        src="https://p1.music.126.net/AlcnSGfATfLgw3uPPIztOQ==/109951163237715945.jpg"
        alt
      />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "CommonDetail-content",
  data() {
    return {
      headerHeight: 0,
      tabType: 1
    };
  },
  created() {
    this.eventBus.$on("headerRef", headerRef => {
      this.headerHeight = headerRef.offsetHeight;
    });
  },
  mounted() {
    this.initScroll();
    this.initLineDir();
  },
  methods: {
    initScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(".detail-main", {
          tap: true,
          probeType: 3
        });

        const bottom = this.$refs["detail-main-bottom"];
        const topHeight = this.$refs["detail-main-top"].offsetHeight;
        const offset = topHeight - this.headerHeight;

        this.scroll.on("scroll", ({ y }) => {
          if (Math.abs(y) >= offset) {
            bottom.style.position = "fixed";
            bottom.style.left = 0;
            bottom.style.top = this.headerHeight + "px";

            this.scroll.refresh();

            // const subContentOffsetY = Math.abs(y) - offset;
            // console.log('subContentOffsetY: ', subContentOffsetY);
          }

          this.scaleImg(y);
        });

        this.scroll.on("scrollEnd", () => {
          this.$refs.scaleImg.style.width = 100 + "%";
        });
      });
    },
    scaleImg(y) {
      const img = this.$refs.scaleImg;
      const main = this.$refs["detail-main"].offsetHeight;
      const scale = ((main + y) / main) * 100;
      if (y > 0) {
        img.style.width = scale + "%";
      } else {
        img.style.width = 100 + "%";
      }
    },
    initLineDir() {
      const desc = this.$refs["desc"];
      const line = this.$refs["line"];

      line.style.width = desc.offsetWidth + "px";
      line.style.left = desc.offsetLeft + "px";
    },
    toggleTab(type) {
      this.tabType = type;
      const desc = this.$refs["desc"];
      const program = this.$refs["program"];
      const line = this.$refs["line"];

      if (type === 1) {
        line.style.width = desc.offsetWidth + "px";
        line.style.left = desc.offsetLeft + "px";
      } else if (type === 2) {
        line.style.width = program.offsetWidth + "px";
        line.style.left = program.offsetLeft + "px";
      }

      line.style.transition = "left .2s linear";
    }
  }
};
</script>

<style lang='less'>
.detail-main {
  width: 100%;
  height: 100%;
  .detail-main-in {
    position: relative;
    z-index: 1000;
    .detail-main-top {
      width: 100%;
      height: 600/100rem;
    }
    .detail-main-bottom {
      width: 100%;
      background: blue;
      padding-bottom: 98/100rem;
      border-top-left-radius: 44/100rem;
      border-top-right-radius: 44/100rem;
      overflow: hidden;
      .detail-bottom-header {
        width: 100%;
        height: 88/100rem;
        line-height: 88/100rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        position: relative;
        p {
          flex: 1;
          height: 100%;
          text-align: center;
          font-size: 30/100rem;
          b {
            font-size: 20/100rem;
          }
          &.active {
            color: red;
          }
        }
        i {
          display: inline-block;
          width: 100/100rem;
          height: 5/100rem;
          background: red;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      .detail-bottom-content {
        ul {
          li {
            font-size: 28/100rem;
          }
        }
      }
    }
  }
  .detail-main-bg {
    width: 100%;
    height: 100%;
    background: black;
    position: fixed;
    left: 0;
    top: 0;
    img {
      width: 100%;
      opacity: 0.6;
    }
  }
}
</style>
