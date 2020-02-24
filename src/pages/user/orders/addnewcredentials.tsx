import Taro, { Component, Config } from '@tarojs/taro'
import {View,Textarea} from '@tarojs/components';
import "./addnewcredentials.scss"
import { AtImagePicker ,AtToast} from 'taro-ui'

import BottomBtn3 from '../../../components/bottombtn3/bottombtn'
import axios from 'axios'
axios.defaults.withCredentials = true; //配置为true
import host from '../../../utils/host'
import imgzip from 'imgzip' 
let arr= new Array()
//问题件参数
let formData2 = new FormData() 

// let clickOnce = true
export default class RefundDetail extends Component{
    config: Config = {
        navigationBarTitleText: '添加新凭证或内容',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state={
        files:[],
        logWord:'',
        showToast:false,
        toastWord:'',
        clickOnce:true
    }
    componentWillMount () {
        console.log('添加:',this.$router.params) // 参数传递
        //获取售后信息
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
    }
    onFail (mes) {
    console.log(mes)
    }
    onImageClick (index, file) {
        console.log(index, file)
    }
    queryMethod=(formData)=>{
        console.log(formData)
        if(this.state.logWord ==''){
            this.setState({
                clickOnce:true,
                showToast:true,
                toastWord:'内容描述必填'
            })
        }else{
            console.log('发起请求')
            axios({
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: host+'persnal_center/addSysClaimProcess',
                data: formData
            })
            .then(res => {
                formData2 = new FormData();   //清空formdata
                arr= new Array()
                console.log('xxs')
                if(res.data.isSuccess){
                    Taro.navigateTo({
                        url:`/pages/user/orders/refunddetail?claimId=${this.$router.params.claimId}&orderId=${this.$router.params.orderId}&level=${this.$router.params.level}`
                    })
                }else{
                    this.setState({
                        clickOnce:true,
                        showToast:true,
                        toastWord:res.data.message
                    })
                }
                
            })
            .catch(error => {
                this.setState({
                    clickOnce:true
                })
                // alert(error)
                console.log(error)
            })
            console.log('...')
        }
    }
    handeleInput =(e)=>{
        this.setState({
            logWord:e.detail.value
        })
    }
    confirmAdd=() =>{
        if(this.state.clickOnce){
            this.setState({
                clickOnce:false
            },()=>{
                formData2.append("orderId",this.$router.params.orderId);
                formData2.append("text",this.state.logWord);
                arr.map(item => {
                    formData2.append("images",item);
                })
                this.queryMethod(formData2)
            })
            
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
    render(){
        return(
            <View className='add'>
                <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={1500} onClose={this.closeToast}></AtToast>
                <View className='ctt'>
                    <View className='title1'>
                        内容：
                    </View>
                    <Textarea placeholder='请输入内容'  className='textarea' onInput={this.handeleInput} value={this.state.logWord}/>
                    <View className='title1'>
                        凭证：
                    </View>
                    <AtImagePicker
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                    />
                </View>
                <BottomBtn3>
                    <View onClick={this.confirmAdd}>立即添加</View>
                </BottomBtn3>
            </View>
        )
    }
}