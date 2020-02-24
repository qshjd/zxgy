import axios from '../utils/http'
import qs from 'qs'

const common = {
    //获取当前用户头像、昵称
    get_user_infor(){
        return axios.post('sys/agent/getHeadimgAndNickname')
    },
    //初始化时间筛选
    get_joinTimeAndToday(){
        return axios.post('sys/agent/getJoinTimeAndToday')
    },
    // //查单地址图片验证码
    // get_imageCode(params){
    //     return axios.get('sys/order/getCode',qs.stringify(params))
    // },
    //获取该手机号所有在运送中的订单
    get_waitOrders(params){
        return axios.post('sys/order/getOrderList',qs.stringify(params))
    },
    //js-sdk config数据
    get_config(){
        return axios.post('getShareInfo')
    }
}

export default common;