<template>
  <div class="main" :style="{height:height || '100%'}">
    <div class="main-in">
      <div class="pull-down" v-show="!hidePullDown">
        <img src="../../assets/images/pull-down.png" alt />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="60px"
          height="60px"
          viewBox="279.747 366.016 60 60"
          enable-background="new 279.747 366.016 60 60"
          xml:space="preserve"
        >
          <path
            ref="refreshLogo"
            fill="none"
            stroke="#000000"
            stroke-width="4"
            stroke-linecap="round"
            stroke-miterlimit="10"
            d="M301.144,374.58  c-16.549,5.334-25.163,23.41-15.075,37.437c8.615,12.051,26.864,15.606,40.692,8.001c10.995-6.025,14.282-18.768,7.368-28.349  c-5.555-7.705-17.229-9.977-26.07-5.137c-7.027,3.853-8.614,10.767-5.44,16.298c3.06,5.137,11.221,5.631,15.302,2.667  c5.44-4.05,4.193-10.568,1.474-15.31c-14.282-25.09,7.254-24.694,9.975-18.966"
          />
        </svg>
      </div>
      <slot />
      <div class="pull-up" v-if="!hidePullUp">
        <p>上拉加载更多</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Find",
  props: {
    handleScroll: Function,
    handleScrollEnd: Function,
    hidePullUp: Boolean,
    hidePullDown: Boolean,
    height: String
  },
  data() {
    return {
      refreshLogo: null,
      pathLen: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.refreshLogo = this.$refs.refreshLogo;
      this.pathLen = this.refreshLogo.getTotalLength();
      this.hideSvgPath();

      this.scroll = new BScroll(".main", {
        tap: true,
        probeType: 2
      });
      this.onEvent(this.scroll);
    });
  },
  methods: {
    strokeSvg(offset) {
      const headerCenterBoxHeight = 112;
      if (offset.y >= headerCenterBoxHeight) {
        if ((offset.y - headerCenterBoxHeight) * 4 <= this.pathLen) {
          this.refreshLogo.setAttribute(
            "stroke-dasharray",
            this.pathLen - (offset.y - headerCenterBoxHeight) * 4
          );
        }
      }
    },
    hideSvgPath() {
      this.refreshLogo.setAttribute("stroke-dasharray", this.pathLen);
      this.refreshLogo.setAttribute("stroke-dashoffset", this.pathLen);
    },
    onEvent(scroll) {
      scroll.on("scroll", offset => {
        this.strokeSvg(offset);
        this.handleScroll && this.handleScroll(offset, scroll);
      });
      scroll.on("touchEnd", offset => {
        this.hideSvgPath();
        this.handleScrollEnd && this.handleScrollEnd(offset, scroll);
      });
    },
    scrollTo(y) {
      this.scroll.scrollTo(0, y);
    }
  }
};
</script>

<style scoped lang='less'>

.main {
  font-size: 20/100rem;
  width: 100%;
  height: 100%;
  .main-in {
    width: 100%;
    padding: 0 30/100rem;
    box-sizing: border-box;
    .pull-down {
      width: 100%;
      height: 88/100rem;
      margin-top: 10/100rem;
      position: relative;
      img {
        width: 50/100rem;
        height: 50/100rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      svg {
        width: 50/100rem;
        height: 50/100rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .pull-up {
      width: 100%;
      height: 98/100rem;
      text-align: center;
      line-height: 98/100rem;
    }
  }
}
</style>
