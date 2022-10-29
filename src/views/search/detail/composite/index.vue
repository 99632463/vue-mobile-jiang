<template>
  <div class="composite song">
    <div class="composite-category" v-for="order in computeOrder" :key="order">
      <div class="composite-top">
        <h6>{{order | filterOrder}}</h6>
        <span v-if='order === "song"'>播放全部</span>
      </div>
      <ul class="single-list" v-if='order === "song"'>
        <li v-for="song in compositeData[order].songs" :key="song.id">
          <div class="list-left">
            <div>
              <p>{{song.name}}</p>
              <p>
                <img src="../../../../assets/images/toolbar-it666-me-normal.png" alt />
                {{song.ar[0].name}}
                -
                {{song.al.name}}
              </p>
            </div>
          </div>
          <div class="list-right">
            <img src="../../../../assets/images/toolbar-it666-video-normal.png" />
          </div>
        </li>
      </ul>
      <ul class="play-list" v-if='order === "playList"'>
        <li v-for="play in compositeData[order].playLists" :key="play.id">
          <div class="video-left">
            <img :src="play.coverImgUrl" />
            <p>
              <img src="../../../../assets/images/home-small-play.png" />
              <span>{{play.playCount}} | formatPlayCount</span>
            </p>
          </div>
          <div class="video-right">
            <div class="video-title">{{play.name}}</div>
            <div class="video-info">{{play.creator.nickname}}</div>
          </div>
        </li>
      </ul>
      <div class="composite-bottom" v-if="compositeData[order].more && order !== 'sim_query'">
        {{compositeData[order].moreText}} &gt;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Composite",
  props:{
    keywords:String
  },
  data() {
    return {
      compositeData: {},
      orders: []
    };
  },
  mounted(){
    this.getCompositeList();
  },
  methods: {
    async getCompositeList() {
      const rawData = await this.$http.get("/search", {
        keywords: this.keywords || '',
        offset: 0,
        limit: 30,
        type: 1018
      });
      if (rawData.code === 200) {
        this.compositeData = rawData.result || {};
        this.orders = rawData.result.order || [];
      }
    }
  },
  computed: {
    computeOrder() {
      return this.orders.filter(x => x !== "mlog" && x !== "talk");
    }
  },
  filters: {
    filterOrder(item) {
      const mapping = {
        song: "单曲",
        video: "视频",
        playList: "歌单",
        sim_query: "相关搜索",
        artist: "歌手",
        album: "专辑",
        djRadio: "电台",
        user: "用户"
      };

      return mapping[item] || "";
    }
  }
};
</script>

<style lang='less'>
.composite {
  width: 100%;
  .composite-category {
    width: 100%;
  }
  .composite-top {
    width: 100%;
    height: 88/100rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    h6 {
      font-size: 32/100rem;
      font-weight: bold;
      line-height: 88/100rem;
      color: #333;
    }
    span {
      width: 120/100rem;
      height: 50/100rem;
      line-height: 50/100rem;
      text-align: center;
      font-size: 26/100rem;
      border: 1px solid #000;
      border-radius: 25/100rem;
      padding: 0 20/100rem;
      position: relative;
      top: 22/100rem;
    }
  }
  .composite-bottom {
    width: 100%;
    height: 88/100rem;
    line-height: 88/100rem;
    text-align: center;
    font-size: 22/100rem;
    color: #666;
  }
  .play-list {
    width: 100%;
    li {
      width: 100%;
      height: 160/100rem;
      display: flex;
      justify-content: flex-start;
      .video-left {
        position: relative;
        top: 10/100rem;
        img {
          width: 120/100rem;
          height: 110/100rem;
          border-radius: 10/100rem;
          overflow: hidden;
        }
        p {
          position: absolute;
          left: 10/100rem;
          top: 10/100rem;
          img {
            width: 36/100rem;
            height: 36/100rem;
          }
          span {
            font-size: 26/100rem;
            color: #fff;
          }
        }
      }
      .video-right {
        position: relative;
        left: 20/100rem;
        top: 20/100rem;
        .video-title {
          font-size: 30/100rem;
        }
        .video-info {
          font-size: 22/100rem;
          color: #666;
        }
      }
    }
  }
}
</style>
