import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Image} from '@tarojs/components';
import './orderpanel.scss';
import { AtToast} from "taro-ui"
// import { AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast} from "taro-ui"

import Addr from '../../../../imgs/order_addr@2x.png'
import host from '../../../../utils/host'
import allapi from '../../../../api';

export default class Orderpanel extends Component{
    constructor () {
        super(...arguments)
    }
    state={
        showToast:false,
        toastWord:'',
        
    }
    componentDidMount(){
    }
    claimPage = ()=>{
        console.log('claim')
    }
    
    gotoOrderDetailPage =(e) =>{
        Taro.navigateTo({
            url:`/pages/user/orders/orderDetail?orderId=${this.props.orderdatas.orderId}`
        })
    }
    gotoModifyPage=() =>{
        event.stopPropagation();   //阻止事件冒泡
        Taro.navigateTo({
            url:`/pages/user/orders/modifyaddr?orderId=${this.props.orderdatas.orderId}&productId=${this.props.orderdatas.productId}`
        })
    }
    gotoWuliuPage= () =>{
        event.stopPropagation();
        Taro.navigateTo({
            url:`/pages/user/orders/checklogistics?orderId=${this.props.orderdatas.orderId}`
        })
    }
    gotoRefundPage =() =>{
        event.stopPropagation();
        allapi.user.is_cliam_twice({
            orderId:this.props.orderdatas.orderId.toString()
        })
        .then(res => {
            if(res.prop){
                Taro.navigateTo({
                    url:'/pages/user/orders/logistics?orderId='+this.props.orderdatas.orderId+'&productName='+this.props.orderdatas.productName+'&imgOne='+this.props.orderdatas.imgOne
                })
            }else{
                this.props.showTips(true)
            }
        })
    }
    gotoRefundDetailPage = () =>{
        Taro.navigateTo({
            url:`/pages/user/orders/refunddetail?claimId=${this.props.orderdatas.claimId}&orderId=${this.props.orderdatas.orderId}&level=${this.props.levelCode}`
        })
    }
    //申请取消订单
    applyCancel =()=>{
        this.props.cancel(parseInt(this.props.orderdatas.orderId),true)
    }
    //确认收货
    comfirmGet=()=>{
        this.props.confirm(parseInt(this.props.orderdatas.orderId),true)
    }
    changeModel4(){
        this.setState({
            openDiago4:false
        })
        Taro.navigateTo({
            url:'/pages/user/orders/orders?id=1'
        })
    }
    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    render(){
        const {orderStatusCode,claimsStatus,agentName,imgOne,createTm,productName,productAreas,marketPrice,shipCost,receiverName,receiverTel,receiverAddress}=this.props.orderdatas;
        let progressWord=''
        if(claimsStatus == '1'){
            progressWord='待处理'
        }else if(claimsStatus == '2'||claimsStatus =='4'){
            progressWord='处理中'
        }else if(claimsStatus == '3'){
            progressWord='已完成'
        }
        let pos = receiverAddress.lastIndexOf('-')
        let addr = receiverAddress.substring(0,pos)
        return(
            <View className='orderpanel-box' >
            <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={1500} onClose={this.closeToast}></AtToast>
                <View className='orderpanel-top' onClick={(claimsStatus!='' && orderStatusCode == null)?this.claimPage:this.gotoOrderDetailPage}>
                    <View className='orderpanel-top-1'>
                        <View className='orderpanel-top-1-people'>提交人：{agentName}</View>
                        <View className='orderpanel-top-1-time'>{createTm}</View>
                    </View>
                    <View className='orderpanel-top-2'>
                        <View className='orderpanel-top-2-pic'><Image src={host+imgOne} style={{width:'100%',height:'100%'}}/></View>
                        <View className='orderpanel-top-2-infor'>
                            <View className='orderpanel-top-2-infor-name'>{productName}</View>
                            <View className='orderpanel-top-2-infor-orgin'>
                                <View className='orderpanel-top-2-infor-orgin-word'>产地：{productAreas}</View>
                            </View>
                            
                        </View>
                        
                        <View className='orderpanel-top-2-price'>￥{marketPrice}</View>
                    </View>
                    <View className='orderpanel-top-3'>
                        <View className='orderpanel-top-3-pos'>邮费:￥{shipCost}  总金额:<Text className='orderpanel-top-3-total'>￥{marketPrice+shipCost}</Text></View>
                    </View>
                </View>
                
                <View className='orderpanel-bottom' style={{height:(orderStatusCode == 11 || this.props.isDaka == false)?'80px':''}} >
                    <View className='orderpanel-bottom-1'>
                        <Image className='orderpanel-bottom-1-left' src={Addr}/>
                        <View className='orderpanel-bottom-1-right'>
                            <View className='orderpanel-bottom-1-right-infor'>
                                <View className='orderpanel-bottom-1-right-infor-name'>{receiverName}</View>
                                <View className='orderpanel-bottom-1-right-infor-name'>{receiverTel}</View>
                            </View>
                            <View className='orderpanel-bottom-1-right-addr'>{addr}*****</View>
                        </View>
                    </View>
                    {(orderStatusCode==2 && this.props.isDaka == true)?<View className='orderpanel-bottom-2' >
                        <View className='orderpanel-bottom-2-btn'>
                            <View className='orderpanel-bottom-2-btn-word' onClick={this.gotoModifyPage}>修改地址</View>
                        </View>
                        <View className='orderpanel-bottom-2-btn2'>
                            <View className='orderpanel-bottom-2-btn-word2' onClick={this.applyCancel}>申请取消</View>
                        </View>
                    </View>:''}
                    {(orderStatusCode==5 && this.props.isDaka == true)?<View className='orderpanel-bottom-2'>
                        <View className='orderpanel-bottom-2-btn' style={{backgroundColor:'#999999'}}>
                            <View className='orderpanel-bottom-2-btn-word' >已配货，不可修改地址、取消订单</View>
                        </View>
                    </View>:''}
                    <View className='orderpanel-bottom-2' style={{display: (orderStatusCode == 7 && this.props.isDaka == true) ? "" : "none"}}>
                        <View className='orderpanel-bottom-2-btn'>
                            <View className='orderpanel-bottom-2-btn-word' onClick={this.gotoWuliuPage}>查看物流</View>
                        </View>
                        
                        <View className='orderpanel-bottom-2-btn2'>
                            <View className='orderpanel-bottom-2-btn-word2' onClick={this.gotoRefundPage}>申请售后</View>
                        </View>
                        <View className='orderpanel-bottom-2-btn'>
                            <View className='orderpanel-bottom-2-btn-word' onClick={this.comfirmGet}>确认收货</View>
                            
                        </View>
                        
                    </View>
                    <View className='orderpanel-bottom-2' style={{display: (claimsStatus!='' && this.props.isDaka == true && orderStatusCode == null)? "" : "none"}}>
                        <View className='orderpanel-bottom-2-btn'>
                            <View className='orderpanel-bottom-2-btn-word' onClick={this.gotoRefundDetailPage}>查看详情</View> 
                        </View>
                        <View className="orderpanel-bottom-2-red">{progressWord}</View>
                    </View>
                </View>
                
            </View>
        )
    }
}