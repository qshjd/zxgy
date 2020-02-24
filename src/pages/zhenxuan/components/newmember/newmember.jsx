import Taro, { Component, Config } from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import './newmember.scss';
import Touxiang from '../../../../imgs/touxiang.jpg';
export default class NewMember extends Component{
    componentDidMount(){
        console.log(this.props.data)
    }
    gotoMemberDetailPage(){
        Taro.navigateTo({
            url:`/pages/zhenxuan/teammanage/memberdetail?id=${this.props.data.id}`
        })
    }
    render(){
        const {data} = this.props
        return (
            <View className='tm-member-infor'>
                <View className='tm-member-infor-left'>
                    <Image src={data.imgUrl} className='tm-member-infor-left-1' />
                    <View className='tm-member-infor-left-2'>
                        <View className='tm-member-infor-left-2-name'>{data.nickName}</View>
                        <View className='tm-member-infor-left-2-time'>{data.joinTime}</View>
                    </View>
                </View>
                <View className='tm-member-infor-right' onClick={this.gotoMemberDetailPage.bind(this)}>
                    <View className='tm-member-infor-right-word'>查看</View>
                </View>
            </View>
        )
    }
}