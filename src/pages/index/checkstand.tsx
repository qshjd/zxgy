import Taro, { Component, Config } from '@tarojs/taro'
import { View ,Image,Text} from '@tarojs/components'
import './checkstand.scss'
import Container from '../../components/container/container'
import WxPay from '../../imgs/weixin.jpg'
import allapi from '../../api';
import { AtToast} from 'taro-ui'
let clickOnce = true;
export default class Checkstand extends Component{
    config: Config = {
        navigationBarTitleText: '收银台',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state={
        money:0,
        hour:'00',
        min:'00',
        sec:'00',
        appId:'',
        timeStamp:'',
        nonceStr:'',
        package_pay:'',
        paySign:'',
        showToast:false,
        toastWord:'',
    }
    componentDidMount(){
        this.countFun(parseInt(this.$router.params.time));
    }
    pay =()=>{
        if(clickOnce){
            clickOnce = false
            //预支付订单
            allapi.home.prepaid_order({
                orderId:(this.$router.params.id)
            })
            .then(res => {
                if(res.success){
                    this.setState({
                        appId:res.result.appid,
                        timeStamp:(res.result.timeStamp).toString(),
                        nonceStr:res.result.nonce_str,
                        package_pay:"prepay_id="+res.result.prepay_id,
                        // "signType":"MD5",         //微信签名方式：     
                        paySign:res.result.signSecond
                    },()=>{
                        this.callpay();
                    })
                }else{
                    clickOnce = true
                    this.setState({
                        showToast:true,
                        toastWord:res.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    onBridgeReady(){
        const{appId,timeStamp,nonceStr,package_pay,paySign} = this.state
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                 "appId":appId,     //公众号名称，由商户传入
                 "paySign":paySign,         //微信签名
                 "timeStamp":timeStamp, //时间戳，自1970年以来的秒数
                 "nonceStr":nonceStr , //随机串
                 "package":package_pay,  //预支付交易会话标识
                 "signType":'MD5'     //微信签名方式
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    alert('支付成功');
                    clickOnce = true
                    Taro.navigateTo({
                        url:'/pages/index/index'
                    })
                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                    alert('支付取消');
                    clickOnce = true
                }else if(res.err_msg == "get_brand_wcpay_request:fail" ){
                    alert('支付失败');
                    clickOnce = true
                } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
    callpay(){
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            this.onBridgeReady();
        }
    }
    //剩余支付时间
    //组件卸载取消倒计时
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    countFun = (startTime) => {
        // let end_time =new Date().getTime();
        // let clientTime = startTime+2*60*1000;
        // console.log('****',clientTime,end_time)
        // let sys_second = parseInt((end_time-clientTime)/1000);
        // console.log("*",parseInt(sys_second/1000))
        let  sys_second = 5*60*1000
        this.timer = setInterval(() => {
        //防止倒计时出现负数
        if (sys_second > 1000) {
        sys_second -= 1000;
        let minute = Math.floor((sys_second/1000/ 60) % 60);
        let second = Math.floor(sys_second/1000 % 60);
        this.setState({
            min:minute < 10 ? "0" + minute : minute,
            sec:second < 10 ? "0" + second : second
        })
        } else {
            clearInterval(this.timer);
            this.setState({
                sec:'00'
            })
        //倒计时结束时触发父组件的方法
        //this.props.timeEnd();
        }
    }, 1000);
    }


    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    render(){
        const {hour,min,sec,money} = this.state
        return(
            <Container>
                <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={1500} onClose={this.closeToast}></AtToast>
                <View className='money-panel'>
                    <View className='panel-title'>需支付</View>
                    <View className='money-count'>￥{this.$router.params.payCost}</View>
                    <View className='rest-time'>
                        <View className='rest-word'>
                            支付剩余时间
                        </View>
                        <View className='time-box'>{hour}</View>
                        <View className='colon'>:</View>
                        <View className='time-box'>{min}</View>
                        <View className='colon'>:</View>
                        <View className='time-box'>{sec}</View>
                    </View>
                </View>
                <View className='pay-type'>
                    <View className='pay-title'>支付方式</View>
                    <View className='wx-pay'>
                        <View className='wx-icon'>
                            <Image src={WxPay} style={{width:'46px',height:'46px'}}></Image>
                            <View className='pay-word'>微信支付</View>
                        </View>
                        <View className='select-icon'>√</View>
                    </View>
                </View>
                <View className='bottom-btn-check'  >
                    <View className='order-infor'>
                        <View className='money'>需支付合计（含运费）:<Text style='color:red;font-weight:bold'>￥{this.$router.params.payCost}</Text></View>
                        <View className='prompt'>包含臻选师价和运费，已扣除商品佣金</View>
                    </View>
                    <View className='confirm'>
                        <View className='confirm-word' onClick={this.pay}>立即支付</View>
                    </View>
                </View>
            </Container>
        )
    }
}