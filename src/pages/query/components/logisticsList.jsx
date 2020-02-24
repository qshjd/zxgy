import Taro, { Component } from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'
import IconIn from '../../../imgs/navi_jinru@2x.png';
export default class LogisticsList extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            scrollTop:0,
            loadMore:true
        }
    }
    togoDetailPage = ()=>{
        Taro.navigateTo({
            url:`/pages/user/orders/checklogistics?orderId=${this.props.datas.orderId}`
        })
    }
    render() {
        const {createTime,receverName,receverTel,productName} = this.props.datas
        return(
            <View className='query-list' onClick={this.togoDetailPage}>
                <View className='query-list-left'>
                    <View className='query-list-time'>下单时间：{createTime}</View>
                    <View className='query-list-infor'>
                        <View className='query-list-name'>{receverName}</View>
                        <View className='query-list-phone'>{receverTel}</View>
                    </View>
                    <View className='query-list-goodinfor'>{productName}</View>
                </View>
                <Image className='query-list-icon' src={IconIn}/>
            </View>
        )
    }
}