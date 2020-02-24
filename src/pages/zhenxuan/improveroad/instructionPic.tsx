import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image} from '@tarojs/components';
import "./instructionPic.scss"
import Promotion from '../../../imgs/promotion.png'
export default class Promote extends Component{
    config: Config = {
        navigationBarTitleText: '晋级说明',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    constructor(){
        super(...arguments)
    }
    render(){
        return(
            <View className='land-page'>
                <Image src={Promotion} className='land-img'/>
            </View>
        )
    }
}