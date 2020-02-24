import Taro, { Component, Config } from '@tarojs/taro'
import {View,Input} from '@tarojs/components';
import "./modifyaddr.scss"
import { AtToast } from 'taro-ui'
import Container from '../../../components/container/container'
import BottomBtn3 from '../../../components/bottombtn3/bottombtn'
import AreaSelector from '../../../components/AreaSelector'

import allapi from '../../../api'
import checkMethod from '../../../utils/regular'
let clickOnce = true
export default class Scroll extends Component{
    config: Config = {
        navigationBarTitleText: '改地址',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    constructor () {
        super(...arguments)
    }
    state={
        oldInfor:{},
        isinput:false,
        selectArea:false,
        areas:'',
        areaCode:'',
        name:'',
        tel:'',
        addressDetail:'',
        showToast:false,
        toastWord:'',
        addShipCode:[],
        noShipCode:[],
        provinceCode:'',
        cityCode:'',
        countyCode:'',
        noShipStatus:false,
        addMoney:0,
    }
    componentDidMount(){
        // console.log(this.state.oldInfor)
        allapi.user.old_addr({
            orderId:this.$router.params.orderId
        })
        .then(res => {
            // console.log(res)
            if(res.isSuccess){
                this.setState({
                    oldInfor:res.prop
                })
            }
        })
        //获取运费模板
        allapi.home.get_freight_infor({
            productId:this.$router.params.productId
        })
        .then(res => {
            console.log(res)
            this.setState({
                addShipCode:res.result.addShip,
                noShipCode:res.result.noExpress
            })
        })
    }
    //数组校验函数
    contains =(arr, obj,type) =>{
        if(type == 1){
            arr.map(item =>{
                if(item == obj.areaCode){
                    this.setState({
                        addMoney:obj.addMoney
                    },()=>{
                        this.setState({
                            showToast:true,
                            toastWord:`该地区需额外加运费${obj.addMoney}元,请补足余款给大咖`
                        })
                    })
                }
            })
        }else if(type == 2){
            arr.map(item => {
                if( item == obj){
                    this.setState({
                        noShipStatus:true
                    },()=>{
                        this.setState({
                            showToast:true,
                            toastWord:`该地区不发货！`
                        })
                    })
                }
            })
        }
    }
    closeAreaSelect(data){
        this.setState({
            selectArea:false
        })
        let arrCode = new Array()
        arrCode = arrCode.concat(data.map(item => item.id))
        data && data.length && this.setState({
            areas:data.map(item => item.name).join(" "),
            areaCode:data.map(item => item.id).join("-"),
            provinceCode:data[0].id,
            cityCode:data[1].id,
            countyCode:data[2].id,
            addMoney:0,
            noShipStatus:false
        },() => {
            //前台遍历校验该地区是否要加运费
            this.state.addShipCode.map(item => {
                this.contains(arrCode,item,1)  
            })
            //该地区是否不发货
            this.state.noShipCode.map(item => {
                this.contains(arrCode,item,2)
            })
        })
        
    }
    confirmModify(){
        if(clickOnce){
            clickOnce = false
            const {name,tel,areaCode,addressDetail,noShipStatus} = this.state;
            //校验是否填写完整
            if(name!=''&&tel!=''&&areaCode!=''&&addressDetail!=''){
                //校验该地区是否能发货
                if(noShipStatus){
                    clickOnce = true   //释放按钮
                    this.setState({
                        showToast:true,
                        toastWord:'该地区不发货！'
                    })
                    return
                }
                //仅中文、字母和数字，不超过8位
                if(!checkMethod.nameCheck3.test(name)){
                    clickOnce = true
                    this.setState({
                        showToast:true,
                        toastWord:'收货人姓名只能输入8位以内的中文、字母和数字！'
                    })
                    return
                }
                //手机号正则校验
                if(!checkMethod.telCheck.test(tel)){  
                    clickOnce = true
                    this.setState({
                        showToast:true,
                        toastWord:'请检查手机号是否正确！'
                    })
                    return
                }
                //开始创建
                allapi.user.save_addr({
                    updateOrderId:this.$router.params.orderId,
                    receiverName:name,
                    receiverTel:tel,
                    receiverAddressCode:areaCode,
                    receiverDetailAddress:addressDetail
                })
                .then(res => {
                    if(res.isSuccess){
                        Taro.navigateBack({ delta: 1 })
                    }else{
                        clickOnce = true
                        this.setState({
                            showToast:true,
                            toastWord:res.message
                        })
                    }
                })
            }else{
                this.setState({
                    showToast:true,
                    toastWord:'请填写完整！'
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'请勿重复提交'
            })
        }
    }
    
    openArea = () =>{
        this.setState({selectArea:true})
    }
    onInput1 =(e)=>{
        this.setState({
            name:e.detail.value
        })
    }
    onInput2 =(e)=>{
        this.setState({
            tel:e.detail.value
        })
    }
    onInput3 =(e)=>{
        this.setState({
            addressDetail:e.detail.value
        })
    }
    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    render(){
        let {isinput,oldInfor,showToast,toastWord} = this.state
        return(
            <View className='modifyaddr-box'>
                <AtToast isOpened={showToast} text={toastWord} duration={2000} onClose={this.closeToast}></AtToast>
                <View className='modifyaddr-box-ctt'>
                    <View className='title-btn'>原收货地址</View>
                    <View className='box1'>
                        <View className='old-infor'>
                            <View className='line'>
                                <View className='name'>{oldInfor.reName}</View>
                                <View className='tel'>{oldInfor.reTel}</View>
                            </View>
                            <View className='line'>{oldInfor.reAddress}</View>
                        </View>
                    </View>
                    <View className='title-btn'>新收货地址</View>
                    <View className='box2'>
                        <View className='ctt'>
                            <View className='title'>收货人姓名</View>
                            <Input placeholder='请输入收货人姓名' className='input'value={this.state.name} onInput={this.onInput1}/>
                        </View>
                        <View className='ctt'>
                            <View className='title'>联系电话</View>
                            <Input placeholder='请输入收货人联系电话' className='input' value={this.state.tel} onInput={this.onInput2}/>
                        </View>
                        <View className='ctt'>
                            <View className='title'>省市区</View>
                            <Input placeholder='请选择省市区' className='input' disabled value={this.state.areas} onClick={this.openArea}/>
                            
                        </View>
                        <View className='ctt-b'>
                            <View className='title'>详细地址</View>
                            
                            <Input placeholder='请输入收货人详细地址' className='input' value={this.state.addressDetail} onInput={this.onInput3}/>
                        </View>
                    </View>
                </View>
                <BottomBtn3 >
                    <View onClick={this.confirmModify.bind(this)}>保存</View>
                </BottomBtn3>
                {this.state.selectArea ? <AreaSelector close={(data)=>{this.closeAreaSelect(data)}}></AreaSelector> : ''}
            </View>
        )
    }
}