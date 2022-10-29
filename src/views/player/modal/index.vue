<template>
  <div class="modal">
    <div class="modal-main">
      <div class="modal-top">
        <p>
          <img src="../../../assets/images/player/playlist-it666-loop.png" alt />
          <span>列表循环 {{multipleSongs.length}}</span>
        </p>
        <div>
          <p>
            <img src="../../../assets/images/player/player-small-favorite.png" alt />
            <span>收藏全部</span>
          </p>
          <img
            @touchstart="multipleSongs = []"
            src="../../../assets/images/player/player-it666-delete.png"
            alt
          />
        </div>
      </div>
      <ul class="modal-middle">
        <li v-for="(song,index) in multipleSongs" :key="song.id" @touchstart="deleteSong(index)">
          <p>{{song.name}} - {{song.ar && song.ar[0] && song.ar[0].name}}</p>
          <img src="../../../assets/images/player/player-it666-close.png" alt />
        </li>
      </ul>
      <div class="modal-bottom" @touchstart="closeList">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    multipleSongs: Array
  },
  data() {
    return {};
  },
  methods: {
    closeList() {
      this.$emit("closeList", false);
    },
    deleteSong(index) {
      this.multipleSongs.splice(index, 1);
    }
  }
};
</script>

<style lang='less'>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  .modal-main {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 30/100rem;
    box-sizing: border-box;
    background: #fff;
    border-top-left-radius: 20/100rem;
    border-top-right-radius: 20/100rem;
    .modal-top {
      width: 100%;
      height: 88/100rem;
      line-height: 88/100rem;
      display: flex;
      justify-content: space-between;
      font-size: 28/100rem;
      border-bottom: 1px solid #ccc;
      img {
        width: 56/100rem;
        height: 56/100rem;
        vertical-align: top;
        position: relative;
        top: 16/100rem;
      }
      & > p {
        display: flex;
        justify-content: space-between;
      }
      & > div {
        display: flex;
        justify-content: space-between;
      }
    }
    .modal-middle {
      li {
        width: 100%;
        height: 88/100rem;
        line-height: 88/100rem;
        display: flex;
        justify-content: space-between;
        font-size: 28/100rem;
        border-bottom: 1px solid #ccc;
        p {
          width: 500/100rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 56/100rem;
          height: 56/100rem;
          vertical-align: top;
          position: relative;
          top: 16/100rem;
        }
      }
    }
    .modal-bottom {
      width: 100%;
      height: 120/100rem;
      line-height: 120/100rem;
      text-align: left;
      font-size: 28/100rem;
    }
  }
}
</style>
