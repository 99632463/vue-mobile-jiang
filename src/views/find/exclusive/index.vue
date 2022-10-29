<template>
  <div class="category">
    <div class="category-top">
      <h3>独家放送</h3>
      <span>网易出品</span>
    </div>
    <div class="category-bottom exclusive-bottom">
      <ul>
        <li v-for="exclusive in exclusiveList" :key="exclusive.id">
          <div>
            <i></i>
            <img :src="exclusive.picUrl" class="fluid-img" />
          </div>
          <p class="category-name">{{exclusive.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exclusive",
  data() {
    return {
      exclusiveList: []
    };
  },
  async mounted() {
    const rawData = await this.$http.get("/personalized/privatecontent");
    if (rawData.code === 200) {
      this.exclusiveList = rawData.result;

      this.$nextTick(() => {
        this.clamp(document.querySelectorAll(".category-name"), 2);
      });
    }
  },
  methods: {}
};
</script>

<style lang='less'>
.exclusive-bottom {
  li {
    div {
      width: 334/100rem !important;
      height: auto !important;
      i {
        display: inline-block;
        width: 34/100rem;
        height: 34/100rem;
        background: url("../../../assets/images/home-small-exclusive.png")
          no-repeat;
        background-size: 100% auto;
        position: absolute;
        left: 10/100rem;
        top: 10/100rem;
      }
    }
    p {
      width: 334/100rem !important;
      font-size: 26/100rem !important;
    }
    &:last-child {
      div {
        width: 690/100rem !important;
      }
      p {
        width: 690/100rem !important;
        font-size: 26/100rem !important;
      }
    }
  }
}
</style>
