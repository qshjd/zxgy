import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import './usertop.scss';

import allapi from '../../api'
export default class UserTop extends Component{
    render(){
        const {headImg,nickName} = this.props
        return(
            <View className='user-top'>
                    <View className='user-pic'>
                        <AtAvatar circle size='large' image={headImg} ></AtAvatar> 
                    </View>
                    <View className='user-name'>{nickName}</View>
            </View>
        )
    }
}