<template>
  <div class="header" :class="{active: isActiveHeader}">
    <div class="header-center fl">
      <div class="header-center-box" ref="headerCenterBox">
        <img src="../../assets/images/topbar-it666-search.png" />
        <router-link
          tag="input"
          to="/search"
          type="text"
          placeholder="大家都在搜 那个女孩"
          maxlength="10"
          @touchstart="isActiveHeader = true"
        />
        <h3>我的音乐</h3>
        <div class="header-switch">
          <i></i>
          <span class="fl text-white">动态</span>
          <span class="fl">附近</span>
        </div>
      </div>
    </div>
    <div class="header-left fl"></div>
    <div class="header-cancel">
      <a href="javascript:;" @touchstart="isActiveHeader = false">取消</a>
    </div>
    <div class="header-right fl"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isActiveHeader: false
    };
  },
  methods: {}
};
</script>

<style lang='less'>
</style>
