import Taro, { Component, Config } from '@tarojs/taro';
import {View,Input} from '@tarojs/components';
import './teaminformation.scss';

import { AtToast } from "taro-ui"
import allapi from '../../../api'

import copy from 'copy-to-clipboard';

export default class TeamInformation extends Component{
    config: Config = {
        navigationBarTitleText: '团队信息'
    }
    constructor(props){
        super(props);
    }
    state={
        showToast:false,
        name:'',
        basicInfo:{},
        toastWord:'复制成功'
    }
    componentDidMount(){
        allapi.detail.get_team_infor()
        .then(res => {
            console.log(res)
            this.setState({
                basicInfo:res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }
    handleInput = (e) =>{
        this.setState({
            name:e.detail.value
        })
    }
    clipboardNo = ()=>{
            console.log(this.state.basicInfo.weixin)
            if(copy(this.state.basicInfo.weixin)){
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
    saveTeamName =()=>{
        allapi.detail.write_team_name({
            name:this.state.name
        })
        .then(res => {
            console.log(res)
            if(res.result){
                this.setState({
                    showToast:true,
                    toastWord:'保存成功'
                })
            }else{
                this.setState({
                    showToast:true,
                    toastWord:'保存失败'
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    closeToast=()=>{
        this.setState({
            showToast:false,
        })
    }
    render(){
        const {showToast,toastWord,name} = this.state
        const {teamName,weixin,memberTotal,createTime} = this.state.basicInfo
        return(
            <View>
                <AtToast isOpened={showToast} text={toastWord} duration={2000} onClose={this.closeToast}></AtToast>
                <View className='tim-title'>
                    <View className='tim-title-box'>
                        <View className='tim-title-box-word'>基本信息</View>
                    </View>
                </View>
                
                <View className='tim-ctt'>
                    <View className='tim-ctt-name'>团队名称</View>
                    {teamName?<View className='tim-ctt-value-1'>{teamName}</View>:<View className='tim-ctt-value'>
                        <Input placeholder='团队名称仅可更改一次' value={name} onInput={this.handleInput}/>
                    </View>}
                    {teamName?'':<View className='tim-ctt-action' onClick={this.saveTeamName} >保存</View>}
                </View>

                <View className='tim-ctt'>
                    <View className='tim-ctt-name'>团长微信</View>
                    <View className='tim-ctt-value-copy' >{weixin}</View>
                    <View className='tim-ctt-action copy'  onClick={this.clipboardNo}>复制</View>
                </View>
                <View className='tim-ctt'>
                    <View className='tim-ctt-name'>团长级别</View>
                    <View className='tim-ctt-value-1'>臻选大咖</View>
                </View>
                <View className='tim-ctt'>
                    <View className='tim-ctt-name'>团队人数</View>
                    <View className='tim-ctt-value-1'>{memberTotal}</View>
                </View>
                <View className='tim-ctt'>
                    <View className='tim-ctt-name'>创建时间</View>
                    <View className='tim-ctt-value-1'>{createTime}</View>
                </View>
                
            </View>
        )
    }
}