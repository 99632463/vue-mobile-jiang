<template>
  <div class="search-container">
    <div class="header video">
      <div class="header-center fl">
        <div class="header-center-box">
          <img src="../../assets/images/topbar-it666-search.png" />
          <input type="text" placeholder="大家都在搜 那个女孩" maxlength="10" v-model="searchText" />
        </div>
      </div>
      <div class="header-left fl"></div>
      <div class="header-right fl"></div>
    </div>
    <Scroller :hidePullUp="true" height="1400px">
      <Content
        v-show="showSearchContentArea"
        :searchContentList="searchContentList"
        :searchText='searchText'
        :historyRef="historyRef"
      />
      <div v-show='!showSearchContentArea'>
        <Ad />
        <History :searchText="searchText" ref="historyRef" />
        <Hot />
      </div>
    </Scroller>
  </div>
</template>

<script>
import Ad from "./ad";
import History from "./history";
import Hot from "./hot";
import Content from "./content";

export default {
  name: "Header-Search",
  data() {
    return {
      searchText: "",
      showSearchContentArea: false,
      searchContentList: [],
      historyRef: null
    };
  },
  mounted() {
    this.historyRef = this.$refs.historyRef;
  },
  watch: {
    async searchText(text) {
      if (text) {
        this.showSearchContentArea = true;
        const rawData = await this.$http.get(
          `/search/suggest?keywords=${text}&type=mobile`
        );
        if(rawData.code === 200){
          this.searchContentList = rawData.result.allMatch || [];
        }
        // this.searchContentList = [
        //   { id: 1, keyword: "aaaa" },
        //   { id: 2, keyword: "bbbb" },
        //   { id: 3, keyword: "cccc" },
        //   { id: 4, keyword: "dddd" }
        // ];
      } else {
        this.showSearchContentArea = false;
      }
    }
  },
  components: {
    Ad,
    History,
    Hot,
    Content
  }
};
</script>

<style lang='less'>
.search-container {
  width: 100%;
  height: 100%;
}
</style>
