// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
    let that=this;
    //判断本地是否有用户信息
    wx.getStorage({
      key: 'userInfo',
      success(res){
        console.log(res);
        let str='userInfo.uid'
        that.setData({
          [str]:res.data.uid,
        });
        if(res.data.uname!=null){
          that.setData({
            hasUserInfo:true,
            userInfo:{
              uid:res.data.uid,
              nickName:res.data.uname,
              avatarUrl:res.data.avatarUrl
            }
          })
        }
      }
    })
  },
  /**
   * 绑定用户个人信息
   */
  getUserProfile(e) {
    let that=this;
    let uid=this.data.userInfo.uid,str="userInfo.uid";
    wx.getUserProfile({
      desc: '微信用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        that.setData({
          userInfo: res.userInfo,
          [str]:uid,
          hasUserInfo: true
        });
        //更新服务器用户信息
        wx.request({
          url: 'https://2000022784.zhangqx.com:443/setUserInfo',
          data:{
            userInfo:{
              uid:that.data.userInfo.uid,
              uname:that.data.userInfo.nickName,
              ugender:that.data.userInfo.gender,
              uavatarUrl:that.data.userInfo.avatarUrl,
              ucountry:that.data.userInfo.country,
              uprovince:that.data.userInfo.province,
              ucity:that.data.userInfo.city,
            }
          },
          success(res){
            console.log(res);
          }
        })
        //更新本地缓存
        console.log(that.data);
        wx.setStorage({
          key:"userInfo",
          data:{
            uid:that.data.userInfo.uid,
            uname:res.userInfo.uname,
            avatarUrl:res.userInfo.uavatarUrl
          }
        });
      }
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