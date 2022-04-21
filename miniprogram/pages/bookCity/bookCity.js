// pages/bookCity/bookCity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   hotData:[],
   classifyData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getList()
    wx.showLoading({
      title: '正在加载',
    })
  },
  
  getList() {
    //调用云函数
    wx.cloud.callFunction({
      name: 'getList',
      data: {}
    }).then(res => {
      console.log(res.result);
      
      this.setData({
        hotData:res.result.hotData,
        classifyData:res.result.classifyData
      })
      wx.hideLoading()
      console.log(this.data.classifyData);
      console.log(this.data.hotData);
    })
    
  },
  toRead(e) {
    console.log(e);
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/bookSection/bookSection?url=${url}` //*** 跳转同级，必需pages下，带一个URL参数给bookEtion页面
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})