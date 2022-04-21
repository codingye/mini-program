// pages/detail/detail.js
const html = `

　　理性上讲，张若尘是希望天庭宇宙和地狱宇宙维持僵持的局面，不要打破平衡，不要再爆发大规模神战。
<br>
<br>
　　最好能够形成某种默契，先灭掉乱古魔神、量组织、黑暗之渊，甚至是雷族，等等，不安分因素。
<br>
<br>

`
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor1:'#b9ecc4',
    isChange1:true,
    darkFont:"关灯",
    bgColor2:'#3d3d3d',
    isChange2:true,
    fontColor:'black',
    contentSize:'40rpx',
    contentColor:'black',
    contentBgColor:'#f6f6f6',
    bookhHtml:'',
    nodes:[{
      name:"p",
      attr:{
        class:"readinline",
        style:"display:none;"
      }
    }],
    html2:'理性上讲，张若尘是希望天庭宇宙和地狱宇宙维持僵持的局面，不要打破平衡，不要再爆发大规模神战。<br>aaaaaaaaaaaaaaa<br>'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let {url} = options
    this.getContent(url)
  },
  getContent(url) {
    wx.cloud.callFunction({
      name:"sectionContent",
      data: {
        url:url
      }
    }).then(res => {
      console.log(res);
      let html = res.result.html
      this.setData({
        bookHtml: html
      })
    })

  },
  fontChange(e) {
    console.log(e);
    let size = e.currentTarget.dataset.size
    switch(size) {
     case 'small':
      this.setData({
        contentSize:"32rpx"
      })
      break;
      case 'mid':
      this.setData({
        contentSize: "40rpx"
      })
      break;
      case 'large':
      this.setData({
        contentSize:"48rpx"
      })
      break;
    }
    
  },
  bgcGreen(e) {
    console.log(e);
  let contentBgColor = this.data.isChange1 && "#b9ecc4" || "#f6f6f6"
  let bgColor1 = this.data.isChange1 && "#3d3d3d" || "#b9ecc4"
  let contentColor = this.data.contentColor
  if(contentColor =="rgb(153, 153, 153)") {
    contentColor = "black"
  }
  this.setData({
    contentBgColor:contentBgColor,
    bgColor1:bgColor1,
    contentColor:contentColor,
    isChange1: !this.data.isChange1
  })
  },
  bgcDark(e) {
    console.log(e);
  let contentBgColor = this.data.isChange2 && "black" || "#f6f6f6"
  let contentColor = this.data.isChange2 && "rgb(153, 153, 153)" || "black"
  let bgColor2 = this.data.isChange2 && "#fece34" || "#3d3d3d"
  let darkFont = this.data.isChange2 && "开灯" || "关灯"
  this.setData({
    contentBgColor:contentBgColor,
    contentColor:contentColor,
    darkFont:darkFont,
    bgColor2:bgColor2,
    isChange2: !this.data.isChange2
  })
  },
  toOtherPage(e){
    console.log(e);
    let page = e.currentTarget.dataset.page
    switch (page) {
      case 'index':
       wx.switchTab({
         url: '/pages/bookCity/bookCity',
       })
        break;
      default:
        break;
    }
  },
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0
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