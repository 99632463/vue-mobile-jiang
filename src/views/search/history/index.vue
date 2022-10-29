<template>
  <div class="search-history" v-if="historys.length">
    <div class="history-top">
      <h6>搜索历史</h6>
      <img src="../../../assets/images/search-it666-delete.png" @tap="clearHistory" />
    </div>
    <div class="history-bottom" ref="history-bottom">
      <ul ref="history-list">
        <li
          ref="history-list-li"
          v-for="(history,index) in historys"
          :key="index"
          @tap="handleClickHistory(index)"
        >{{history}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "History",
  props: ["searchText"],
  data() {
    return {
      historys: JSON.parse(localStorage.getItem("history")) || []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["history-bottom"] &&
        new BScroll(this.$refs["history-bottom"], {
          tap: true,
          scrollX: true
        });
    });

    this.setScrollAreaWidth();
  },
  methods: {
    setScrollAreaWidth() {
      const historyList = this.$refs["history-list"];
      const liEle = this.$refs["history-list-li"];
      if (liEle && liEle[0]) {
        const liWidth = liEle[0].offsetWidth;
        const space = parseInt(
          window.getComputedStyle(liEle[0], null)["margin-right"]
        );
        let totalWidth = 0;

        liEle.forEach(li => {
          totalWidth += li.offsetWidth;
        });

        if (this.historys.length) {
          historyList.style.width =
            space * this.historys.length + totalWidth - space + "px";
        }
      }
    },
    clearHistory() {
      localStorage.removeItem("history");
      this.historys = [];
    },
    handleBlur() {
      if (!this.searchText) {
        return;
      }

      if (!this.historys.includes(this.searchText)) {
        this.historys.unshift(this.searchText);
      }
      localStorage.setItem("history", JSON.stringify(this.historys));
    },
    handleClickHistory(index) {
      this.$router.push(`/search/detail?keywords=${this.historys[index]}`);
    }
  }
};
</script>

<style lang='less'>
.search-history {
  width: 100%;
  padding: 36/100rem 0;
  box-sizing: border-box;
  .history-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    h6 {
      font-size: 26/100rem;
      font-weight: bold;
      color: #333;
    }
    img {
      width: 56/100rem;
      height: 56/100rem;
    }
  }
  .history-bottom {
    width: 100%;
    white-space: nowrap;
    li {
      display: inline-block;
      font-size: 26/100rem;
      color: #333;
      text-align: center;
      padding: 14/100rem 30/100rem;
      background: #f8f8f8;
      border-radius: 33/100rem;
      margin-right: 24/100rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
