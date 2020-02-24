import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
import './index.scss';

import allapi from '../../api'

export default class LenovoSelector extends Component{
    state={
        radioId:this.props.id,
    }
    // componentWillReceiveProps(){
    //     console.log(this.props.id)
    //     this.setState({
    //         radioId:this.props.id
    //     })
    // }
    selectLenovo (index,item){
        console.log('选择：',index)
        this.setState({
            radioId:index
        },()=>{
            this.props.select(index,item)
        })
    }
    render(){
        const lists = this.props.datas.map((item,index) =>{
            return(
                <View className='user-box'>
                    <View className='left'>
                        <View className='top'>
                            <View style="width:60px">{item.receiverName}</View>
                            <Text>{item.receiverTel}</Text>
                        </View>
                        <View className='bot'>
                            <Text>{item.receiverProvinceCh+item.receiverCityCh+item.receiverDistrictCh+item.receiverDetailAddress}</Text>
                        </View>
                    </View>
                    <View className='right' onClick={this.selectLenovo.bind(this,index,item)}>
                        <View className={'check-circle' + (this.state.radioId == index ? " active" :"")}>√</View>
                    </View>
                </View>
            )
        })
        return(
            <View className='lenovo-box'>
            {lists}
            </View>
        )
    }
}