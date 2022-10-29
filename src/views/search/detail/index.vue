<template>
  <div>
    <div class="header">
      <div class="header-center fl">
        <div class="header-center-box" ref="headerCenterBox">
          <img src="../../../assets/images/topbar-it666-search.png" />
          <input type="text" placeholder="请输入搜索的内容" maxlength="10" :value="keywords" />
        </div>
      </div>
      <div class="header-left fl" @touchstart="$router.back()">&lt;</div>
    </div>
    <Nav :getSelectedIndex="getSelectedIndex" />
    <div class="main">
      <div class="main-in">
        <Composite v-if="selectedIndex === 0" :keywords="keywords">综合</Composite>
        <Single
          :newSingleList="single.newSingleList"
          :getTopRef="getSingleTopRef"
          :keywords="keywords"
          v-if="selectedIndex === 1"
        />
        <Video v-if="selectedIndex === 2" :newVideoList="video.newVideoList" :keywords="keywords" />
        <div v-if="selectedIndex === 3">歌手</div>
        <div v-if="selectedIndex === 4">专辑</div>
        <div v-if="selectedIndex === 5">歌单</div>
        <div v-if="selectedIndex === 6">主播电台</div>
        <div v-if="selectedIndex === 7">用户</div>
        <div class="pull-up" v-if="selectedIndex > 0">
          <p>{{pullUpText}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Nav from "./nav";
import Composite from "./composite";
import Single from "./single";
import Video from "./video";

const components = { Nav, Single, Video, Composite };

export default {
  name: "Detail",
  data() {
    return {
      selectedIndex: 0,
      pullUpText: "上拉加载更多",
      isPullUp: false,
      isRefresh: false,
      keywords: "",
      single: {
        offset: 30,
        limit: 30,
        topRef: null,
        newSingleList: []
      },
      video: {
        offset: 30,
        limit: 30,
        newVideoList: []
      }
    };
  },
  beforeMount() {
    this.keywords = this.$route.query.keywords;
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(".main", {
        tap: true,
        probeType: 3
      });

      this.scroll.on("scroll", ({ y }) => {
        this.fixSingleTop(y);
        this.handlePullUpScroll(y);
      });

      this.scroll.on("scrollEnd", () => {
        if (this.selectedIndex === 1) {
          this.handleSinglePullUpScrollEnd();
        } else if (this.selectedIndex === 2) {
          this.handleVideoPullUpScrollEnd();
        }
      });
    });
  },
  methods: {
    getSelectedIndex(selectedIndex) {
      this.selectedIndex = selectedIndex;
    },
    handlePullUpScroll(y) {
      if (this.pullUpText === "已经没有数据了") {
        return;
      }
      if (y <= this.scroll.maxScrollY) {
        this.pullUpText = "松手加载更多";
        this.isPullUp = true;
      }
    },
    getSingleTopRef(topRef) {
      this.single.topRef = topRef;
    },
    fixSingleTop(y) {
      if (this.single.topRef) {
        if (y < 0) {
          this.single.topRef.style.top = -y + "px";
        } else {
          this.single.topRef.style.top = 0;
        }
      }
    },
    async getSingleList() {
      this.single.offset += this.single.limit;
      const rawData = await this.$http.get("/search", {
        keywords: this.keywords,
        offset: this.single.offset,
        limit: this.single.limit
      });
      if (rawData.code === 200) {
        this.single.newSingleList = rawData.result.songs || [];
        console.log("rawData.result: ", rawData.result);
      }
      if (!rawData.result.songs) {
        this.pullUpText = "已经没有数据了";
      }
    },
    async getVideoList() {
      this.video.offset += this.video.limit;
      const rawData = await this.$http.get("/search", {
        keywords: this.keywords,
        offset: this.video.offset,
        limit: this.video.limit,
        type: 1014
      });
      if (rawData.code === 200) {
        this.video.newVideoList = rawData.result.videos || [];
      }
      if (!rawData.result.videos) {
        this.pullUpText = "已经没有数据了";
      }
    },
    async handleSinglePullUpScrollEnd() {
      if (this.pullUpText === "已经没有数据了") {
        return;
      }

      if (this.selectedIndex === 0) {
        this.isRefresh = true;
      }

      if (this.isPullUp && !this.isRefresh) {
        this.pullUpText = "加载中...";
        this.isRefresh = true;

        await this.getSingleList();
        this.pullUpText = "上拉加载更多";
        this.isPullUp = false;
        this.isRefresh = false;
        // this.scroll.scrollTo(0, this.scroll.maxScrollY + 88);
      }
    },
    async handleVideoPullUpScrollEnd() {
      if (this.pullUpText === "已经没有数据了") {
        return;
      }

      if (this.selectedIndex === 0) {
        this.isRefresh = true;
      }

      if (this.isPullUp && !this.isRefresh) {
        this.pullUpText = "加载中...";
        this.isRefresh = true;

        await this.getVideoList();
        this.pullUpText = "上拉加载更多";
        this.isPullUp = false;
        this.isRefresh = false;
        // this.scroll.scrollTo(0, this.scroll.maxScrollY + 88);
      }
    }
  },
  components
};
</script>

<style lang='less'>
.header {
  background: #fff;
  .header-left {
    background: none;
    margin-top: -13/100rem;
    font-size: 80/100rem;
    color: #ccc;
  }
}
.main {
  width: 100%;
  height: 900/100rem;
  margin-top: 176/100rem;
  padding: 0 30/100rem 98/100rem 30/100rem;
  box-sizing: border-box;
  .main-in {
    width: 100%;
    .pull-up {
      width: 100%;
      height: 98/100rem;
      text-align: center;
      line-height: 98/100rem;
      font-size: 25/100rem;
      color: #f00;
    }
  }
}
.song {
  .single-list {
    width: 100%;
    li {
      height: 98/100rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .list-left {
        display: flex;
        justify-content: flex-start;
        i {
          display: inline-block;
          width: 56/100rem;
          height: 56/100rem;
          border: 1px solid #000;
          border-radius: 50%;
          box-sizing: border-box;
          position: relative;
          top: 21/100rem;
          margin-right: 20/100rem;
          &.active {
            background: #f00;
          }
        }
        p:nth-of-type(1) {
          font-size: 32/100rem;
          font-weight: bold;
          padding: 10/100rem;
        }
        p:nth-of-type(2) {
          font-size: 26/100rem;
          color: #666;
          img {
            width: auto;
            height: 26/100rem;
            vertical-align: top;
            position: relative;
            top: 5/100rem;
          }
        }
      }
      .list-right {
        display: flex;
        justify-content: flex-start;
        img {
          width: 56/100rem;
          height: 56/100rem;
          position: relative;
          top: 21/100rem;
        }
      }
    }
  }
}
</style>
