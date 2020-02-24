import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Image} from '@tarojs/components';
import './index.scss';

import host from '../../../../utils/host'
// import HomeImg from '../../../../imgs/hoem_test.png'

export default class GoodsList2 extends Component{
    componentDidMount(){
        const datas = this.props.goodsdata;
    }
    gotoDetailPage(){
        Taro.navigateTo({
            url:`/pages/index/goodsdetail?id=${this.props.goodsdata.id}`
        })
    }
    orderEntryPage = () =>{
        Taro.navigateTo({
            url:`/pages/index/orderentry?id=${this.props.goodsdata.id}`
        })
    }
    render(){
        const {id,productName,productDescribe,price,marketPrice,inventory,commission,imgHomepage} = this.props.goodsdata
        const datas = this.props.goodsdata;
        return(
            <View className='home-goods' >
                    <View className='goods-cover' onClick={this.gotoDetailPage.bind(this)} onClick={this.gotoDetailPage.bind(this)}>
                        <Image src={host+imgHomepage} style={{width:'100%',height:'100%'}}></Image>
                    </View>
                    <View className='goods-infor'> 
                        <View className='goods-name-sp'>{productName}</View>
                        <View className='infor-box'>
                            <View className='left'>
                                <View className='goods-des'>{productDescribe}</View>
                                <View className='prices'>
                                    <View className='circle' style="background:#8fb82b">售</View>
                                    <View className='price'>￥{marketPrice}</View>
                                    <View className='circle' style="background:#fee310">臻</View>
                                    <View className='price' style="color:#cd1b00">￥{price}</View>
                                </View>
                            </View>
                            <View className='right' >
                                <View className='order-entry'>订单录入</View>
                            </View>
                            
                        </View>
                        <View className='hot-spots' onClick={this.orderEntryPage}></View>
                    </View>
                </View>
        )
    }
}