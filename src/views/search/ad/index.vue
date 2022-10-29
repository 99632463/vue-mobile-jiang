<template>
  <div class="search-ad">
    <img v-if="showAD" src="../../../assets/images/search-banner.gif" class="fluid-img" />
    <span @tap="showAD = false">X</span>
  </div>
</template>

<script>
export default {
  name: "Ad",
  data() {
    return {
      showAD: true
    };
  },
  methods: {}
};
</script>

<style lang='less'>
.search-ad {
  padding-top: 30/100rem;
  box-sizing: border-box;
  position: relative;
  img {
    border-radius: 20/100rem;
    overflow: hidden;
  }
  span {
    position: absolute;
    top: 40/100rem;
    right: 10/100rem;
    font-size: 30/100rem;
    color: #ffffff;
    font-weight: bold;
  }
}
</style>
