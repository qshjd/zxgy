import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
import './applyrecord.scss';
//引入自定义组件
import BottomBtn from '../../../components/bottombtn/bottombtn';
export default class ApplyRecord extends Component{
    config: Config = {
        navigationBarTitleText: '提现管理'
    }
    constructor(props){
        super(props);
        
    }
    GetBack(){
        Taro.navigateTo({
            url:'/pages/zhenxuan/applycash/apply'
        })
    }
    render(){
        return(
            <View className='ar-boxx'>
                <View className='ar-lists'>
                    <View className='ar-list'>
                        <View className='ar-list-date'>
                            <View className='ar-list-date-sy'>2019-5-15 20:09:25</View>
                        </View>
                        <View className='ar-list-detail'>
                            <View className='ar-list-detail-1'>
                                <View className='ar-list-detail-1-account'>微信账号-13612595486</View>
                                <View className='ar-list-detail-1-count'>300.00</View>
                            </View>
                            <View className='ar-list-detail-2'>
                                <View className='ar-list-detail-2-state'>提现状态:<Text style='color:#F95561'>处理中</Text></View>
                                <View className='ar-list-detail-2-credentials'>凭证查看:<Text style='color:#F95561'>处理中</Text></View>
                            </View>
                        </View>
                    </View>
                    
                    <View className='ar-list'>
                        <View className='ar-list-date'>
                            <View className='ar-list-date-sy'>2019-5-15 20:09:25</View>
                        </View>
                        <View className='ar-list-detail'>
                            <View className='ar-list-detail-1'>
                                <View className='ar-list-detail-1-account'>微信账号-13612595486</View>
                                <View className='ar-list-detail-1-count'>300.00</View>
                            </View>
                            <View className='ar-list-detail-2'>
                                <View className='ar-list-detail-2-state'>提现状态:<Text style='color:#F95561'>处理中</Text></View>
                                <View className='ar-list-detail-2-credentials'>凭证查看:<Text style='color:#F95561'>处理中</Text></View>
                            </View>
                        </View>
                    </View>

                    <View className='ar-list'>
                        <View className='ar-list-date'>
                            <View className='ar-list-date-sy'>2019-5-15 20:09:25</View>
                        </View>
                        <View className='ar-list-detail'>
                            <View className='ar-list-detail-1'>
                                <View className='ar-list-detail-1-account'>微信账号-13612595486</View>
                                <View className='ar-list-detail-1-count'>300.00</View>
                            </View>
                            <View className='ar-list-detail-2'>
                                <View className='ar-list-detail-2-state'>提现状态:<Text style='color:#F95561'>处理中</Text></View>
                                <View className='ar-list-detail-2-credentials'>凭证查看:<Text style='color:#F95561'>处理中</Text></View>
                            </View>
                        </View>
                    </View>
                </View>

                
                <BottomBtn>
                    <View className='ar-btn-word' onClick={this.GetBack.bind(this)}>立即申请</View>
                </BottomBtn>
                
            </View>
        )
    }
}