import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './shortbtn.scss';

export default class ShortBtn extends Component{
    
    render(){
        return(
            <View className='short-btn'>
                <View className='short-btn-word'>
                    {this.props.children}
                </View>
            </View>
        )
    }
}