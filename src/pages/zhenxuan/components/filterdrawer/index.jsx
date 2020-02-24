import Taro, { Component, Config } from '@tarojs/taro';
import {View,Picker} from '@tarojs/components';
import './index.scss';
import { AtActionSheet, AtActionSheetItem } from "taro-ui"

import allapi from '../../../../api'

let queryTypeSon = []

export default class FilterPanel extends Component{
    constructor(props){
        super(props);
    }
    state={
        now:0,
        timeSel1:'',
        timeSel2:'',
        start:'',
        end:'',
        openPanel:false,
        selectColor1:false,
        selectColor2:false,
        selectColor3:false,
        selectColor4:false,
        selectColor5:false,
        typeNames:[{name:'达20培训津贴',current:false,id:6},{name:'达80培训津贴',current:false,id:7},{name:'伯乐奖金',current:false,id:3},{name:'管理奖金',current:false,id:2}]
    }
    openPanel(){
        this.setState({
            openPanel:true
        })
    }
    closePanel(){
        this.setState({
            openPanel:false
        })
        let data={amountType:queryTypeSon.sort(),timeFrom:this.state.timeSel1,timeTo:this.state.timeSel2}
        this.props.search(data)
    }
    selectedBtn(id){
        this.setState({
            selectColor
        })
    }
    isSelect(current,key,id){
        this.state.typeNames[key][`current`] = !current;
        this.setState({
            typeNames:this.state.typeNames
        },()=>{
            if(this.state.typeNames[key].current == true){
                queryTypeSon = queryTypeSon.concat(id)
            }else{
                let index = queryTypeSon.indexOf(id)
                if (index > -1) {
                    queryTypeSon.splice(index, 1);
                }
            }
        })
    }
    onDateChange1 = (e) =>{
        this.setState({
            timeSel1: e.detail.value
        })
    }
    onDateChange2 = (e) =>{
        this.setState({
            timeSel2: e.detail.value
        })
    }
    componentDidMount(){
        //获取时间筛选条件
        allapi.common.get_joinTimeAndToday()
        .then(res => {
            // console.log(res)
            this.setState({
                timeSel1:res.joinTime,
                timeSel2:res.today,
                start:res.joinTime,
                end:res.today,
            })
        })

    }
    componentWillReceiveProps(){
        this.setState({
            now:this.props.now
        })
        
    }
    render(){
        let typebtns = this.state.typeNames.map((item,key,id)=> {
            return <View className='ah-content-panel-1-btn' key={key} onClick={this.isSelect.bind(this,item.current,key,item.id)} style={{background: (item.current === true) ? "#FEE201" : "#F5F4F7"}}>
                <View className='ah-content-panel-1-btn-word'>
                    {item.name}
                </View>
            </View>
        })
        return(
            <View >
                <View className='filter-icon' onClick={this.openPanel.bind(this)}>
                    <View style={{fontSize:'14px',lineHeight:'40px',textAlign:'center'}}>筛选</View>
                </View>
                <AtActionSheet isOpened={this.state.openPanel}  title='条件筛选' cancelText='确认' onClose={this.closePanel.bind(this)}>
                                <View style={{display:(this.props.now == 0)?'':'none'}}>
                                    <View style={{textAlign:'left',fontSize:'16px',paddingLeft:'10px'}}>分类</View>
                                    <View className='ah-content-panel-1'>
                                        {typebtns}
                                    </View>
                                </View>
                                <View style={{textAlign:'left',fontSize:'16px',paddingLeft:'10px'}}>时间</View>
                                <View className='picker1'>
                                    <Picker mode='date' onChange={this.onDateChange1} style={{zIndex:'2000'}} start={this.state.start} end={this.state.end}>
                                        <View className='time-box'>{this.state.timeSel1}</View>
                                    </Picker>
                                    <View className='time-middle'>-</View>
                                    <Picker mode='date' onChange={this.onDateChange2} start={this.state.start} end={this.state.end}>
                                        <View className='time-box'>{this.state.timeSel2}</View>
                                    </Picker>
                                </View>
                                
                </AtActionSheet>
            </View>
        )
    }
}