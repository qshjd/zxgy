import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
import './index.scss';
export default class CashPanel extends Component{
    constructor () {
        super(...arguments)
    }
    state={
        datas:this.props.datas
    }
    componentDidMount(){
        console.log('面板**')
    }
    componentWillReceiveProps(){
        // console.log('当前页数',this.props.now)
        this.setState({
            datas:this.props.datas
        })
    }
    render(){
        let {status,money,time,weixin} = this.props.datas
        let zt = (status=='0')?'处理中':'已完成'
        return(
            <View className='ar-list'>
                <View className='ar-list-date'>
                    <View className='ar-list-date-sy'>{time}</View>
                </View>
                <View className='ar-list-detail'>
                    <View className='ar-list-detail-1'>
                        <View className='ar-list-detail-1-account'>微信账号-{weixin}</View>
                        <View className='ar-list-detail-1-count'>￥{money}</View>
                    </View>
                    <View className='ar-list-detail-2'>
                        <View className='ar-list-detail-2-state'>提现状态:<Text style='color:#F95561'>{zt}</Text></View>
                        {/* <View className='ar-list-detail-2-credentials'>凭证查看:<Text style='color:#F95561'>处理中</Text></View> */}
                    </View>
                </View>
            </View>
        )
    }
}