import axios from './index.js'

export default {
  async post(data) {
    return await axios({
      url: ``,
      method: 'post',
      data,
    })
  },
  // 获取活动详情
  async getToken(data) {
    return await axios({
      url: `/cms/media/token`,
      method: 'post',
      data
    })
  },
  // 获取二维码
  async getQRcode(data) {
    return await axios({
      url: `/cms/media/qrCode`,
      method: 'post',
      data
    })
  },

  // 搜索
  async keyWordList(data) {
    return await axios({
      url: `/cms/media/keyWordList`,
      method: 'post',
      data
    })
  },
  //素材库详情
  async getkeyWorddetail(data) {
    return await axios({
      url: `/cms/media/keyWorddetail`,
      method: 'post',
      data
    })
  },
  //添加图片
  async addImg(data) {
    return await axios({
      url: `/cms/media/addImg`,
      method: 'post',
      data
    })
  },
  //添加视频
  async addvideo(data) {
    return await axios({
      url: `/cms/media/addVod`,
      method: 'post',
      data
    })
  },
  //添加文字
  async pushaddText(data) {
    return await axios({
      url: `/cms/media/addText`,
      method: 'post',
      data
    })
  },
  //删除
  async deletedata(data) {
    return await axios({
      url: `/cms/media/delMediaByIds`,
      method: 'post',
      data
    })
  },
}
