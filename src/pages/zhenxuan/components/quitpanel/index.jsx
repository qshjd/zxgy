import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './index.scss';
export default class QuitPanel extends Component{
    constructor () {
        super(...arguments)
    }
    state={
        datas:this.props.datas
    }
    componentDidMount(){
        console.log('面板')
    }
    componentWillReceiveProps(){
        // console.log('当前页数',this.props.now)
        this.setState({
            datas:this.props.datas
        })
    }
    render(){
        let {receiverName,money,time} = this.state.datas
        return(
            <View className='ah-content-detail-line'>
                <View className='ah-content-detail-line-icon-t'>
                    <View className='ah-content-detail-line-icon-word' style={{color:'#ffffff'}}>退</View>
                </View>
                <View className='ah-content-detail-line-words'>
                    <View className='ah-content-detail-line-words-top'>
                        <View className='ah-content-detail-line-words-top-1'>订单退款</View>
                        <View className='ah-content-detail-line-words-top-2'>+{money}</View>
                    </View>
                    <View className='ah-content-detail-line-words-bot'>
                        <View className='ah-content-detail-line-words-bot-1'>来自{receiverName}的售后退款</View>
                        <View className='ah-content-detail-line-words-bot-1'>{time}</View>
                    </View>
                </View>
            </View>
        )
    }
}