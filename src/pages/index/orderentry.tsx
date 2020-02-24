import Taro, { Component, Config } from '@tarojs/taro'
import {View,Text,Input,Textarea,Image} from '@tarojs/components';
import './orderentry.scss'
import AreaSelector from  "../../components/AreaSelector"
import LenovoSelector from "./components/LenovoSelector"
import Loading from '../../components/loadingPic'
import { AtToast} from 'taro-ui'

import allapi from '../../api'
import host from '../../utils/host'
import checkMethod from '../../utils/regular'   //正则表达式
let clickOnce = true   //防止表单重复提交
let timer;             //防抖
export default class OrderEntry extends Component{
    config: Config = {
        navigationBarTitleText: '订单录入',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    constructor(props) {
        super(props);
    }
    state = {
        name:'',    //姓名
        tel:'',     //电话
        detailArea:'',  //详细地址
        orderInfor:{},   //订单信息（包括商品名称、价格等等）
        smartAddrInfor:'',  //智能地址识别信息
        selectArea:false,   //控制地址选择器的
        areaText:"",        //省市区显示信息
        entryID:this.$router.params.id,
        showToast:false,
        toastWord:'',
        provinceCode:'',
        cityCode:'',
        countyCode:'',
        addShipCode:[],         //加运费地区的code
        // noExpressCode:[],        
        noShipCode:[],       //不发货地区的code
        noShipStatus:false,   //该地区是否发货
        addMoney:0,         //加运费
        orderId:Number,
        // shipCode:''        //智能识别的返回码  005：不配送
        // enlargeImg:false,
        hidden:false,         //底部按钮显示状态（IOS兼容问题）
        initialize:false,      //页面初始化
        loadingWords:'正在加载',
        lenoveWords:'暂无联想',
        showLenovo:false,    //是否展开联想
        userId:-1,           //选择标记
        lenovoDatas:[]       //姓名联想信息
    }
    //防抖（非立即执行）
    debounce  =(fn, wait) =>{
        // console.log(fn)
        let timeout;
        let fun = ()=> {
            if(timeout){
                clearTimeout(timeout)
            }
            timeout=setTimeout(fn,wait)
        };
        fun()
    }
    //姓名输入
    handleInput1 = (e)=>{
        this.setState({
            name:e.detail.value,
        },()=>{
            if(e.detail.value == '' ){
                this.setState({
                    showLenovo:false,
                    lenoveWords:'暂无联想'
                })
            }else{
                if(timer){
                    clearTimeout(timer)
                }
                //防抖
                timer = setTimeout(()=>{
                    timer = undefined
                    if(this.state.name){
                        allapi.home.find_name({
                            receiverName:this.state.name
                        })
                        .then(res => {
                            console.log(res)
                            if(res.length != 0){
                                console.log('不为空')
                                this.setState({
                                    showLenovo:true,
                                    lenoveWords:'隐藏联想',
                                    lenovoDatas:res
                                })
                            }
                        })
                    }
                },400)
            }
        })
    }
    handleInput2 = (e)=>{
        this.setState({
            tel:e.detail.value
        })
    }
    handleInput3 = (e)=>{
        this.setState({
            detailArea:e.detail.value
        })
    }
    handleInput4 = (e)=>{
        this.setState({
            smartAddrInfor:e.detail.value
        })
    }
    componentDidMount() {
        //获取运费模板及商品信息
        allapi.home.get_freight_infor({
            productId:this.$router.params.id
        })
        .then(res => {
            console.log(res)
            this.setState({
                orderInfor:res.result,
                addShipCode:res.result.addShip,
                noShipCode:res.result.noExpress,
                initialize:true
            })
        })
        // window.scrollTo(0,50);
        // window.addEventListener('scroll', this.foucus, true)
    }
    //数组校验函数
    contains =(arr, obj,type) =>{
        if(type == 1){
            arr.map(item =>{
                if(item == obj.areaCode){
                    console.log('加运费地区：',obj)
                    this.setState({
                        addMoney:obj.addMoney
                    })
                }
            })
        }else if(type == 2){
            arr.map(item => {
                if( item == obj){
                    this.setState({
                        noShipStatus:true
                    })
                }
            })
        }
    }
    openArea = () =>{
        //兼容性处理（IOS在弹出地址选择器时底部按钮未消失）
        let ua = window.navigator.userAgent;
        if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            this.setState({
                hidden:true,
                selectArea:true
            })
        }else{
            this.setState({selectArea:true})
        }
    }

    select = ()=>{this.setState({selectArea:true})}
    //关闭地址选择器事件
    closeAreaSelect(data){
        this.setState({
            selectArea:false,
            hidden:false
        })
        if(data){
        let arrCode = new Array()    //存储省市区的code
        arrCode = arrCode.concat(data.map(item => item.id))
        data && data.length && this.setState({
            areaText:data.map(item => item.name).join(" "),
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
    }
    //地址智能识别 
    startIdentify = ()=>{
        allapi.home.smart_address({
            addrStr:this.state.smartAddrInfor,
            productId:this.$router.params.id
        })
        .then(res => {
            console.log(res)
            if(res.success){
                this.setState({
                    name:res.result.name,
                    tel:res.result.tel,
                    areaText:res.result.province+" "+res.result.city+" "+res.result.county,
                    detailArea:res.result.directAddr,
                    provinceCode:res.result.provinceCode,
                    cityCode:res.result.cityCode,
                    countyCode:res.result.countyCode,
                    addMoney:res.result.addShip?res.result.addShip:0,
                    showToast:true,
                    toastWord:res.msg,
                    noShipStatus:(res.code == '005')?true:false
                })
            }else{
                this.setState({
                    showToast:true,
                    toastWord:res.msg
                })
            }
        })
    }
    //录入订单
    enterCheckStand = ()=>{
        //避免重复点击
        if(clickOnce){
            clickOnce = false
            const {name,tel,areaText,detailArea,addMoney,provinceCode,cityCode,countyCode,noShipStatus} = this.state
            //校验是否输入完整
            if(name != '' && tel != '' && areaText != '' && detailArea != '' ){
                // const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                //校验该地区是否能发货
                if(noShipStatus){
                    clickOnce = true   //释放按钮
                    this.setState({
                        showToast:true,
                        toastWord:'该地区不发货'
                    })
                    return
                }
                //仅中文和数字，不超过8位
                if(!checkMethod.nameCheck3.test(name)){
                    clickOnce = true
                    this.setState({
                        showToast:true,
                        toastWord:'收货人姓名只能输入2-8位的中文、字母和数字！'
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
                //订单录入
                allapi.home.order_entry({
                    productId:this.$router.params.id,
                    buyNumer:1,
                    shipCost:addMoney+this.state.orderInfor.base,
                    receiverName:name,
                    receiverTel:tel,
                    receiverProvince:provinceCode,
                    receiverCity:cityCode,
                    receiverDistrict:countyCode,
                    receiverDetailAddress:detailArea
                })
                .then(res => {
                    if(res.success){
                        Taro.navigateTo({
                            url:`/pages/index/checkstand?id=${res.result.orderId}&payCost=${res.result.payCost}&time=${res.result.time}`
                        })
                        clickOnce = true
                    }else{
                        clickOnce = true
                        this.setState({
                            showToast:true,
                            toastWord:res.msg
                        })
                    }
                })
                .catch(error => {
                    alert(error)
                    clickOnce = true
                })
                
            }else{
                clickOnce = true
                this.setState({
                    showToast:true,
                    toastWord:'请填写完整信息'
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'请勿重复提交订单'
            })
        }
    }
    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    //版本迭代：增加历史客户地址功能
    changeLenovo = ()=>{
        if(this.state.lenoveWords == '隐藏联想'){
            this.setState({
                lenoveWords:'显示联想',
                showLenovo:false
            })
            return
        }
        if(this.state.lenoveWords == '显示联想'){
            this.setState({
                lenoveWords:'隐藏联想',
                showLenovo:true
            })
            return 
        }
        
    }
    render(){
        const {addMoney,noShipStatus,initialize,showLenovo,lenoveWords,lenovoDatas} = this.state
        const {img,marketPrice,name,base,commission} = this.state.orderInfor
        var payMoney = marketPrice-commission //每件商品的实际价格（扣除佣金）
        var totalPrice = payMoney+base+addMoney  //代理需要支付的实际金额（扣除佣金，加上运费）
        return (
            <View className='entry-box'>
            {/* 加载动画组件 */}
            {initialize?'':<Loading>正在加载</Loading>}
                {/* 提示信息组件 */}
                <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={1500} onClose={this.closeToast}></AtToast>
                <View className='entry-box-ctt'>
                    <View className='intro'>
                        <View className='intro-btn'>
                            <View className='word'>商品信息</View>
                        </View>
                    </View>
                    <View className='infor-box'>
                        <View className='top'>
                            <View className='pic'><Image src={host+img} style={{width:'100%',height:'100%'}}/></View>
                            <View className='right'>
                                <View className='goodsName'>{name}</View>
                                <View className='prices'>
                                    <View className='price'>售价:￥{marketPrice}</View>
                                    <View className='price'>臻选价:￥{payMoney}</View>
                                    <View className='price'>佣金:￥{commission}</View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='intro'>
                        <View className='intro-btn'>
                            <View className='word'>收货人信息</View>
                        </View>
                    </View>
                    <View className='customer-infor'>
                        <View className='input-line'>
                            <View className='input-name'>收货人姓名</View>
                            <Input placeholder='请输入收货人姓名' className='input-box-n' value={this.state.name} onInput={this.handleInput1} id="search"/>
                            <View className='blue-btn' onClick={this.changeLenovo}>{lenoveWords}</View>
                            {/* 联想信息弹框组件 */}
                            {showLenovo  && (lenovoDatas.length != 0)?<LenovoSelector datas={lenovoDatas} select={this.selectUser} id={this.state.userId}/>:''}
                        </View>
                        <View className='input-line'>
                            <View className='input-name'>联系电话</View>
                            <Input placeholder='请输入收货人联系电话' className='input-box' value={this.state.tel} onInput={this.handleInput2}/>
                        </View>
                        <View className='input-line'>
                            <View className='input-name'>省市区</View>
                            <Input placeholder='请选择省市区' value={this.state.areaText} onClick={this.openArea} disabled className='input-box'/>
                            {this.state.selectArea ? <AreaSelector close={(data)=>{this.closeAreaSelect(data)}}></AreaSelector> : ''}
                        </View>
                        <View className='input-line'>
                            <View className='input-name'>详细地址</View>
                            <Input placeholder='请输入详细地址' className='input-box' value={this.state.detailArea} onInput={this.handleInput3}/>
                        </View>
                    </View>
                    <View className='intro'>
                        <View className='intro-btn'>
                            <View className='word'>智能地址识别</View>
                        </View>
                    </View>
                    <View className='ta'>
                        <Textarea value={this.state.smartAddrInfor} className='ta-box' onInput={this.handleInput4} placeholder='粘贴地址信息,以逗号分开，否则无法识别:如张三,13000000000,XX省,XX市,XX区,XX路XX号'></Textarea>
                        <View className='blue-btn' onClick={this.startIdentify}>开始识别</View>
                    </View>
                    
                </View>
                
                {this.state.hidden?'':<footer className='bottom-btn'>
                    <View className='order-infor'>
                        <View className='money'>{noShipStatus?<Text>该地区暂不发货</Text>:<Text>运费：￥{base+addMoney}</Text>}</View>
                        <View className='prompt'><Text className='total-price'>合计：<Text style="color:#FB3F4C;">￥{totalPrice}</Text></Text>含运费、扣除商品佣金</View>
                    </View>
                    <View className='confirm' onClick={this.enterCheckStand}>
                        <View className='confirm-word'>立即录入</View>
                    </View>
                </footer>}
                
            </View>
        )
    }
    //选择某个历史姓名联想信息
    selectUser = (index,data) =>{
        console.log(data)
        this.setState({
            showLenovo:false,
            lenoveWords:'显示联想',
            name:data.receiverName,
            tel:data.receiverTel,
            areaText:data.receiverProvinceCh+" "+data.receiverCityCh+" "+data.receiverDistrictCh,
            detailArea:data.receiverDetailAddress,
            userId:index,
            provinceCode:data.receiverProvince,
            cityCode:data.receiverCity,
            countyCode:data.receiverDistrict
        },()=>{
            let arrCode = new Array();
            arrCode.push(this.state.provinceCode,this.state.cityCode,this.state.countyCode);
            console.log('填入code',arrCode);
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
}