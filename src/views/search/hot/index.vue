<template>
  <div class="search-hot">
    <div class="hot-top">
      <h6>热搜榜</h6>
    </div>
    <ul class="hot-bottom">
      <li v-for="(searchHot,index) in searchHotList" :key="index">
        <span class="hot-left">{{index + 1}}</span>
        <div class="hot-right">
          <p>
            <strong>{{searchHot.searchWord}}</strong>
            <span>{{searchHot.score}}</span>
            <img :src="searchHot.iconUrl" />
          </p>
          <p>{{searchHot.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Hot",
  data() {
    return {
      searchHotList: []
    };
  },
  mounted() {
    this.getSearchHotList();
  },
  methods: {
    async getSearchHotList() {
      const rawData = await this.$http.get("/search/hot/detail");
      if (rawData.code === 200) {
        this.searchHotList = rawData.data || [];
      }
    }
  }
};
</script>

<style lang='less'>
.search-hot {
  padding: 36/100rem 0;
  .hot-top {
    width: 100%;
    h6 {
      font-size: 26/100rem;
      font-weight: bold;
      color: #333;
    }
  }
  .hot-bottom {
    li {
      width: 100%;
      height: 134/100rem;
      display: flex;
      justify-content: flex-start;
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(3) {
        .hot-left {
          color: #f00;
        }
      }
      .hot-left {
        width: 54/100rem;
        height: 100%;
        line-height: 134/100rem;
        font-size: 30/100rem;
        color: #666;
      }
      .hot-right {
        padding-top: 20/100rem;
        p:nth-of-type(1) {
          strong {
            font-size: 32/100rem;
            color: #333;
            font-weight: bold;
          }
          span {
            font-size: 26/100rem;
            color: #ccc;
            margin: 0 20/100rem;
          }
          img {
            width: auto;
            height: 32/100rem;
            position: relative;
            top: -10/100rem;
          }
        }
        p:nth-of-type(2) {
          font-size: 26/100rem;
          color: #666;
          margin-top: 5/100rem;
        }
      }
    }
  }
}
</style>
