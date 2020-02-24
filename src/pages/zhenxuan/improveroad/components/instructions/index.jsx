import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';

import './index.scss'
export default class Instructions extends Component{
    render(){
        return(
            <View className='prompts-box'>
                    {this.props.level == '1002'?<View className='title2'>当前享有</View>
                    :<View className='title-box'>
                        <View className='title'>臻选大咖收益</View>
                    </View>
                    }
                    <View className='goods-commission'>
                        <View className='key' style="background:#FEE201">商品佣金</View>
                        <View className='value'>个人零售每单产品的佣金（所有人相同）</View>
                    </View>
                    <View className='manage-bonus'>
                        <View className='key' style="background:#FEE201">
                            <View className='name'>管理奖金</View>
                            <View className='type'>臻选大咖享有</View>
                        </View>
                        <View className='value'>
                            <View className='value1'>团队成员所有订单商品佣金的20%。</View>
                            <View className='value2'>假如你现在团队100人，每人每天商品佣金50元，那么你每月躺赚：100*50*30*20%=30,000元。(平台奖励)</View>
                        </View>
                    </View>
                    <View className='manage-bonus'>
                        <View className='key' style="background:#FEE201">
                            <View className='name'>伯乐奖金</View>
                            <View className='type'>臻选大咖享有</View>
                        </View>
                        <View className='value'>
                            <View className='value1'>孵化出的团队成员订单商品佣金的4%。</View>
                            <View className='value2'>假如你孵化出了20个大咖，每个大咖团队一个月所有成员累计商品佣金为20,000，那么你每月躺赚：20*20000*4% = 16,000元。（平台奖励）</View>
                        </View>
                    </View>
                </View>
        )
    }
}