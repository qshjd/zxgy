import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Button} from '@tarojs/components';
import './orders.scss';
import { AtTabs, AtTabsPane ,AtActivityIndicator} from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast} from "taro-ui"
//引入自定义组件
import LoadMore from '../../../components/LoadMore'
import Orderpanel2 from '../components/orderpanel2'
import Drawer from '../components/drawer/drawer'
import Empty from '../components/empty/empty'
import allapi from '../../../api';
console.log('当前页面栈：',Taro.getCurrentPages().length)
Taro.navigateBack({delta:10})
let orderStatus = ''
let tabData={}
let clickOnce = true
export default class Orders extends Component{
    config: Config = {
        navigationBarTitleText: '订单',
        navigationBarBackgroundColor:'white'
    }
    constructor () {
        super(...arguments)
        
    }
    state={
        current:parseInt(this.$router.params.id),
        isLoading:false,
        isend:false,
        confirmModal:false,
        cancelModal:false,
        showToast:false,
        toastWord:'',
        pageLoading:true,
        orderId:0,
        datas:[],
        total:0,
        num:0,
        createTmLow:'',
        createTmUp:'',
        receiverName:'',
        receiverTel:'',
        agentId:'',
        productId:'',
        page:1,
        pageSize:8,
        lookStatus:true,
        allAgents:'',
        claimTypes:'',
        claimStatus:'',
        clickOnce:true,
        cliamStatus:true           //默认查看未完成的售后单，设置状态为true
    }
    componentDidMount(){
        //获取注册时间与当前时间
        allapi.common.get_joinTimeAndToday()
        .then(res =>{
            this.setState({
                createTmLow:res.joinTime,
                createTmUp:res.today,
            },()=>{
                this.switchPage(this.$router.params.id)
            })
        })
        
    }
    //判断当前页码
    switchPage = (value)=>{
        switch(parseInt(value)){
            case 0:
                orderStatus = '2;5'
                this.setState({
                    page:1,
                    num:0,
                    total:0,
                    datas:[],
                    // agentId:'',
                    pageLoading:true,
                    isend:false,
                },()=>{
                    console.log('切换',this.state.isend)
                    this.query();
                })
                break;
            case 1:
                // console.log('111')
                orderStatus = '7'
                this.setState({
                    page:1,
                    num:0,
                    total:0,
                    datas:[],
                    pageLoading:true,
                    isend:false,
                },()=>{
                    console.log('切换',this.state.isend)
                    this.query();
                })
                break;
            case 2:
                orderStatus = '11'
                this.setState({
                    page:1,
                    num:0,
                    total:0,
                    datas:[],
                    pageLoading:true,
                    isend:false,
                },()=>{
                    console.log('切换',this.state.isend)
                    this.query();
                })
                break;
            case 3:
                console.log('售后单')
                orderStatus = '1;2;3;4;5;6;7;8;9;10;11'
                this.setState({
                    page:1,
                    num:0,
                    total:0,
                    datas:[],
                    pageLoading:true,
                    isend:false,
                },()=>{
                    console.log('切换',this.state.isend)
                    this.queryClaim();
                })
                break;
        }
    }
    //查询售后单
    queryClaim(){
        setTimeout(()=>{
            tabData=''
            const {createTmLow,createTmUp,receiverName,receiverTel,agentId,productId,page,pageSize,claimStatus} = this.state
            allapi.user.claim_list({
                createTmLow:createTmLow+" 00:00:00",
                createTmUp:createTmUp+" 23:59:59",
                receiverName:receiverName,
                receiverTel:receiverTel,
                agentId:agentId,
                productId:productId,
                orderStatus:orderStatus,
                startNo:page,
                orderNums:pageSize,
                claimStatus:claimStatus
            })
            .then(res => {
                console.log(res)
                //成功加载到数据
                if(res.isSuccess){
                    this.setState({
                        datas:res.prop,
                        num:res.prop.length,
                        total:res.NUM,
                        pageLoading:false,
                    },()=>{
                        //判读是否加载完成
                        if(this.state.total > this.state.datas.length){
                            this.setState({
                                page:page+1
                            })
                        }else{
                            console.log('售后单一次查询完')
                            this.setState({
                                isend:true
                            })
                        }
                    })
                }  
            })
            .catch(error => {
                console.log(error)
            })
        },300)
    }
    //查询函数
    query(){
        setTimeout(()=>{
            tabData={};  //防止请求过快造成DOM出错(防抖)
            const {createTmLow,createTmUp,receiverName,receiverTel,agentId,productId,page,pageSize} = this.state
            allapi.user.order_list({
                createTmLow:createTmLow+" 00:00:00",
                createTmUp:createTmUp+" 23:59:59",
                receiverName:receiverName,
                receiverTel:receiverTel,
                agentId:agentId,
                productId:productId,
                orderStatus:orderStatus,
                startNo:page,
                orderNums:pageSize
            })
            .then(res => {
                console.log(res)
                //成功加载到数据
                if(res.isSuccess){
                    this.setState({
                        datas:res.prop,
                        num:res.prop.length,
                        total:res.NUM,
                        pageLoading:false,
                    },()=>{
                        //判读是否加载完成
                        if(this.state.total > this.state.datas.length){
                            this.setState({
                                page:page+1
                            })
                        }else{
                            this.setState({
                                isend:true
                            })
                        }
                    })
                }  
            })
            .catch(error => {
                console.log(error)
            })
        },500)
        
    }
    componentWillMount () {
        // console.log(this.$router.params) 
    }
    
    //切换tabs
    handleClick (value) {
        // console.log('当前',value)
        tabData={}
        window.scrollTo(0,0);
        this.setState({
            current: value,
            isend:false,
            lookStatus:true,
            page:1,
            agentId:'',
        },()=>{
            this.switchPage(value)
        })
        
    }
    loadData(){
        const {total,datas,current,createTmLow,createTmUp,receiverName,receiverTel,agentId,productId,page,pageSize,claimStatus} = this.state
        if(total>datas.length){
            this.setState({
                isLoading:true
            },()=>{
                // this.switchPage(current)
                // console.log('加载页码：',this.state.page)
                if(this.state.isLoading){
                    if(current != 3){
                        return allapi.user.order_list({
                            createTmLow:createTmLow+" 00:00:00",
                            createTmUp:createTmUp+" 23:59:59",
                            receiverName:receiverName,
                            receiverTel:receiverTel,
                            agentId:agentId,
                            productId:productId,
                            orderStatus:orderStatus,
                            startNo:page,
                            orderNums:pageSize
                        })
                        .then(res => {
                            //合并数组
                            this.setState({
                                datas:datas.concat(res.prop)
                            })
                            //判断数据是否加载完成
                            if(total <= page*pageSize){
                                this.setState({
                                    isend:true,
                                    isLoading:false
                                })
                            }else{
                                this.setState({
                                    page:page+1,
                                    isLoading:false
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            this.setState({
                                isLoading:false
                            })
                        })
                    }else{
                        return allapi.user.claim_list({
                            createTmLow:createTmLow+" 00:00:00",
                            createTmUp:createTmUp+" 23:59:59",
                            receiverName:receiverName,
                            receiverTel:receiverTel,
                            agentId:agentId,
                            productId:productId,
                            orderStatus:orderStatus,
                            startNo:page,
                            orderNums:pageSize,
                            claimStatus:claimStatus
                        })
                        .then(res => {
                            //合并数组
                            this.setState({
                                datas:datas.concat(res.prop)
                            })
                            //判断数据是否加载完成
                            if(total <= page*pageSize){
                                this.setState({
                                    isend:true,
                                    isLoading:false
                                })
                            }else{
                                this.setState({
                                    page:page+1,
                                    isLoading:false
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            this.setState({
                                isLoading:false
                            })
                        })
                    }
                }
            })
        }else{
            // this.setState({
            //     isend:true,
            //     // isLoading:false
            // })
            return 
        }
    }
    getScrollStatus(detail){

    }
    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    render () {
        // console.log('触发滚动',this.state.isLoading)
        const tabList = [{ title: '已提交' }, { title: '已发货' }, { title: '已完成' },{title:'退款售后'}];
        let {num,datas,lookStatus,pageLoading} = this.state;
        // console.log('render',num);
        tabData = datas.map(item => {
            return (
                <Orderpanel2 now={0} orderdatas={item}  cancel={this.cancelOrder}  confirm={this.confirmGoods} isDaka={lookStatus} showTips={this.show} levelCode={this.$router.params.level}/>
            )
        }) 
        return (
            <View className='order-box'>
            <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={1500} onClose={this.closeToast}></AtToast>
            {pageLoading?<AtActivityIndicator mode='center' content='加载中...' className='loading-img'/>:''}
            <LoadMore 
            loadmore={()=>this.loadData()}
            getScrollStatus={(detail)=>this.getScrollStatus(detail)}
            threshold={40}
            isLoading={this.state.isLoading}
            arriveEnd={this.state.isend}>
            
                <View className='order-search' >
                    <View className='order-search-box'>
                        <Drawer queryCliamState={this.lookCliamState} cliamState={this.state.cliamStatus} now={this.state.current} search={this.search} hideSearch={num} queryMembers={this.lookMemberOrders} queryOwn={this.lookOwnOrders} lookMember={this.state.lookStatus} levelCode={this.$router.params.level} />
                    </View>
                </View>
                <View>
                    <AtTabs  current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)} className='tabs-head' >
                        <AtTabsPane current={this.state.current} index={0}>
                            {num?<View style={{marginTop: '100px'}}>{tabData}</View>: ''}
                            {(num==0&&pageLoading==false)? <Empty/>:''}
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            {num?<View style={{marginTop: '100px'}}>{tabData}</View>: ''}
                            {(num==0&&pageLoading==false)? <Empty/>:''}
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={2}>
                            {num?<View style={{marginTop: '100px'}}>{tabData}</View>: ''}
                            {(num==0&&pageLoading==false)? <Empty/>:''}
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={3}>
                            {num?<View style={{marginTop: '100px'}}>{tabData}</View>: ''}
                            {(num==0&&pageLoading==false)? <Empty/>:''}
                        </AtTabsPane>
                    </AtTabs>
                    
                </View>
                {this.state.isLoading?<View style={{position:'fixed',bottom:'2px',marginLeft:'35%'}}>
                        <AtActivityIndicator content='加载中(>.<)' ></AtActivityIndicator>
                    </View>:''}
                    {num?<View style={{display:(this.state.isend)?'':'none',marginBottom:'20px',fontSize:'15px',textAlign:'center'}}>
                        <Text>加载完成~</Text>
                    </View>:''}
                    <AtModal isOpened={this.state.cancelModal}>
                        <AtModalHeader className='confirm-title'>申请取消</AtModalHeader>
                        <View className='confirm-ctt'>
                            <View className='confirm-circle'></View>
                            <View className='confirm-word'>正在申请取消订单，确认取消后，订单将锁定，退款金额将再24小时内原路退回至您的支付账户。</View>
                        </View>
                        <AtModalAction> <Button className='confrim-agin' onClick={this.confirmCancel}>确认取消</Button> <Button className='cancle-confirm' onClick={this.cansleSettlement}>我再想想</Button> </AtModalAction>
                    </AtModal>

                    <AtModal isOpened={this.state.confirmModal}>
                        <AtModalHeader className='confirm-title'>确认收货</AtModalHeader>
                        <View className='confirm-ctt'>
                            <View className='confirm-circle'></View>
                            <View className='confirm-word'>请务必与消费者沟通是否收到货且无售后问题！确认收货后，所有佣金将分配给相关会员。若确认收货后出现售后问题，平台概不承担相应损失。</View>
                        </View>
                        <AtModalAction> <Button className='confrim-agin' onClick={this.settlement}>确认收货</Button> <Button className='cancle-confirm' onClick={this.cansleSettlement}>取消</Button> </AtModalAction>
                    </AtModal>
            </LoadMore>
            </View>
        )
    }
    //取消订单
    cancelOrder =(orderId,status)=>{
        this.setState({
            cancelModal:status,
            orderId:orderId
        })
    }
    confirmCancel =()=>{
        if(this.state.clickOnce){
            this.setState({
                clickOnce:false
            },()=>{
                allapi.user.cancel_order({
                    order:this.state.orderId
                })
                .then(res => {
                    if(res.success){
                        this.setState({
                            cancelModal:false,
                            clickOnce : true
                        })
                        this.switchPage(this.state.current)
                    }else{
                        //失败，返回错误信息
                        this.setState({
                            clickOnce : true,
                            cancelModal:false,
                            showToast:true,
                            toastWord:'取消订单失败'+res.msg,
                        })
                    }
                })
                .catch(error =>{
                    this.setState({
                        clickOnce : true,
                        cancelModal:false,
                        showToast:true,
                        toastWord:'取消订单失败'+error,
                    })
                })
            })
            
        }
    }

    //获取子组件传递的orderId,并且打开弹窗
    confirmGoods = (orderId,status)=>{
        // console.log(orderId,status)
        this.setState({
            confirmModal:status,
            orderId:orderId
        })
    }
    show=(status)=>{
        if(status){
            this.setState({
                showToast:true,
                toastWord:'已经参与过退款的订单不可再次售后'
            })
        }
    }
    //确认收货，并关闭弹窗
    settlement = ()=>{
        if(this.state.clickOnce){
            this.setState({
                clickOnce:false
            },()=>{
                allapi.user.confirm_order({
                    orderId:this.state.orderId
                })
                .then(res => {
                    // console.log(res)
                    //成功，关闭弹窗，刷新已发货订单页
                    if(res.success){
                        this.setState({
                            confirmModal:false,
                            clickOnce : true
                        })
                        this.switchPage(this.state.current)
                    }else{
                        //失败，返回错误信息
                        this.setState({
                            clickOnce : true,
                            confirmModal:false,
                            showToast:true,
                            toastWord:'确认收货失败',
                        })
                    }
                    
                })
                .catch(error =>{
                    this.setState({
                        clickOnce : true,
                        confirmModal:false,
                        showToast:true,
                        toastWord:'确认收货失败'+error,
                    })
                })
            })
            
        }
    }
    //取消确认收货
    cansleSettlement =()=>{
        this.setState({
            confirmModal:false,
            cancelModal:false
        })
    }
    controlSearch = (data)=>{
    }
    //条件查找
    search =(memberStr,goodsStr,timeFrom,timeTo,name,tel,claimStr)=>{
        const {current,createTmLow,createTmUp,receiverName,receiverTel,agentId,productId,lookStatus,claimTypes,allAgents,claimStatus} = this.state
        if(memberStr != ''){
            this.setState({
                lookStatus:false
            })
        }
        console.log('售后状态：',claimStr)
        if(createTmLow == timeFrom &&createTmUp == timeTo && receiverName == name&&receiverTel == tel && this.state.agentId == memberStr &&goodsStr == productId && claimStatus == claimStr){
            console.log('无需查询重复信息')
        }else{
            if(memberStr == '' && this.state.lookStatus == false){
                this.setState({
                    lookStatus:true
                })
            }
            this.setState({
                createTmLow:timeFrom,
                createTmUp:timeTo,
                receiverName:name,
                receiverTel:tel,
                agentId:memberStr,
                productId:goodsStr,
                page:1,
                claimStatus:claimStr,
                // lookStatus:false
            },()=>{
                this.switchPage(current)
            })
            
        }
    }
    //查看成员订单
    lookMemberOrders =(status)=>{
        if(status){
            if(this.state.lookStatus){
                allapi.user.get_all_members({
                    pageNo:'1',
                    pageNum:'10000'
                })
                .then(res => {
                    console.log('成员的：',res)
                    if(res.isSuccess){
                        if(res.prop.length == 0){
                            console.log('...')
                            this.setState({
                                showToast:true,
                                toastWord:'您还没有成员'
                            })
                        }else{
                            this.setState({
                                agentId:res.prop.map(item => item.id).join(";"),
                                page:1,
                                lookStatus:false,
                                isend:false,
                                allAgents:res.prop.map(item => item.id).join(";")
                            },()=>{
                                // console.log('*****',this.state.agentId)
                                this.switchPage(this.state.current)
                            })
                        }
                        
                    }
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'您还不是大咖',
            })
        }
    }
    //仅看自己的订单
    lookOwnOrders =()=>{
        if(!this.state.lookStatus){
            this.setState({
                agentId:'',
                isend:false,
                lookStatus:true
            },()=>{
                this.switchPage(this.state.current)
            })
        }
    }
    //按售后状态查看
    lookCliamState = (state)=>{
        if(state == 1){
            this.setState({
                cliamStatus:false,
                claimStatus:'4',
                page:1,
                isend:false
            },()=>{
                console.log('查看已处理')
                this.switchPage(this.state.current)
            })
        }else{
            this.setState({
                cliamStatus:true,
                claimStatus:'1;2;3;4',
                page:1,
                isend:false
            },()=>{
                console.log('查看所有')
                this.switchPage(this.state.current)
            })
        }
    }
}