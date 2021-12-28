<template>
  <div>
    <div style="width: 100%; margin-left: 20px;margin-top: 40px; display: block; position: relative;top: 30px;">
      <span style="font-size: 20px;">{{ data.keyword }}</span>
    </div>
    <div style="position: relative;left: 1150px; top: 50px;">
      <el-popconfirm @confirm="okdelete" confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info"
        icon-color="red" title="确定删除吗？">
        <el-button slot="reference">删除</el-button>
      </el-popconfirm>
      <el-button style="margin-left: 12px;" @click="cancel" type="primary">取消</el-button>
      <el-button style="margin-left: 12px;" @click="okreturn">返回</el-button>
    </div>
    <div style="position: relative;left: 1080px; top: 60px;">
      <el-tag v-if="numlist != 0">当前图片选中:{{ numlist }}</el-tag>
      <el-tag style="margin-left: 12px;" type="warning" v-if="videonumlist != 0">当前视频选中:{{ videonumlist }}</el-tag>
    </div>
    <!-- <div style="float: right;">
      <img  style="width: 100px; height: 100px;position: relative; top:-40px;right: 20px;" />
    </div> -->
    <div style="margin-top: 50px; margin-left: 20px; width: 100%;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="图片" name="img">
          <div style="display: block; float: left; margin-right: 12px; margin-top: 12px;">
            <!-- <div
              style="width: 100px;height: 100px; background-color: #C0C4CC; text-align: center;vertical-align: middle;line-height: 120px;"> -->
            <el-upload ref="cropperUpload" :data="uploadData" :limit="addsize" :action="img_url" :on-progress="filedata"
              :on-success="bg_img1" accept="image/png,image/jpeg,image/jpg" list-type="picture-card"
              :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                </span>
              </div>
            </el-upload>
            <!-- </div> -->
          </div>
          <div style="float: left; margin-left: 10px; margin-bottom: 12px;" v-for="(item,index) in newdata.img"
            :key="index">
            <el-row :gutter="20">
              <el-col :span="2">
                <div style="width: 110px;height: 110px;">
                  <div style="position: relative;left: 100px;top:12px">
                    <el-checkbox-group v-model="checkAll" @change="handleCheckChange">
                      <el-checkbox :label="item">&nbsp;</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div>
                    <el-image style="width: 100px;height: 100px;margin-left: 12px;" :src="item.media_cover_img"
                      :preview-src-list="srcList"></el-image>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- <el-button @click="keyWorddetail" type="primary">刷新</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="视频" name="video">
          <div style="display: block; float: left; margin-right: 12px; margin-top: 2px;">
            <!-- <div
              style="width: 100px;height: 100px; background-color: #C0C4CC; text-align: center;vertical-align: middle;line-height: 120px;"> -->
            <el-upload ref="cropperUploadvideo" :data="uploadDatavideo" multiple :action="video_url"
              :on-progress="videofiledataf" :on-success="videosuss" accept=".mp4" list-type="picture-card"
              :auto-upload="true">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                </span>
              </div>
            </el-upload>
            <!-- </div> -->
          </div>
          <div style="float: left; margin-left: 10px; margin-bottom: 12px;" v-for="(item,index) in newdata.vod"
            :key="index">
            <el-row :gutter="20">
              <el-col :span="2">
                <div style="width: 110px;height: 110px; background-color: #C0C4CC;">
                  <div style="position: relative;left: 80px;">
                    <el-checkbox-group v-model="checkAllvideo" @change="handleCheckChangevideo">
                      <el-checkbox :label="item">&nbsp;</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div>
                    <img @click="openvideo(item.media_url)" style="width: 90px;height: 90px;margin-left: 12px;"
                      :src="item.media_cover_img" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- <el-button @click="keyWorddetail" type="primary">刷新</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="文字描述" name="text">
          <div style="width: 900px;height: 900px;">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input autosize type="textarea" placeholder="请输入内容" v-model="textarea" show-word-limit>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button @click="addText" type="primary">保存</el-button>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20" v-for="(item,index) in newdata.text" style="margin-top: 12px;">
              <el-col :span="20">
                <el-input disabled autosize type="textarea" placeholder="请输入内容" v-model="item.media_text" show-word-limit>
                 </el-input>
              </el-col>
              <el-col :span="2">
                <el-popconfirm @confirm="deletetextok(item)" confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info"
                  icon-color="red" title="确定删除吗？">
                  <el-button slot="reference">删除</el-button>
                </el-popconfirm>
              </el-col>
            </el-row> -->
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="视频" :visible.sync="dialogVisible" width="30%">
        <video controls style="width:100%; height:100%; object-fit: fill" :src="videoopenurl"></video>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timeout: '',
        checkAll: [],
        checkAllvideo: [],
        numlist: 0,
        videonumlist: 0,
        partSize: '',
        parallel: '',
        retryCount: '',
        retryDuration: '',
        textid: '',
        uploader: null,
        videofiledata: '',
        istextb: false,
        addsize: 1,
        region: 'cn-shanghai',
        userId: '1303984639806000',
        activeName: 'img',
        ImageURL: '',
        checkListimg: ['选中且禁用', '复选框 A'],
        data: '',
        name: '',
        cancelname: 'img',
        newdata: '',
        textarea: '',
        uploadAuth: '',
        uploadAddress: '',
        isvideo_img: 1, //type 1 默认 img 2 视频 video
        videoId: '',
        srcList: [],
        videoopenurl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imghandleCheckChange: [],
        videohandleCheckChange: [],
        img_url: localStorage.getItem('baseUrl') + '/cms/media/createUploadImage?token=' + localStorage.getItem(
          'token'),
        video_url: localStorage.getItem('baseUrl') + '/cms/media/createUploadVideo?token=' + localStorage.getItem(
          'token'),
        uploadData: {
          "title": "素材库",
          "description": "素材库",
          "cateId": "5099",
          "tags": "dspseo",
          "fileName": '/Users/admin/Desktop/image/IMG_7536.jpg'
        },
        uploadDatavideo: {
          "title": "素材库",
          "description": "素材库",
          "cateId": "5100",
          "tags": "dspseo",
          "fileName": '/Users/admin/Downloads/652ebb55fb1f2760313d10f1651a6b.MP4'
        },
      };
    },
    mounted() {
      this.data = JSON.parse(this.$route.query.item);
      this.name = this.$route.query.type
      this.keyWorddetail()
      if (this.name == -1) {
        this.activeName = 'img'
      } else {
        this.name == 0 ? this.activeName = 'img' : (this.name == 1 ? this.activeName = 'video' : this.activeName =
          'text')
      }
    },
    methods: {
      //获取素材库详情
      async keyWorddetail() {
        let res = await this.$api.getkeyWorddetail({
          id: this.data.id,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.newdata = res.data
          // for (var i = 0; i < res.data.text.length; i++) {
          //   this.textarea += res.data.text[i].media_text
          // }
          for (var i = 0; i < res.data.img.length; i++) {
            this.srcList.push(res.data.img[i].media_url)
          }
          this.textarea = res.data.text[0].media_text
          this.textid = res.data.text.length == 0 ? this.textid == '' : res.data.text[0]
            .id
        } else {
          this.error(res.msg)
        }
      },
      // 返回上级
      okreturn() {
        this.$router.go(-1)
      },
      //视频上传
      async videosuss(file) {
        console.log(file);
        //获取上传凭证
        if (file.code == 200) {
          this.isvideo_img = 2;
          this.uploadAuth = file.data.UploadAuth
          this.uploadAddress = file.data.UploadAddress
          this.videoId = file.data.VideoId
          var userData = '{"Vod":{}}'
          this.uploader = this.createUploader()
          this.uploader.addFile(this.videofiledata, null, null, null, userData)
          this.uploader.startUpload()
        } else {
          this.error(file.msg)
        }
      },
      //文字保存
      async addText() {
        this.istextb = true;
        let res = await this.$api.pushaddText({
          id: this.textid,
          keyword_id: this.data.id,
          keyword: this.data.keyword,
          media_text: this.textarea,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.istextb = false;
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.textarea = ""
          this.keyWorddetail()
        } else {
          this.error(res.msg)
        }
      },
      //播放视频
      openvideo(url) {
        this.videoopenurl = url;
        this.dialogVisible = true;
      },
      //相册图片上传
      async bg_img1(file) {
        //获取上传凭证
        if (file.code == 200) {
          this.isvideo_img = 1;
          this.uploadAuth = file.data.UploadAuth
          this.uploadAddress = file.data.UploadAddress
          this.videoId = file.data.ImageId
          this.ImageURL = file.data.ImageURL //上传地址
          var userData = '{"Vod":{}}'
          this.uploader = this.createUploader()
          this.uploader.addFile(this.file, null, null, null, userData)
          this.uploader.startUpload()
        } else {
          this.error(file.msg)
        }
      },
      //文件上传
      createUploader(type) {
        let self = this
        let uploader = new AliyunUpload.Vod({
          timeout: self.timeout || 60000,
          partSize: self.partSize || 1048576,
          parallel: self.parallel || 5,
          retryCount: self.retryCount || 3,
          retryDuration: self.retryDuration || 2,
          region: self.region,
          userId: self.userId,
          // 开始上传
          onUploadstarted: function(uploadInfo) {
            uploader.setUploadAuthAndAddress(uploadInfo, self.uploadAuth, self.uploadAddress, self.videoId)
          },
          // 文件上传成功
          onUploadSucceed: function(uploadInfo) {
            self.addImg();
          },
          onUploadProgress: function(uploadInfo, totalSize, progress) {
            self.$message({
              message: '文件上传中' + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(
                progress * 100) + "%",
            });
          },
          // 文件上传失败
          onUploadFailed: function(uploadInfo, code, message) {
            self.uploadAuth = ''
            self.uploadAddress = ''
            self.videoId = ''
            self.ImageURL = '' //上传地址
            self.error("文件上传失败: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          },
          // 取消文件上传
          onUploadCanceled: function(uploadInfo, code, message) {
            self.error("文件已暂停上传: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          },
        })
        return uploader
      },
      async addImg() {
        var data = '';
        if (this.isvideo_img == 1) { // 1 == img  2== video
          let res = await this.$api.addImg({
            keyword_id: this.data.id,
            keyword: this.data.keyword,
            media_id: this.videoId,
            media_name: this.data.keyword,
            media_ext: 'png',
            media_cate_id: '5099',
            media_url: this.ImageURL,
            token: localStorage.getItem('token')
          });
          data = res
          this.$refs.cropperUpload.clearFiles()
        } else {
          let res = await this.$api.addvideo({
            keyword_id: this.data.id,
            keyword: this.data.keyword,
            media_id: this.videoId,
            media_name: this.data.keyword,
            media_ext: 'mp4',
            media_cate_id: '5100',
            token: localStorage.getItem('token')
          });
          data = res
          this.$refs.cropperUploadvideo.clearFiles()
        }
        if (data.code == 200) {
          this.keyWorddetail()
          self.uploadAuth = ''
          self.uploadAddress = ''
          self.videoId = ''
          self.ImageURL = '' //上传地址
          this.$message({
            message: '上传成功',
            type: 'success'
          });
        }
      },
      //删除列表
      handleCheckChange(val) {
        this.numlist = val.length
        let arrdel = [];
        for (var i = 0; i < val.length; i++) {
          arrdel.push(val[i].id)
        }
        this.imghandleCheckChange = arrdel
      },
      //最终删除
      async okdelete() {
        let res = await this.$api.deletedata({
          ids: this.cancelname == 'img' ? this.imghandleCheckChange : this.videohandleCheckChange,
          keyword_id: this.data.id,
          type: this.cancelname == 'img' ? 0 : 1,
          token: localStorage.getItem('token')
        });
        if (this.cancelname == 'img') {
          this.checkAll = [],
            this.numlist = 0
        } else {
          this.checkAllvideo = [],
            this.videonumlist = 0
        }
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.cancelname == 'img' ? this.imghandleCheckChange = [] : this.videohandleCheckChange = []
          this.keyWorddetail();
        } else {
          this.error(res.msg)
        }
      },
      // 删除视频
      handleCheckChangevideo(val) {
        this.videonumlist = val.length
        let arrdel = [];
        for (var i = 0; i < val.length; i++) {
          arrdel.push(val[i].id)
        }
        this.videohandleCheckChange = arrdel
      },
      //删除文本
      async deletetextok(id) {
        console.log(id)
        let res = await this.$api.deletedata({
          ids: id.id,
          keyword_id: this.data.id,
          type: 2,
          token: localStorage.getItem('token')
        });
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.keyWorddetail();
        } else {
          this.error(res.msg)
        }
      },
      //获取文件对象
      filedata(event, file, fileList) {
        this.file = file.raw
      },
      //取消选中
      cancel() {
        if (this.cancelname == 'img') {
          this.checkAll = [],
            this.numlist = 0
        } else {
          this.checkAllvideo = [],
            this.videonumlist = 0
        }
      },
      handleClick(tab, event) {
        this.cancelname = tab.name
      },
      videofiledataf(event, file, fileList) {
        this.videofiledata = file.raw
      },
      error(msg) {
        this.$message({
          message: msg,
          type: 'error'
        });
      }
    },
  };
</script>
<style>
  .el-card__body {
    padding: 0px;
  }
</style>
