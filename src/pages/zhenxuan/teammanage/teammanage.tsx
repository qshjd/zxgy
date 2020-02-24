import Taro, { Component, Config } from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import './teammanage.scss';
//静态文件
import TeamInfor from '../../../imgs/icon_teamInfor.png'
import MemberInfor from '../../../imgs/icon_member@2x.png'
import EmptyIcon from '../../../imgs/noMemberToday@3x.png'

//引入组件
import NewMember from '../components/newmember/newmember'

import allapi from '../../../api'

export default class Teammanage extends Component{
    config: Config = {
        navigationBarTitleText: '团队管理'
    }
    constructor(props){
        super(props);
    }
    state = {
        teamInfo:{},
        memberInfor:[],
        count:0
    }
    componentDidMount(){
        //面板信息
        allapi.detail.get_team_panel()
        .then(res => {
            // console.log(res)
            this.setState({
                teamInfo:res
            })
        })
        .catch(error => {
            console.log('获取数据失败:',error)
        })
        //今日新加入成员信息
        allapi.detail.get_today_member()
        .then(res => {
            this.setState({
                memberInfor:res.value,
                count:res.count
            })
        })
    }
    gotoInforPage(){
        Taro.navigateTo({
            url:'/pages/zhenxuan/teammanage/teaminformation'
        })
    }
    gotoMemberPage(){
        Taro.navigateTo({
            url:'/pages/zhenxuan/teammanage/memberinfor'
        })
    }
    
    render(){
        const {teamInfo,memberInfor,count} = this.state
        const {memberTotal,trainHotShot,orderCount,overEighty,overTwenty,saleAmount} = this.state.teamInfo
        console.log(teamInfo)
        let memberList = memberInfor.map(item =>{
            return <NewMember data={item} />
        })
        return(
            <View className='tm-container'>
                <View className='tm-container-top'>
                    <View className='tm-panel'>
                        <View className='tm-panel-ctt'>
                            <View className='tm-panel-ctt-1'>
                                <View className='tm-panel-ctt-1-box'>
                                    <View className='tm-panel-ctt-1-box-count'>{memberTotal}</View>
                                    <View className='tm-panel-ctt-1-box-word'>团队成员总数</View>
                                </View>
                                
                                <View className='tm-panel-ctt-1-box'>
                                    <View className='tm-panel-ctt-1-box-count'>{trainHotShot}</View>
                                    <View className='tm-panel-ctt-1-box-word'>累计孵化臻选大咖数</View>
                                </View>
                                <View className='tm-panel-ctt-1-box'>
                                    <View className='tm-panel-ctt-1-box-count'>{orderCount}</View>
                                    <View className='tm-panel-ctt-1-box-word'>总单数</View>
                                </View>
                            </View>
                            
                            <View className='tm-panel-ctt-1'>
                            <View className='tm-panel-ctt-1-box'>
                                    <View className='tm-panel-ctt-1-box-count'>{overEighty}</View>
                                    <View className='tm-panel-ctt-1-box-word'>商品佣金达80元人数</View>
                                </View>
                                
                                <View className='tm-panel-ctt-1-box'>
                                    <View className='tm-panel-ctt-1-box-count'>{overTwenty}</View>
                                    <View className='tm-panel-ctt-1-box-word'>商品佣金达20元人数</View>
                                </View>
                                <View className='tm-panel-ctt-1-box'>
                                    <View className='tm-panel-ctt-1-box-count'>{saleAmount}</View>
                                    <View className='tm-panel-ctt-1-box-word'>团队累计销售额</View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='tm-panel2'>
                        <View className='tm-panel2-infor' onClick={this.gotoInforPage.bind(this)}>
                            <Image src={TeamInfor} className='tm-panel2-infor-lefticon'/>
                            <View className='tm-panel2-infor-leftword'>团队信息</View>
                        </View>
                        <View className='tm-panel2-infor' onClick={this.gotoMemberPage.bind(this)}>
                            <Image src={MemberInfor} className='tm-panel2-infor-lefticon'/>
                            <View className='tm-panel2-infor-leftword'>团队成员</View>
                        </View>
                    </View>
                </View>
                <View className='tm-container-middle'>
                    <View className='tm-container-middle-word'>今日新加入成员</View>
                </View>
                {count?<View>{memberList}</View>:''}
                {count?'':<View className='empty-members'>
                    <Image src={EmptyIcon} style={{width:'25%',height:'100%',marginLeft:'auto',marginRight:'auto'}}/>
                    <View className='empty-word'>无新加入成员</View>
                </View>}
                
            </View>
        )
    }
}