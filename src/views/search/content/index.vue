<template>
  <div class="search-content">
    <div class="content-top">搜索: {{searchText}}</div>
    <ul class="content-bottom">
      <li
        v-for="(searchContent,index) in searchContentList"
        :key="index"
        @tap="handleClick(searchContent)"
      >
        <img src="../../../assets/images/topbar-it666-search.png" alt />
        <p>{{searchContent.keyword}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: ["searchContentList", "historyRef", "searchText"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClick({ keyword }) {
      this.$router.push(`/search/detail?keywords=${keyword}`);
      this.historyRef && this.historyRef.handleBlur();
    }
  }
};
</script>

<style lang='less'>
.search-content {
  width: 100%;
  .content-top {
    width: 100%;
    height: 110/100rem;
    line-height: 110/100rem;
    font-size: 30/100rem;
    color: darkblue;
    border-bottom: 1px solid #ccc;
  }
  .content-bottom {
    li {
      display: flex;
      justify-content: flex-start;
      height: 110/100rem;
      line-height: 110/100rem;
      border-bottom: 1px solid #ccc;
      img {
        width: 42/100rem;
        height: 42/100rem;
        margin-right: 20/100rem;
        position: relative;
        top: 40/100rem;
      }
      p {
        font-size: 30/100rem;
        color: #666;
      }
    }
  }
}
</style>
