<template>
  <div class="category">
    <div class="category-top">
      <h3>推荐MV</h3>
      <span>更多MV</span>
    </div>
    <div class="category-bottom mv-bottom">
      <ul>
        <li v-for="mv in mvList" :key="mv.id">
          <div>
            <img :src="mv.picUrl" class="fluid-img" />
            <p>
              <img src="../../../assets/images/home-small-video.png" alt />
              <span>{{mv.playCount | formatPlayCount}}</span>
            </p>
          </div>
          <p class="category-name">{{mv.name}}</p>
          <p class="category-singer">{{mv.artistName}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MV",
  data() {
    return {
      mvList: []
    };
  },
  async mounted() {
    const rawData = await this.$http.get("/personalized/mv");
    if (rawData.code === 200) {
      this.mvList = rawData.result;

      this.$nextTick(() => {
        this.clamp(document.querySelectorAll(".category-name"), 2);
      });
    }
  },
  methods: {}
};
</script>

<style lang='less'>
.mv-bottom {
  li {
    div {
      width: 334/100rem !important;
      height: auto !important;
    }
    & > p:nth-of-type(2) {
      font-size: 24/100rem !important;
      color: #ccc !important;
    }
  }
}
</style>
