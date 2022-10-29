<template>
  <div class="header">
    <div class="header-in">
      <span>&lt;</span>
      <div>
        <p class="header-title">{{songsInfo.name}}</p>
        <p class="header-singer">{{getArtistsName}}</p>
      </div>
      <img src="../../../assets/images/player/player-it666-share.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Play-Header",
  props: {
    songsInfo: Object
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    getArtistsName() {
      let singer = "";
      this.songsInfo.ar &&
        this.songsInfo.ar.forEach((item, index) => {
          if (index === 0) {
            singer = item.name;
          } else {
            singer += `/${item.name}`;
          }
        });

      return singer;
    }
  }
};
</script>

<style lang='less'>
.header {
  width: 100%;
  height: 88/100rem;
  line-height: 88/100rem;
  padding: 0 30/100rem;
  box-sizing: border-box;
  position: fixed;
  background: transparent;
  left: 0;
  top: 0;
  z-index: 999;
  .header-in {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 55/100rem;
    }
    img {
      width: 56/100rem;
      height: 56/100rem;
      vertical-align: top;
      position: relative;
      top: 16/100rem;
    }
    div {
      color: #fff;
      text-align: center;
      .header-title {
        font-size: 30/100rem;
        line-height: 58/100rem;
      }
      .header-singer {
        font-size: 22/100rem;
        line-height: 30/100rem;
      }
    }
  }
}
</style>
