import Taro, { Component, Config } from '@tarojs/taro';
import {View,Text} from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui'
import './queryoutput.scss';
import allapi from '../../api';
import LogisticsList from './components/logisticsList'
import LoadMore from '../../components/LoadMore'

export default class QueryOutput extends Component{
    config: Config = {
        navigationBarTitleText: '快递查询',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state={
        page:1,
        pageSize:10,
        isLoading:false,
        isend:false,
        total:0,
        listDatas:[]
    }
    componentDidMount(){
        const {page,pageSize} = this.state
        allapi.common.get_waitOrders({
            page:page,
            pageSize:pageSize,
            tel:this.$router.params.tel
        })
        .then(res => {
            console.log(res)
            if(res.success){
                this.setState({
                    listDatas:res.result.rows,
                    total:res.result.total
                },()=>{
                    if(this.state.total>this.state.listDatas.length){
                        this.setState({
                            page:this.state.page+1
                        })
                    }else{
                        this.setState({
                            isend:true
                        })
                    }
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    loadData(){
        const {page,pageSize,total,listDatas} = this.state
        console.log('***')
        if(total>listDatas.length){
            this.setState({
                isLoading:true
            },()=>{
                return allapi.common.get_waitOrders({
                    page:page,
                    pageSize:pageSize,
                    tel:this.$router.params.tel
                })
                .then(res => {
                    //合并数组
                    this.setState({
                        listDatas:listDatas.concat(res.result.rows)
                    })
                    //判断数据是否加载完成
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
    getScrollStatus(detail){}
    render(){
        const lists=this.state.listDatas.map((item)=>{
            return(
                <LogisticsList datas={item}/>
            )
        })
        return(
            <View className='queryoutput-box'>
                <LoadMore 
                loadmore={()=>this.loadData()}
                getScrollStatus={(detail)=>this.getScrollStatus(detail)}
                threshold={40}
                isLoading={this.state.isLoading}
                arriveEnd={this.state.isend}>
                    <View className='qo-container'>
                        {lists}
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