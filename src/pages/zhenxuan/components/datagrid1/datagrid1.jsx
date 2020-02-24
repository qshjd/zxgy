import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './datagrid1.scss';
export default class Datagrid1 extends Component{
    componentDidMount(){
        console.log(this.props.moneydata)
    }
    render(){
        const {SPZJJToday,PXZJTToday,GLJJToday,BLJJToday,SPZJJAll,PXZJTAll,GLJJAll,BLJJAll} = this.props.moneydata
        return(
            <View className='zx-box-top-details'>
                <View className='zx-box-top-details-1'>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{SPZJJToday?SPZJJToday:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>今日商品总佣金</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{PXZJTToday?PXZJTToday:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>今日培训总津贴</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{GLJJToday?GLJJToday:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>今日管理奖金</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{BLJJToday?BLJJToday:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>今日伯乐奖金</View>
                    </View>
                </View>
                <View className='zx-box-top-details-1'>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{SPZJJAll?SPZJJAll:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>累计商品总佣金</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{PXZJTAll?PXZJTAll:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>累计培训总津贴</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{GLJJAll?GLJJAll:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>累计管理奖金</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{BLJJAll?BLJJAll:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>累计伯乐奖金</View>
                    </View>
                </View>
            </View>
        )
    }
}