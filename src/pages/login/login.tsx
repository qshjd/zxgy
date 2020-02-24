import Taro, { Component, Config } from '@tarojs/taro';
import {View,Button,Text} from '@tarojs/components';
import { AtInput,AtAvatar,AtToast} from 'taro-ui';
import './login.scss';
import IconLogo from '../../imgs/logo.jpg';
import allapi from '../../api';
// import axios from 'axios'
import Container from '../../components/container/container'
// import Loading from '../../components/loadingPic'
export default class Login extends Component{
    config: Config = {
        navigationBarTitleText: '登录'
    }
    state={
        telnumber:'',
        code:'',
        isShow:false,      //操作提示框是否打开
        errormsg:'',       //提示框内的信息
        disabledCode:false, //获取验证码按钮是否可点击
        obtainYzm:'获取验证码',
        codeBtnColor:{color:'#333333'},//控制获取验证码按钮的颜色
    }
    constructor(props){
        super(props);
        
    }
    handleChange1 (telnumber) {
        this.setState({
            telnumber
        })
    }
    handleChange2 (code) {
        this.setState({
            code
        })
    }
    

    // 光标激活事件，将提示框隐藏
    onFocus = () =>{
        this.setState({
            isShow:false
        })
    }
    //手机号验证
    getCode(){
        const myreg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
        if(this.state.telnumber==''){
            this.setState({
                isShow:true,
                errormsg:'请先输入手机号！'
            })
            // return this.state.isShow
        }else if(!myreg.test(this.state.telnumber)){
            this.setState({
                isShow:true,
                errormsg:'请输入正确的手机号！'
            })
            // console.log(this.state.isShow)
            // return this.state.isShow
        }else{
            //请求验证码接口
            allapi.user.user_code({
                phone:this.state.telnumber
            })
            .then(res => {
                console.log('验证码返回:',res)
                this.setState({
                    isShow:true,
                    errormsg:res.msg
                })
                if(res.code == '0004'){
                    this.time();
                }
                // switch(res.code){
                //     //不是臻选师
                //     case '0001':
                //         this.setState({
                //             isShow:true,
                //             errormsg:res.msg
                //         })
                //         break;
                //     //多用户（一般不会发生）
                //     case '0002':
                //         this.setState({
                //             isShow:true,
                //             errormsg:'账号异常(0002),请联系平台管理员处理！'
                //         })
                //         break;
                //     //用户登录多次验证（一般不会发生）
                //     case '0003':
                //         this.setState({
                //             isShow:true,
                //             errormsg:'账号异常(0003),请联系平台管理员处理！'
                //         })
                //         break;
                //     //获取验证码成功
                //     case '0004':
                //         this.setState({
                //             isShow:true,
                //             errormsg:res.msg
                //         })
                //         this.time();
                //         break;
                //     //验证码尚在有效期，不能重复请求
                //     case '0005':
                //         this.setState({
                //             isShow:true,
                //             errormsg:res.msg
                //         })
                //         break;
                //     //验证码超时
                //     case '0006':
                //         this.setState({
                //             isShow:true,
                //             errormsg:res.msg
                //         })
                //         break;
                //     default:
                //         console.log('服务器错误')
                //         break;
                // }
            })
            
        }
    }
    login(){
        if(this.state.telnumber == ''){
            this.setState({
                isShow:true,
                errormsg:'手机号不能为空'
            })
        }else if(this.state.code == ''){
            this.setState({
                isShow:true,
                errormsg:'验证码不能为空'
            })
        }else{
            allapi.user.user_login({
                phone:this.state.telnumber,
                message:this.state.code
            })
            .then(res => {
                console.log('登录信息',res)
                if(!res.success){
                    this.setState({
                        isShow:true,
                        errormsg:res.msg,
                        code:''
                    })
                }else{
                    Taro.navigateTo({
                        url:'/pages/index/index'
                    })
                }
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
                    isShow:false,
                    obtainYzm: `重新获取(${time}s)`,
                    // '重新获取（'+`${time}s`+'）'
                    disabledCode: true,
                    codeBtnColor:{color:'#999999'}
                });
            } else {
                this.setState({
                    codeBtnColor:{color:'#333333'},
                    obtainYzm: '获取验证码',
                    disabledCode: false
                });
                clearInterval(timeCount);
            }
        }, 1000);
    }
    gotoAgreement=()=>{
        Taro.navigateTo({
            url:'/pages/agreement'
        })
    }
    closeToast = ()=>{
        this.setState({
            isShow:false,
            errormsg:''
        })
    }
    render(){
            let {isShow,errormsg,telnumber,code,disabledCode,obtainYzm,codeBtnColor} = this.state;
            return(
                <Container specialStyle={{backgroundColor:'#ffffff'}}>
                {/* <Loading/> */}
                <AtToast isOpened={isShow} text={errormsg} duration={2000} onClose={this.closeToast}></AtToast>
                    <View className='login-container'>
                        <AtAvatar className='login-logo' image={IconLogo}></AtAvatar>
                        <AtInput
                        className='login-mobile'
                        name='value1'
                        title=''
                        type='number'
                        placeholder='请输入手机号'
                        value={telnumber}
                        maxLength='11'
                        onFocus={this.onFocus}
                        onChange={this.handleChange1.bind(this)}
                        />
                        <View className='longin-password'>
                            <AtInput
                            className='login-password-input'
                            name='value2'
                            title=''
                            type='number'
                            placeholder='请输入验证码'
                            value={code}
                            maxLength='4'
                            onChange={this.handleChange2.bind(this)}
                            > 
                            <Button className='password-get' disabled={disabledCode} onClick={this.getCode.bind(this)}>
                                <View className='password-get-text' style={codeBtnColor}>{obtainYzm}</View>
                            </Button>
                            </AtInput>
                        </View>
                        <View className='login-agree'>登录代表已阅读并同意<Text onClick={this.gotoAgreement} style={{color:'#007700' }}>《臻选果园隐私权限政策及服务、买卖协议》</Text></View>
                        <Button className='login-button' onClick={this.login.bind(this)}>登 录</Button>
                    </View>
                </Container>
                )
        
    }
}
