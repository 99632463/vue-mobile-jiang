<template>
  <div class="main-lyric">
    <div class="lyric-top">
      <img
        src="../../../assets/images/player/player-it666-trumpet.png"
        @touchstart.stop="controlVolume"
      />
      <div class="voice-progress-bar" ref="voice-progress-bar">
        <div class="voice-progress-line" ref="voice-progress-line">
          <div class="voice-progress-dot" ref="voice-progress-dot"></div>
        </div>
      </div>
    </div>
    <div class="lyric-bottom" ref="lyric-bottom">
      <ul class="lyric-list">
        <li
          v-for="(item,index) in lyric"
          :key="index"
          :ref="item.time"
          :data-offset="-index * 80"
          :class="{active:highlightIndex === Number(item.time),hover:scrollIndex === index}"
        >{{item.songName}}</li>
      </ul>
      <div class="lyric-time-line" v-if="showTimeLine">
        <img src="../../../assets/images/player/player-small-play.png" alt />
        <div class="line"></div>
        <span>{{formatTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Progress from "../../../common/utils/progress";
import Player from "../../../common/utils/player";

export default {
  name: "Main-lyric",
  props: {
    musicIds: String
  },
  data() {
    return {
      audio: null,
      volumeValue: 0.5,
      lyric: [],
      highlightIndex: 0,
      showTimeLine: false,
      scrollIndex: 0,
      formatTime: "",
      isDrag: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.finishProgress();
      this.getLyrics();
    });
  },
  methods: {
    initBScroll() {
      const lyricBottom = this.$refs["lyric-bottom"];

      if (lyricBottom) {
        this.scroll = new BScroll(lyricBottom, {
          probeType: 2
        });
        this.scroll.on("scroll", ({ y }) => {
          const scrollIndex = Math.abs(parseInt(y / 80));
          this.scrollIndex = scrollIndex;
          this.showTimeLine = true;
          this.isDrag = true;
          this.formatTime = this.player.formatCurrentTime(
            this.audio.currentTime
          );
        });
        this.scroll.on("scrollEnd", () => {
          this.showTimeLine = false;
          this.isDrag = false;
        });
        this.scroll.maxScrollY -= lyricBottom.offsetHeight;
      }
    },
    finishProgress() {
      this.audio = document.getElementById("audio");
      this.audio.volume = this.volumeValue;
      this.player = this.audio && new Player(this.audio);

      const voiceProgressBar = this.$refs["voice-progress-bar"];
      const voiceProgressLine = this.$refs["voice-progress-line"];
      const voiceProgressDot = this.$refs["voice-progress-dot"];

      this.progress = new Progress({
        progressBar: voiceProgressBar,
        progressLine: voiceProgressLine,
        progressDot: voiceProgressDot
      });

      this.progress.progressClick(value => {
        this.volumeValue = value;
        this.player.musicVolumeTo(value);
      });

      this.progress.progressDrag(value => {
        this.volumeValue = value;
        this.player.musicVolumeTo(value);
      });
    },
    controlVolume() {
      if (this.audio.volume === 0) {
        this.audio.volume = this.volumeValue;
        this.progress.setProgress(this.volumeValue * 100);
      } else {
        this.audio.volume = 0;
        this.progress.setProgress(0);
      }
    },
    async getLyrics() {
      const rawData = await this.$http.get("/lyric", { id: this.musicIds });
      if (rawData.code === 200) {
        this.lyric = this.player.parsingLyric(rawData.lrc.lyric);

        this.$nextTick(() => {
          this.initBScroll();

          this.player.musicTimeUpdate(({ curTime }) => {
            const parse = parseInt(curTime).toString();
            if (this.$refs[parse]) {
              this.highlightIndex = parseInt(curTime);
              const offset = Number(this.$refs[parse][0].dataset.offset);
              if(!this.isDrag){
                this.scroll.scrollTo(0, offset);
              }
            }
          });
        });
      }
    }
  }
};
</script>

<style lang='less'>
.main-lyric {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .lyric-top {
    display: flex;
    justify-content: space-between;
    padding: 0 30/100rem;
    img {
      width: 56/100rem;
      height: 56/100rem;
    }
    .voice-progress-bar {
      flex: 1;
      margin-left: 20/100rem;
      height: 10/100rem;
      background: rgba(255, 255, 255, 0.5);
      position: relative;
      top: 23/100rem;
      .voice-progress-line {
        width: 50%;
        height: 100%;
        background: #fff;
        position: relative;
        .voice-progress-dot {
          width: 20/100rem;
          height: 20/100rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          border-radius: 50%;
          background: #fff;
          margin-left: 100%;
        }
      }
    }
  }
  .lyric-bottom {
    width: 100%;
    padding: 0 30/100rem;
    box-sizing: border-box;
    height: 50%;
    position: absolute;
    left: 0;
    bottom: 0;
    .lyric-time-line {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 80/100rem;
      line-height: 80/100rem;
      position: absolute;
      left: 0;
      top: 0;
      img {
        width: 56/100rem;
        height: 56/100rem;
        position: relative;
        top: 12/100rem;
      }
      .line {
        flex: 1;
        height: 5/100rem;
        background: rgba(255, 255, 255, 0.5);
        margin: 0 20/100rem;
        position: relative;
        top: 37/100rem;
      }
      span {
        font-size: 18/100rem;
        color: #fff;
      }
    }
    .lyric-list {
      li {
        width: 100%;
        text-align: center;
        font-size: 30/100rem;
        color: rgba(255, 255, 255, 0.4);
        height: 80/100rem;
        line-height: 80/100rem;
        &.active {
          color: #fff !important;
        }
        &.hover {
          color: #f00;
        }
      }
    }
  }
}
</style>
