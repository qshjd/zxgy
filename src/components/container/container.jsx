import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './container.scss';
export default class Container extends Component{
    render(){
        return(
            <View className='general-box' style={this.props.specialStyle}>
                {this.props.children}
            </View>
        )
    }
}