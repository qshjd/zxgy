import axios from 'axios'; 
import host from './host'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {    
//     Toast({        
//         message: msg,        
//         duration: 1000,        
//         forbidClick: true    
//     });
// }

const SYS_ERR_MSG = '网络开小差啦' //服务错误提示语
const SYS_AUTH_CODE = [401, 402] //未登录状态码处理

const SYS_SUCC_CODE = ['SYS.SUCCESS', '200', 200, 0] //请求成功代码集
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    Taro.navigateTo({
        url:'/pages/login/login'
    })
}
//格式化返回值
const dataFormat =(data)=> {
    // console.log("----------->>>>>数据------")
    console.log( data )
    if (data && data.status == 200) {
        return data.data
    }
}
/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (data) => {
    //处理请求错误
    console.log("---------进入错误信息-----")
    if (/401/.test(data)) {
        return {
            status: 401
        }
    }else {
        throw SYS_ERR_MSG
    }
}
//处理成功请求 业务代码判断
const busnessCodeHanddler = (data, silentErrorCode = [],reqOption)=>{
    //做业务判断，错误throw错误出去，正确return相应数据出去

    const errorCode = data.status || data.code || undefined
    if (!errorCode) {
        throw data
    }else if (SYS_SUCC_CODE.indexOf(errorCode) >= 0) {
        return data.data
    }else if (silentErrorCode.indexOf(errorCode) >= 0) {
        throw data
    }else if (SYS_AUTH_CODE.indexOf(errorCode) >= 0) {
        // tip('登录过期，请重新登录');
        localStorage.removeItem('token');
        store.commit('loginSuccess', null);
        setTimeout(() => {
            toLogin();
        }, 1000);
    } else {
        throw data.msg || data.message || SYS_ERR_MSG
    }
}
//创建axios实例
var instance =  axios.create({
    timeout:5000
});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 全局的地址
instance.defaults.baseURL = host; 

// 允许携带cookie
instance.defaults.withCredentials=true





// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => res.status == 200 ? Promise.resolve( res ) : Promise.reject(res),    
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            console.log( "-------求情出错了------" )
            console.log( response )
            // 请求已发出，但是不在2xx的范围 
            return Promise.reject(response);
        } else {
            console.log( "-------断网了-------" )
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
            // alter('网络错误')
            // alert('网络错误')
        }
    });



const http = (method,url,option,silentErrorCode)=>{
    let reqOption = {
        method: method,
        url: url,
        data: option,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept':'application/json'
        }
    }
    // console.log("reqOption:"+reqOption);
    if (method == 'get') {
        let dataWithRandom = option || {}
        dataWithRandom['t'] = Math.ceil(Math.random() * Date.now())
        reqOption.params = dataWithRandom
    }
    if (localStorage.getItem("token")) {
        reqOption['headers']['authorization'] = `${localStorage.getItem("token")}`
    }


    return instance(reqOption).then(dataFormat,errorHandle).then((data)=>{
        return Promise.resolve( data )
    })
}


export default {
    get: (url, option, silentErrorCode)=>{
        return http('get', url, option, silentErrorCode)
    },
    post: (url, option, silentErrorCode)=>{
        return http('post', url, option, silentErrorCode)
    }
};




