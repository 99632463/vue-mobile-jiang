<template>
  <div class="header-default">
    <div class="header friend">
      <div class="header-center fl">
        <div class="header-center-box">
          <div class="header-switch">
            <i :class="toAnimationDir"></i>
            <span
              class="fl"
              :class="{'text-white': tabType === 0}"
              @touchstart="swtichTab({ type: 0,animationDir:'toLeftSwitch' })"
            >动态</span>
            <span
              class="fl"
              :class="{'text-white': tabType === 1}"
              @touchstart="swtichTab({ type: 1,animationDir:'toRightSwitch' })"
            >附近</span>
          </div>
        </div>
      </div>
      <div class="header-left fl"></div>
      <div class="header-right fl"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Friend",
  data() {
    return {
      tabType: 0, // 0 代表动态，1 代表附近
      toAnimationDir: ""
    };
  },
  methods: {
    swtichTab({ type, animationDir }) {
      this.tabType = type;
      this.toAnimationDir = animationDir;
    }
  }
};
</script>

<style scoped>
</style>
