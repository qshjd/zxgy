import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './bottombtn2.scss';

export default class BottomBtn2 extends Component{
    
    render(){
        return(
            <View className='bottom-btn2'>
                <View className='bottom-btn-word'>
                    {this.props.children}
                </View>
            </View>
        )
    }
}