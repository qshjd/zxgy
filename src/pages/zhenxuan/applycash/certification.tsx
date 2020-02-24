import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
import './certification.scss';
//import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import { AtInput, AtToast} from 'taro-ui'
//引入自定义组件
import Container from '../../../components/container/container';
import BottomBtn2 from '../../../components/bottombtn2/bottombtn2';

import allapi from '../../../api'
import checkMethod from '../../../utils/regular'
// let clickOnce = true
export default class Certification extends Component{
    config: Config = {
        navigationBarTitleText: '实名认证'
    }
    constructor(props){
        super(props);
        
    }
    state={
        value1:'',
        value2:'',
        isinput:false,
        isExist:false,
        isShow:false,
        errormsg:'',
        clickOnce:true
    }
    componentDidMount(){
        //实名认证
        allapi.user.certification_idcard()
        .then(res => {
            console.log(res)
            if(res.info){
                this.setState({
                    isExist:res.info,
                    value1:res.name,
                    value2:res.idNumber
                })
            }else{
                this.setState({
                    isExist:res.info
                })
            }
        })
    }
    handleChange1(value1){
        this.setState({
            value1
        })
    }
    handleChange2(value2){
        this.setState({
            value2
        })
    }
    confirm =()=>{
        if(this.state.clickOnce){
            const {isExist,value1,value2} = this.state
            if(isExist){
                Taro.navigateBack({ delta: 1 })
            }else{
                // const idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;  //身份证校验
                // var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;     //姓名校验，是否为中文字符
                //姓名格式校验
                if(!checkMethod.nameReg.test(value1)){
                    this.setState({
                        clickOnce :true,
                        isShow:true,
                        errormsg:'请检查姓名是否正确！'
                    })
                }else if(!checkMethod.idReg.test(value2)){ //身份证前台正则校验
                    this.setState({
                        clickOnce :true,
                        isShow:true,
                        errormsg:'请检查身份证是否正确！'
                    })
                }else{
                    //实名认证填写
                    allapi.user.certification_idcard_write({
                        name:value1,
                        idNumber:value2
                    })
                    .then(res => {
                        console.log(res)
                        if(res.info){
                            //认证成功
                            this.setState({
                                isShow:true,
                                errormsg:'认证成功'
                            },()=>{
                                this.setState({
                                    clickOnce :true,
                                    isExist:res.info,
                                    value1:res.name,
                                    value2:res.idNumber
                                })
                            })
                        }else{
                            //认证失败
                            this.setState({
                                clickOnce :true,
                                isShow:true,
                                errormsg:res.msg
                            })
                        }
                        
                    })
                    .catch(error => {
                        this.setState({
                            clickOnce :true,
                        })
                        alert(error)
                    })
                    }
                
            }
        }else{
            this.setState({
                isShow:true,
                errormsg:'请勿重复提交'
            })
        }
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
    closeToast = ()=>{
        this.setState({
            isShow:false,
            errormsg:''
        })
    }
    render(){
        let {isExist,isShow,errormsg} = this.state
        return(
            <Container>
                <AtToast isOpened={isShow} text={errormsg} duration={2000} onClose={this.closeToast}></AtToast>
                <View className='ct-top'>
                    <View className='ct-top-words'>
                        <View className='ct-top-words-sy'>应相关部门要求，须完成实名认证方可提现。平台仅进行提现实名认证，坚决保护用户隐私。</View>
                    </View>
                </View>
                {isExist?<View className='ct-content-title'>已完成实名认证</View>:''}
                    <View className='ct-content-name' style={{marginTop:isExist?'':'20px'}}>
                    <AtInput
                        name='value'
                        title='身份证姓名'
                        type='text'
                        border={false}
                        className='ct-content-name-input'
                        placeholder='请输入身份证姓名'
                        value={this.state.value1}
                        onChange={this.handleChange1.bind(this)}
                        onFocus={this.handleinput}  onBlur={this.closeinput}
                        disabled={isExist}
                    />
                    </View>
                    <View className='ct-content-number'>
                    <AtInput
                        name='value'
                        title='身份证号码'
                        type='text'
                        border={false}
                        className='ct-content-number-input'
                        placeholder='请输入身份证号码'
                        value={this.state.value2}
                        onChange={this.handleChange2.bind(this)}
                        onFocus={this.handleinput}  onBlur={this.closeinput}
                        disabled={isExist}
                    />
                    </View>
                    <View className='ct-xieyi'>
                        <View className='ct-xieyi-sy'>我们深知个人信息的重要性，也感谢您的信任。
                            <Text style='color: #3A99F6;text-decoration:underline'>《臻选果园隐私权限政策》</Text>
                            将告知臻选果园如何搜集、存储、保护、使用您的信息，并说明您享有的权力
                        </View>
                    </View>
                
                <View className='cer-bottom'>
                    <BottomBtn2>
                    <View onClick={this.confirm}>确认</View>
                </BottomBtn2>
                </View>
                
            </Container>
        )
    }
}