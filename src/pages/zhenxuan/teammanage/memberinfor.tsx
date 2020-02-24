import Taro, { Component, Config } from '@tarojs/taro';
import {View,Picker,Input,ScrollView,Text} from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui'
import './memberinfor.scss';

import allapi from '../../../api'
import LoadMore from '../../../components/LoadMore'
import Loading from '../../../components/loadingPic'

export default class MemberInfor extends Component{
    config: Config = {
        navigationBarTitleText: '团队成员'
    }
    constructor(props){
        super(props);
    }
    state={
        timeFrom: '',
        timeTo: '',
        page:1,
        pageSize:15,
        isLoading:false,
        isend:false,
        total:0,
        members:[],
        nickname:'',
        initialize:false, //页面初始化
    }
    onDateChange3 = e => {
        this.setState({
            timeFrom: e.detail.value
        })
    }
    onDateChange4 = e => {
        this.setState({
            timeTo: e.detail.value
        })
    }
    componentDidMount(){
        //获取加入时间和当前时间
        allapi.common.get_joinTimeAndToday()
        .then(res => {
            this.setState({
                timeFrom:res.joinTime,
                timeTo:res.today
            })
        })
        allapi.detail.get_team_member({
            page:1,
            pageSize:this.state.pageSize
        })
        .then(res => {
            this.setState({
                members:res.value,
                total:res.total,
                initialize:true
            },()=>{
                if(this.state.total>this.state.members.length){
                    this.setState({
                        page:this.state.page+1
                    })
                }else{
                    console.log('加载完成')
                    this.setState({
                        isend:true
                    })
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
        this.search()
    } 
    inputnickname = (e) => {
        this.setState({
            nickname:e.target.value
        })
    }
    search = () => {
        //查询
        this.setState({
            page:1
        },()=>{
            allapi.detail.get_team_member({
                page:1,
                pageSize:this.state.pageSize,
                nickName:this.state.nickname,
                timeFrom:this.state.timeFrom+" 00:00:00",
                timeTo:this.state.timeTo+" 23:59:59"
            })
            .then(res => {
                this.setState({
                    members:res.value,
                    total:res.total
                },()=>{
                    if(this.state.total>this.state.members.length){
                        this.setState({
                            page:this.state.page+1
                        })
                    }else{
                        console.log('加载完成')
                        this.setState({
                            isend:true
                        })
                    }
                })
            })
        })
    }
    memberDetail(id){
        Taro.navigateTo({
            url:`/pages/zhenxuan/teammanage/memberdetail?id=${id}`
        })
    }
    loadData(){
        const {page,pageSize,total,members,timeFrom,timeTo,nickname} = this.state
        if(total>members.length){
            this.setState({
                isLoading:true
            },()=>{
                return allapi.detail.get_team_member({
                    page:page,
                    pageSize:pageSize,
                    nickName:nickname,
                    timeFrom:timeFrom+" 00:00:00",
                    timeTo:timeTo+" 23:59:59"
                })
                .then(res => {
                    //合并数组
                    this.setState({
                        members:this.state.members.concat(res.value),
                    })
                    //判断数据是否加载完
                    if(total <= page*pageSize){
                        this.setState({
                            isend:true,
                            isLoading:false
                        })
                    }else{
                        this.setState({
                            page:page+1,
                            isLoading:false
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        isLoading:false
                    })
                })
            })
        }else{
            this.setState({
                isend:true
            })
            return 
        }
    }
    getScrollStatus(detail){

    }
    render(){
        const {members,initialize} = this.state
        const nameList = members.map(index => {
            return (
                <div className='left-td' onClick={this.memberDetail.bind(this,index.id)}>{index.nickName}</div>
            )
        })
        const infoList = members.map(index => {
            return (
                <tr>
                    <td>{index.joinTime.slice(0,10)}</td>
                    <td>{index.weixin}</td>
                    <td>{index.inviteTotal}</td>
                    <td>{index.saleAmount?index.saleAmount:0}</td>
                </tr>
            )
        })
        return (
            <View className='member-list-page'>
                {initialize?'':<Loading>正在加载</Loading>}
                <LoadMore 
                loadmore={()=>this.loadData()}
                getScrollStatus={(detail)=>this.getScrollStatus(detail)}
                threshold={20}
                isLoading={this.state.isLoading}
                arriveEnd={this.state.isend}>
                    <View className='mr-line'>
                        <View className='mr-line-title'>加入时间</View>
                        <View className='mr-line-box'>
                            <View className='mr-line-box-date-from'>
                                <Picker mode='date' onChange={this.onDateChange3}>
                                    <View className='picker'>
                                        {this.state.timeFrom}
                                    </View>
                                </Picker>
                            </View>
                            <View className='mr-line-box-date-middle'>-</View>
                            <View className='mr-line-box-date-to'>
                                <Picker mode='date' onChange={this.onDateChange4}>
                                    <View className='picker'>
                                        {this.state.timeTo}
                                    </View>
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View className='mr-line'>
                        <View className='mr-line-title'>昵称</View>
                        <View className='mr-line-box-2'>
                            <Input placeholder='输入昵称搜索' className='mr-line-box-input' placeholderClass='pla' value={this.state.nickname} onInput={this.inputnickname}></Input>
                        </View>
                        <View className='mr-line-search'>
                            <View className='mr-line-search-word' onClick={this.search}>搜索</View>
                        </View>
                    </View>
                    
                    <View className='mr-middle'>
                        <View className='mr-middle-box'>
                            <View className='mr-middle-box-word'>结果</View>
                        </View>
                    </View>
                    

                    <div className="box-members">
                        <div className="left">
                            <div className='left-th'>
                                昵称
                            </div>
                            {nameList}
                        </div>
                        <div className="right">
                            <table>
                                <thead>
                                    <tr>
                                        <th>加入时间</th>
                                        <th>微信号</th>
                                        <th>推荐数</th>
                                        <th>销售额</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {infoList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <View style={{display:(this.state.isLoading)?'':'none'}}>
                        <AtActivityIndicator content='加载中(>.<)' ></AtActivityIndicator>
                    </View>
                    <View style={{display:(this.state.isend)?'':'none',marginBottom:'10px',fontSize:'15px',textAlign:'center',marginTop:'20px'}}>
                        <Text>加载完成~</Text>
                    </View>
                </LoadMore>
            </View>
        )
    }
}