import Taro, { Component, Config } from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import './improved.scss';


import Daren from '../../imgs/zxdr.png'
import Daka from '../../imgs/zxdk.png'

export default class Improved extends Component{
    
    render(){
        return(
            <View>
            <View className='ir-top'>
                    <View className='ir-top-icons'>
                        <Image src={Daren} className='ir-top-icon1'/>
                        <Image src={Daka} className='ir-top-icon2'/>
                    </View>
                    <View className='ir-top-line'>
                        <View className='ir-top-line-circle1'></View>
                        <View className='ir-top-line-circle2'></View>
                    </View>
                    <View className='ir-top-ctt'>
                        <View className='ir-top-ctt-1'>
                            <View className='ir-top-ctt-name'>臻选达人</View>
                            <View className='ir-top-ctt-type'>上一级别</View>
                        </View>
                        <View className='ir-top-ctt-2'>
                            <View className='ir-top-ctt-name-1'>臻选大咖</View>
                            <View className='ir-top-ctt-type'>最高级别</View>
                        </View>
                    </View>
                    
                </View>
                
                <View className='ir-middle-word'>获得更高额收益</View>

                <View className='ir-bottom-ctt'>
                    <View className='ir-bottom-ctt-line'>
                        <View className='ir-bottom-ctt-line-title'>1、公司是否设置了更高额的收益？</View>
                        <View className='ir-bottom-ctt-line-ctt'>是，公司针对臻选大咖设置了月度、季度、年度分红、直接参与公司分红。</View>
                    </View>
                    <View className='ir-bottom-ctt-line-2'>
                        <View className='ir-bottom-ctt-line-title'>2、是否需要缴纳额外的费用？</View>
                        <View className='ir-bottom-ctt-line-ctt'>不需要。</View>
                    </View>
                    <View className='ir-bottom-ctt-line'>
                        <View className='ir-bottom-ctt-line-title'>3、如何获得分红的评定标准？</View>
                        <View className='ir-bottom-ctt-line-ctt'>针对优秀的臻选大咖，公司会依据团队贡献进行分红的评定。如：团队人数、团队销售额、团队增长情况等。</View>
                    </View>
                    <View className='ir-bottom-ctt-line'>
                        <View className='ir-bottom-ctt-line-title'>4、公司分红如何发放？</View>
                        <View className='ir-bottom-ctt-line-ctt'>针对优秀的臻选大咖，我们以评定结果，按月度、季度、年度等直接发放给优秀的臻选大咖</View>
                    </View>
                </View>
                </View>
        )
    }
}