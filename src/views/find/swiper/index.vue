<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners" :key="banner.id">
        <a href="javascript:;" @tap="skipUrl(banner.url)">
          <img :src="banner.pic" alt />
          <span :style="{ background: banner.titleColor }">{{banner.typeTitle}}</span>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "Swiper",
  data() {
    return {
      banners: []
    };
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    initSwiper() {
      new Swiper(".swiper-container", {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      });
    },
    async getBanners() {
      const banners = [
        {
          id: 1,
          pic:
            "https://images.pexels.com/photos/3551725/pexels-photo-3551725.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          url: "https://www.baidu.com",
          typeTitle: "广告",
          titleColor: "red"
        },
        {
          id: 2,
          pic:
            "https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          url: "https://github.com",
          typeTitle: "共享",
          titleColor: "blue"
        },
        {
          id: 3,
          pic:
            "https://images.pexels.com/photos/2877188/pexels-photo-2877188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          url: "https://github.com",
          typeTitle: "美好",
          titleColor: "#000"
        }
      ];
      this.banners = banners;

      this.$nextTick(() => {
        this.initSwiper();
      })
    },
    skipUrl(url) {
      window.location.href = url;
    }
  }
};
</script>

<style lang='less'>
.swiper-container {
  width: 690/100rem;
  height: 266/100rem;
  margin-top: 30/100rem;
  border-radius: 10/100rem;
  .swiper-wrapper {
    .swiper-slide {
      position: relative;
    }
    img {
      width: 100%;
    }
    span {
      padding: 5/100rem 10/100rem;
      font-size: 22/100rem;
      color: #fff;
      background: deepskyblue;
      position: absolute;
      right: 0;
      bottom: 0;
      border-top-left-radius: 18/100rem;
    }
  }
  .swiper-pagination {
    .my-bullet {
      display: inline-block;
      width: 14/100rem;
      height: 14/100rem;
      margin: 0 6/100rem;
      background: #ccc;
      border-radius: 50%;
    }
    .my-bullet-active {
      background: #fd271b;
    }
  }
}
</style>
