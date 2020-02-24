import axios from '../utils/http';
import qs from 'qs'

// const host = 'http://192.168.31.251:8080/server_wechat/sys'

const home = {
    //轮播
    get_banners(){
        return axios.post('sys/product/banner')
    },
    //商品列表
    get_goods_list(params){
        return axios.post(`sys/product/list`,qs.stringify(params))
    },
    //商品详情
    get_goods_detail(params){
        return axios.post(`sys/product/detail`,qs.stringify(params))
    },
    //获取运费及商品信息
    get_freight_infor(params){
        return axios.post('sys/order/infoForOrderEntry',qs.stringify(params))
    },
    //地址智能识别
    smart_address(params){
        return axios.post('sys/order/addrRecognize',qs.stringify(params))
    },
    //订单录入
    order_entry(params){
        return axios.post('sys/order/createProductSys',qs.stringify(params))
    },
    //生成预支付订单
    prepaid_order(params){
        return axios.post('sys/order/createOrder',qs.stringify(params))
    },
    //版本迭代（新增历史录单用户数据查询功能）
    find_name(params){
        return axios.post('sys/order/addr/find_name',qs.stringify(params))
    }
}

export default home;