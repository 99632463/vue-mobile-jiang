<template>
  <div class="nav" ref="nav">
    <ul ref="nav_ul">
      <li
        ref="nav_li"
        v-for="(nav,index) in navList"
        :key="nav.id"
        :class="{active:selectedIndex === index}"
        @touchstart="setCurrentMark(index)"
      >{{nav.text}}</li>
      <span ref="mark"></span>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "",
  props: {
    getSelectedIndex: Function
  },
  data() {
    return {
      navList: [],
      selectedIndex: 0
    };
  },
  mounted() {
    this.getNavList();
    this.getSelectedIndex(this.selectedIndex);
  },
  methods: {
    getNavList() {
      const navList = [
        { id: 1, text: "综合" },
        { id: 2, text: "单曲" },
        { id: 3, text: "视频" },
        { id: 4, text: "歌手" },
        { id: 5, text: "专辑" },
        { id: 6, text: "歌单" },
        { id: 7, text: "主播电台" },
        { id: 8, text: "用户" }
      ];

      this.navList = navList;

      this.$nextTick(() => {
        const nav_li = this.$refs.nav_li;

        this.initMarkWidth(nav_li);
        this.setNavUlWidth(nav_li);
        this.initScroll();
      });
    },
    initMarkWidth(nav_li) {
      const width = nav_li[0].offsetWidth;
      const mark = this.$refs.mark;
      mark.style.width = width + "px";
    },
    setNavUlWidth(nav_li) {
      const nav_ul = this.$refs.nav_ul;
      let allLiWidth = 0;

      nav_li.forEach(li => {
        allLiWidth += li.offsetWidth;
      });

      nav_ul.style.width = allLiWidth + 30 + "px";
    },
    initScroll() {
      this.navScroll = new BScroll(".nav", {
        scrollX: true
      });
    },
    setCurrentMark(index) {
      const nav = this.$refs.nav;
      const currentLi = this.$refs.nav_li[index];
      const mark = this.$refs.mark;

      mark.style.left = currentLi.offsetLeft + "px";
      mark.style.width = currentLi.offsetWidth + "px";
      mark.style.transition = "all .5s";
      
      this.selectedIndex = index;
      this.getSelectedIndex(this.selectedIndex);

      let offset = nav.offsetWidth / 2 - currentLi.offsetLeft;
      if (offset > 0) {
        offset = -32;
      } else if (offset < this.navScroll.maxScrollX) {
        offset = this.navScroll.maxScrollX;
      }

      this.navScroll.scrollTo(offset, 0);
    }
  }
};
</script>

<style lang='less'>
.nav {
  width: 100%;
  padding: 0 30/100rem;
  box-sizing: border-box;
  height: 88/100rem;
  line-height: 88/100rem;
  background: #fff;
  position: fixed;
  left: 0;
  top: 88/100rem;
  z-index: 999;
  border-bottom: 1px solid #ccc;
  ul {
    display: flex;
    justify-content: flex-start;
    position: relative;
    li {
      font-size: 30/100rem;
      padding: 0 25/100rem;
      white-space: nowrap;
      &.active {
        color: #f00;
      }
    }
    span {
      height: 3/100rem;
      background: #f00;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
