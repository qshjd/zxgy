
import Taro, { Component, Config } from '@tarojs/taro';
import {View,Picker,Input,Image} from '@tarojs/components';
import './drawer.scss';
import { AtDrawer } from 'taro-ui'

import Eye from '../../../../imgs/can_see@2x.png'
import Filter from '../../../../imgs/filter@2x.png'
import DropDown from '../../../../imgs/drop-down_on@2x.png'

// import ShortBtn from '../../../../components/shortbtn/shortbtn'
import BottomBtn from '../../../../components/bottombtn/bottombtn'

import allapi from '../../../../api'
import { formatWithOptions } from 'util';

let params = {}
let memberIDs = []
let goodsIDs = []
let cliamIDs = []
export default class Drawer extends Component{
    constructor () {
        super(...arguments)
    }
    state={
        show:false,
        timeFrom:'',
        timeTo:'',
        reciveName:'',
        reciveTel:'',
        claimType:[{name:'待处理',current:false,id:1},{name:'处理中',current:false,id:2},{name:'已处理',current:false,id:4},{name:'已完结',current:false,id:3}],
        submitPeoples:[],
        goodsNames:[],
        selectName:false,
        dropDown1:false,
        dropDown2:false,
        current:false,
        // memberIDs:[],
        choseMember:true,
        drawerNow:''
    }
    openDrawer(){
        this.setState({show:true})
        // console.log('抽屉的参数：',this.props.now,this.state.drawerNow)
    }
    componentWillReceiveProps(){
        this.setState({drawerNow:this.props.now})
        if(this.props.now != this.state.drawerNow){
            this.reset()
        }
    }
    closeDrawer(){
        this.setState({show:false})
    }
    onDateChange1 = e => {
        this.setState({
            timeFrom: e.detail.value
        })
    }
    onDateChange2 = e => {
        this.setState({
            timeTo: e.detail.value
        })
    }
    hanldeChange1 = e =>{
        this.setState({
            reciveName: e.detail.value
        })
    }
    hanldeChange2 = e =>{
        this.setState({
            reciveTel: e.detail.value
        })
    }
    componentDidMount(){
        //查询初始化时间
        allapi.common.get_joinTimeAndToday()
        .then(res => {
            this.setState({
                timeFrom:res.joinTime,
                timeTo:res.today
            })
        })
        //查询所有提交人
        allapi.user.get_all_members({
            pageNo:'1',
            pageNum:'10000'
        })
        .then(res => {
            this.setState({
                submitPeoples:res.prop
            })
        })
        //查询所有商品
        allapi.user.get_all_goods()
        .then(res => {
            console.log(res)
            this.setState({
                goodsNames:res.prop
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    //查询所有提交人
    queryAllMembers = () => {
        allapi.user.get_all_members({
            pageNo:'1',
            pageNum:'10000'
        })
        .then(res => {
            this.setState({
                submitPeoples:res.prop
            })
        })
    }
    dropdDown1=() =>{
        this.setState({
            dropDown1:!this.state.dropDown1
        })
    }
    dropdDown2=() =>{
        this.setState({
            dropDown2:!this.state.dropDown2
        })
    }
    searchOrder =()=>{
        // console.log('kkkk')
        const {timeFrom,timeTo,reciveName,reciveTel} = this.state
        let memberStr = memberIDs.map(item => item).join(";")
        let goodsStr = goodsIDs.map(item => item).join(";")
        let claimStr = cliamIDs.map(item => item).join(";")
        this.setState({show:false},()=>{
            this.props.search(memberStr,goodsStr,timeFrom,timeTo,reciveName,reciveTel,claimStr)
        })
    }
    reset = ()=>{
        memberIDs=[]
        goodsIDs=[];
        cliamIDs = []
        //清空已选择提交人
        this.state.submitPeoples.map(item => {
            console.log(item)
            item.current = false
            this.setState({
                submitPeoples: this.state.submitPeoples
            })
        })
        //清空已选择商品,收货人姓名、电话
        this.state.goodsNames.map(item => {
            console.log(item)
            item.current = false
            this.setState({
                goodsNames: this.state.goodsNames,
                reciveName:'',
                reciveTel:''
            })
        })
        //清空售后状态
        this.state.claimType.map(item => {
            item.current = false
            this.setState({
                claimType: this.state.claimType
            })
        })
        //初始化查询时间
        allapi.common.get_joinTimeAndToday()
        .then(res => {
            this.setState({
                timeFrom:res.joinTime,
                timeTo:res.today
            },()=>{
                const {timeFrom,timeTo,reciveName,reciveTel} = this.state
                let memberStr = memberIDs.map(item => item).join(";")
                let goodsStr = goodsIDs.map(item => item).join(";")
                let claimStr = cliamIDs.map(item => item).join(";")
                
                this.props.search(memberStr,goodsStr,timeFrom,timeTo,reciveName,reciveTel,claimStr)
                
            })
        })
        
    }
    isSelect(current,key,type,id){
        console.log(type)
        switch(type){
            case 'submitPeoples':
                this.state.submitPeoples[key][`current`] = !current;
                this.setState({
                    submitPeoples: this.state.submitPeoples
                },()=>{
                    if(this.state.submitPeoples[key].current == true){  //若点击后为选中
                        memberIDs = memberIDs.concat(id)
                    }else{     //取消选中，删除该值
                        let index = memberIDs.indexOf(id)
                        if(index > -1){
                            memberIDs.splice(index,1);
                        }
                    }
                });
                
                break;
            case 'goodsNames':
                this.state.goodsNames[key][`current`] = !current;
                this.setState({
                    goodsNames: this.state.goodsNames
                },()=>{
                    if(this.state.goodsNames[key].current == true){
                        goodsIDs = goodsIDs.concat(id)
                    }else{
                        let index = goodsIDs.indexOf(id)
                        if(index > -1){
                            goodsIDs.splice(index,1);
                        }
                    }
                });
                break;
            case 'claimType':
                this.state.claimType[key][`current`] = !current;
                this.setState({
                    claimType: this.state.claimType
                },()=>{
                    if(this.state.claimType[key].current == true){
                        cliamIDs = cliamIDs.concat(id)
                    }else{
                        let index = cliamIDs.indexOf(id)
                        if(index > -1){
                            cliamIDs.splice(index,1);
                        }
                    }
                });
                break;
            default:
                console.log('意料之外的错误');
                break;
        }
    }
    //触发父组件的方法来查询成员的
    searchMember=()=>{
        if(this.props.levelCode == '1001'){
            this.props.queryMembers(true)
        }else{
            this.props.queryMembers(false)
        }
    }
    //触发父组件的方法来查询自己的
    searchOwn =() => {
        console.log('触发了。。。')
        this.props.queryOwn()
    }
    //触发父组件的方法来查询未完成的售后
    searchHandled = ()=>{
        this.props.queryCliamState(1)
    }
    //触发父组件的方法来查询已完成的售后
    searchAll = () => {
        this.props.queryCliamState(2)
    }
    render(){
        let {show,timeFrom,timeTo,submitPeoples,selectName,current,dropDown1,dropDown2,goodsNames,claimType,choseMember,reciveName,reciveTel}=this.state
        let boxHeight = (4.5*(submitPeoples.length/3)+'em');
        let boxHeight2 = (4*(goodsNames.length)+'em');
        // console.log('查看成员？',this.state.choseMember)
        let box1style,box2style;
        if(dropDown1 == true){
            box1style = {
                height:boxHeight
            }
        }else{
            box1style = {
                maxHeight:'6em'
            }
        }
        if(dropDown2 == true){
            box2style = {
                height:boxHeight2
            }
        }else{
            box2style = {
                maxHeight:'6em'
            }
        }
        // console.log(box1style)
        let peoplebtns = submitPeoples.map((item,key) => {
            return <View className='short-btn' onClick={this.isSelect.bind(this,item.current,key,'submitPeoples',item.id)} style={{background: (item.current === true) ? "#FEE201" : "#F5F4F7"}}>
                        <View className='short-btn-word' >
                            {item.nickname}
                        </View>
                    </View>
        })
        let goodsbtns = goodsNames.map((item,key) =>{
            return <View className='long-btn' onClick={this.isSelect.bind(this,item.current,key,'goodsNames',item.code)} style={{background: (item.current === true) ? "#FEE201" : "#F5F4F7"}}>
                <View className='short-btn-word'>
                    {item.name}
                </View>
            </View>
        })
        let statusbtns = claimType.map((item,key) => {
            return <View className='short-btn' onClick={this.isSelect.bind(this,item.current,key,'claimType',item.id)} style={{background: (item.current === true) ? "#FEE201" : "#F5F4F7"}}>
                        <View className='short-btn-word' >
                            {item.name}
                        </View>
                    </View>
        })
        return(   
                <View className='sub-acitons'>
                    <View className='sub-acitons-look' >
                        {this.props.lookMember?<View className='sub-acitons-look-word' onClick={this.searchMember} style={{display:(this.props.now != 3)?'':'none'}}>查看成员</View>
                        :<View className='sub-acitons-look-word' onClick={this.searchOwn} style={{display:(this.props.now != 3)?'':'none'}}>仅看自己</View>}
                        {this.props.cliamState?<View className='sub-acitons-look-word' onClick={this.searchHandled} style={{display:(this.props.now == 3)?'':'none'}}>仅看已处理</View>
                        :<View className='sub-acitons-look-word' onClick={this.searchAll} style={{display:(this.props.now == 3)?'':'none'}}>查看所有</View>}
                        <Image src={Eye} className='sub-acitons-look-icon'/>
                    </View>
                    
                    <View className='sub-acitons-chose' onClick={this.openDrawer.bind(this)}>
                        <View className='sub-acitons-look-word'>筛选</View>
                        <Image src={Filter} className='sub-acitons-look-icon'/>
                    </View>
                    <AtDrawer
                        show={show}
                        right
                        mask
                        width='70%'
                        onClose={this.closeDrawer.bind(this)}
                        >
                            <footer className='drawer-btn-box'>
                                <View className='drawer-bottom-btn'>
                                    <View className='left2' onClick={this.reset}>
                                        <View className='btn-word'>重置</View>
                                    </View>
                                    <View className='right2' onClick={this.searchOrder}>
                                        <View className='btn-word' >筛选</View>
                                    </View>
                                </View>
                            </footer>
                            <View className='drawer-ctt-box'>
                                <View className='drawer-item-title'>筛选</View>
                                <View className='drawer-item-time'>
                                    <View className='drawer-item-time-1'>时间</View>
                                    <View className='drawer-item-time-2'>
                                        <View className='drawer-item-time-2-t'>开始时间</View>
                                        <View className='drawer-item-time-2-b'>
                                            <Picker mode='date' onChange={this.onDateChange1}>
                                                <View className='drawer-item-2-b-picker'>
                                                    {timeFrom}
                                                </View>
                                            </Picker>
                                        </View>
                                    </View>
                                    <View className='drawer-item-time-2'>
                                        <View className='drawer-item-time-2-t'>结束时间</View>
                                        <View className='drawer-item-time-2-b'>
                                            <Picker mode='date' onChange={this.onDateChange2}>
                                                <View className='drawer-item-2-b-picker'>
                                                    {timeTo}
                                                </View>
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                                <View className='drawer-item-personinfor'>
                                    <View className='drawer-item-time-2'>
                                        <View className='drawer-item-time-2-t'>收货姓名</View>
                                        <View className='drawer-item-time-2-b'>
                                            <Input placeholder='请输入收货人姓名' className='drawer-input' value={this.state.reciveName} onInput={this.hanldeChange1}/>
                                        </View>
                                    </View>
                                    <View className='drawer-item-time-2'>
                                        <View className='drawer-item-time-2-t'>收货电话</View>
                                        <View className='drawer-item-time-2-b'>
                                            <Input placeholder='请输入收货人电话' className='drawer-input' value={this.state.reciveTel} onInput={this.hanldeChange2}/>
                                        </View>
                                    </View>
                                </View>
                                {this.props.levelCode == '1001'?<View className='drawer-item-seletname' style={box1style}>
                                    <View className='title'>
                                        <View className='word'>提交人姓名</View>
                                        <Image src={DropDown} className='icon' onClick={this.dropdDown1} style={{transform: (dropDown1 === true) ? "rotate(180deg)" : "rotate(0deg)"}}/>
                                    </View>
                                    <View className='allpeople'>
                                        {peoplebtns}
                                    </View>
                                </View>:''}
                                <View className={(this.props.now == 3)?'drawer-item-seletname':'drawer-item-seletname-bot'} style={box2style}>
                                    <View className='title'>
                                        <View className='word'>商品</View>
                                        <Image src={DropDown} className='icon' onClick={this.dropdDown2} style={{transform: (dropDown2 === true) ? "rotate(180deg)" : "rotate(0deg)"}}/>
                                    </View>
                                    <View className='allpeople'>
                                        {goodsbtns}
                                    </View>
                                </View>
                                <View className='drawer-item-seletname-bot' style={box2style} style={{display:(this.props.now == 3)?'':'none'}}>
                                    <View className='title'>
                                        <View className='word'>状态</View>
                                    </View>
                                    <View className='allpeople'>
                                        {statusbtns}
                                    </View>
                                </View>
                            </View>
                    </AtDrawer>
                </View>
        )
    }
}