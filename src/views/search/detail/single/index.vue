<template>
  <div class="single-music song">
    <div class="top" ref="top">
      <div class="top-left">
        <p class="check-all" v-if="isComplete">
          <i :class="{active:isActiveSelected}"></i>
          <span @touchstart="isActiveSelected = !isActiveSelected">全选</span>
        </p>
        <p class="play-all" v-else>
          <img src="../../../../assets/images/toolbar-it666-video-normal.png" alt />
          <span>播放全部</span>
        </p>
      </div>
      <div class="top-right">
        <p @touchstart="isComplete = !isComplete">
          <span v-if="isComplete">完成</span>
          <span v-else>多选</span>
        </p>
      </div>
    </div>
    <ul class="single-list">
      <li v-for="(song,index) in songList" :key="index" @tap="playSingle(song)">
        <div class="list-left">
          <i v-if="isComplete" :class="{active:isActiveSelected}"></i>
          <div>
            <p>{{song.name}}</p>
            <p>
              <img src="../../../../assets/images/toolbar-it666-me-normal.png" alt />
              {{song.artists[0].name}}
              -
              {{song.album.name}}
            </p>
          </div>
        </div>
        <div class="list-right" v-if="!isComplete">
          <img v-if="song.mvid" src="../../../../assets/images/toolbar-it666-video-normal.png" alt />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Single",
  props: {
    newSingleList: Array,
    getTopRef: Function,
    keywords: String
  },
  data() {
    return {
      isComplete: false,
      isActiveSelected: false,
      songList: []
    };
  },
  mounted() {
    this.getSingleList();
    this.$nextTick(() => {
      this.getTopRef(this.$refs.top);
    });
  },
  methods: {
    async getSingleList() {
      const rawData = await this.$http.get("/search", {
        keywords: this.keywords
      });
      if (rawData.code === 200) {
        this.songList = rawData.result.songs || [];
      }
    },
    playSingle({ id }) {
      this.$router.push(`/player?ids=${id}`);
    }
  },
  watch: {
    newSingleList(newSingleList) {
      this.songList.push(...newSingleList);
    }
  }
};
</script>

<style lang='less'>
.single-music {
  width: 100%;
  position: relative;
  .top {
    width: 100%;
    height: 98/100rem;
    line-height: 98/100rem;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    border-bottom: 1px solid #ccc;
    .top-left {
      display: flex;
      justify-content: flex-start;
      height: 100%;
      p {
        height: 100%;
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
          &.active {
            background: #f00;
          }
        }
        span {
          font-size: 32/100rem;
          font-weight: bold;
          margin-left: 20/100rem;
        }
        img {
          width: 56/100rem;
          height: 56/100rem;
          position: relative;
          top: 21/100rem;
        }
      }
    }
    .top-right {
      line-height: 45/100rem;
      span {
        font-size: 32/100rem;
        font-size: 28/100rem;
      }
      span:nth-of-type(2) {
        color: #f00;
      }
    }
  }
}
</style>
