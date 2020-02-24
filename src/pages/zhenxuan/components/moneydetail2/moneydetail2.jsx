import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './moneydetail2.scss';
export default class Moneydetail extends Component{
    componentDidMount(){
        console.log(this.props.datas)
    }
    render(){
        const {source,type,money,typedetail,time} = this.props.datas
        return(
            <View className='ah-content-detail-line'>
                <View className='ah-content-detail-line-icon'>
                    <View className='ah-content-detail-line-icon-word'>{source}</View>
                </View>
                <View className='ah-content-detail-line-words'>
                    <View className='ah-content-detail-line-words-top'>
                        <View className='ah-content-detail-line-words-top-1'>{type}</View>
                        <View className='ah-content-detail-line-words-top-2'>{money}</View>
                    </View>
                    <View className='ah-content-detail-line-words-bot'>
                        <View className='ah-content-detail-line-words-bot-1'>{typedetail}</View>
                        <View className='ah-content-detail-line-words-bot-1'>{time}</View>
                    </View>
                </View>
            </View>
        )
    }
}