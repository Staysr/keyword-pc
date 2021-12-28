<template>
  <div>
    <el-row>
      <el-col :span="20" style="width: 100%;">
        <el-row :gutter="20">
          <el-col :span="15" style="width: 50%;">
            <div style="margin-top:20px;margin-left: 0.75rem;">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="margin-top:20px;margin-left: 0.75rem;">
              <el-button @click="sesin()" type="primary" icon="el-icon-search">搜索</el-button>
            </div>
          </el-col>
          <div style="float: right; margin-top: 5px; margin-right: 20px;">
            <el-tooltip class="item" effect="dark" content="点击放大" placement="left">
              <el-image :preview-src-list="srcList" style="width: 80px;height: 80px;" :src="qrcode" alt=""></el-image>
            </el-tooltip>
            <div style="margin-top: 12px;font-size: 10px;">手机扫码预览</div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;margin-left: 0.75rem;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="-1">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in data" :key="index" style="width: 450px;margin-bottom: 20px;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.keyword }}</span>
                  <el-button @click="info(item,-1)" style="float: right; padding: 3px 0px;" type="text">查看详情</el-button>
                  <el-button style="float: right; padding: 3px 0px; margin-right: 5px;" type="text">下载</el-button>
                </div>
                <div class="grid-content bg-purple">
                  <div style="width: 33%; float: left;border-right: 1px solid #EBEEF5; text-align: center;">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_img_count}}张
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"> <img
                            src="../assets/image/img.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,0)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传图片</el-button>
                  </div>

                  <div style="width: 33%; float: left; border-right: 1px solid #EBEEF5; text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_vod_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/video.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,1)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传视频</el-button>
                  </div>

                  <div style="width: 33%; float: left;  text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_text_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/text.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,2)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">添加描述</el-button>
                  </div>

                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :data="-1" :page-size="10"
              layout="total, prev, pager, next" :total="count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图片未上传" name="0">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in data" :key="index" style="width: 450px;margin-bottom: 20px;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.keyword }}</span>
                  <el-button @click="info(item,-1)" style="float: right; padding: 3px 0px;" type="text">查看详情</el-button>
                  <el-button style="float: right; padding: 3px 0px; margin-right: 5px;" type="text">下载</el-button>
                </div>
                <div class="grid-content bg-purple">
                  <div style="width: 33%; float: left;border-right: 1px solid #EBEEF5; text-align: center;">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_img_count}}张
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"> <img
                            src="../assets/image/img.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,0)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传图片</el-button>
                  </div>

                  <div style="width: 33%; float: left; border-right: 1px solid #EBEEF5; text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_vod_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/video.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,1)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传视频</el-button>
                  </div>

                  <div style="width: 33%; float: left;  text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_text_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/text.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,2)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">添加描述</el-button>
                  </div>

                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChangeimg" :data="-1" :page-size="10"
              layout="total, prev, pager, next" :total="count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频未上传" name="1">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in data" :key="index" style="width: 450px;margin-bottom: 20px;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.keyword }}</span>
                  <el-button @click="info(item,-1)" style="float: right; padding: 3px 0px;" type="text">查看详情</el-button>
                  <el-button style="float: right; padding: 3px 0px; margin-right: 5px;" type="text">下载</el-button>
                </div>
                <div class="grid-content bg-purple">
                  <div style="width: 33%; float: left;border-right: 1px solid #EBEEF5; text-align: center;">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_img_count}}张
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"> <img
                            src="../assets/image/img.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,0)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传图片</el-button>
                  </div>

                  <div style="width: 33%; float: left; border-right: 1px solid #EBEEF5; text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_vod_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/video.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,1)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传视频</el-button>
                  </div>

                  <div style="width: 33%; float: left;  text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_text_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/text.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,2)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">添加描述</el-button>
                  </div>

                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChangevideo" :data="-1" :page-size="10"
              layout="total, prev, pager, next" :total="count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文字未上传" name="2">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in data" :key="index" style="width: 450px;margin-bottom: 20px;">

              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.keyword }}</span>
                  <el-button @click="info(item,-1)" style="float: right; padding: 3px 0px;" type="text">查看详情</el-button>
                  <el-button style="float: right; padding: 3px 0px; margin-right: 5px;" type="text">下载</el-button>
                </div>
                <div class="grid-content bg-purple">
                  <div style="width: 33%; float: left;border-right: 1px solid #EBEEF5; text-align: center;">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_img_count}}张
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"> <img
                            src="../assets/image/img.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,0)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传图片</el-button>
                  </div>

                  <div style="width: 33%; float: left; border-right: 1px solid #EBEEF5; text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_vod_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/text.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,1)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">上传视频</el-button>
                  </div>

                  <div style="width: 33%; float: left;  text-align: center;">

                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="grid-content bg-purple"
                          style="width: 65px;font-size: 18px;text-align: left;margin-top: 22px; margin-left: 12px;">
                          {{item.media_text_count}}个
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="width: 50px; margin: 10px 36px;"><img
                            src="../assets/image/text.png" width="50" height="50"></div>
                      </el-col>
                    </el-row>

                    <el-button @click="info(item,2)" type="primary"
                      style="margin-bottom: 5px; margin-top: 10px;width: 80%;">添加描述</el-button>
                  </div>

                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="pagination">
            <el-pagination @current-change="handleCurrentChangetext" :data="2" :page-size="10"
              layout="total, prev, pager, next" :total="count">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        activeName: '-1',
        count: 0,
        srcList: [],
        qrcode: '',
        data: []
      };
    },
    async mounted() {
      let data = this.$route.query;
      if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
        let res = await this.$api.getToken({
          uid: data.uid,
          username: data.username,
          system: 'sdp'
        });
        if (res.code == 200) {
          window.localStorage.setItem("token", res.data.token);
          this.QRcode();
          this.getlist();
        } else {
          this.$message(res.msg);
        }
      } else {
        this.QRcode();
        this.getlist();
      }
    },
    methods: {
      async getlist() {
        let res = await this.$api.keyWordList({
          type: '-1',
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.count = res.data.page.count
          this.data = res.data.list
        } else {
          this.error(res.msg)
        }
      },
      async handleCurrentChange(val) {
        let res = await this.$api.keyWordList({
          type: '-1',
          page: val,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.count = res.data.page.count
          this.data = res.data.list
        } else {
          this.error(res.msg)
        }
      },
      async handleCurrentChangeimg(val) {
        let res = await this.$api.keyWordList({
          type: '0',
          page: val,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.count = res.data.page.count
          this.data = res.data.list
        } else {
          this.error(res.msg)
        }
      },
      async handleCurrentChangevideo(val) {
        let res = await this.$api.keyWordList({
          type: '1',
          page: val,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.count = res.data.page.count
          this.data = res.data.list
        } else {
          this.error(res.msg)
        }
      },
      async handleCurrentChangetext(val) {
        let res = await this.$api.keyWordList({
          type: '2',
          page: val,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.count = res.data.page.count
          this.data = res.data.list
        } else {
          this.error(res.msg)
        }
      },
      async handleClick(tab, event) {
        let res = await this.$api.keyWordList({
          type: tab.name,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.data = res.data.list
          this.count = res.data.page.count
        } else {
          this.error(res.msg)
        }
      },
      info(item, name) {
        this.$router.push({
          path: "info?item=" + JSON.stringify(item) + '&type=' + name,
        });
      },
      //搜索
      async sesin() {
        let res = await this.$api.keyWordList({
          input: this.input == '' ? 'all' : this.input,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.input = ""
          this.activeName = '-1'
          this.data = res.data.list
          this.count = res.data.page.count
        } else {
          this.error(res.msg)
        }
      },
      //获取二维码
      async QRcode() {
        let res = await this.$api.getQRcode({
          host: window.location.protocol + "//" + window.location.host,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.qrcode = res.data.qrcode
          this.srcList.push(res.data.qrcode)
        } else {
          this.error(res.msg)
        }
      },
      error(msg) {
        this.$notify.error({
          title: '错误',
          message: msg
        });
      }
    },
  };
</script>
<style>
  .el-card__body {
    padding: 0px;
  }

  .pagination {
    position: fixed;
    bottom: 20px;
    left: 850px;
  }
</style>
