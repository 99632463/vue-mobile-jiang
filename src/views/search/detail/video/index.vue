<template>
  <div class="video">
    <ul class="list">
      <li v-for="video in videoList" :key="video.vid">
        <div class="video-left">
          <img :src="video.coverUrl" />
          <p>
            <img src="../../../../assets/images/home-small-play.png" alt />
            <span>{{video.playTime | formatPlayCount}}</span>
          </p>
        </div>
        <div class="video-right">
          <div class="video-title">{{video.title}}</div>
          <div class="video-info">{{video.creator[0].userName}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    newVideoList: Array,
    keywords: String
  },
  data() {
    return {
      videoList: []
    };
  },
  mounted() {
    console.log('this.keywords: ',this.keywords);
    this.getVideoList();
  },
  methods: {
    async getVideoList() {
      const rawData = await this.$http.get("/search", {
        keywords: this.keywords,
        offset: 0,
        limit: 30,
        type: 1014
      });
      if (rawData.code === 200) {
        this.videoList = rawData.result.videos || [];
      }
    }
  },
  watch: {
    newVideoList(newVideoList) {
      this.videoList.push(...newVideoList);
    }
  }
};
</script>

<style lang='less'>
.video {
  width: 100%;
  .list {
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
          width: 250/100rem;
          height: 140/100rem;
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
