import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Button,Input} from '@tarojs/components';
import './apply.scss';

//引入自定义组件
import BottomBtn3 from '../../../components/bottombtn3/bottombtn';

import {AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtToast} from "taro-ui"
import allapi from '../../../api';

let clickOnce = true;
export default class Apply extends Component{
    config: Config = {
        navigationBarTitleText: '申请提现'
    }
    constructor(props){
        super(props);
        
    }
    state={
        disabledCode:false, //获取验证码按钮是否可点击
        obtainYzm:'获取验证码',
        codeBtnColor:{color:'#3A99F6'},//控制获取验证码按钮的颜色
        remainingSum:'',
        weixin:'',
        date:'',
        value1:'',
        value2:'',
        openDiago3:false,
        isinput:false,
        isWechat:true,
        showToast:false,
        toastWord:'',
    }
    componentDidMount(){
        //获取可提现金额
        allapi.detail.get_cashAll()
        .then(res => {
            console.log(res)
            this.setState({
                remainingSum:res.remainingSum?res.remainingSum:0
            })
        })
        //获取日期和微信号
        allapi.detail.get_timeAndWechat()
        .then(res => {
            console.log(res)
            this.setState({
                date:res.date,
                weixin:res.weixin,
            })
        })
    }
    //提现金额输入
    handleChange1(value1){
        if(this.state.weixin != ''){
            this.setState({
                value1,
                isWechat:true
            })
        }else{
            this.setState({
                value1,
                showToast:true,
                toastWord:'请先输入微信号'
            })
        }
    }
    //验证码输入
    handleChange2(value2){
        if(this.state.weixin != ''){
            this.setState({
                value2,
                isWechat:true
            })
        }else{
            this.setState({
                value2,
                showToast:true,
                toastWord:'请先输入微信号'
            })
        }
    }
    //微信号输入
    onInput = (e)=>{
        this.setState({
            weixin:e.detail.value
        })
    }
    
    changeModel3(){
        this.setState({
            openDiago3:false
        })
        Taro.navigateTo({
            url:'/pages/zhenxuan/zhenxuan'
        })
    }
    GoToRecordPage(){
        Taro.navigateTo({
            url:'/pages/zhenxuan/applycash/applyrecord'
        })
    }
    handleinput= ()=>{
        this.setState({
            isinput:true
        })
    }
    closeinput= ()=>{
        this.setState({
            isinput:false
        })
    }
    run(){
        console.log('coming')
    }
    //发送验证码
    sendCode = ()=>{
        if(!this.state.disabledCode){
            const {date,remainingSum} = this.state
            //校验当前时间
            if(parseInt(date) == 2){
                //校验最小提现金额
                if(parseFloat(remainingSum) < 10){
                    this.setState({
                        showToast:true,
                        toastWord:'当前可提现余额小于10元，不可提现！'
                    })
                }else{
                    //获取验证码
                    allapi.detail.get_cash_code()
                    .then(res => {
                        this.setState({
                            showToast:true,
                            toastWord:res.msg
                        })
                        if(res.success){
                            this.time();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    
                }
            }else{
                this.setState({
                    showToast:true,
                    toastWord:'每周提现日期为周一！'
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'请查看验证码是否收到！'
            })
        }
        
    }
    //倒计时函数
    time(){
        let time=60;
        const timeCount = setInterval(() => {
            if (time > 1) {
                time--;
                this.setState({
                    showToast:false,
                    obtainYzm: `重新获取(${time}s)`,
                    // '重新获取（'+`${time}s`+'）'
                    disabledCode: true,
                    codeBtnColor:{color:'#999999'}
                });
            } else {
                this.setState({
                    showToast:false,
                    codeBtnColor:{color:'#3A99F6'},
                    obtainYzm: '获取验证码',
                    disabledCode: false
                });
                clearInterval(timeCount);
            }
        }, 1000);
    }
    //确认申请
    comfirm(){
        if(clickOnce){
            clickOnce = false
            const {value1,value2,weixin,remainingSum} = this.state
            //判断全为空
            if(value1 == '' || value2 == '' || weixin == ''){
                clickOnce = true
                this.setState({
                    showToast:true,
                    toastWord:'请填写微信号、提现金额与手机验证码'
                })
                return
            }
            //判断提现金额
            if(parseFloat(value1?value1:'0')<10){
                clickOnce = true
                this.setState({
                    showToast:true,
                    toastWord:'单次提现金额不可低于10元'
                })
                return
            }
            if(parseFloat(remainingSum) < parseFloat(value1?value1:'0')){
                clickOnce = true
                this.setState({
                    showToast:true,
                    toastWord:'可提现金额不足'
                })
                return
            }
            //调用提现接口
            allapi.detail.confirm_get_money({
                money:value1,
                code:value2,
                weixin:weixin
            })
            .then(res => {
                if(res.success){
                    this.setState({
                        openDiago3:!this.state.openDiago3
                    })
                }else{
                    clickOnce = true
                    this.setState({
                        showToast:true,
                        toastWord:res.msg
                    })
                }
            })
        }else{
            this.setState({
                showToast:true,
                toastWord:'请勿重复提交'
            })
        }
    }
    changeWechat= ()=>{
        if(this.state.weixin != ''){
            this.setState({
                isWechat:!this.state.isWechat
            })
        }else{
            this.setState({
                showToast:true,
                toastWord:'微信号不能为空'
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
        let {openDiago3,remainingSum,weixin,isWechat,showToast,toastWord,codeBtnColor,obtainYzm}=this.state
        return(
            <View  className='tx-box'>
                <AtToast isOpened={showToast} text={toastWord} duration={2000} onClose={this.closeToast}></AtToast>
                <AtModal isOpened={openDiago3} closeOnClickOverlay={false}>
                    <AtModalHeader className='ac-diago-title'>申请成功</AtModalHeader>
                    <AtModalContent>
                        <View className='ac-diago-content'>
                            <View className='ac-diago-circles'>
                                <View className='ac-diago-circle-1'></View>
                            </View>
                            <View className='ac-diago-line'>
                                <View className='ac-diago-words'>
                                    提现申请成功，我们将在48小时内转款核对转账,可到提现记录里面查看提现进度.
                                </View>
                            </View>
                        </View>
                    </AtModalContent>
                    <AtModalAction className='ac-diago-btn'><Button onClick={this.changeModel3.bind(this)} ><Text className='ac-diago-btn-word'>知道了</Text></Button> </AtModalAction>
                </AtModal>
                <View  className='tx-ctt'> 
                    <View className='ac-one'>
                        <View className='ac-one-words'>可提现金额(元)</View>
                        <View className='ac-one-money'>{remainingSum}</View>
                    </View>
                    <View className='ac-two'>
                        <View className='ac-two-top'>
                            <View className='ac-two-top-fw'>
                                <View className='ac-two-top-fw-1'>提现微信号</View>
                                <View className='ac-two-top-fw-2'>(成为会员时填写的微信账号)</View>
                            </View>
                            <View className='ac-two-top-sw'>
                                {isWechat?<Input name='weixin'  value={weixin} disabled className='ac-two-top-sw-1'  onInput={this.onInput}/>:''}
                                {isWechat?'':<Input name='weixin' placeholder='请输入正确的微信号' value={weixin} focus className='ac-two-top-sw-1' onInput={this.onInput}/>}
                                {isWechat?<View className='ac-two-top-sw-2'>账号错误？<Text style='color: #3A99F6' onClick={this.changeWechat}>点击修改</Text></View>:''}
                                {isWechat?'':<View className='ac-two-top-sw-2'><Text style='color: #3A99F6' onClick={this.changeWechat}>保存</Text></View>}
                            </View>
                        </View>
                        <View className='ac-two-bto'>
                            <View className='ac-two-bto-1'>请输入提现金额:</View>
                            <View className='ac-two-bto-2'>
                                <View className='ac-two-bto-3'>
                                    <AtInput
                                        name='value1'
                                        border={false}
                                        type='number'
                                        className='ac-two-input'
                                        placeholder='0.00'
                                        value={this.state.value1}
                                        onChange={this.handleChange1.bind(this)}
                                        onFocus={this.handleinput}  
                                        onBlur={this.closeinput}
                                    />
                                </View>
                                <View className='ac-two-bto-4' onClick={()=>{this.setState({value1:remainingSum})}}>全部提现</View>
                            </View>
                        </View>
                    </View>
                    <View className='ac-three'>
                        <View className='ac-three-box'>
                            <View className='ac-three-1'>短信验证码</View>
                            <View className='ac-three-2'>
                                <AtInput
                                    name='value2'
                                    type='text'
                                    className='ac-three-input'
                                    placeholderClass='placeholder'
                                    placeholder='请输入短信验证码'
                                    value={this.state.value2}
                                    onChange={this.handleChange2.bind(this)}
                                    border={false}
                                    onFocus={this.handleinput}  
                                    onBlur={this.closeinput}
                                />
                            </View>
                            <View className='ac-three-3' onClick={this.sendCode} style={codeBtnColor}>{obtainYzm}</View>
                        </View>
                    </View>
                    <View className='ac-four'>
                        <View className='ac-four-words'>提现说明:</View>
                        <View className='ac-four-words'>1.提现时间为<Text style='font-Weight:bold;color: #F95561' >每周一</Text>。单次提现金额须<Text style='font-Weight:bold;color: #F95561' >大于10元</Text>。</View>
                        <View className='ac-four-words'>2.提现为人工审核处理，请认真核实您的微信账号是否正确，我们在48小时内完成提现审核。</View>
                        <View className='ac-four-words'>3.账户填写有误导致转款错误平台概不负责,如微信为wxid_***,请申请后联系平台处理。</View>
                    </View>
                </View>
                <BottomBtn3>
                    <View  onClick={this.comfirm.bind(this)}>确认申请</View>
                </BottomBtn3>
            </View>
        )
    }
}