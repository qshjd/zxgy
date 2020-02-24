import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';
import './index.scss'
import Instructions from './components/instructions'
import IconEnter from '../../../imgs/navi_jinru@2x.png'
import allapi from '../../../api'

export default class Improve extends Component{
    config: Config = {
        navigationBarTitleText: '晋级考核',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state = {
        joinTime:'',
        SimonTm:'',
        conditionAll:'',        //达标条件（推荐成员）
        conditionSelf:'',       //达标条件（个人考核）
        countAll:'',            //成员实际
        countSelf:'',            //个人实际
        monthAgo:'',
        now:''
    }
    componentDidMount(){
        // console.log('***',this.$router.params.level)
        allapi.detail.improve_road_new()
        .then(res => {
            console.log(res)
            let date1 = new Date(res.result.joinTime)
            let date2 = new Date(res.result.joinTime)
            if(res.result.monthAgo != '' && res.result.now!= ''){
                let date3 = new Date(res.result.monthAgo)
                let date4 = new Date(res.result.now)
                this.setState({
                    monthAgo:this.dataparse(date3),
                    now:this.dataparse(date4),
                })
            }
            
            if(res.result.SimonTm != null){
                date2 = new Date(res.result.SimonTm)
            }
            this.setState({
                joinTime:this.dataparse(date1),
                SimonTm:this.dataparse(date2)
            },()=>{
                console.log(this.state.joinTime,this.state.SimonTm)
            })
            //达人
            this.setState({
                conditionAll:res.result.conditionAll,
                conditionSelf:res.result.conditionSelf,
                countAll:res.result.countAll,
                countSelf:res.result.countSelf,
                
            })
        })
    }
    //日期转换
    dataparse = (date) => {
        return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'
    }
    enterDetailPage = () => {
        Taro.navigateTo({
            url:`/pages/zhenxuan/improveroad/teamdetails?conditionAll=${this.state.conditionAll}&countAll=${this.state.countAll}`
        })
    }
    //跳转到晋级说明页
    enterPromotePage = () => {
        Taro.navigateTo({
            url:`/pages/zhenxuan/improveroad/instructionPic`
        })
    }
    render(){
        const {joinTime,SimonTm,conditionAll,conditionSelf,countAll,countSelf,monthAgo,now} = this.state
        return(
            <View className='load-box'>
                <View className='top'>
                    <View className='level-box'>
                        <View className='ctt'>
                            {this.$router.params.level == '1001'?
                            <View className='dk'>
                                <View className='title'>臻选大咖</View>
                                <View className='des'>当前级别已是最高级别</View>
                                <View className='circle-box'>
                                    <View className='circle'></View>
                                </View>
                            </View>:
                            <View className='dr'>
                                <View className='line'>
                                    <View className='type'>臻选达人</View>
                                    <View className='type' style='opacity:0.3'>臻选大咖</View>
                                </View>
                                <View className='line two'>
                                    <View className='des'>当前级别</View>
                                    <View className='des'>下一级别</View>
                                </View>
                                <View className='three'>
                                    <View className='circle-dk'></View>
                                    <View className='circle-dr'></View>
                                </View>
                            </View>}
                        </View>
                    </View>
                    <View className='times'>
                        <View className='time1'>
                            <View style='color:#777777'>我加入的时间</View>
                            <View style='color:#333333'>{joinTime}</View>
                        </View>
                        {this.$router.params.level == '1001'?<View className='time2'>
                            <View style='color:#777777'>我的晋级时间</View>
                            <View style='color:#333333'>{SimonTm}</View>
                        </View>:
                        <View className='time3'>
                            <View style='color:#777777'>当前晋级考核区间</View>
                            <View style='color:#333333'>从{monthAgo}</View>
                            <View style='color:#333333'>至{now}</View>
                        </View>}
                    </View>
                    <View className='trangle-box'>
                        <View className="trangle"></View>
                    </View>
                </View>
                <View className='middle'>
                    
                    {this.$router.params.level == '1001'?<Instructions level={this.$router.params.level}/>:
                    <View className='promotion-check'>
                        <View className='title'>晋级考核</View>
                        <View className='instructions' onClick={this.enterPromotePage}>查看晋级说明</View>
                        <View className='description'>下列同时达标后将于次日凌晨自动考核晋级</View>
                        <View className='panel'>
                            <View className='left'>
                                <View className='title'>个人有效单量</View>
                                <View className='des'>考核区间内我的有效单量</View>
                                <View className='number'>{countSelf}</View>
                                <View className='des target'>达标单量</View>
                                <View className='mark-number'>{conditionSelf}</View>
                                <View className={'btn' +(countAll >= conditionAll ? " qualified":" unqualified")}>{countAll >= conditionAll ?'达标':'未达标'}</View>
                            </View>
                            <View className='right'>
                                <View className='title'>推荐成员有效单量</View>
                                <View className='des'>考核区间内推荐成员的有效单量</View>
                                <View className='number'>
                                    <View>{countAll}</View>
                                    <View className='detail' onClick={this.enterDetailPage}>
                                        <View >详情</View>
                                        <Image src={IconEnter} className='icon'/>
                                    </View>
                                </View>
                                <View className='des target'>达标单量</View>
                                <View className='mark-number'>{conditionAll}</View>
                                <View className={'btn' +(countAll >= conditionAll ? " qualified":" unqualified")}>{countAll >= conditionAll ?'达标':'未达标'}</View>
                            </View>
                        </View>
                    </View>
                    }
                </View>
                {this.$router.params.level == '1001'?<View className='improve-earnings'>
                    <Text className='title'>如何提高收益</Text>
                    <View className='ctt-box'>
                        <View className='paragraph'>
                            <Text style='color:#333333'>1、增加团队人数：</Text>
                            <Text>臻选大咖除了个人零售的商品佣金外，主要收益来源于管理奖金、伯乐奖金。尽量多的团队人数将有助于收益的提高。</Text>
                        </View>
                        <View className='paragraph'>
                            <Text style='color:#333333'>2、有效的管理团队：</Text>
                            <Text>指导团队成员更加高效的零售，是提高管理奖金的重中之重。</Text>
                        </View>
                        <View className='paragraph'>
                            <Text style='color:#333333'>3、鼓励团队成员晋级：</Text>
                            <Text>团队成员晋级是带动团队增量的重点。团队成员晋级后，大咖将获得由平台奖励的伯乐奖金。</Text>
                        </View>
                    </View>
                </View>:
                <View className='bottom'><Instructions level={this.$router.params.level}/></View>
                }
            </View>
        )
    }
}