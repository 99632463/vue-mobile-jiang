<template>
  <div class="main-default">
    <div class="default-top" :class="{active:isPlay}">
      <img src="../../../assets/images/player/player-it666-needle.png" alt />
    </div>
    <div class="default-middle">
      <div class="bg-disc"></div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="song in songs" :key="song.id">
            <div class="disc-pic" :class="{active:isPlay}">
              <img :src="song.al && song.al.picUrl" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="default-bottom">
      <li>
        <img src="../../../assets/images/player/player-it666-favorite.png" alt />
      </li>
      <li>
        <img src="../../../assets/images/player/player-it666-download.png" alt />
      </li>
      <li>
        <img src="../../../assets/images/player/player-it666-effect.png" alt />
      </li>
      <li>
        <img src="../../../assets/images/player/player-it666-comment.png" alt />
      </li>
      <li>
        <img src="../../../assets/images/player/player-it666-more.png" alt />
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "main-default",
  props: {
    isPlay: Boolean,
    songs: Array
  },
  data() {
    return {};
  },
  created(){
    this.eventBus.$on('toggleMusic',index => {
       this.swiper.slideToLoop(index);
    })
  },
  mounted() {},
  methods: {},
  watch: {
    songs(data) {
      const self = this;
      if (data) {
        this.$nextTick(() => {
          this.swiper = new Swiper(".swiper-container", {
            loop: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            on: {
              slideChangeTransitionStart: function() {
                self.$emit("slideChange", this.realIndex);
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
.main-default {
  width: 100%;
  height: 100%;
  position: relative;
  .default-top {
    position: relative;
    z-index: 999;
    img {
      width: 250/100rem;
      position: absolute;
      left: 50%;
      margin-left: -60/100rem;
      transform-origin: 62/100rem 62/100rem;
      transform: rotate(0);
      transition: transform 0.5s;
    }
    &.active {
      img {
        transform: rotate(-30deg);
      }
    }
  }
  .default-middle {
    width: 100%;
    height: 500/100rem;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-top: -100/100rem;
    .bg-disc {
      width: 500/100rem;
      height: 500/100rem;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-slide {
        .disc-pic {
          width: 500/100rem;
          height: 500/100rem;
          background: url("../../../assets/images/player/player-it666-disc.png")
            no-repeat;
          background-size: 100% auto;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: sport 8s linear 0s infinite normal;
          animation-play-state: paused;
          img {
            width: 320/100rem;
            height: 320/100rem;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          &.active {
            animation: sport 8s linear 0s infinite normal;
            // animation-play-state: paused;
          }
        }
        @keyframes sport {
          from {
            transform: translate(-50%, -50%) rotate(0);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }
    }
  }
  .default-bottom {
    width: 100%;
    padding: 0 30/100rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 60/100rem;
    li {
      img {
        width: 56/100rem;
        height: 56/100rem;
      }
    }
  }
}
</style>
