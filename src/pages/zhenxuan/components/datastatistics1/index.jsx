import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './index.scss';
import allapi from '../../../../api'
// import Loading from '../../../../components/loadingPic'
export default class Datastatic1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            income:{},
            timeFrom:this.props.timeFrom,
            timeTo:this.props.timeTo,
            // initialize:false      //数据初始化
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
                        income:res.value,
                        // initialize:true
                    })
                })
            }
        })
    }
    componentDidMount(){
        console.log('当前页面：',this.props.now)
        console.log('查询数据：',this.state.timeFrom,this.state.timeTo)
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
                    income:res.value,
                    // initialize:true
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        
    }
    render(){
        const {SPZJJAll,administrationCommission,BOLECommission,salecount,saleAmount} = this.state.income
        return(
            <View className='pd-tabs-ctt' >
                {/* {this.state.initialize?'':<Loading>正在加载</Loading>} */}
                <View className='title'>所选时间区间统计结果</View>
                <View className='datas'>
                    <View className='data'>
                        <View className='money'>￥{SPZJJAll}</View>
                        <View className='describe'>商品佣金</View>
                    </View>
                    <View className='data'>
                        <View className='money'>￥{administrationCommission}</View>
                        <View className='describe'>管理奖金</View>
                    </View>
                    <View className='data'>
                        <View className='money'>￥{BOLECommission}</View>
                        <View className='describe'>伯乐奖金</View>
                    </View>
                </View>
                <View className='datas'>
                    <View className='data'>
                        <View className='money'>{salecount}</View>
                        <View className='describe'>有效订单数</View>
                    </View>
                    <View className='data'>
                        <View className='money'>￥{saleAmount}</View>
                        <View className='describe'>销售额</View>
                    </View>
                    <View className='data'>
                        {/* <View className='money'>20</View>
                        <View className='describe'>推荐人数</View> */}
                    </View>
                </View>
            </View>
        )
    }
}