// pages/bookSetion/bookSection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetailData:{},
    sectionListData:[],
    pageSectionData:[],
    pageArray:[],
    currentPage:0,
    totalPage:0,
    btnDisabled:false,
    bookurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {url} = options
    this.setData({
      bookurl:url
    })
    this.getSection(url)
    this.allSection(url)
    wx.showLoading({
      title: '正在加载'
    })
  },
  getSection(url) {
    wx.cloud.callFunction({
      name: "getSection",
      data: {
      url:url 
      }
    }).then(res => {
      console.log(res);
      this.setData({
        bookDetailData:res.result.bookDetailData,
        sectionListData:res.result.sectionListData
      })
      console.log(this.data.bookDetailData);
    })
   
  },
  allSection(url) {
    wx.cloud.callFunction({
      name: "allSection",
      data: {
      url:url ,
      currentPage:this.data.currentPage || 0
      }
    }).then(res => {
      console.log(res);
      this.setData({
        pageSectionData:res.result.pagesectionData.currentPage,
        totalPage:res.result.pagesectionData.totalPage
      })
      if(this.data.pageArray.length !== res.result.pagesectionData.totalPage ){
        this.pickerPage()
      }
      wx.hideLoading()
      console.log(this.data.pageSectionData);
      console.log(this.data.totalPage);
    })
  },
  pickerPage() {
    let pageArray = this.data.pageArray
    for (let i =0;i < this.data.totalPage;i++) {
      pageArray.push(i+1)
    }
    this.setData({
      pageArray:pageArray
    }) 
    console.log(this.data.pageArray);
  },
  
  prePage() {
    let prePage = this.data.currentPage -1
    if(prePage < 0) {
      this.setData({
        btnDisabled:true
      })
    }else {
      this.setData({
        currentPage:prePage
      })
    }
    this.allSection(this.data.bookurl)
  },
  bindPickerChange(e) {
    console.log(e);
    let value = Number(e.detail.value) 
    this.setData({
      currentPage:value
    })
    this.allSection(this.data.bookurl)
  },
  nextPage(e) {
    console.log(e);
    let nextPage = this.data.currentPage + 1
    if(nextPage > 0) {
      this.setData({
        btnDisabled:false
      })
    }
    this.setData({
      currentPage: nextPage //** */ */
    })
    this.allSection(this.data.bookurl)
  },
  toDetail(e) {
    console.log(e);
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/detail/detail?url=${url}`
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