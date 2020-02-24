import Taro, { Component, Config } from '@tarojs/taro';
import {View,Button,Text,Image,Picker} from '@tarojs/components';
import './applycash.scss';
// import { AtInput, AtForm } from 'taro-ui';
// import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

// import Filter from '../../../imgs/filter@2x.png'

//引入自定义组件
import BottomBtn from '../../../components/bottombtn/bottombtn';
import FilterPanel from '../components/filterdrawer';
import IncomePanel from '../components/incomePanel'
import CashPanel from '../components/cashpanel';
import QuitPanel from '../components/quitpanel';
import LoadMore from '../../../components/LoadMore'

import allapi from '../../../api'
import { AtActivityIndicator } from 'taro-ui'
// import { type } from 'os';


let queryTypeFa = new Array(2,3,6,7)
// let params1 = {}    //收入明细请求参数
// let params2 = {}    //退款明细请求参数
let params3 = {}    //提现明细请求参数

export default class ApplyCash extends Component{
    constructor(props){
        super(props);
    }
    config: Config = {
        navigationBarTitleText: '申请提现',
    }
    state={
        remainingSum:null,
        timeFrom1:'',
        timeTo1:'',
        timeFrom2:'',
        timeTo2:'',
        timeFrom3:'',
        timeTo3:'',
        openDiago2:false,
        openPanel1:false,
        openPanel2:false,
        isend:false,
        current:0,
        value:'',
        // page:1,
        pageSize:10,
        incomeData:[],
        cashData:[],
        quitData:[],
        dataLoaded:false,
        incomeLoad:false,
        quitLoad:false,
        cashLoad:false,
        incomeTotal:0,
        incomePage:1,
        cashTotal:0,
        cashPage:1,
        quitTotal:0,
        quitPage:1,
        isLoading:false,
    }
    componentDidMount(){
        
        //获取可提现金额
        allapi.detail.get_cashAll()
        .then(res => {
            console.log(res)
            this.setState({
                remainingSum:res.remainingSum?res.remainingSum:0
            })
        })
        //获取时间筛选条件
        allapi.common.get_joinTimeAndToday()
        .then(res => {
            this.setState({
                timeFrom1:res.joinTime,
                timeFrom2:res.joinTime,
                timeFrom3:res.joinTime,
                timeTo1:res.today,
                timeTo2:res.today,
                timeTo3:res.today
            },()=>{
                this.queryIncome()
            })
        })
    }
    //收入
    queryIncome(){
        let {incomePage,incomeData,pageSize,timeFrom1,timeTo1} = this.state
        allapi.detail.get_income_detail({
            page:incomePage,
            pageSize:pageSize,
            amountType:queryTypeFa,
            settlement:'1',
            timeFrom:timeFrom1+" 00:00:00",
            timeTo:timeTo1+" 23:59:59"
        })
        .then(res => {
            console.log('收入明细：',res)
            this.setState({
                incomeTotal:res.total,
                incomeData:res.value,
                incomeLoad:true,
            },()=>{
                // console.log(incomeTotal,incomeData.length)
                if(this.state.incomeTotal == this.state.incomeData.length){
                    this.setState({
                        isend:true
                    })
                }else{
                    this.setState({
                        incomePage:incomePage+1
                    })
                }
            })
        })
    }
    //退款
    queryQuit(){
        const {timeFrom2,timeTo2,quitPage,pageSize} = this.state
        allapi.detail.get_income_detail({
            page:quitPage,
            pageSize:pageSize,
            amountType:[8],
            settlement:'1',
            timeFrom:timeFrom2+" 00:00:00",
            timeTo:timeTo2+" 23:59:59"
        })
        .then(res => {
            console.log('退款明细：',res)
            this.setState({
                quitLoad:true,
                quitTotal:res.total,
                quitData:res.value,
                quitPage:this.state.quitPage+1,
            },()=>{
                if(this.state.quitTotal == this.state.quitData.length){
                    this.setState({
                        isend:true
                    })
                }else{
                    this.setState({
                        quitPage:quitPage+1,
                    })
                }
            })
        })
    }
    //提现
    queryCash(){
        const {timeFrom3,timeTo3,pageSize,cashPage} = this.state
        allapi.detail.get_cash_detail({
            page:cashPage,
            pageSize:pageSize,
            timeFrom:timeFrom3+" 00:00:00",
            timeTo:timeTo3+" 23:59:59"
        })
        .then(res => {
            console.log('提现明细：',res)
            this.setState({
                cashTotal:res.total,
                cashData:res.value,
                cashLoad:true,
                cashPage:this.state.cashPage+1
            },()=>{
                if(this.state.cashTotal == this.state.cashData.length){
                    this.setState({
                        isend:true
                    })
                }else{
                    this.setState({
                        cashPage:cashPage+1,
                    })
                }
            })
        })
    }
    handleClick (value) {
        //切换tab后回滚到顶部
        window.scrollTo(0,0);
        let {quitLoad,incomeLoad,cashLoad,incomeTotal,incomeData,quitTotal,quitData,cashTotal,cashData} = this.state
        this.setState({
            current: value,
            isend:false,
            // isLoading:true
        },()=>{
            console.log('当前索引：',this.state.current)
            switch(this.state.current){
                case 0:
                    if(!incomeLoad){
                        this.queryIncome();
                    }else if(incomeTotal == incomeData.length){
                        this.setState({
                            isend:true
                        })
                    }
                    break;
                case 1:
                    if(!quitLoad){
                        this.queryQuit();
                    }else if(quitTotal == quitData.length){
                        this.setState({
                            isend:true
                        })
                    }
                    break;
                case 2:
                    if(!cashLoad){
                        this.queryCash();
                    }else if(cashTotal == cashData.length){
                        this.setState({
                            isend:true
                        })
                    }
                    break;
            }
        })
        
    }
    
    loadData=() =>{
        console.log('触发触底')
        let {current,incomePage,pageSize,quitData,incomeData,cashData,quitTotal,quitPage,incomeTotal,cashPage,cashTotal,timeFrom1,timeTo1,timeFrom2,timeTo2,timeFrom3,timeTo3,} = this.state
        switch(current){
            case 0:
                // console.log('收入',incomeTotal,incomePage)
                if(incomeTotal > incomeData.length ){
                    this.setState({
                        isLoading:true
                    },() => {
                        console.log('加载：',this.state.incomePage)
                        if(this.state.isLoading){
                            return allapi.detail.get_income_detail({
                                page:incomePage,
                                pageSize:pageSize,
                                amountType:queryTypeFa,
                                settlement:'1',
                                timeFrom:timeFrom1+" 00:00:00",
                                timeTo:timeTo1+" 23:59:59"
                            })
                            .then(res => {
                                //合并数组
                                this.setState({
                                    incomeData:incomeData.concat(res.value)
                                })
                                //判断是否已经加载完成
                                if(incomeTotal<= incomePage*pageSize){
                                    this.setState({
                                        isend:true,
                                        isLoading:false
                                    })
                                }else{
                                    this.setState({
                                        incomePage:this.state.incomePage+1,
                                        isLoading:false
                                    })
                                }
                            })
                            .catch(error => {
                                console.log(error)
                                this.setState({
                                    // isend:true,
                                    isLoading:false
                                })
                            })
                        }
                    })
                }else{
                    this.setState({
                        isend:true,
                        // isLoading:false
                    })
                    return 
                }
                break;
            case 1:
                console.log('退款：',quitTotal,quitPage)
                if(quitTotal > quitData.length ){
                    this.setState({
                        isLoading:true,
                        // incomePage:incomePage+1
                    },() => {
                        console.log('加载：',this.state.quitPage)
                        if(this.state.isLoading){
                            return allapi.detail.get_income_detail({
                                page:this.state.quitPage,
                                pageSize:pageSize,
                                amountType:[8],
                                timeFrom:timeFrom2+" 00:00:00",
                                timeTo:timeTo2+" 23:59:59"
                            })
                            .then(res => {
                                //合并数组
                                this.setState({
                                    quitData:quitData.concat(res.value),
                                    isLoading:false,
                                    quitPage:this.state.quitPage+1,
                                })
                                
                            })
                            .catch(error => {
                                console.log(error)
                                this.setState({
                                    isLoading:false
                                })
                            })
                        }
                    })
                }else{
                    this.setState({
                        isend:true,
                        isLoading:false
                    })
                }
                break;
            case 2:
                console.log('提现：',cashTotal,cashPage)
                if(cashTotal > cashData.length){
                    this.setState({
                        isLoading:true,
                        // incomePage:incomePage+1
                    },() => {
                        console.log('加载：',this.state.cashPage)
                        if(this.state.isLoading){
                            return allapi.detail.get_cash_detail({
                                page:this.state.cashPage,
                                pageSize:pageSize,
                                timeFrom:timeFrom3+" 00:00:00",
                                timeTo:timeTo3+" 23:59:59"
                            })
                            .then(res => {
                                //合并数组
                                this.setState({
                                    cashData:cashData.concat(res.value),
                                    isLoading:false,
                                    cashPage:this.state.cashPage+1,
                                })
                                
                            })
                            .catch(error => {
                                console.log(error)
                                this.setState({
                                    isLoading:false
                                })
                            })
                        }
                    })
                }else{
                    this.setState({
                        isend:true,
                        isLoading:false
                    })
                }
                break;
        }
    }
    getScrollStatus = (detail) =>{
        // console.log(detail)
    }
    
    changeModel2(){
        this.setState({
            openDiago2:!this.state.openDiago2
        })
        console.log('弹框:',this.state.openDiago2,'面板:',this.state.openPanel1)
    }
    openPanel2(){
        this.setState({
            openPanel2:true
        })
        console.log('面板2开启')
    }
    closePanel2(){
        this.setState({
            openPanel2:false
        })
        console.log('面板2关闭')
    }
    
    goToNextPage(){
        Taro.navigateTo({
            url:'/pages/zhenxuan/applycash/apply'
        })
    }
    render(){
        console.log('render')
        let {openDiago2,incomeData,cashData,current,remainingSum,quitData} = this.state;
        const incomedetails = incomeData.map((detail) =>{
            return <IncomePanel datas={detail} now={current}/>
        })
        const quitdetails = quitData.map((detail) =>{
            return <QuitPanel datas={detail} now={current}/>
        })
        const cashdetails = cashData.map((detail) =>{
            return <CashPanel datas={detail} now={current}/>
        })
        const tabList = [{ title: '收入明细' }, { title: '退款明细' }, { title: '提现明细' }]
        return(
            <View className='ah-box'>
            <LoadMore
            loadmore={()=>this.loadData()}
            getScrollStatus={(detail)=>this.getScrollStatus(detail)}
            threshold={120}
            isLoading={this.state.isLoading}
            arriveEnd={this.state.isend}>
                <View className='ah-top'>
                    <View className='ah-one-words' style={{fontWeight:'bold'}}>可提现金额(元)</View>
                    <View className='ah-one-money'>{remainingSum}</View>
                    <View className='ah-one-ques' onClick={this.changeModel2.bind(this)}>为什么没有商品佣金和直接推荐奖励？</View>
                    <AtModal isOpened={openDiago2} closeOnClickOverlay={false}>
                        <AtModalHeader className='ah-diago-title'>为什么没有商品佣金和推荐培训津贴？</AtModalHeader>
                        <AtModalContent>
                            <View className='ah-diago-content'>
                                <View className='ah-diago-circles'>
                                    <View className='ah-diago-circle-1'></View>
                                </View>
                                <View className='ah-diago-line'>
                                    <View className='ah-diago-words'>
                                        商品佣金和推荐培训津贴分别在订单录入和创建子账号时扣除，不计入可提现金额，收入明细中未计入。
                                    </View>
                                </View>
                            </View>
                        </AtModalContent>
                        <AtModalAction className='ah-diago-btn'><Button onClick={this.changeModel2.bind(this)} ><Text className='ah-diago-btn-word'>知道了</Text></Button> </AtModalAction>
                    </AtModal>
                </View>
                <FilterPanel now={current} search={this.searchData}/>
                <View style={{marginTop:'30px',display:'flex'}}>
                    <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)} customStyle={{position:'relative'}}>
                        <AtTabsPane current={this.state.current} index={0} >
                            {incomedetails}
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            {quitdetails}
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={2}>
                            {cashdetails}
                        </AtTabsPane>
                    </AtTabs>
                    
                </View>
                <View style={{marginBottom:'70px',display:'flex',justifyContent:'center'}}>
                    <View style={{display:(this.state.isLoading)?'':'none'}}>
                            <AtActivityIndicator content='加载中(>.<)' ></AtActivityIndicator>
                    </View>
                    <View style={{display:(this.state.isend)?'':'none',marginTop:'10px',fontSize:'15px'}}>
                        <Text>加载完成~</Text>
                    </View>
                </View>
                <BottomBtn specialStyle={{zIndex:'666'}}>
                    <View  onClick={this.goToNextPage.bind(this)}>立即申请</View>
                </BottomBtn>
                </LoadMore>
            </View>
        )
    }
    //查询
    searchData = (data) => {
        console.log('子组件传递的分类：',data);
        if(data.amountType.length == 0){
            data.amountType = [2,3,6,7]
        }
        switch(this.state.current){
            case 0:
                if(data.amountType.toString() == queryTypeFa.toString() && this.state.timeFrom1 == data.timeFrom && this.state.timeTo1 == data.timeTo){
                    console.log('无需重复请求')
                }else{
                    //改变数组地址，防止覆盖
                    queryTypeFa = new Array()
                    for(let i=0;i<data.amountType.length;i++){
                        queryTypeFa[i] = data.amountType[i]
                    }
                    this.setState({
                        incomePage:1,
                        timeFrom1:data.timeFrom,
                        timeTo1:data.timeTo,
                        isend:false
                    },()=>{
                        this.queryIncome();
                    })
                    
                }
                break;
            case 1:
                if(this.state.timeFrom2 == data.timeFrom && this.state.timeTo2 == data.timeTo){
                    console.log('无需重复请求')
                }else{
                    this.setState({
                        quitPage:1,
                        timeFrom2:data.timeFrom,
                        timeTo2:data.timeTo,
                        isend:false
                    },()=>{
                        this.queryQuit();
                    })
                    
                }
                break;
            case 2:
                if(this.state.timeFrom3 == data.timeFrom && this.state.timeTo3 == data.timeTo){
                    console.log('无需重复请求')
                }else{
                    this.setState({
                        cashPage:1,
                        timeFrom3:data.timeFrom,
                        timeTo3:data.timeTo,
                        isend:false
                    },()=>{
                        this.queryCash();
                    })
                    
                }
                break;
            default:
                console.log('子组件传递数据意料之外的错误')
                break;
        }
    }
}