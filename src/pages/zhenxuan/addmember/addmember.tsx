import Taro, { Component, Config } from '@tarojs/taro';
import {View,Button,Image,Text,Input} from '@tarojs/components';
import './addmember.scss';
import { AtTag,AtInput,AtAvatar } from 'taro-ui'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction ,AtActionSheet,AtActionSheetItem,AtToast} from "taro-ui"
import { AtFloatLayout } from "taro-ui"


import IconEnter from '../../../imgs/navi_jinru@2x.png';
import ios from '../../../utils/isIos'
// import Container from '../../../components/container/container';
import AreaSelector from '../../../components/AreaSelector';
import BottomBtn3 from '../../../components/bottombtn3/bottombtn';
import allapi from '../../../api';
import checkMethod from '../../../utils/regular'   //正则封装

// let clickOnce = true   //防止表单重复提交
export default class Addmember extends Component{
    config: Config = {
        navigationBarTitleText: '子账号创建'
    }
    constructor(props){
        super(props);
        
    }
    state={
        value1:'',   //昵称
        value2:'',   //手机号
        value3:'',   //微信账号
        value4:'',   //年龄
        jobCode:'1',      //职业code
        areas:'',
        areaCode:'1', //省市区code
        expCode:'1',  //有无经验code
        exp:'',      
        value8:'',  //微信好友数
        openDiago4:false,
        selectArea:false,
        job:'', 
        jobs:[],
        selectJobs:false,
        selectExp:false,
        headPortrait:'',  //头像地址
        nickName:'',      //推荐人昵称
        showToast:false,
        toastWord:'',
        clickOnce:true,
        hidden:false
    }
    componentDidMount(){
        //获取推荐人头像、昵称
        allapi.common.get_user_infor()
        .then(res => {
            console.log(res)
            this.setState({
                headPortrait:res.img,
                nickName:res.nickName
            })
        })
        .catch(error => {
            console.log(error)
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
    handleChange3(value3){
        this.setState({
            value3
        })
    }
    handleChange4(value4){
        this.setState({
            value4
        })
    }
    handleChange8(value8){
        this.setState({
            value8
        })
    }
    closeToast=()=>{
        this.setState({
            showToast:false,
            toastWord:''
        })
    }
    addnow(){
        if(this.state.clickOnce){
            this.setState({
                clickOnce:false
            })
            const {value1,value2,value3,value4,jobCode,areaCode,expCode,value8} = this.state
            if(value1!='' && value2!='' && value3!='' && value4!='' && jobCode!='' && areaCode!='' && expCode!='' && value8!=''){
                //昵称正则
                if(!checkMethod.nameCheck3.test(value1)){
                    
                    this.setState({
                        clickOnce :true,
                        showToast:true,
                        toastWord:'昵称只能输入2-8位的中文、字母和数字！'
                    })
                    return
                }
                //校验手机号正则
                if(!checkMethod.telCheck.test(value2)){
                    this.setState({
                        clickOnce :true,
                        showToast:true,
                        toastWord:'请检查手机号是否正确！'
                    })
                    return
                }
                //开始创建
                allapi.detail.handle_infor({
                    nickname:value1,
                    agentTel:value2,
                    weixin:value3,
                    age:value4,
                    jobCode:jobCode,
                    address:areaCode,
                    experience:expCode,
                    friends:value8
                })
                .then(res => {
                    console.log(res)
                    if(res.success){
                        //创建成功
                        this.setState({
                            openDiago4:!this.state.openDiago4
                        })
                    }else{
                    
                        this.setState({
                            clickOnce :true,
                            showToast:true,
                            toastWord:res.msg
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        clickOnce :true,
                    })
                    alert(error)
                })
                
            }else{
    
                this.setState({
                    clickOnce :true,
                    showToast:true,
                    toastWord:'请填写完整！'
                })
            }
        }else{
            this.setState({
                showToast:true,
                toastWord:'请勿重复提交！'
            })
        }
        
    }
    changeModel4(){
        this.setState({
            openDiago4:false
        })
        Taro.navigateTo({
            url:'/pages/zhenxuan/zhenxuan'
        })
    }
    
    openSheet1 = () => {
        if(ios) {
            this.setState({
                hidden:true,
                selectJobs:true
            })
        }else{
            this.setState({selectJobs:true})
        }
        allapi.detail.get_jobs()
        .then(res => {
            console.log(res)
            this.setState({
                jobs:res
            })
        })
    }
    closeSheet1 = () =>{
        this.setState({
            selectJobs:false,
            hidden:false
        })
    }
    openExp=()=>{
        if(ios){
            this.setState({hidden:true,selectExp:true})
        }else{
            this.setState({selectExp:true})
        }
    }
    closeSheet2 = () => {
        this.setState({
            hidden:false,
            selectExp:false
        })
    }
    openArea = () =>{
        if(ios){
            this.setState({hidden:true,selectArea:true})
        }else{
            this.setState({selectArea:true})
        }
        
    }
    select = ()=>{this.setState({selectArea:true}),console.log('aaa')}
    closeAreaSelect(data){
        this.setState({
            selectArea:false,
            hidden:false
        })
        data && data.length && this.setState({
            areas:data.map(item => item.name).join(" "),
            areaCode:data.map(item => item.id).join("-")
        },() => {
            console.log(this.state.areaCode)
        })
        
    }
    checkingPage = () => {
        Taro.navigateTo({
            url:'/pages/zhenxuan/addmember/checking'
        })
    }
    render(){
        let {selectArea,areas,selectJobs,job,jobs,selectExp,exp,showToast,toastWord} = this.state
        let input_style = {
            position:'static'
        }
        let sheetctt1 = jobs.map(item => {
            return <View className='sheet-line' onClick={() => {this.setState({job:item.codeName,selectJobs:false,jobCode:item.code})}}>{item.codeName}</View>
        })
        return(
            <View className='add-box'>
                <AtToast isOpened={showToast} text={toastWord} duration={2000} onClose={this.closeToast}></AtToast>
                <View className='suspension-btn'><View style={{paddingBottom:'0'}} onClick={this.checkingPage}>审核中</View></View>
                <View className='add-box-ctt'>
                    <AtTag>基本信息</AtTag>
                    <View className='am-basic'>
                        <AtInput
                            name='value1'
                            title='昵称'
                            type='text'
                            placeholder='请输入昵称（创建成功后不可修改）'
                            value={this.state.value1}
                            onChange={this.handleChange1.bind(this)}
                        />
                        <AtInput
                            name='value2'
                            title='手机号码'
                            type='number'
                            placeholder='请输入登录手机号码'
                            value={this.state.value2}
                            onChange={this.handleChange2.bind(this)}
                            className='am-input2'
                        >
                            <View className='check-word'>请核对无误</View>
                        </AtInput>
                        <AtInput
                            name='value3'
                            title='微信账户'
                            type='text'
                            border={false}
                            placeholder='请输入微信账号'
                            value={this.state.value3}
                            onChange={this.handleChange3.bind(this)}
                        >
                            <View className='check-word'>请核对无误</View>
                            
                        </AtInput>
                    </View>

                    <AtTag>其他信息</AtTag>
                    <View className='am-other'>
                        <AtInput
                            name='value4'
                            title='年龄'
                            type='number'
                            placeholder='请输入年龄'
                            value={this.state.value4}
                            onChange={this.handleChange4.bind(this)}
                        />
                        <View className='am-input-box' >
                            <View className='input-line'>
                                <View className='input-name'>职业</View>
                                <Input placeholder='请选择职业' value={job} onClick={this.openSheet1} disabled className='input-areas'/>
                            </View>
                            <View className='am-icon' onClick={this.openSheet1}>
                                <Image src={IconEnter} className='am-input-icon' />
                            </View>
                            <AtFloatLayout isOpened={selectJobs}  title="选择职业" onClose={this.closeSheet1.bind(this)}>
                                <View className='sheet-box'>
                                    {sheetctt1}
                                </View>
                            </AtFloatLayout>
                            {/* <AtActionSheet isOpened={selectJobs}  title='选择职业' onClose={this.closeSheet1}>
                                <View className='sheet-box'>
                                    {sheetctt1}
                                </View>
                            </AtActionSheet> */}
                            
                        </View>
                        <View className='am-input-box' >
                            <View className='input-line'>
                                <View className='input-name'>省市区</View>
                                <Input placeholder='请选择所在省市区' value={areas} onClick={this.openArea} disabled className='input-areas'/>
                            </View>
                            <View className='am-icon' onClick={this.openArea}>
                                <Image src={IconEnter} className='am-input-icon' />
                            </View>
                            {this.state.selectArea ? <AreaSelector close={(data)=>{this.closeAreaSelect(data)}}></AreaSelector> : ''}
                        </View>
                        
                        <View className='am-input-box'>
                            <View className='input-line'>
                                <View className='input-name'>是否有经验</View>
                                <Input placeholder='请下拉选择是否有类似经验' value={exp} onClick={this.openExp} disabled className='input-areas'/>
                            </View>
                            <View className='am-icon' onClick={()=>{this.setState({selectExp:true})}}>
                                <Image src={IconEnter} className='am-input-icon' />
                            </View>
                            <AtActionSheet isOpened={selectExp}   onClose={this.closeSheet2} cancelText='取消'>
                                <AtActionSheetItem onClick={()=>{this.setState({exp:'有经验',expCode:'1',selectExp:false})}}>
                                    有经验
                                </AtActionSheetItem>
                                <AtActionSheetItem onClick={()=>{this.setState({exp:'无经验',expCode:'0',selectExp:false})}}>
                                    无经验
                                </AtActionSheetItem>
                            </AtActionSheet>
                        </View>
                        <AtInput
                            name='value8'
                            title='微信好友数'
                            type='number'
                            border={false}
                            placeholder='请输入微信好友数'
                            value={this.state.value8}
                            onChange={this.handleChange8.bind(this)}
                            
                        />
                    </View>
                    <View className='am-tuijian-box'>
                        <View className='am-tuijian-box-1'>
                            <View className='am-tuijian-box-1-word'>推荐人</View>
                            <View className='am-tuijian-box-1-touxiang'>
                                <AtAvatar circle size='small' image={this.state.headPortrait}></AtAvatar>
                            </View>
                            <View className='am-tuijian-box-1-name'>{this.state.nickName}</View>
                        </View>
                        <View className='am-tuijian-box-2'>
                            填写完成后请核对信息,完成相关支付后,账号将人工审核并开通子账号。
                        </View>
                    </View>
                </View>
                {this.state.hidden?'':<BottomBtn3 >
                    <View  onClick={this.addnow.bind(this)}>立即创建</View>
                    <AtModal isOpened={this.state.openDiago4} closeOnClickOverlay={false}>
                        <AtModalHeader className='am-diago-title1'>提交审核成功</AtModalHeader>
                        <AtModalContent>
                            <View className='acm-diago-content'>
                                <View className='am-diago-circles'>
                                    <View className='am-diago-circle-1'></View>
                                </View>
                                <View className='am-diago-line'>
                                    <View className='am-diago-words'>
                                        请及时完成支付,完成支付后账号将在12小时内开通。所留手机号即为登录账号，先对新达人进行培训吧。
                                    </View>
                                </View>
                            </View>
                        </AtModalContent>
                        <AtModalAction className='am-diago-btn'><Button onClick={this.changeModel4.bind(this)} ><Text className='am-diago-btn-word'>确定</Text></Button> </AtModalAction>
                    </AtModal>
                </BottomBtn3>}
                
            </View>
            
        )
    }
}