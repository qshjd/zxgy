import Taro, { Component, Config } from '@tarojs/taro';
import {View,Button,Text} from '@tarojs/components';
import './dataexplain.scss';
//import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
export default class Teammanage extends Component{
    config: Config = {
        navigationBarTitleText: '数据指标说明'
    }
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <View className='de-box'>
                <View className='de-box-ctt'>
                    <View className='de-box-ctt-words1'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-title'>商品佣金:</View>
                            <View className='de-box-ctt-words-des'><Text style='opacity: 0.8'>商品卖出后的佣金提成，10%-30%。</Text></View>
                        </View>
                    </View>

                    <View className='de-box-ctt-words2'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>培训总津贴:</Text><Text style='opacity: 0.8'>培训总津贴=直接推荐培训津贴+间接推荐培训津贴+成员佣金达20津贴+成员佣金达80津贴</Text></View>
                        </View> 
                    </View>
                    
                    <View className='de-box-ctt-words2'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>直接推荐培训津贴:</Text><Text style='opacity: 0.8'>所有臻选师直接推荐一个人加入团队所获得的培训津贴。</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words2'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>间接推荐培训津贴:</Text><Text style='opacity: 0.8'>臻选大咖团队成员推荐一个人加入团队所获得的培训津贴。(限臻选大咖及以上级别享有)</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words3'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>成员佣金达20津贴:</Text><Text style='opacity: 0.8'>臻选大咖团队成员累计达到20元佣金给与臻选大咖的培训津贴。(限臻选大咖及以上级别享有)</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words3'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>成员佣金达80津贴:</Text><Text style='opacity: 0.8'>臻选大咖团队成员累计达到80元佣金给与臻选大咖的培训津贴。(限臻选大咖及以上级别享有)</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words3'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>管理奖金:</Text><Text style='opacity: 0.8'>臻选大咖享有的额外奖金，计算方法为团队成员商品佣金(含自己)的20%，此奖金为平台发放。(限臻选大咖及以上级别享有)</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words3'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>伯乐奖金:</Text><Text style='opacity: 0.8'>原臻选大咖团队所孵化的新臻选大咖的管理津贴的20%为伯乐奖，此奖金为平台发放，不从新臻选大咖管理津贴中扣除。(限臻选大咖及以上级别享有)</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words1'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>直接推荐人数:</Text><Text style='opacity: 0.8'>臻选大咖自己直接推荐的达人数。</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words1'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>间接推荐人数:</Text><Text style='opacity: 0.8'>臻选大咖团队成员推荐的达人数。</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words2'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>新增佣金达20人数:</Text><Text style='opacity: 0.8'>臻选大咖团队成员累计达到20元佣金的人数。</Text></View>
                        </View> 
                    </View>

                    <View className='de-box-ctt-words2'>
                        <View className='de-box-ctt-words-1'>
                            <View className='de-box-ctt-words-ce'></View>
                        </View>
                        <View className='de-box-ctt-words-2'>
                            <View className='de-box-ctt-words-des'><Text className='de-box-ctt-words-title'>新增佣金达80人数:</Text><Text style='opacity: 0.8'>臻选大咖团队成员累计达到80元佣金的人数。</Text></View>
                        </View> 
                    </View>
                </View>
            </View>
        )
    }
}