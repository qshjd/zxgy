import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import copy from 'copy-to-clipboard';
import './memberdetail.scss';

import UserTop from '../../../components/usertop/usertop'
import Container from '../../../components/container/container';

import allapi from '../../../api'
import host from '../../../utils/host'

export default class MemberDetail extends Component{
    config: Config = {
        navigationBarTitleText: '更多信息'
    }
    state = {
        info:{}
    }
    componentDidMount(){
        allapi.detail.get_member_detail({
            id:this.$router.params.id
        })
        .then(res => {
            console.log(res)
            this.setState({
                info:res
            })
        })
    }
    constructor(props){
        super(props);
    }
    componentWillMount () {
        console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
    }
    //点击复制到剪切板
    cpStr = (node) => {
        let textNode =  node.props.children,
        str= '';
        if( typeof textNode  == 'string'){
            str = textNode
        }else {
            textNode.forEach( (val)=> {
                if (typeof val == 'string'){
                    str = `${str}${val}`
                }
            })
        }
        console.log(str)
        if(copy(str)){
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
    render(){
        const {info} = this.state;
        return (
            <Container>
                <UserTop nickName={info.nickName} headImg={info.headImg} />
                <View className='md-btn'>
                    <View className='md-btn-word'>基本信息</View>
                </View>
                <View className='md-box1'>
                    <View className='md-box1-line'>
                        <View className='md-box1-line-name'>微信号</View>
                        <View className='md-box1-line-value' ref='weixin'>{info.weixin}</View>
                        <View className='md-box1-line-action' onClick={()=>{this.cpStr(this.refs.weixin)}}>复制</View>
                    </View>
                    <View className='md-box1-line'>
                        <View className='md-box1-line-name'>直接推荐人</View>
                        <View className='md-box1-line-value'>
                        <AtAvatar circle size='small' image={info.inviterHeadImg} customStyle={{marginRight:'10px'}}></AtAvatar> 
                        {/* <View className='md-box1-line-value-img'></View> */}
                            {info.inviter}
                        </View>
                    </View>
                    <View className='md-box1-line-2'>
                        <View className='md-box1-line-name'>加入时间</View>
                        <View className='md-box1-line-value'>{info.joinTime}</View>
                    </View>
                </View>
                
                <View className='md-btn'>
                    <View className='md-btn-word'>其他信息</View>
                </View>
                <View className='md-box2'>
                    <View className='md-box2-ctt'>
                        <View className='md-box2-ctt-box'>
                            <View className='md-box2-ctt-box-1'>{info.inviteCount}</View>
                            <View className='md-box2-ctt-box-2'>推荐达人数</View>
                        </View>
                        
                        <View className='md-box2-ctt-box'>
                            <View className='md-box2-ctt-box-1'>{info.effectInviteCount}</View>
                            <View className='md-box2-ctt-box-2'>推荐有效达人</View>
                        </View>
                        <View className='md-box2-ctt-box'>
                            <View className='md-box2-ctt-box-1'>{info.orderCountToday}</View>
                            <View className='md-box2-ctt-box-2'>今日订单数</View>
                        </View>
                        <View className='md-box2-ctt-box'>
                            <View className='md-box2-ctt-box-1'>{info.saleAmount}</View>
                            <View className='md-box2-ctt-box-2'>销售额</View>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}