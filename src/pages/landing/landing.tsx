import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image} from '@tarojs/components';
import "./landing.scss"
import LandImg from '../../imgs/land_img.png'
export default class Landing extends Component{
    config: Config = {
        navigationBarTitleText: '臻选果园',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    constructor(){
        super(...arguments)
    }
    render(){
        return(
            <View className='land-page'>
                <Image src={LandImg} className='land-img'/>
            </View>
        )
    }
}