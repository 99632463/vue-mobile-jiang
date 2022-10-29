<template>
  <div class="footer">
    <div class="footer-in">
      <div class="footer-top">
        <div class="cur-time">{{duration}}</div>
        <div class="progress-bar" ref="progress-bar">
          <div class="progress-line" ref="progress-line">
            <div class="progress-dot" ref="progress-dot"></div>
          </div>
        </div>
        <div class="total-time">{{currentTime}}</div>
      </div>
      <ul class="footer-bottom">
        <li>
          <img src="../../../assets/images/player/player-it666-loop.png" alt />
        </li>
        <li @touchstart='prevMusic'>
          <img src="../../../assets/images/player/player-it666-pre.png" alt />
        </li>
        <li class="play" @touchstart="playMusic">
          <img v-if="isPlay" src="../../../assets/images/player/player-it666-pause.png" alt />
          <img v-else src="../../../assets/images/player/player-it666-play.png" alt />
        </li>
        <li @touchstart='nextMusic'>
          <img src="../../../assets/images/player/player-it666-next.png" alt />
        </li>
        <li @touchstart="openList">
          <img src="../../../assets/images/player/player-it666-list.png" alt />
        </li>
      </ul>
    </div>
    <audio id="audio" ref="audio" :src="songsUrlInfo.url" />
  </div>
</template>

<script>
import Player from "../../../common/utils/player";
import Progress from "../../../common/utils/progress";

export default {
  name: "Play-Footer",
  props: {
    songsUrlInfo: Object
  },
  data() {
    return {
      isPlay: false,
      duration: "00:00",
      currentTime: "00:00",
      index: 0
    };
  },
  created() {
    this.$nextTick(() => {
      this.initProgress();
    });
  },
  mounted() {
    const audio = this.$refs.audio;
    this.eventBus.$emit("eb-audio", audio);
    audio.addEventListener("canplay", () => {
      const duration = this.player.formatDuration(audio.duration);
      this.duration = duration;
    });
  },
  methods: {
    initProgress() {
      const audio = this.$refs.audio;
      this.player = audio && new Player(audio);

      const progressBar = this.$refs["progress-bar"];
      const progressLine = this.$refs["progress-line"];
      const progressDot = this.$refs["progress-dot"];
      this.progress = new Progress({
        progressBar,
        progressLine,
        progressDot
      });
      this.progress.progressClick(value => {
        this.player.musicSeekTo(value);
      });
      this.progress.progressDrag(value => {
        this.player.musicSeekTo(value);
      });
    },
    async playMusic() {
      this.isPlay = !this.isPlay;
      this.eventBus.$emit("eb-player", this.isPlay);

      if (this.isPlay) {
        setTimeout(() => this.player.play(), 200);
        this.syncTime();
      } else {
        this.player.pause();
      }
    },
    prevMusic(){
      this.eventBus.$emit("toggleMusic", --this.index);
    },
    nextMusic(){
      this.eventBus.$emit("toggleMusic", ++this.index);
    },
    syncTime() {
      this.player.musicTimeUpdate(options => {
        const { dur, curTime, formatCurTime } = options;
        this.currentTime = formatCurTime;

        const scale = (curTime / dur) * 100;
        this.progress.setProgress(scale);
      });
    },
    openList() {
      this.$emit("openList", true);
    }
  },
  watch: {
    songsUrlInfo() {
      this.player.load();
    }
  }
};
</script>

<style lang='less'>
.footer {
  width: 100%;
  padding: 0 30/100rem;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  .footer-in {
    width: 100%;
    .footer-top {
      .cur-time,
      .total-time {
        font-size: 28/100rem;
        color: #fff;
      }
      width: 100%;
      height: 88/100rem;
      line-height: 88/100rem;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 18/100rem;
        color: #fff;
      }
      .progress-bar {
        flex: 1;
        margin: 0 20/100rem;
        height: 10/100rem;
        position: relative;
        top: 39/100rem;
        background: rgba(255, 255, 255, 0.5);
        .progress-line {
          width: 0%;
          height: 100%;
          background: #fff;
          position: relative;
          .progress-dot {
            width: 20/100rem;
            height: 20/100rem;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 100%;
          }
        }
      }
    }
    .footer-bottom {
      width: 100%;
      height: 120/100rem;
      display: flex;
      justify-content: space-between;
      li {
        img {
          width: 56/100rem;
          height: 56/100rem;
          vertical-align: top;
          padding-top: 32/100rem;
        }
        &.play {
          img {
            width: 100/100rem;
            height: 100/100rem;
            padding-top: 10/100rem;
          }
        }
      }
    }
  }
}
</style>
