import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './index.scss';
import allapi from '../../../../api'
export default class Datastatic1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            income:{},
            timeFrom:this.props.timeFrom,
            timeTo:this.props.timeTo
        }
    }
    //动态接收props值
    componentWillReceiveProps(){
        this.setState({
            timeFrom:this.props.timeFrom,
            timeTo:this.props.timeTo
        },()=>{
            // console.log('props改变：',this.state.timeFrom,this.state.timeTo)
            if(this.state.timeFrom && this.state.timeTo){
                allapi.detail.get_detail_income({
                    timeFrom:this.state.timeFrom+" 00:00:00",
                    timeTo:this.state.timeTo+" 23:59:59"
                })
                .then(res => {
                    this.setState({
                        income:res.value
                    })
    
                })
            }
        })
    }
    componentDidMount(){
        console.log('当前页面：',this.props.now)
        // let str = this.getTime();
        console.log('查询数据：',this.state.timeFrom,this.state.timeTo)
        // console.log('*********',str)
        let str = {}
        if(this.props.now == -2){
            allapi.detail.get_detail_income({
                timeFrom:this.state.timeFrom+" 00:00:00",
                timeTo:this.state.timeTo+" 23:59:59"
            })
            .then(res => {
                this.setState({
                    income:res.value
                })

            })
        }else{
            allapi.detail.get_detail_income({
                type:this.props.now
            })
            .then(res => {
                console.log(`个人数据统计${this.props.now}`,res.value)
                this.setState({
                    income:res.value
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        
    }
    render(){
        const {AllInCome,PXJTAll,PXJTDirect,PXJTIndirect,SPZJJAll,administrationCommission,directCommissionCount,indirectCommissionCount,overEighty,overEightyCount,overTwenty,overTwentyCount} = this.state.income
        return(
            <View style='background-color: #FFFFFF' className='pd-tabs-ctt' >
            <view className='pd-tabs-title'>总收入(元)</view>
            <View className='pd-tabs-count'>{AllInCome}</View>
            <View className='pd-tabs-ctt1'>
                <View className='pd-tabs-ctt1-top-ok'>
                    <View className='pd-tabs-ctt1-top-box'>
                        <View className='pd-tabs-ctt1-top-box-count'>{SPZJJAll}</View>
                        <View className='pd-tabs-ctt1-top-box-title'>商品佣金</View>
                    </View>
                    <View className='pd-tabs-ctt1-top-box'>
                        <View className='pd-tabs-ctt1-top-box-count'>{PXJTDirect}</View>
                        <View className='pd-tabs-ctt1-top-box-title'>直接培训总津贴</View>
                    </View>
                    <View className='pd-tabs-ctt1-top-box'>
                        <View className='pd-tabs-ctt1-top-box-count'>{directCommissionCount}</View>
                        <View className='pd-tabs-ctt1-top-box-title'>直接推荐人数</View>
                    </View>
                </View>
                
            </View>

            {/* <View className='pd-tabs-ctt2'>
                    
                    <View className='pd-tabs-ctt1-top-box'>
                        <View className='pd-tabs-ctt1-top-box-count'>{indirectCommissionCount}</View>
                        <View className='pd-tabs-ctt1-top-box-title'>间接推荐人数</View>
                    </View>
                    <View className='pd-tabs-ctt1-top-box'>
                        <View className='pd-tabs-ctt1-top-box-count'>{overTwentyCount}</View>
                        <View className='pd-tabs-ctt1-top-box-title'>新增佣金达20人数</View>
                    </View>
                    <View className='pd-tabs-ctt1-top-box'>
                        <View className='pd-tabs-ctt1-top-box-count'>{overEightyCount}</View>
                        <View className='pd-tabs-ctt1-top-box-title'>新增佣金达80人数</View>
                    </View>
            </View> */}
        </View>
        )
    }
}