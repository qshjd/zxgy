import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui'

import './teamdetails.scss'
import allapi from '../../../api'
import LoadMore from '../../../components/LoadMore'
import Loading from '../../../components/loadingPic'
export default class TeamDetails extends Component{
    config: Config = {
        navigationBarTitleText: '详情',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state = {
        page:1,
        pageSize:12,
        total:0,
        members:[],
        isLoading:false,
        isend:false,
        initialize:false
    }
    componentDidMount(){
        allapi.detail.grow_condition({
            page:this.state.page,
            pageSize:this.state.pageSize
        })
        .then(res => {
            this.setState({
                total:res.result.inviteCount,
                members:res.result.value,
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
    }
    loadData(){
        const {page,pageSize,total,members,} = this.state
        if(total>members.length){
            this.setState({
                isLoading:true
            },()=>{
                return allapi.detail.grow_condition({
                    page:page,
                    pageSize:pageSize
                })
                .then(res => {
                    //合并数组
                    this.setState({
                        members:this.state.members.concat(res.result.value),
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
        const infoList = this.state.members.map(item => {
            return (
                <tr>
                    <td>{item.nickName}</td>
                    <td>{item.joinTime.trim().split(" ")[0]}</td>
                    <td>{item.orderCount}</td>
                </tr>
            )
        })
        return(
            <View className='order-count-detail'>
            {this.state.initialize?'':<Loading>正在加载</Loading>}
            <LoadMore
                loadmore={()=>this.loadData()}
                getScrollStatus={(detail)=>this.getScrollStatus(detail)}
                threshold={20}
                isLoading={this.state.isLoading}
                arriveEnd={this.state.isend}>
                <View style='background: #ffffff;overflow: hidden;'>
                    <View className='panel'>
                        <View className='status qualified'>达标</View>
                        <View className='mark-number'>
                            <View className='title'>达标单量</View>
                            <View className='num'>{this.$router.params.conditionAll}</View>
                        </View>
                        <View className='real-number'>
                            <View className='title'>考核区间内被推荐人累计有效单量</View>
                            <View className='num'>{this.$router.params.countAll}</View>
                        </View>
                    </View>
                </View>
                <View style='background:#f4f4f4'><View className='icon'>明细</View></View>
                <View className='table-box'>
                    <table>
                        <tr>
                            <th>被推荐人昵称</th>
                            <th>加入时间</th>
                            <th>当前区间有效单量</th>
                        </tr>
                        {infoList}
                    </table>
                </View>
                <View style={{display:(this.state.isLoading)?'':'none'}}>
                        <AtActivityIndicator content='加载中(>.<)' ></AtActivityIndicator>
                    </View>
                    <View style={{display:(this.state.isend)?'':'none',marginBottom:'10px',fontSize:'15px',textAlign:'center',marginTop:'20px'}}>
                        {this.state.members.length >0 ?<Text>加载完成~</Text>:<Text>暂无成员</Text>}
                    </View>
                </LoadMore>
            </View>
        )
    }
}