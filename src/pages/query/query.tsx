import Taro, { Component, Config } from '@tarojs/taro';
import {View,Image,Button} from '@tarojs/components';
import { AtInput ,AtAvatar,AtToast} from 'taro-ui';
import './query.scss';
import IconLogo from '../../imgs/logo.jpg';
// import CheckCode from '../../imgs/icon_right@3x.png';
import allapi from '../../api'
import host from '../../utils/host'

export default class Query extends Component{
    config: Config = {
        navigationBarTitleText: '快递查询',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state={
        telnumber:'',
        code:'',
        isShow:false,
        errormsg:'',
        codeSrc:'',
        creatCode:'',
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.$router.params.msg){
            
            console.log('...')
            this.setState({
                isShow:true,
                errormsg:this.$router.params.msg
            },()=>{
                Taro.navigateBack({delta:2})
            })
        }
        this.get_code()
        //查单地址分享
        allapi.common.get_config()
        .then(res => {
        console.log(res)
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.noncestr, // 必填，生成签名的随机串
            signature: res.signature,// 必填，签名
            jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({ 
                title: '臻选果园快递查询', // 分享标题
                desc: '和新鲜水果之间只有一个快递的距离，正在加速运输中，美味值得等待。', // 分享描述
                link: 'http://www.zhenxuanguoyuan.cn/checklist/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://www.zhenxuanguoyuan.cn/server_wechat/images/public.png', // 分享图标
                success: function () {
                // 设置成功
                // console.log('分享设置成功')
                }
            })
            //分享到朋友圈
            wx.updateTimelineShareData({ 
                title: '臻选果园快递查询', // 分享标题
                link: 'http://www.zhenxuanguoyuan.cn/checklist/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://www.zhenxuanguoyuan.cn/server_wechat/images/public.png', // 分享图标
                success: function () {
                    // 设置成功
                    // alert('查单页设置成功')
                }
            })
        });
        })
    }
    //获取图形验证码
    get_code(){
        let nums= [ "0","1","2", "3", "4", "5", "6", "7", "8", "9"]
        var rand = new Array();
        let code=''
        for(var i = 0; i < 4; i++) {
            rand.push(rand[i]);
            rand[i] = nums[Math.floor(Math.random() * nums.length)]
        }
        rand.map(item => {
            code=code+item
        })
        this.setState({
            showToast:false,
            creatCode:code.toUpperCase(),    //转大写
            codeSrc:`${host}sys/order/getCode?code=${code}`
        })
    }
    changeCode=()=>{
        this.get_code()
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
    
    query(){
        const myreg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
        if(this.state.telnumber == ''){
            this.setState({
                isShow:true,
                errormsg:'手机号不能为空'
            })
        }else if(!myreg.test(this.state.telnumber)){
            this.setState({
                isShow:true,
                errormsg:'请输入正确的手机号!!'
            })
        }else if(this.state.code == ''){
            this.setState({
                isShow:true,
                errormsg:'验证码不能为空'
            })
        }else if(this.state.creatCode != this.state.code.toUpperCase()){
            this.setState({
                isShow:true,
                errormsg:'验证码不正确'
            })
            this.changeCode();
        }else{
            allapi.common.get_waitOrders({
                page:1,
                pageSize:1,
                tel:this.state.telnumber
            })
            .then(res => {
                console.log(res)
                if(res.success){
                    Taro.navigateTo({
                        url:`/pages/query/queryoutput?tel=${this.state.telnumber}`
                    })
                }else{
                    this.setState({
                        isShow:true,
                        errormsg:res.msg
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
            
        }
        
    }
    closeToast=()=>{
        this.setState({
            isShow:false,
            errormsg:''
        })
    }
    render(){
        let {telnumber,code,isShow,errormsg} = this.state;
        return(
            <View>
                <View className='query-container'>
                    <AtAvatar className='login-logo' image={IconLogo}></AtAvatar>
                    <AtToast isOpened={isShow} text={errormsg} duration={2000} onClose={this.closeToast}></AtToast>
                    <AtInput
                    className='query-mobile'
                    name='value1'
                    type='number'
                    border={false}
                    placeholder='请输入下单时的手机号进行查询'
                    value={telnumber}
                    maxLength='11'
                    onChange={this.handleChange1.bind(this)}
                    />
                    <AtInput
                    className='query-password'
                    name='value2'
                    type='text'
                    border={false}
                    placeholder='请输入验证码'
                    value={code}
                    maxLength='4'
                    onChange={this.handleChange2.bind(this)}
                    > 
                    <Image className='checkcode' src={this.state.codeSrc} onClick={this.changeCode}/>
                    {/* <Text className='checkcode-get'>看不清</Text> */}
                    </AtInput>
                    <Button className='query-button' onClick={this.query.bind(this)}>立即查询</Button>
                </View>
            </View>
        )
    }
}