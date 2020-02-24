import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image,Text} from '@tarojs/components';
import "./refunddetail.scss"
import { AtToast} from 'taro-ui'

import OrderState from '../../../imgs/order_state@2x.png'
import allapi from '../../../api';
import host from '../../../utils/host'
export default class RefundDetail extends Component{
    config: Config = {
        navigationBarTitleText: '售后详情',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state={
        refundDetail:{},
        chatInfor:[],
        firstImgs:[],
        firstTime:'',
        showToast:false,
        toastWord:'',
        clickOnce:true
    }
    componentDidMount(){
        allapi.user.get_claim_infor({
            claimId:this.$router.params.claimId,
        })
        .then(res => {
            // console.log(res.prop[0].image)
            this.setState({
                refundDetail:res.prop,
            })
        })
        //获取对话框
        allapi.user.get_claim_chat({
            claimId:this.$router.params.claimId,
            pageNo:'1',
            pageNum:'100'
        })
        .then(res => {
            console.log(res)
            this.setState({
                chatInfor:res.prop,
                firstImgs:res.prop[0].image,
                firstTime:res.prop[0].createTm
            })
        })
    }
    componentWillMount () {
        console.log('售后详情页:',this.$router.params) // 参数传递
        //获取售后信息
    }
    addNewCtt = () =>{
        if(this.state.refundDetail.claimStatus == '已处理'){
            this.setState({
                showToast:true,
                toastWord:'该订单已有处理结果，不能添加新凭证'
            })
        }else{
            Taro.navigateTo({
                url:`/pages/user/orders/addnewcredentials?claimId=${this.$router.params.claimId}&orderId=${this.$router.params.orderId}&level=${this.$router.params.level}`
            })
        }
    }
    finishClaim =()=>{
        if(this.state.refundDetail.claimStatus == '已处理'){
            if(this.state.clickOnce){
                this.setState({
                    clickOnce:false
                },()=>{
                    allapi.user.finish_claim({
                        claimId:this.$router.params.claimId
                    })
                    .then(res => {
                        if(res.isSuccess){
                            Taro.navigateTo({
                                url:`/pages/user/orders/orders?id=3&level=${this.$router.params.level}`
                            })
                        }else{
                            this.setState({
                                clickOnce : true,
                                showToast:true,
                                toastWord:'完结失败'
                            })
                        }
                    })
                })
                
            }else{
                this.setState({
                    showToast:true,
                    toastWord:'请勿重复提交'
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'售后暂无结果，不可完结'
            })
        }
    }
    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    render(){
        const {claimStatus,updateTm,productImage,productName,productArea,customerWish,refundDescription,refundReason,ctime} = this.state.refundDetail
        const chats = this.state.chatInfor.map(item => {
                return(
                    <View className='credentials'>
                    <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={1500} onClose={this.closeToast}></AtToast>
                        <View className='title2'>
                            <View className='word2'>{(item.typeCode == '1001')?'上传了理赔凭证':'回复'}</View>
                            <View className='time2'>{item.createTm}</View>
                        </View>
                        <View className='word3'>{item.text}</View>
                        {item.image!=''?<View className='pics'>
                            {
                                item.image.map(item => {
                                    return (
                                        <View className='pic'>
                                            <Image src={host.substring(0,host.length-1)+item}  style={{width:'100%',height:'100%'}}/>
                                        </View>
                                    )
                                })
                            }
                            
                        </View>:''}
                    </View>
                )
        })
        let hideBtn = false
        if(claimStatus == '已完结'){
            hideBtn = true
        }
        console.log(claimStatus)
        return(
            <View className='refund-box'>
                <View className='title'>
                    <View className='iaw'>
                        <Image src={OrderState} className='icon'/>
                        <View className='word'>{claimStatus}</View>
                    </View>
                    <View className='time'>
                        {updateTm}
                    </View>
                </View>
                <View className='line'></View>
                <View className='goods'>
                    <View className='box1'>
                        <View className='pic'><Image src={host.substring(0,host.length-1)+productImage} style={{width:'100%',height:'100%'}}/></View>
                        <View className='des'>{productName}
                            <Text className='orgin'>{productArea}</Text>
                        </View>
                    </View>
                </View>
                <View className='details'>
                    <View className='detail'>
                        <View className='key'>退款原因：</View>
                        <View className='value'>{refundReason}</View>
                    </View>
                    <View className='detail'>
                        <View className='key'>退款描述：</View>
                        <View className='value'>{refundDescription}</View>
                    </View>
                    <View className='detail'>
                        <View className='key'>客户意愿：</View>
                        <View className='value'>{customerWish}</View>
                    </View>
                    <View className='detail'>
                        <View className='key'>最新进展：</View>
                    </View>
                </View>
                <View className='dialog-chat'>{chats}</View>
                {hideBtn === true?'':<View className='bot-btn'>
                    <View className='left'>
                        <View className='btn-word' onClick={this.addNewCtt}>添加新凭证或内容</View>
                    </View>
                    <View className='right'>
                        <View className='btn-word' onClick={this.finishClaim}>售后完结</View>
                    </View>
                </View>}
            </View>
        )
    }
}