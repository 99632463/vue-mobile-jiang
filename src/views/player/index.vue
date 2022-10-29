<template>
  <div style="width:100%;height:100%">
    <PlayHeader :songsInfo="songsInfo" />
    <div class="main">
      <div class="bg" ref="bg"></div>
      <!-- @touchstart="showDefaultMain = !showDefaultMain" -->
      <div class="main-in">
        <MainDefault 
          :isPlay="isPlay" 
          :songs="songs" 
          v-if="showDefaultMain" 
          @slideChange='slideChange'
        />
        <MainLyric v-else :musicIds="musicIds" />
      </div>
    </div>
    <Footer :songsUrlInfo="songsUrlInfo" @openList="openList" />
    <Modal @closeList="closeList" v-if="showModal" :multipleSongs="multipleSongs"></Modal>
  </div>
</template>

<script>
import PlayHeader from "./header";
import MainDefault from "./mainDefault";
import MainLyric from "./mainLyric";
import Footer from "./footer";
import Modal from "./modal";

const components = { PlayHeader, MainDefault, MainLyric, Footer, Modal };

export default {
  name: "Player",
  data() {
    return {
      showDefaultMain: true,
      isPlay: false,
      musicIds: null,
      songs:[],
      songsInfo: {},
      songsUrlInfo: {},
      multipleSongs: [],
      showModal: false
    };
  },
  created() {
    this.eventBus.$on("eb-player", isPlay => {
      this.isPlay = isPlay;
    });
  },
  mounted() {
    const { ids } = this.$route.query;
    this.musicIds = ids;
    this.getSongsInfo(ids);
    this.getSongsUrl(ids);
  },
  methods: {
    async getSongsInfo(ids) {
      const rawData = await this.$http.get("/song/detail", { ids });
      if (rawData.code === 200) {
        this.songs = rawData.songs;
        if (rawData.songs.length === 1) {
          this.songsInfo = rawData.songs[0];
          this.setBg();
        }
      }
    },
    async getSongsUrl(ids) {
      const rawData = await this.$http.get("/song/url", { id: ids });
      if (rawData.code === 200) {
        if (rawData.data.length === 1) {
          this.songsUrlInfo = rawData.data[0];
        }
      }
    },
    setBg() {
      const bg = this.$refs.bg;
      if (bg) {
        bg.style.background = `url(${this.songsInfo.al.picUrl})`;
      }
    },
    async openList(status){
      this.showModal = status;

      const rawData = await this.$http.get("/song/detail", { ids: this.musicIds });
      if (rawData.code === 200) {
        this.multipleSongs = rawData.songs;
      }
    },
    closeList(status){
      this.showModal = status;
    },
    slideChange(index){
      this.songsInfo = this.songs[index];
      this.getSongsUrl(this.songsInfo.id);
      this.setBg();
    }
  },
  components
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/player/test.jpg") center no-repeat;
    background-size: auto 100%;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(60px);
  }
  .main-in {
    width: 100%;
    height: 100%;
    padding-top: 88/100rem;
    padding-bottom: 208/100rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
