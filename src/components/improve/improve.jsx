import Taro, { Component, Config } from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import './improve.scss';

import Daren from '../../imgs/zxdr.png'
import Daka from '../../imgs/zxdk.png'

import allapi from '../../api'

export default class Improve extends Component{
    state={
        effectInviteCount:'',      //推荐达人佣金达20(个人)
        inviteCount:'',            //直接推荐达人数(个人)
        productCommission:'',      //个人商品佣金(个人)
        promotionCommission1:'',   //商品佣金1
        promotionCommission2:'',   //商品佣金2
        promotionDirect1:'',       //直接推荐1
        promotionDirect2:'',       //直接推荐2
        promotionEffective1:'',    //达20 1
        promotionEffective2:''     //达20 2
    }
    componentDidMount(){
        //获取进阶之路数据
        allapi.detail.improve_road()
        .then(res => {
            this.setState({
                effectInviteCount:res.effectInviteCount,      
                inviteCount:res.inviteCount,            
                productCommission:res.productCommission,      
                promotionCommission1:res.promotionCommission1,   
                promotionCommission2:res.promotionCommission2,  
                promotionDirect1:res.promotionDirect1,       
                promotionDirect2:res.promotionDirect2,       
                promotionEffective1:res.promotionEffective1,    
                promotionEffective2:res.promotionEffective2     
            })
        })
    }
    render(){
        const {effectInviteCount,inviteCount,productCommission,promotionCommission1,promotionCommission2,promotionDirect1,promotionDirect2,promotionEffective1,promotionEffective2} = this.state
        return(
            <View className='im-container'>
                <View className='im-top'>
                    <View className='im-top-icons'>
                        <Image src={Daren} className='im-top-icon1'/>
                        <Image src={Daka} className='im-top-icon2'/>
                    </View>
                    <View className='im-top-line'>
                        <View className='im-top-line-circle1'></View>
                        <View className='im-top-line-circle2'></View>
                    </View>
                    <View className='im-top-ctt'>
                        <View className='im-top-ctt-1'>
                            <View className='im-top-ctt-name-1'>臻选达人</View>
                            <View className='im-top-ctt-type'>当前级别</View>
                        </View>
                        <View className='im-top-ctt-2'>
                            <View className='im-top-ctt-name'>臻选大咖</View>
                            <View className='im-top-ctt-type'>下一级别</View>
                        </View>
                    </View>
                </View>
                <View className='im-middle-head'>
                    <View className='im-middle-head-1'>下一级别条件</View>
                    <View className='im-middle-head-2'>我的数据</View>
                </View>
                <View className='im-middle-data'>
                    <View className='im-middle-data-row'>
                        <View className='im-middle-data-row-datas'>
                            <View className='im-middle-data-row-datas-1'>
                                <View className='im-middle-data-row-datas-1-word'>直接推荐臻选达人数</View>
                            </View>
                            <View className='im-middle-data-row-datas-2'>≥{promotionDirect1}</View>
                            <View className='im-middle-data-row-datas-2'>≥{promotionDirect2}</View>
                            <View className='im-middle-data-row-datas-3'>{inviteCount}</View>
                        </View>
                    </View>
                    <View className='im-middle-data-row'>
                        <View className='im-middle-data-row-datas'>
                            <View className='im-middle-data-row-datas-1'>
                                <View className='im-middle-data-row-datas-1-word'>个人商品佣金金额</View>
                            </View>
                            <View className='im-middle-data-row-datas-2'>≥{promotionCommission1}</View>
                            <View className='im-middle-data-row-datas-2'>≥{promotionCommission2}</View>
                            <View className='im-middle-data-row-datas-3'>≥{productCommission}</View>
                        </View>
                    </View>
                    <View className='im-middle-data-row-0'>
                        <View className='im-middle-data-row-datas'>
                            <View className='im-middle-data-row-datas-1'>
                                <View className='im-middle-data-row-datas-1-word'>推荐达人佣金达20人数</View>
                            </View>
                            <View className='im-middle-data-row-datas-2'>≥{promotionEffective1}</View>
                            <View className='im-middle-data-row-datas-2'>≥{promotionEffective2}</View>
                            <View className='im-middle-data-row-datas-3'>{effectInviteCount}</View>
                        </View>
                    </View>
                </View>
                <View className='im-middle-line'></View>
                <View className='im-bottom-head'>臻选大咖权益</View>
                <View className='im-bottom'>
                    <View className='im-bottom-ctt-title'><span>享有四重收入：</span></View>
                    <View className='im-bottom-ctt-1'>
                        <View className='im-bottom-ctt-title'>商品佣金：<span>10-30%的商品佣金。</span></View>
                    </View>
                    <View className='im-bottom-ctt-2'>
                    <View className='im-bottom-ctt-title'>高额培训津贴：<span>直接推荐臻选达人获得高额培训津贴，团队成员推荐臻选达人同时获得培训津贴，新团队成员个人商品佣金达20和80，也会获得培训津贴。</span></View>
                    </View>
                    <View className='im-bottom-ctt-3'>
                        <View className='im-bottom-ctt-title'>管理奖金：<span>团队所有成员所得佣金的20%作为管理奖金，平台发放。</span></View>
                    </View>
                    <View className='im-bottom-ctt-3'>
                        <View className='im-bottom-ctt-title'>伯乐奖金：<span>团队中孵化出臻选大咖，将获得新臻选大咖管理奖金的20%的奖金，由平台奖励。</span></View>
                    </View>
                </View>
                
            </View>
        )
    }
}