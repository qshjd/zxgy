import Taro, { Component, Config } from '@tarojs/taro'
import {View} from '@tarojs/components';
import "./index.scss"

export default class LabelBtn extends Component{
    constructor () {
        super(...arguments)
    }
    render(){
        return(
            <View className='label-btn'>
                <View className='words'>{this.props.children}</View>
            </View>
        )
    }
}