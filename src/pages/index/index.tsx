import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem,Image,Text } from '@tarojs/components'
import './index.scss'
import { AtActivityIndicator } from 'taro-ui'

import icon1 from '../../imgs/icon1@2x.png'
import icon2 from '../../imgs/icon2@2x.png'
import icon3 from '../../imgs/icon3@2x.png'
import icon4 from '../../imgs/icon4@2x.png'
import IconLeft from '../../imgs/icon_left@2x.png'
import IconRight from '../../imgs/icon_right@2x.png'


import allapi from '../../api';
import LoadMore from '../../components/LoadMore'
import GoodsList from './components/GoodsList';
import Loading from '../../components/loadingPic'
// import TestImg from '../../imgs/home_test.jpg'

import host from '../../utils/host'

export default class Index extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '臻选果园',
        navigationBarBackgroundColor:'#FFFFFF'
    }
    componentWillMount () {

    }

    componentWillUnmount () { } 

    componentDidShow () { }

    componentDidHide () { }
    state={
        goods:[],       //列表数组
        bannerList:[],   //首页轮播图
        page:1,          //当前页码
        total:0,         //总条数
        pageSize:6,     //每页包含的条数
        isend:false,    //是否加载完
        isLoading:false,
        initialize:false, //页面初始化
    }

    componentDidMount(){
        //轮播
        allapi.home.get_banners()
        .then(res =>{
            this.setState({
                bannerList:res,
                
            })
        })
        .catch(error =>{
            console.log(error)
        })
        //商品列表
        allapi.home.get_goods_list({
            page:this.state.page,
            pageSize:this.state.pageSize
        })
        .then(res =>{
            console.log('商品信息：',res)
            this.setState({
                goods:res.rows,
                total:res.total,
                initialize:true
            },()=>{
                if(this.state.total>this.state.goods.length){
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
        .catch(error =>{
            console.log(error)
        })
    }
    loadData = () =>{
        const {total,pageSize,page,goods} = this.state
        //判断当前数据是否加载完成
        if(total > goods.length ){
            this.setState({
                isLoading:true,  //更改状态为加载中，避免多次请求
            },() => {
                if(this.state.isLoading){
                    // console.log('正在请求')
                    return allapi.home.get_goods_list({
                        page:page,
                        pageSize:pageSize
                    })
                    .then(res => {
                        //合并数组
                        this.setState({
                            goods:this.state.goods.concat(res.rows),
                        })
                        //判断数据是否加载完
                        // console.log('当前page:',page)
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
            return 
        }

    }
    getScrollStatus = (detail) =>{
        // console.log(detail)
    }
    render () {
        const {goods,bannerList,initialize} = this.state
        let goodslist2=goods.map((good) => {
            return <View className='list-box'>
                    <GoodsList goodsdata={good}/>
                </View>
        })
        // const host = 'http://192.168.31.166:8080/server_wechat'
        // console.log('轮播',bannerList)
        let banners = bannerList.map(item =>{
            return (
                <SwiperItem>
                    <Image src={host+item.imgUrl} className='demo-text-1'/>
                </SwiperItem>
            )
        })
        return (
        <View className='index'>
            {initialize?'':<Loading>正在加载</Loading>}
            <LoadMore 
            loadmore={()=>this.loadData()}
            getScrollStatus={(detail)=>this.getScrollStatus(detail)}
            threshold={40}
            isLoading={this.state.isLoading}
            arriveEnd={this.state.isend}>
                <View className='top-bg'>
                        <Swiper
                            className='test-h'
                            indicatorColor='#999'
                            indicatorActiveColor='#333'
                            circular
                            indicatorDots
                            autoplay>
                            {banners}
                        </Swiper>
                        <View className='top-icons'>
                            <View className='top-icon'>
                                <Image src={icon1} className='top-icon-pic'/>
                                <Text className='word'>产地直发</Text>       
                            </View>
                            <View className='top-icon'>
                                <Image src={icon2} className='top-icon-pic'/>
                                <Text className='word'>品质保障</Text>       
                            </View>
                            <View className='top-icon'>
                                <Image src={icon3} className='top-icon-pic'/>
                                <Text className='word'>有机生态</Text>       
                            </View>
                            <View className='top-icon'>
                                <Image src={icon4} className='top-icon-pic'/>
                                <Text className='word'>坏果包赔</Text>       
                            </View>    
                        </View>
                    </View>
                <View className='home-content'>
                    <View className='home-title'>
                        <Image src={IconLeft}  className='home-title-icon'/>
                        <Text >今日主推</Text>
                        <Image src={IconRight} className='home-title-icon'/> 
                    </View>    
                    <View className="list">
                        {goodslist2}
                    </View>
                    <View style={{display:(this.state.isLoading)?'':'none'}}>
                        <AtActivityIndicator content='加载中(>.<)' ></AtActivityIndicator>
                    </View>
                    <View style={{display:(this.state.isend)?'':'none',marginBottom:'20px',fontSize:'15px'}}>
                        <Text>加载完成~</Text>
                    </View>
                </View>
            </LoadMore>
        </View>
        )
    }
    
}
