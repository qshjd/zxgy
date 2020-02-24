import Taro, { Component, Config } from '@tarojs/taro'
// import { Provider } from '@tarojs/redux'
// import './rem/rem'
// import configStore from './store'
// import { AtTabBar } from 'taro-ui'
import './app.scss'
import allapi from './api'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/login/login',
      'pages/index/index',
      'pages/index/goodsdetail',
      'pages/index/checkstand',
      'pages/index/orderentry',
      'pages/query/query',
      'pages/query/queryoutput',
      'pages/landing/landing',
      'pages/zhenxuan',
      'pages/zhenxuan/teammanage/teammanage',
      'pages/zhenxuan/teammanage/teaminformation',
      'pages/zhenxuan/teammanage/memberinfor',
      'pages/zhenxuan/teammanage/memberdetail',
      'pages/zhenxuan/addmember/addmember',
      'pages/zhenxuan/addmember/checking',
      'pages/zhenxuan/applycash/applycash',
      'pages/zhenxuan/applycash/apply',
      'pages/zhenxuan/applycash/applyrecord',
      'pages/zhenxuan/persondata/persondata',
      'pages/zhenxuan/persondata/dataexplain',
      'pages/zhenxuan/improveroad',
      'pages/zhenxuan/improveroad/teamdetails',
      'pages/zhenxuan/improveroad/instructionPic',
      // 'pages/zhenxuan/improveroad/improvepic',
      // 'pages/user/user',
      'pages/user/orders/orders',
      'pages/user/orders/orderDetail',
      'pages/user/orders/modifyaddr',
      'pages/user/orders/logistics',
      'pages/user/orders/refunddetail',
      'pages/user/orders/addnewcredentials',
      'pages/user/orders/checklogistics',
      'pages/agreement'
    ],
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./imgs/home_icons_shouye@3x.png",
        selectedIconPath: "./imgs/home_icons_pageSel@3x.png"
      }, {
        pagePath: "pages/zhenxuan",
        text: "臻选家",
        iconPath: "./imgs/home_icons_zhenxuanjia@3x.png",
        selectedIconPath: "./imgs/home_icons_zhenxuanSel@3x.png"
      }],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: ' rgba(250,250,250,0.90)',
      borderStyle: '#ccc'
    }
    
  }

  componentDidMount () {
    window.scrollTo(0,0)
    allapi.common.get_config()
    .then(res => {
      console.log(res)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        //分享给朋友
        wx.updateAppMessageShareData({ 
            title: '臻选果园-让美味返璞归“臻”', // 分享标题
            desc: '臻选果园是一家绿色健康水果产地直发平台，专注于不药物催熟、不打保鲜剂、不打甜蜜素的健康水果产地直发。', // 分享描述
            link: 'http://www.zhenxuanguoyuan.cn/dist/index17.html#/pages/landing/landing', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://www.zhenxuanguoyuan.cn/server_wechat/images/public.png', // 分享图标
            success: function () {
              // 设置成功
              // console.log('分享设置成功')
            }
        })
        //分享到朋友圈
        wx.updateTimelineShareData({
          title: '臻选果园-让美味返璞归“臻”', // 分享标题
          link: 'http://www.zhenxuanguoyuan.cn/dist/index17.html#/pages/landing/landing', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://www.zhenxuanguoyuan.cn/server_wechat/images/public.png', // 分享图标
          success: function () {
            // 设置成功
            // alert('设置成功')
          }
        });
      });
    })
  }
  
  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    
    return (
      
        <App />
      
      
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
