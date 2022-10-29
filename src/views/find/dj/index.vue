<template>
  <div class="category">
    <div class="category-top">
      <h3>主播电台</h3>
      <span>更多主播</span>
    </div>
    <div class="category-bottom dj-bottom">
      <ul>
        <li v-for="dj in djList" :key="dj.id">
          <div>
            <img :src="dj.picUrl" class="fluid-img" />
            <p>
              <img src="../../../assets/images/home-small-dj.png" />
            </p>
          </div>
          <p class="category-name">{{dj.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DJ",
  data() {
    return {
      djList: []
    };
  },
  async mounted() {
    const rawData = await this.$http.get("/personalized/djprogram");
    if (rawData.code === 200) {
      this.djList = rawData.result;

      this.$nextTick(() => {
        this.clamp(document.querySelectorAll(".category-name"), 2);
      });
    }
  },
  methods: {}
};
</script>

<style lang='less'>
.dj-bottom {
  li {
    div {
      width: 334/100rem !important;
    }
    & > p:nth-of-type(2) {
      font-size: 24/100rem !important;
      color: #ccc !important;
    }
  }
}
</style>
