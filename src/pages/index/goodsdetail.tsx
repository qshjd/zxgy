import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image,Text,Button,Swiper,SwiperItem } from '@tarojs/components';
import './goodsdetail.scss'
import icon1 from '../../imgs/details_kucun@3x.png'
import icon2 from '../../imgs/details_addr@3x.png'
import icon3 from '../../imgs/copy@3x.png'
import copy from 'copy-to-clipboard';
import { AtToast } from 'taro-ui'

import allapi from '../../api'
import host from '../../utils/host'

import Section from './components/section'
import Loading from '../../components/loadingPic'

export default class Goods extends Component{
    config: Config = {
        navigationBarTitleText: '商品详情',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    state = {
        entryID:this.$router.params.id,
        showToast:false,
        toastWord:'复制成功',
        result:{},
        banners:[],
        productDescribes:[],
        addShipAreas:[],
        noDeliverys:[],
        initialize:false,      //页面初始化
    }
    componentWillMount () {
        console.log(this.$router.params) // url传递的参数
    }
    orderEntry = () =>{
        Taro.navigateTo({
            url:`/pages/index/orderentry?id=${this.state.entryID}`
        })
    }
    componentDidMount(){
        allapi.home.get_goods_detail({
            id:this.state.entryID
        })
        .then(res => {
            console.log('商品详情',res)
            this.setState({
                result:res.result,
                banners:res.result.imageUrls,
                productDescribes:res.result.productDescribes,
                addShipAreas:res.result.addShips,
                noDeliverys:res.result.noExpresses,
                initialize:true
            })
        })
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
        const {showToast,toastWord,banners,productDescribes,addShipAreas,noDeliverys,initialize}=this.state
        const {productName,productDescribe,marketPrice,price,commission,inventory,productAreas,expressCompany} = this.state.result
        let bannerList = banners.map(item =>{
            return (
                <SwiperItem>
                    <Image src={host+item} style={{width:'100%',height:'100%'}}/>
                </SwiperItem>
            )
        })
        let describes = productDescribes.map(item => {
            return <Section datas={item}/>
        })
        let addShips = addShipAreas.map(item => {
            return (<Text>{item.areas.map(area => area.areaName+'-')}加{item.addShipping}元；</Text>)
        })
        let noShips = noDeliverys.map(item => {
            return (<Text>{item.areaName+'、'}</Text>)
        })
        return(
            <View >
                {initialize?'':<Loading>正在加载</Loading>}
                <AtToast isOpened={showToast} text={toastWord} duration={2000}></AtToast>
                <Swiper
                    className='fd-picture'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay>
                    {bannerList}
                </Swiper>
                <View className='fd-text-middle'>
                    <View className='fd-text-middle-1'>
                        <View className='fd-text-middle-1-head'>{productName}</View>
                        <View className='fd-text-middle-1-ctt'>{productDescribe}</View>
                        <View className='fd-text-middle-1-money'>
                            <View className='fd-text-middle-1-price'>售价:<span style={{fontSize:'17px'}}>¥{marketPrice}</span></View>
                            <View className='fd-text-middle-1-income'> 臻选师价:<span style={{ color:'#FB3F4C' ,fontSize:'17px'}}>￥{price}</span></View>
                        </View>
                        <View className='fd-text-middle-1-icons'>
                            <View className='fd-text-middle-1-icon'>
                                <Image src={icon1} className='fd-text-middle-1-pic'/>
                                <Text className='fd-text-middle-1-text'>库存：{inventory}</Text>
                            </View> 
                            <View className='fd-text-middle-1-icon'>
                                <Image src={icon2} className='fd-text-middle-1-pic'/>
                                <Text className='fd-text-middle-1-text'>产地：{productAreas}</Text>
                            </View>
                        </View>
                    </View>
                    <View className='fd-text-middle-2'>
                        <View className='fd-text-middle-2-head'>邮费说明</View>
                        <View className='fd-text-middle-2-text'>
                            <Text>{expressCompany}</Text><br/>
                            <View>{addShips}</View>
                            {noShips}不发货。
                        </View>
                    </View>
                </View>
                <View className='fd-text-bottom'>
                    <View className='fd-text-inforhead'>商品资料</View>
                    {describes}
                </View>
                <View className='fd-button' onClick={this.orderEntry}>订单录入</View>
            </View>
        )
    }
}