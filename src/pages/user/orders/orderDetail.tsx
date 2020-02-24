import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image} from '@tarojs/components';
import "./orderDetail.scss"

import allapi from '../../../api'
import host from '../../../utils/host'
export default class OrderDetail extends Component{
    config: Config = {
        navigationBarTitleText: '订单详情',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    constructor () {
        super(...arguments)
    }
    componentDidMount(){
        allapi.user.look_order_detail({
            order:this.$router.params.orderId
        })
        .then(res => {
            this.setState({
                value:res.result
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    state={
        value:{},
        btnWords:['收货地址','商品信息','佣金信息','订单信息']
    }
    render(){
        const {status,receiverName,receiverTel,img,receiverAddress,productName,productAreas,marketPrice,ship,spyj,OrderTotal,payCost,dxzxs,gljj,sstz,bljj,bltz,wexinOrderId,time} = this.state.value
        
        let statusWords='';
        switch(status){
            case '2':
                statusWords = '已提交';
                break;
            case '5':
                statusWords = '已配货（不可更改地址、取消订单）';
                break;
            case '7':
                statusWords = '已发货';
                break;
            case '11':
                statusWords = '已完成';
                break;
        }
        return(
            <View className='order-detail-box'>
                <View className='head-box'>
                    <View className='order-status'>{statusWords}</View>
                </View>
                <View className='label-box'>
                    <View className='words'>收货地址</View>
                </View>
                <View className='ctt-box'>
                    <View className='line'>
                        <View className='name'>{receiverName}</View>
                        <View className='tel'>{receiverTel}</View>
                    </View>
                    <View className='line'>
                        <View className='addr'>{receiverAddress}</View>
                    </View>
                </View>
                <View className='label-box'>
                    <View className='words'>商品信息</View>
                </View>
                <View className='ctt-box'>
                    <View className='top'>
                        <View className='orderpanel-top-2-pic'><Image src={host+img} style={{width:'100%',height:'100%'}}/></View>
                            <View className='orderpanel-top-2-infor'>
                                <View className='orderpanel-top-2-infor-name'>{productName}</View>
                                <View className='orderpanel-top-2-infor-orgin'>
                                    <View className='orderpanel-top-2-infor-orgin-word'>产地：{productAreas}</View>
                                </View>
                                
                            </View>
                            
                            <View className='orderpanel-top-2-price'>￥{marketPrice}</View>
                        </View>
                    <View className='mid'>
                        <View className='line2'>
                            <View>运费</View>
                            <View>￥{ship}</View>
                        </View>
                        <View className='line2'>
                            <View>商品佣金</View>
                            <View>￥{spyj}</View>
                        </View>
                        <View className='line2'>
                            <View>订单总价</View>
                            <View>￥{OrderTotal}</View>
                        </View>
                    </View>
                    <View className='bot'>
                        <View>臻选师实付金额</View>
                        <View style={{color:'#FB3F4C'}}>￥{payCost}</View>
                    </View>
                </View>
                <View className='label-box'>
                    <View className='words'>佣金信息</View>
                </View>
                <View className='ctt-box'>
                    <View className='line3'>下列奖金计算未包含退款情况下的扣除</View>
                    <View className='line3'>
                        <View>商品佣金：￥{spyj}</View>
                        <View>下单臻选师：{dxzxs}</View>
                    </View>
                    <View className='line3'>
                        <View>管理奖金：￥{gljj}</View>
                        <View>所属团长：{sstz}</View>
                    </View>
                    <View className='line3'>
                        <View>伯乐奖金：￥{bljj}</View>
                        <View>伯乐团长：{bltz}</View>
                    </View>
                </View>
                <View className='label-box'>
                    <View className='words'>订单信息</View>
                </View>
                <View className='ctt-box '>
                    <View className='line4'>
                        <View>订单编号：{wexinOrderId}</View>
                        <View>提交时间：{time}</View>
                    </View>
                </View>
                <View className='box-bot'></View>
            </View>
        )
    }
}