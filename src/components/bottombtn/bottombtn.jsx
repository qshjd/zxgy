import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './bottombtn.scss';

export default class BottomBtn extends Component{
    
    render(){
        return(
            <View className='bottom-btn' style={this.props.specialStyle}>
                <View className='bottom-btn-word'>
                    {this.props.children}
                </View>
            </View>
        )
    }
}