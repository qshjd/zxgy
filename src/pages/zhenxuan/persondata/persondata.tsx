import Taro, { Component, Config } from '@tarojs/taro';
import {View,Picker} from '@tarojs/components';
import './persondata.scss';
import { AtTabs, AtTabsPane } from 'taro-ui'

import Datastatic1 from '../components/datastatistics1'
// import Datastatic2 from '../components/datastatistics2'

export default class PersonData extends Component{
    config: Config = {
        navigationBarTitleText: '个人数据统计'
    }
    constructor(props){
        super(props);
    }
    state={
        current: 0,
        dateSel1: '2019-04-22',
        dateSel2: '2019-12-01',
        queryData:{},
        queryNum:0
    }
    searchData(){
        this.setState({
            current:-1,
            queryNum:this.state.queryNum+1
        })
        
    }
    handleClick (value) {
        this.setState({
            current: value
        })
    }
    onDateChange1 = e => {
        this.setState({
            dateSel1: e.detail.value
        })
    }
    onDateChange2 = e => {
        this.setState({
            dateSel2: e.detail.value
        })
    }
    goToExplainPage(){
        Taro.navigateTo({
            url:'/pages/zhenxuan/persondata/dataexplain'
        })
    }
    render(){
        const tabList = [{ title: '今天' }, { title: '昨天' }, { title: '近一周' }, { title: '近一个月' }]
        const {dateSel1,dateSel2} = this.state
        return(
            <View className='pd-box'>
                <View className='pd-time-pick'>
                        <View className='pd-time-pick-ctt'>
                            <View className='pd-time-pick-ctt-title'>
                                时间
                            </View>
                            <View className='pd-time-pick-ctt-date'>
                                <View className='pd-time-pick-ctt-date-from'>
                                    <Picker mode='date' onChange={this.onDateChange1}>
                                        <View className='picker'>
                                            {this.state.dateSel1}
                                        </View>
                                    </Picker>
                                </View>
                                <View className='pd-time-pick-ctt-date-middle'>-</View>
                                <View className='pd-time-pick-ctt-date-to'>
                                    <Picker mode='date' onChange={this.onDateChange2}>
                                        <View className='picker'>
                                    {this.state.dateSel2}
                                        </View>
                                    </Picker>
                                </View>
                            </View>
                            <View className='pd-time-pick-ctt-btn'>
                                <View className='pd-time-pick-ctt-btn-word' onClick={this.searchData.bind(this)}>搜索</View>
                            </View>
                        </View>
                    </View>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)} className='pd-tabs' >
                    
                    <AtTabsPane current={this.state.current} index={0}>
                        <Datastatic1 now={0}/>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1}>
                        <Datastatic1 now={-1}/>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2}>
                        <Datastatic1 now={-7}/>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        <Datastatic1 now={-30}/>
                    </AtTabsPane>
                    
                </AtTabs>
                {this.state.current == -1?<Datastatic1 timeFrom={dateSel1} timeTo={dateSel2} now={-2}/>:''}
                <View className='prompts'>
                    <View className='title'>数据说明</View>
                    <View className='attention'>
                        <View className='key'>注意事项</View>
                        <View className='value'>以上数据为确认收货后的实际数据，不是预估。</View>
                    </View>
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
                    <View className='order-sale'>
                        <View className='key-1'>有效订单、有效销售额</View>
                        <View className='value-1'>正常配货、发货的订单为有效订单，发货前取消无效。有效销售额即有效订单对应的销售额。</View>
                    </View>
                </View>
                
            </View> 
        )
    }
}