import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './checklogistics.scss';
// import { AtTimeline } from 'taro-ui'
import { AtActivityIndicator ,AtToast} from 'taro-ui'
import allapi from '../../../api'
// import Loading from '../../../components/'
import copy from 'copy-to-clipboard';

export default class Orders extends Component{
    config: Config = {
        navigationBarTitleText: '查看物流',
        navigationBarBackgroundColor:'white'
    }
    constructor () {
        super(...arguments)
    }
    state={
        orderInfo:{},
        logs:[],
        isLoading:true,
        emptyWords:'',
        sfWords:'',
        showToast:false,
        toastWord:'复制成功',
    }
    componentDidMount(){
        allapi.user.query_logistics({
            orderId:this.$router.params.orderId
        })
        .then(res => {
            console.log(res)
            this.setState({
                isLoading:false,
                orderInfo:res.prop2,
                logs:JSON.parse(res.prop.statusInfo).Traces.reverse()
            },()=>{
                if(this.state.logs.length == 0){
                    this.setState({
                        emptyWords:'暂无物流信息',
                        sfWords:'快递信息更新可能存在延迟，若较长时间未查到物流信息，请复制单号到对应快递公司官网进行查询。'
                    })
                }
            })
        })
    }
    clipboardNo = ()=>{
        console.log('...',this.state.orderInfo.expressCompanyId)
        if(copy(this.state.orderInfo.expressCompanyId)){
            this.setState({
                showToast:true
            })          
        }else{
            this.setState({
                showToast:true,
                toastWord:'复制失败'
            })
        }
    }
    closeToast=()=>{
        this.setState({
            showToast:false
        })
    }
    render(){
        const {createTm,reName,reTel,address,expressName,expressCompanyId} = this.state.orderInfo;
        console.log('render')
        let ctt = this.state.logs.map(item => {
            return (
                <View className='log-box'>
                    <View className='log-infor'>{item.AcceptStation}</View>
                    <View className='log-time'>{item.AcceptTime}</View>
                </View>
            )
        });
        return (
            <View className='cb-container'>
                <AtToast isOpened={this.state.showToast} text={this.state.toastWord} duration={2000} onClose={this.closeToast}></AtToast>
                <View className='check-box'>
                    {this.state.isLoading?<AtActivityIndicator size={46} content={'获取信息中'}  mode='center' customStyle={{fontWeight:'bold'}}></AtActivityIndicator>:''}
                    <View className='panel'>
                        <View className='top'>
                            <View className='time'>发货时间：{createTm}</View>
                            <View className='customer'>
                                <View className='name'>{reName}</View>
                                <View className='tel'>{reTel}</View>
                            </View>
                            <View className='goods'>{address}</View>
                        </View>
                        <View className='bottom'>
                            <View className='words'>
                                <View className='logi'>{expressName}</View>
                                <View className='logID'>{expressCompanyId}</View>
                                <View className='copy' onClick={this.clipboardNo}>复制单号</View>
                            </View>
                        </View>
                    </View>
                    <View className='delivery-status'>
                        <View className='ctt-box-wl'>
                            {ctt}
                            {this.state.logs.length == 0?<View style={{fontSize:'16px',lineHeight:'30px',textAlign:'center'}}>{this.state.emptyWords}</View>:""}   
                            {this.state.logs.length == 0?<View style={{fontSize:'16px'}}>{this.state.sfWords}</View>:""}   
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}