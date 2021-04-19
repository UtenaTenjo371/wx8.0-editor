// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url:'https://2000022784.zhangqx.com:443/getopenid',
          data:{
            code: res.code
          },
          success(res){
            console.log(res.data.uid);
            wx.setStorage({
              key:"userInfo",
              data:{
                uid:res.data.uid,
                uname:res.data.uname,
                avatarUrl:res.data.uavatarUrl
              }
            });
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
