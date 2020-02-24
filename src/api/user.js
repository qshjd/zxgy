import axios from '../utils/http'
import qs from 'qs'

const user = {
    //实名认证查询
    certification_idcard(){
        return axios.post('sys/agent/queryRealName')
    },
    //实名认证填写
    certification_idcard_write(params){
        return axios.post('sys/agent/updateRealName',qs.stringify(params))
    },
    //获取验证码
    user_code(params){
        return axios.post('sys/agent/messageAuthCreate',qs.stringify(params))
    },
    //登录
    user_login(params){
        return axios.post('sys/agent/messageAuth',qs.stringify(params))
    },
    //订单列表
    order_list(params){
        console.log(params)
        return axios.post('persnal_center/getOrderDetailInfo',params)
    },
    //售后单列表
    claim_list(params){
        return axios.post('persnal_center/getClaimDetailInfo',params)
    },
    //获取所有成员名称、id
    get_all_members(params){
        return axios.post('persnal_center/getChildAgentSimpleInfo',qs.stringify(params))
    },
    //获取所有商品id、名称
    get_all_goods(){
        return axios.post('persnal_center/getAllProductCategory')
    },
    //获取旧地址
    old_addr(params){
        return axios.post('persnal_center/getOrderDetailInfoByOrderId',qs.stringify(params))
    },
    //保存修改地址
    save_addr(params){
        return axios.post('persnal_center/modifyReceiveAddress',params)
    },
    //查看团队成员订单
    query_member_orders(params){
        return axios.post('persnal_center/getChildAgentSimpleInfo',qs.stringify(params))
    },
    //物流查询
    query_logistics(params){
        return axios.post('persnal_center/expressDetailInfo',qs.stringify(params))
    },
    /*
    提交售后
    */
    //判断该订单是否二次售后
    is_cliam_twice(params){
        return axios.post('persnal_center/isNeedClaim',qs.stringify(params))
    },
    //问题件
    problem_order(params){
        console.log(params)
        return axios.post('persnal_center/applyProClaim',qs.stringify(params),{'Headers':{
            'Content-Type':'multipart/form-data'
            }})
    },
    //理赔件
    claim_order(params){
        return axios.post('persnal_center/applyRatioClaim',params)
    },
    /*
    售后详情
    */
    //获取售后基本信息
    get_claim_infor(params){
        return axios.post('persnal_center/QueryClaimSimpleInfo',qs.stringify(params))
    },
    get_claim_chat(params){
        return axios.post('persnal_center/getAllSysClaimsProcess',qs.stringify(params))
    },
    //添加新凭证
    // add_new_log(params){
    //     return axios.post('persnal_center/addSysClaimProcess',qs.s)
    // }
    // 售后完结
    finish_claim(params){
        return axios.post('persnal_center/claimFinish',qs.stringify(params))
    },
    //确认收货
    confirm_order(params){
        return axios.post('sys/order/productFinish',qs.stringify(params))
    },
    //取消订单
    cancel_order(params){
        return axios.post('sys/order/cancelOrder',qs.stringify(params))
    },
    //查看订单详情
    look_order_detail(params){
        return axios.post('sys/order/getOrderDetail',qs.stringify(params))
    },

    //版本迭代更新
    income_change(){
        return axios.post('sys/agent/getEstimateInfo')
    },
    user_team_infor(){
        return axios.post('sys/agent/getBaseInfo')
    }
}

export default user;