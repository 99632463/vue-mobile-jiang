<template>
  <div class="detail-header" ref="detail-header">
    <div class="detail-header-in">
      <div class="detail-header-left">
        <img src="../../../assets/images/detail/detail-it666-back.png" alt />
      </div>
      <div class="detail-header-right">
        <img src="../../../assets/images/detail/detail-it666-share.png" alt />
        <img src="../../../assets/images/detail/detail-it666-playing.png" alt />
      </div>
      <div class="detail-header-center">
        <span>电台</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail-header",
  data() {
    return {};
  },
  mounted() {
    this.eventBus.$emit("headerRef", this.$refs["detail-header"]);
  },
  methods: {}
};
</script>

<style lang='less'>
.detail-header {
  width: 100%;
  height: 88/100rem;
  line-height: 88/100rem;
  padding: 0 30/100rem;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .detail-header-in {
    width: 100%;
    height: 100%;
    background: #ccc;
    img {
      width: 56/100rem;
      height: 56/100rem;
      vertical-align: top;
      position: relative;
      top: 16/100rem;
    }
    .detail-header-left {
      float: left;
    }
    .detail-header-right {
      float: right;
    }
    .detail-header-center {
      width: 100%;
      height: 100%;
      font-size: 32/100rem;
      font-weight: bold;
      position: relative;
      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
