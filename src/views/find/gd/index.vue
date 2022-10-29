<template>
  <div class="category">
    <div class="category-top">
      <h3>推荐歌单</h3>
      <span>歌单广场</span>
    </div>
    <div class="category-bottom">
      <ul>
        <li v-for="gd in gdList" :key="gd.id">
          <div>
            <img :src="gd.picUrl" class="fluid-img" />
            <p>
              <img src="../../../assets/images/home-small-play.png" alt />
              <span>{{gd.playCount | formatPlayCount}}</span>
            </p>
          </div>
          <p class="category-name">{{gd.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gd",
  data() {
    return {
      gdList: []
    };
  },
  mounted() {
    this.renderGdList();
  },
  methods: {
    async renderGdList() {
      const result = await this.$http.get("/personalized");
      if (result.code === 200) {
        this.gdList = result.result;

        this.$nextTick(() => {
          this.clamp(document.querySelectorAll(".category-name"), 2);
        });
      }
    }
  }
};
</script>

<style lang='less'>
</style>
