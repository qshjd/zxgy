import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text,Input} from '@tarojs/components';
import './checking.scss';
import { AtActivityIndicator } from 'taro-ui'
import CheckPanel from '../components/checkPanel'
import LoadMore from '../../../components/LoadMore'
import allapi from '../../../api'

let params ={}

export default class Checking extends Component{
    config: Config = {
        navigationBarTitleText: '子账号审核中'
    }
    constructor(props){
        super(props);
    }
    state = {
        datas:[],
        tel:'',
        page:1,
        pageSize:5,
        isLoading:false,
        isend:false,
        total:0
    }
    componentDidMount(){
        const {page,pageSize,tel} = this.state
        //初始化列表
        params = {page:page,pageSize:pageSize,tel:tel}
        this.query(params)
    }
    query =(params)=>{
        allapi.detail.checking_members(params)
        .then(res => {
            console.log(res)
            this.setState({
                datas:res.result.values,
                total:res.result.total,
            },()=>{
                if(this.state.total>this.state.datas.length){
                    this.setState({
                        page:this.state.page+1
                    })
                }else{
                    this.setState({
                        isend:true
                    })
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    inputTel=(e)=>{
        this.setState({
            tel:e.detail.value
        })
    }
    searchByTel =()=>{
        const {pageSize,tel} = this.state
        this.setState({
            page:1,
            isend:false
        },()=>{
            params = {page:this.state.page,pageSize:pageSize,tel:tel}
            this.query(params)
        })
    }
    loadData(){
        const {total,pageSize,page,datas,tel} = this.state
        params = {page:page,pageSize:pageSize,tel:tel}
        //判断当前数据是否加载完成
        if(total > datas.length ){
            this.setState({
                isLoading:true,  //更改状态为加载中，避免多次请求
            },() => {
                if(this.state.isLoading){
                    console.log('正在请求')
                    // return this.query(params)
                    return allapi.detail.checking_members(params)
                    .then(res => {
                        //合并数组
                        this.setState({
                            datas:this.state.datas.concat(res.result.values),
                        })
                        //判断数据是否加载完
                        console.log('当前page:',page)
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
                    
                }
            })
        }else{
            console.log('加载完成')
            this.setState({
                isend:true
            })
            return 
        }
    }
    getScrollStatus(detail){

    }
    render(){
        const panels = this.state.datas.map(item => {
            return <CheckPanel data={item}/>
        })
        return(
            <View className='ar-boxx'>
                <LoadMore 
                loadmore={()=>this.loadData()}
                getScrollStatus={(detail)=>this.getScrollStatus(detail)}
                threshold={20}
                isLoading={this.state.isLoading}
                arriveEnd={this.state.isend}>
                    <View className='tips'>以下列表是您提交的新臻选师审核信息，若没有看到您提交的信息，则代表已经审核，若有问题，请联系臻选大咖处理</View>
                    <View className='search_tel'>
                        <View className='telNum'>手机号</View>
                        <View className='input_box'>
                            <Input placeholder='筛选手机号' onInput={this.inputTel} value={this.state.tel}/>
                        </View>
                        <View className='search_btn' onClick={this.searchByTel}>搜索</View>
                    </View>
                    <View className='ar-lists'>
                        {panels}
                    </View>
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