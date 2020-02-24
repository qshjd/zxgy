import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';
// import {AtButton} from 'taro-ui';
import { AtBadge ,AtAvatar, AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import './index.scss'

// import Container from '../../components/container/container';

import DrIcon from '../../imgs/dr_icon.png';
import DkIcon from '../../imgs/dk_icon.png';
import IconQuestion from '../../imgs/question@3x.png';
import IconCommit from '../../imgs/icon_commit@2x.png';
import IconSend from '../../imgs/icon_send@2x.png';
import IconFinish from '../../imgs/icon_finish@2x.png';
import IconQuit from '../../imgs/icon_quit@2x.png';
import IconAdd from '../../imgs/icon_addmember@2x.png';
import IconSy from '../../imgs/sytj.png';
import IconCd from '../../imgs/cddz.png';
import IconTeam from '../../imgs/icon_team@2x.png';
import IconUp from '../../imgs/icon_up@2x.png';

import allapi from '../../api'

export default class Zhenxuan extends Component{
    config: Config = {
        navigationBarTitleText: '臻选家',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state={
        headImg:'',
        nickName:'',
        dakaName:'',
        teamName:'',
        showToast:false,
        link:'',
        toastWord:'复制成功',
        level:'',
        openDiago:false,
        openDiago2:false,
        datas:{},
        remainingSum:''
    }
    componentDidMount(){
        //获取用户头像、昵称
        // allapi.common.get_user_infor()
        // .then(res => {
        //     // console.log(res)
        //     this.setState({
        //         headImg:res.img,
        //         nickName:res.nickName,
        //         level:res.level
        //     })
        // })
        //获取收入
        allapi.user.income_change()
        .then(res => {
            console.log(res)
            this.setState({
                datas:res.result
            })
        })
        //可提现金额
        allapi.detail.get_cashAll()
        .then(res => {
            console.log('**',res)
            this.setState({
                remainingSum:res.remainingSum
            })
        })
        //所属大咖和所属团队
        allapi.user.user_team_infor()
        .then(res => {
            console.log('*/*/*',res)
            this.setState({
                headImg:res.result.img,
                nickName:res.result.nickName,
                level:res.result.level,
                dakaName:res.result.teamLeader,
                teamName:res.result.team
            })
        })
    }
    openModel = ()=>{
        this.setState({
            openDiago:true
        })
    }
    closeModel = (event)=>{
        event.stopPropagation();   //阻止事件冒泡
        this.setState({
            openDiago:false,
            openDiago2:false,
        })
    }
    closeModel2 = (event)=>{
        event.stopPropagation();   //阻止事件冒泡
        this.setState({
            openDiago:false,
            openDiago2:false
        })
    }
    //查看资金明细
    openApplyCash = ()=>{
        Taro.navigateTo({
            url:'/pages/zhenxuan/applycash/applycash'
        })
    }
    gotoOrdersPage0(){
        Taro.navigateTo({
            url:`/pages/user/orders/orders?id=0&level=${this.state.level}`
        })
    }
    gotoOrdersPage1(){
        Taro.navigateTo({
            url:`/pages/user/orders/orders?id=1&level=${this.state.level}`
        })
    }
    gotoOrdersPage2(){
        Taro.navigateTo({
            url:`/pages/user/orders/orders?id=2&level=${this.state.level}`
        })
    }
    gotoOrdersPage3(){
        Taro.navigateTo({
            url:`/pages/user/orders/orders?id=3&level=${this.state.level}`
        })
    }
    //子账号创建
    openAdd =()=>{
        // Taro.navigateTo({
        //     url:'/pages/zhenxuan/addmember/addmember'
        // })
        this.setState({
            openDiago2:true
        })
    }
    //收益统计
    GoToDataPage = ()=>{
        Taro.navigateTo({
            url:`/pages/zhenxuan/persondata/persondata?level=${this.state.level}`
        })
    }
    //查单地址
    gotoQuery = ()=>{
        Taro.navigateTo({
            url:'/pages/query/query'
        })
    }
    //进阶之路
    openImprove = ()=>{
        Taro.navigateTo({
            url:`/pages/zhenxuan/improveroad?level=${this.state.level}`
        })
    }
    //团队管理
    openTeam = ()=>{
        Taro.navigateTo({
            url:'/pages/zhenxuan/teammanage/teammanage'
        })
    }
    render(){
        const {headImg,nickName,level,openDiago,openDiago2,datas,remainingSum,dakaName,teamName} = this.state
        return(
            <View className='moreInfo-box'>
                <View className='top-box'>
                    <View className='user-box'>
                        <AtAvatar circle size='large' image={headImg} className='userImg'></AtAvatar>
                        <View className='user-info'>
                            <View className='name-level'>
                                <View className='user-nickName'>
                                    {nickName}
                                </View>
                                {level == '1001'?<Image src={DkIcon} className='level-icon'/>:<Image src={DrIcon} className='level-icon'/>}
                            </View>
                            <View className='daka-team'>
                                <View className='title'>所属大咖：</View><Text className='value'>{dakaName}</Text>
                            </View>
                            <View className='daka-team'>
                                <View className='title'>所属团队：</View><Text className='value'>{teamName}</Text>
                            </View>
                        </View>
                    </View>
                    <View className='money-panel'>
                        <View className='ctt1-box'>
                            <View className='tixian'>
                                <View className='apply-money'>
                                    可提现金额：<Text className='money-style'>￥{remainingSum}</Text>
                                </View>
                                <View className='apply-word'>
                                    每周一可申请提现
                                </View>
                            </View>
                            <View className='detail-btn' onClick={this.openApplyCash}>
                                <View className='words'>查看金额明细</View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='cash-panel'>
                    <View onClick={this.openModel}>
                        <Image src={IconQuestion} className='ques' ></Image>
                        <AtModal isOpened={openDiago} closeOnClickOverlay={false}>
                            <AtModalContent>
                                <View className='diago-content'>
                                    <View className='diago-paragraph-1'>
                                        <View className='circle'></View>
                                        <View className='words'>预估收益可能与最终真实的收益不相等，此处数据仅作为统计参考！</View>
                                    </View>
                                    <View className='diago-paragraph-1'>
                                        <View className='circle'></View>
                                        <View className='words'>为什么会出现预估？ 大咖专属的管理奖金、伯乐奖金会在对应订单确认收货后才会获得，且预估未扣除退款的部分。</View>
                                    </View>
                                    <View className='diago-paragraph-1'>
                                        <View className='circle'></View>
                                        <View className='words'>个人收益预估：达人仅包含已经扣除的商品佣金；大咖包含已经扣除的商品佣金、管理奖金、伯乐奖金。</View>
                                    </View>
                                    <View className='diago-paragraph-1'>
                                        <View className='circle'></View>
                                        <View className='words'>支付成功即统计今日及本月的订单数，若申请取消订单，数量不会减少，个人销售额同理，此处统计仅供参考。</View>
                                    </View>
                                </View>
                            </AtModalContent>
                            <AtModalAction className='diago-btn'><Button onClick={this.closeModel} ><Text className='diago-word'>知道了</Text></Button> </AtModalAction>
                        </AtModal>
                    </View>
                    <View className='ctt2-box'>
                        <View className='money-data'>
                            <View className='data'>{datas.saleCountMonth}</View>
                            <View className='des-word'>本月个人订单数</View>
                        </View>
                        <View className='money-data'>
                            <View className='data'>{datas.saleCountToday}</View>
                            <View className='des-word'>今日个人订单数</View>
                        </View>
                        <View className='money-data lastone'>
                            <View className='data'>{datas.saleToday}</View>
                            <View className='des-word'>今日个人销售额</View>
                        </View>
                    </View>
                    <View className='ctt2-box'>
                        <View className='money-data'>
                            <View className='data'>{datas.incomeCommissionMonth+datas.incomeMonth}</View>
                            <View className='des-word'>本月个人收益预估</View>
                        </View>
                        <View className='money-data'>
                            <View className='data'>{datas.incomeCommissionToday+datas.incomeToday}</View>
                            <View className='des-word'>今日个人收益预估</View>
                        </View>
                        <View className='money-data lastone'>
                            {level == '1001'?<View className='data'>{datas.incomeCommissionToday}</View>:''}
                            {level == '1001'?<View className='des-word'>今日管理、伯乐奖金预估</View>:''}
                        </View>
                    </View>
                </View>
                <View className='user-order'>
                    <View className='order-title'>我的订单</View>
                    <View className='order-icons'>
                        <View className='order-icon' onClick={this.gotoOrdersPage0.bind(this)}>
                            <Image src={IconCommit} className='user-icon'/>
                            <Text className='icon-word'>已提交</Text>
                        </View>
                        <View className='order-icon' onClick={this.gotoOrdersPage1.bind(this)}>
                            <Image src={IconSend} className='user-icon'/>
                            <Text className='icon-word'>已发货</Text>
                        </View>
                        <View className='order-icon' onClick={this.gotoOrdersPage2.bind(this)}>
                            <Image src={IconFinish} className='user-icon'/>
                            <Text className='icon-word'>已完成</Text>
                        </View>
                        <View className='order-icon' onClick={this.gotoOrdersPage3.bind(this)}>
                            <Image src={IconQuit} className='user-icon'/>
                            <Text className='icon-word'>退款售后</Text>
                        </View>
                    </View>
                </View>
                <View className='usual-function'>
                    <View className='function-title'>常用功能</View>
                    <View className='fun-icons'>
                        <View className='fun-icon' onClick={this.openAdd}>
                            <Image src={IconAdd} className='user-icon'/>
                            <View className='icon-word'>子账号创建</View>
                        </View>
                        <View className='fun-icon'>
                            <Image src={IconSy} className='user-icon' onClick={this.GoToDataPage}/>
                            
                            <View className='icon-word'>数据统计</View>
                        </View>
                        <View className='fun-icon'>
                            <Image src={IconCd} className='user-icon' onClick={this.gotoQuery}/>
                            <View className='icon-word'>查单地址</View>
                        </View>
                        <View className='fun-icon'>
                        <AtBadge value='新版'><Image src={IconUp} className='user-icon' onClick={this.openImprove}/></AtBadge>
                            <View className='icon-word'>晋级考核</View>
                        </View>
                        
                    </View>
                    {level == '1001'?<View className='team-icon' onClick={this.openTeam}>
                        <Image src={IconTeam} className='team-icon'/>
                        <View className='icon-word'>团队管理</View>
                    </View>:''}
                </View>
                <AtModal isOpened={openDiago2} closeOnClickOverlay={false}>
                            <AtModalContent>
                                <View className='diago-content'>
                                    <View className='diago-paragraph-1'>
                                        <View className='circle'></View>
                                        <View className='words'>臻选果园目前开通了暂时的“免费入驻”通道，无需缴纳288元代理费即可加入，成为臻选师后也不会补交，卖一单收入一单不充值。晋级后，可以获得更高额的收益。</View>
                                    </View>
                                    <View className='diago-paragraph-1'>
                                        <View className='circle'></View>
                                        <View className='words'>如需推荐其他小伙伴加入，请详询臻选果园内务号。</View>
                                    </View>
                                </View>
                            </AtModalContent>
                            <AtModalAction className='diago-btn'><Button onClick={this.closeModel2} ><Text className='diago-word'>知道了</Text></Button> </AtModalAction>
                        </AtModal>
            </View>
        )
    }
}