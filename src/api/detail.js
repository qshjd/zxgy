import axios from '../utils/http';
import qs from 'qs'


const detail = {
    //首页
    get_home_income(){
        return axios.post('sysIncome/incomeInfo');
    },
    //可提现总金额
    get_cashAll(){
        return axios.post('agentCash/getRemainingSum')
    },
    
    //收入明细
    get_income_detail(params){
        return axios.post('moneyDetail/getIncomeDetail',qs.stringify(params))
    },
    //退款明细
    get_quit_detail(params){
        return axios.post('moneyDetail/getClaimsDetail',qs.stringify(params))
    },
    //提现明细
    get_cash_detail(params){
        return axios.post('moneyDetail/getCashDetail',qs.stringify(params))
    },
    //查看个人数据统计
    get_detail_income(params){
        return axios.post(`sysIncome/incomeDetailInfo`,qs.stringify(params));
    },
    //团队管理面板
    get_team_panel(){
        return axios.post(`sysTeam/teamNumberInfo`);
    },
    //今日加入成员
    get_today_member(){
        return axios.post(`sysTeam/membersJoinToday`)
    },
    //团队信息
    get_team_infor(){
        return axios.post('sysTeam/teamInfo')
    },
    //填写团队名称
    write_team_name(params){
        return axios.post('sysTeam/updateTeamName',qs.stringify(params))
    },
    //团队成员
    get_team_member(params){
        return axios.post(`sysTeam/teamMemberList`,qs.stringify(params))
    },
    //更多信息
    get_member_detail(params){
        return axios.post(`sys/agent/moreInfo`,qs.stringify(params))
    },
    /*
    子账号创建
    */
    //获取职业列表
    get_jobs(){
        return axios.post('sys/agent/jobList')
    },
    //获取省市区
    get_areas(params){
        return axios.post('sys/area/query',qs.stringify(params))
    },
    //提交信息
    handle_infor(params){
        return axios.post('sys/agent/addAgent',qs.stringify(params))
    },
    //审核中
    checking_members(params){
        // console.log('参数',params)
        return axios.post('sys/agent/agentChecking',qs.stringify(params))
    },
    /*
    申请提现
    */
    //获取日期和微信号
    get_timeAndWechat(){
        return axios.post('agentCash/getDateAndWechat')
    },
    //获取验证码
    get_cash_code(){
        return axios.post('agentCash/sendMessage',)
    },
    //确认申请提现
    confirm_get_money(params){
        return axios.post('agentCash/withDraw',qs.stringify(params))
    },
    //进阶之路
    // improve_road(){
    //     return axios.post('sys/agent/growUpWay')
    // },
    //版本迭代--进阶之路
    improve_road_new(){
        return axios.post('sys/order/getGrowUpCondition')
    },
    //被推荐人单量统计
    grow_condition(params){
        return axios.post('sys/order/getInvitersOrderCount',qs.stringify(params))
    }

}

export default detail;