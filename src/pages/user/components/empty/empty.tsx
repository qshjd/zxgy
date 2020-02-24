import Taro, { Component, Config } from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import './empty.scss';
import EmptyIcon from '../../../../imgs/empty_order@2x.png'
export default class Empty extends Component{
    constructor (props) {
        super(props)
    }
    componentDidMount(){
        // this.props.emtptyList(true)
    }
    render(){
        return(
            <View className='empty-box'>
                <Image src={EmptyIcon} className='empty-icon'/>
                <View className='empty-icon-word'>暂无新订单</View>
                {/* <View className='touch-area'></View> */}
            </View>
        )
    }
}