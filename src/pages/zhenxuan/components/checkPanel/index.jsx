import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
// import './index.scss';

export default class CheckPanel extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // console.log(this.props.data)
    }
    
    render(){
        const {joinTime,inviter,nickName,tel} = this.props.data
        return(
            <View className='ar-list'>
                    <View className='list-box'>
                        <View className='date'>提交时间：<Text className='not_impt'>{joinTime}</Text></View>
                        <View className='status'>状态：<Text className='not_impt'>审核中</Text></View>
                    </View>
                    <View className='list-box'>
                        <View className='agent'>推荐人：<Text className='impt' style={{color:'#FB3F4C'}}>{inviter}</Text></View>
                    </View>
                    <View className='list-box'>
                        <View className='date'>昵称：<Text className='not_impt'>{nickName}</Text></View>
                        <View className='status'>手机号：<Text className='impt'>{tel}</Text></View>
                    </View>
            </View>
        )
    }
}