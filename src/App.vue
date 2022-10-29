<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer v-if='!$route.meta.hideFooter'/>
  </div>
</template>

<script>
import Footer from "./components/footer";

export default {
  name: "App",
  components: {
    Footer
  }
};
</script>

<style lang='less'>
@import "./assets/css/common.less";

html,
body,
#app {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 88/100rem;
  padding: 0 20/100rem;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .header-center {
    width: 100%;
    height: 100%;
    .header-center-box {
      height: 72/100rem;
      margin: 8/100rem (56+32)/100rem;
      background: #f7f7f7;
      border-radius: 36/100rem;
      position: relative;
      overflow: hidden;
      img {
        .V_Center();
        width: 30/100rem;
        height: 30/100rem;
        left: 92/100rem;
      }
      input {
        width: 100%;
        height: 100%;
        font-size: 30/100rem;
        background: #f7f7f7;
        color: #c9c9c9;
        border: none;
        outline: none;
        .V_Center();
        left: (92+42+10)/100rem;
      }
      h3 {
        display: none;
      }
      .header-switch {
        display: none;
      }
    }
  }
  .header-left {
    width: 56/100rem;
    height: 56/100rem;
    margin-left: -100%;
    margin-top: 16/100rem;
    background: url(./assets/images/topbar-it666-discern.png) no-repeat;
    background-size: 100% auto;
  }
  .header-cancel {
    display: none;
  }
  .header-right {
    width: 56/100rem;
    height: 56/100rem;
    margin-left: -56/100rem;
    margin-top: 16/100rem;
    background: url(./assets/images/topbar-it666-play.png) no-repeat;
    background-size: 100% auto;
  }
  &.active {
    .header-left {
      display: none;
    }
    .header-center {
      .header-center-box {
        margin-left: 0;
        margin-right: 176/100rem;
        img {
          left: 22/100rem;
        }
        input {
          left: 65/100rem;
        }
      }
    }
    .header-cancel {
      display: block;
      float: left;
      font-size: 30/100rem;
      margin-left: -150/100rem;
      line-height: 88/100rem;
      a {
        color: #000;
      }
    }
  }
  &.video {
    .header-left {
      background: url(./assets/images/topbar-it666-video.png) no-repeat;
      background-size: 100% auto;
    }
  }
  &.mine {
    .header-left {
      background: url(./assets/images/topbar-it666-cloud.png) no-repeat;
      background-size: 100% auto;
    }
    .header-center {
      .header-center-box {
        background: transparent;
        img {
          display: none;
        }
        input {
          display: none;
        }
        h3 {
          display: block;
          text-align: center;
          line-height: 72/100rem;
          color: #333;
          font-weight: bold;
          font-size: 34/100rem;
        }
      }
    }
  }
  &.friend {
    .header-left {
      background: url(./assets/images/topbar-it666-add.png) no-repeat;
      background-size: 100% auto;
    }
    .header-center {
      .header-center-box {
        background: transparent;
        img {
          display: none;
        }
        input {
          display: none;
        }
        .header-switch {
          display: block;
          width: 250/100rem;
          height: 50/100rem;
          border-radius: 30/100rem;
          margin: 10/100rem auto;
          border: 2px solid tomato;
          font-size: 30/100rem;
          position: relative;
          i {
            display: inline-block;
            width: 125/100rem;
            height: 100%;
            border-radius: 30/100rem;
            background: #f00;
            position: absolute;
            left: 0;
            top: 0;
          }
          i.toLeftSwitch {
            animation: toLeftSwitch 0.2s 0s linear forwards;
          }
          i.toRightSwitch {
            animation: toRightSwitch 0.2s 0s linear forwards;
          }
          @keyframes toLeftSwitch {
            from {
              left: 125/100rem;
            }
            to {
              left: 0;
            }
          }
          @keyframes toRightSwitch {
            from {
              left: 0;
            }
            to {
              left: 125/100rem;
            }
          }
          span {
            width: 125/100rem;
            height: 100%;
            text-align: center;
            line-height: 50/100rem;
            color: #f00;
            font-weight: bold;

            &:nth-of-type(1) {
              position: absolute;
              left: 0;
            }
            &:nth-of-type(2) {
              position: absolute;
              right: 0;
            }
          }
        }
      }
    }
  }
  &.account {
    .header-left {
      background: url(./assets/images/topbar-it666-scan.png) no-repeat;
      background-size: 100% auto;
    }
    .header-center {
      .header-center-box {
        background: transparent;
        img {
          display: none;
        }
        input {
          display: none;
        }
      }
    }
  }
}
</style>
