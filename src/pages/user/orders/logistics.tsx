import Taro, { Component, Config } from '@tarojs/taro'
import {View,Input,Image} from '@tarojs/components';
import "./logistics.scss"
import { AtImagePicker ,AtActionSheet,AtToast} from 'taro-ui'

import Right from '../../../imgs/turn_right@2x.png' 

import BottomBtn2 from '../../../components/bottombtn2/bottombtn2'
import BottomBtn3 from '../../../components/bottombtn3/bottombtn'
import allapi from '../../../api';
import host from '../../../utils/host'
import axios from 'axios'
import imgzip from 'imgzip'  
axios.defaults.withCredentials = true; //配置为true


let arr = new Array()
var formData1 = new FormData();     //问题件参数
var formData2 = new FormData();

// let clickOnce = true       

export default class Scroll extends Component{
    config: Config = {
        navigationBarTitleText: '申请售后',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    componentWillMount () {
        console.log(this.$router.params) // 参数传递
        console.log('yasuo',imgzip)
    }
    state = {
        files: [],
        isopen1:false,
        isopen2:false,
        reason:'请选择售后原因',
        reasonCode:'',        //传递参数
        reason1:0,       //问题件
        reason2:0,       //理赔件
        will:'请选择意愿',
        willCode:'',
        will1:0,      //退款
        will2:0,      //补发
        isinput:false,
        des:'',
        blobs:{},
        total:'',
        pro:'',
        showToast:false,
        toastWord:'',
        size:[],
        clickOnce:true //防止多次点击
    }
    onChange (files) {
        arr = []
        this.setState({
            files
        },()=>{
            this.state.files.map((item,key) => {
                this.getBlob(item.url,key)
            })
        })
        // console.log('img',arr)
    }
    onFail (mes) {
        console.log(mes)
        }
    onImageClick (index, file) {
        console.log(index, file)
    }
    openSheet1=()=>{
        this.setState({
            isopen1:true
        })
    }
    closeSheet1=()=>{
        this.setState({
            isopen1:false
        })
        console.log(this.state.isopen1)
    }
    //选中问题件
    selectReason1=()=>{
        this.setState({
            reason1:1,
            reason2:0,
            reasonCode:'1',        //传递参数
        })
        
    }
    //选中理赔件
    selectReason2=()=>{
        this.setState({
            reason1:0,
            reason2:1,
            reasonCode:'2', 
        })
        
    }
    submitReason=()=>{
        if(this.state.reason1 != 1){
            this.setState({
                reason:'理赔件售后',
                isopen1:false
            })
        }else{
            this.setState({
                reason:'问题件售后',
                isopen1:false
            })
        }
    }

    openSheet2=()=>{
        this.setState({
            isopen2:true
        })
    }
    closeSheet2=()=>{
        this.setState({
            isopen2:false
        })
    }
    selectWill1=()=>{
        this.setState({
            will1:1,
            will2:0,
            willCode:'1'
        })
    }
    selectWill2=()=>{
        this.setState({
            will1:0,
            will2:1,
            willCode:'2'
        })
    }
    submitWill=()=>{
        if(this.state.will1 != 1){
            this.setState({
                will:'补发',
                isopen2:false
            })
        }else{
            this.setState({
                will:'退款',
                isopen2:false
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
    onInput1=(e)=>{
        this.setState({
            des:e.detail.value
        })
    }
    totalInput =(e)=>{
        this.setState({
            total:e.detail.value
        })
    }
    proInput =(e)=>{
        this.setState({
            pro:e.detail.value
        })
    }
    queryMethod=(formData,queryUrl)=>{
        console.log('----------',formData,queryUrl)
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            url: host+queryUrl,
            data: formData
        })
        .then(res => {
            // clickOnce = true
            //清空formdata内容，防止二次申请内容有多次
            formData1 = new FormData()
            formData2 = new FormData()
            if(res.data.isSuccess){
                Taro.navigateTo({
                    url:'/pages/user/orders/orders?id=3'
                })
            }else{
                this.setState({
                    showToast:true,
                    toastWord:res.data.message
                })
            }
            
        })
        .catch(error => {
            console.log(error)
            this.setState({
                clickOnce:true
            })
        })
    }
    //获取blob对象本身
    getBlob(url,key) { 
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.onload = () => {
            console.log('***',xhr.response)
            let file = new File([xhr.response], 'xxx.png',{type:'image/jpeg'})
            if(file.size>1024*1024*4){
                let arrFile = this.state.files.slice(0,-1)
                this.setState({
                    showToast:true,
                    toastWord:'图片大小不能超过4M',
                    files:arrFile
                })
            }else{
                //调用插件压缩
                imgzip.photoCompress(file, {quality:0.2}, function (base64) {
                    //转blod流
                    let blod =  imgzip.convertBase64UrlToBlob(base64); 
                    let filesZiped = new File([blod], 'xxx.png',{type:'image/jpeg'})
                    arr[key] =filesZiped
                })
            }
        }
        xhr.send()
        return xhr
    }
    //图片压缩处理
    getFormData1 = () => {
        formData1.append("orderId",this.$router.params.orderId);
        formData1.append("reason",this.state.des);
        formData1.append("customerWishCode",this.state.willCode);
    }
    getFormData = () => {
        formData2.append("orderId",this.$router.params.orderId);
        formData2.append("reason",this.state.des);
        formData2.append("totalNum",this.state.total);
        formData2.append("problemNum",this.state.pro);
    }
    handleCliam =()=>{
        if(this.state.clickOnce){
            if(this.state.reasonCode == '1'){
                if(this.state.des != '' && this.state.willCode != '' && this.state.files.length > 0){
                    this.setState({
                        clickOnce:false
                    })  
                    //问题件
                    this.getFormData1();
                    arr.map(item => {
                        formData1.append("images",item);
                    })
                    this.queryMethod(formData1,'persnal_center/applyProClaim')
                }else{
                    this.setState({
                        clickOnce:true
                    })
                    this.setState({
                        showToast:true,
                        toastWord:'请填写完整(包括图片)'
                    })
                }
            }else if(this.state.reasonCode =='2'){
                if(this.state.des != '' && this.state.total != '' && this.state.pro != '' && this.state.files.length > 0){
                    //理赔件
                    if(parseInt(this.state.total)>=parseInt(this.state.pro)){
                            this.setState({
                                clickOnce:false
                            })   
                            this.getFormData();
                            arr.map(item => {
                                formData2.append("images",item);
                            })
                            this.queryMethod(formData2,'persnal_center/applyRatioClaim')
                        }else{
                            this.setState({
                                clickOnce:true,
                                showToast:true,
                                toastWord:'总个数不能低于坏果数'
                            })
                        }
                }else{
                    this.setState({
                        clickOnce:true,
                        showToast:true,
                        toastWord:'请填写完整(包括图片)'
                    })
                }
            }else{
                
                this.setState({
                    clickOnce : true,
                    showToast:true,
                    toastWord:'请先选择售后原因'
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'请勿重复提交'
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
        let {isopen1,isopen2,reason,reason1,reason2,will,will1,will2,showToast,toastWord} = this.state
        let gougou1 ={}
        let gougou2 ={}
        let gougou3 ={}
        let gougou4={}
        if(reason1 == 1){
            gougou1 = '✔'
        }
        if(reason2 == 1){
            gougou2 = '✔'
        }
        if(will1 == 1){
            gougou3 = '✔'
        }
        if(will2 == 1){
            gougou4 = '✔'
        }
        return(
            <View className='log-box'>
                <AtToast isOpened={showToast} text={toastWord} duration={1200} onClose={this.closeToast}></AtToast>
                <View className='log-box-ctt'>
                    <View className='title'>
                        <View className='words'>
                            请依旧各品类售后规范严格执行并审核客户提出的售后要求，
                            保证理赔事件审核正确并且理赔比例合理，否则造成经济损失
                            平台不作处理。疑难售后请私相关售后培训人员协同处理。
                        </View>
                    </View>
                    <View className='line'></View>
                    <View className='goods'>
                        <View className='box1'>
                            <View className='pic'><Image src={host+this.$router.params.imgOne} style={{width:'100%',height:'100%'}}/></View>
                            <View className='des'>{decodeURIComponent(this.$router.params.productName)}</View>
                        </View>
                    </View>
                    <View className='select'>
                        <View className='box2'>
                            <View className='key'>售后原因</View>
                            <View className={(reason == '请选择售后原因')?'value':'value-select'} onClick={this.openSheet1}>{reason}</View>
                            <Image src={Right} className='icon' onClick={this.openSheet1}/>
                            <AtActionSheet isOpened={isopen1}  title='售后原因' onClose={this.closeSheet1}>
                                <View className='sheet-box'>
                                    <View className='select-line'>
                                        <View className='select-box'>
                                            <View className='select-title' onClick={this.selectReason1}>
                                                <View className='select-one' >
                                                    <View className='select-word1'>问题件售后</View>
                                                    <View className={(reason1 == 0)?'select-icon':'select-icon-selected'} >{gougou1}</View>
                                                </View>
                                                <View className='select-two'>如物流停滞、无快递信息，未收到货却已签收、地址错误发错</View>
                                            </View>
                                        </View>
                                    </View>
                                    <View className='select-line'>
                                        <View className='select-box'>
                                            <View className='select-title' onClick={this.selectReason2}>
                                                <View className='select-one' >
                                                    <View className='select-word1'>理赔件售后</View>
                                                    <View className={(reason2 == 0)?'select-icon':'select-icon-selected'} >{gougou2}</View>
                                                </View>
                                                <View className='select-two2'>如存在坏果、破碎、缺少等。</View>
                                            </View>
                                        </View>
                                    </View>
                                    <BottomBtn2>
                                        <View onClick={this.submitReason}>提交</View>
                                    </BottomBtn2>
                                </View>
                            </AtActionSheet>
                        </View>
                    </View>
                    <View className='select'>
                        <View className='box2'>
                            <View className='key'>描述</View>
                            <Input placeholder='请填写准确描述' className='input' onFocus={this.handleinput} value={this.state.des} onInput={this.onInput1} onBlur={this.closeinput}/>
                        </View>
                    </View>
                    {/* 问题件售后选择 */}
                    <View className='select' style={{display:(reason == '问题件售后')?"":"none"}}>
                        <View className='box2'>
                            <View className='key'>客户意愿</View>
                            <View className={(will == '请选择意愿')?'value':'value-select'} onClick={this.openSheet2}>{will}</View>
                            <Image src={Right} className='icon' onClick={this.openSheet2}/>
                            <AtActionSheet isOpened={isopen2}  title='客户意愿' onClose={this.closeSheet2}>
                                <View className='sheet-box'>
                                    <View className='select-line'>
                                        <View className='select-box'>
                                            <View className='select-title' onClick={this.selectWill1}>
                                                <View className='select-one'>
                                                    <View className='select-word1'>退款</View>
                                                    <View className={(will1 == 0)?'select-icon':'select-icon-selected'} >{gougou3}</View>
                                                </View>
                                                <View className='select-two'>
                                                    将原订单金额退还客户，平台处理完成后将把原客
                                                    户支付金额退还您的可提现金额。
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View className='select-line'>
                                        <View className='select-box'>
                                            <View className='select-title'>
                                                <View className='select-one' onClick={this.selectWill2}>
                                                    <View className='select-word1'>补发</View>
                                                    <View className={(will2 == 0)?'select-icon':'select-icon-selected'} >{gougou4}</View>
                                                </View>
                                                <View className='select-two'>供应商马上补发，处理完成后在售后详情中附上新运单号。</View>
                                            </View>
                                        </View>
                                    </View>
                                    <BottomBtn2>
                                        <View onClick={this.submitWill}>提交</View>
                                    </BottomBtn2>
                                </View>
                            </AtActionSheet>
                        </View>
                    </View>
                    {/* 理赔件售后栏 */}
                    <View className='claims-box' style={{display:(reason == '理赔件售后')?"":"none"}}>
                        <View className='claims-input'>
                            <View className='claims-word'>共计（个）</View>
                            <View className='claims-ctt'>
                                <Input placeholder='请输入个数' onInput={this.totalInput} value={this.state.total}/>
                            </View>
                            <View className='claims-word'>坏（个）</View>
                            <View className='claims-ctt'>
                                <Input placeholder='请输入个数' onInput={this.proInput} value={this.state.pro}/>
                            </View>
                        </View>
                        <View className='claims-words'>
                            <View className='claims-words-ctt'>
                                请按商品售后规定定损，并如实填写重量的坏的数量，并将金额先行赔付给消费者，平台将审核定损金额后，退还售后金额至可提现金额
                            </View>
                        </View>
                        
                    </View>
                    <View className='credentials'>
                        <View className='title2'>上传凭证(最多四张)</View>
                        <View className='pics'>
                        <AtImagePicker
                            count={4}
                            sizeType={this.state.size}
                            mode='top'
                            files={this.state.files}
                            onChange={this.onChange.bind(this)}
                            onFail={this.onFail.bind(this)}
                            onImageClick={this.onImageClick.bind(this)}
                        />
                        </View>
                        <View className='box3'>
                            <View className='bottom-words'>凭证1：坏果和快递单号一起拍出来的照片，并能清晰辨别损坏数量及运单信息。</View>
                        </View>
                        
                    </View>   
                    
                </View>
                <BottomBtn3 >
                        <View onClick={this.handleCliam}>立即提交</View>
                </BottomBtn3>
            </View>
        )
    }
}