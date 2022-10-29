<template>
  <div class="category">
    <div class="category-top">
      <h3>新碟新歌</h3>
      <span>更多新碟</span>
    </div>
    <div class="category-bottom album-bottom">
      <ul>
        <li v-for="album in albumList" :key="album.id">
          <div>
            <img :src="album.picUrl" class="fluid-img" />
          </div>
          <p
            class="category-name"
            style="overflow: hidden; text-overflow: ellipsis; box-orient:vertical; display: -webkit-box; -webkit-line-clamp: 1;"
          >{{album.name}}</p>
          <p class="category-singer">{{album.artists[0].name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {
      albumList: []
    };
  },
  async mounted() {
    const rawData = await this.$http.get("/top/album", { offset: 0, limit: 6 });
    if (rawData.code === 200) {
      this.albumList = rawData.albums;
    }
  },
  methods: {}
};
</script>

<style lang='less'>
.album-bottom {
  li {
    & > p:nth-of-type(2) {
      font-size: 24/100rem !important;
      color: #ccc !important;
    }
  }
}
</style>
