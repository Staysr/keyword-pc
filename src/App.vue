<template>
  <div id="app" style="overflow-x: hidden;">
    <router-view />
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    async mounted() {
      // const url = window.location.href
      // const theRequest = new Object()
      // const strs = url.split(/[?&#\/]/)
      // strs.forEach((e) => {
      //   if (e.indexOf('=') > -1) {
      //     const splitArr = e.split('=')
      //     theRequest[splitArr[0]] = splitArr[1]
      //   }
      // })

      let baseUrl = window.location.protocol + "//" + window.location.host;
      // let baseUrl = 'http://192.168.0.78:8080/api';
      window.localStorage.setItem("baseUrl", baseUrl);
    },
    methods: {},
  };
</script>
<style lang="less">
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  // van-dialog
  .van-dialog {
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 300px;

    .van-dialog__content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .van-dialog__message {
        font-size: 28px;
        padding: 20px 20px;
        box-sizing: border-box;
      }
    }

    .van-dialog__footer {
      height: 80px;

      .van-button {
        height: 100%;
      }
    }
  }
</style>
