import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './datagrid2.scss';
export default class Datagrid1 extends Component{
    componentDidMount(){
        console.log(this.props.moneydata)
    }
    render(){
        const {SPZJJToday,PXZJTToday,SPZJJAll,PXZJTAll} = this.props.moneydata
        return(
            <View className='zx-box-top-details'>
                <View className='zx-box-top-details-1'>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{SPZJJToday?SPZJJToday:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>今日商品总佣金</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{PXZJTToday?PXZJTToday:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>今日直接培训津贴</View>
                    </View>
                </View>
                <View className='zx-box-top-details-1'>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{SPZJJAll?SPZJJAll:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>累计商品总佣金</View>
                    </View>
                    <View className='zx-box-top-details-1-ctt'>
                        <View className='zx-box-top-details-1-ctt-count'>{PXZJTAll?PXZJTAll:0}</View>
                        <View className='zx-box-top-details-1-ctt-word'>累计直接培训津贴</View>
                    </View>
                </View>
            </View>
        )
    }
}