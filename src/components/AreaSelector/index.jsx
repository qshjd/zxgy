import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './index.scss';

import allapi from '../../api'

export default class AreaSelector extends Component{
    state={
        areaSelected:[
            {key:"province"},
            {key:"city"},
            {key:"county"}
        ],
        code:1,
        list:{
            0:[],1:[],2:[]
        },
        selectStatus:0,
        show:false,
        closeMain:false
    }
    setSelectArea(choseItem){
        if(this.state.selectStatus <= 2){
            this.setState({
                areaSelected:this.state.areaSelected.map((item,index) => {
                    return index == this.state.selectStatus ? Object.assign({},item,choseItem,):item
                }),
                
            })
            if(this.state.selectStatus <2){
                console.log(choseItem)
                this.setState({
                    selectStatus:this.state.selectStatus + 1,
                    code:choseItem.id
                },()=>{
                    //
                    console.log('请求下一级选择列表',this.state.code)
                    this.queryData()
                })
            }else{
                this.closePanel(1)
            }
        }
    }
    closePanel(e){
        if(e === 1 ||  e.target && e.target.className == 'select-back-panel'){
            this.setState({
                closeMain:true
            },()=>{
                setTimeout(() => {
                    this.props.close(e === 1 && this.state.areaSelected)
                }, 300);
            })
        }
    }
    componentWillMount(){
        this.setState({
            show:true
        })
    }
    queryData(){
        allapi.detail.get_areas({
            pid:this.state.code
        })
        .then(res => {
            // console.log('省市区：',res)
            // this.state.goodsNames[key][`current`] = !current;
            this.state.list[this.state.selectStatus] = res
            this.setState({
                list:this.state.list
            },()=>{
                console.log(this.state.list)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    componentDidMount(){
        this.queryData();
    }
    resetSelect(index){
        this.setState({
            selectStatus:index
        },()=>{
            this.setState({
                areaSelected:this.state.areaSelected.map((item,index) => {
                    return index <= this.state.selectStatus ? item:{key:item.key}
                })
            })
        })
    }
    render(){
        let selected = this.state.areaSelected.filter((key,index)=>key.id || this.state.selectStatus >= index).map((item,index) => {
            return <View 
                    onClick={()=>{this.resetSelect(index)}} 
                    className={"selected-value" + (this.state.selectStatus == index ? " active":"")}>{item.name || "请选择"}</View>
        })
        let list = this.state.list[this.state.selectStatus].map(item => {
            return <View 
                    className={'list-item' + (this.state.areaSelected[this.state.selectStatus].id == item.id ? " active" :"")} 
                    onClick={this.setSelectArea.bind(this,item)}>{item.name}</View>
        })
        return(
            <View className="select-back-panel" onClick={this.closePanel.bind(this)}>
                {this.state.show ?  <View className={'area-selector' + (this.state.closeMain ? " on-close" : "")}>
                    <View className="title">选择省市区</View>
                    <View className="selected-area">
                        {selected}
                    </View>
                    <View className="list-items">
                        {list}
                    </View>
                </View> : ""}
            </View>
        )
    }
}