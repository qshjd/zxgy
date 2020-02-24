import Taro, { Component, Config } from '@tarojs/taro'
import {View,Image,Text,Button} from '@tarojs/components';
import './index.scss'
import { AtToast } from 'taro-ui'
import copy from 'copy-to-clipboard';
import icon3 from '../../../../imgs/copy@3x.png'

import allapi from '../../../../api'

export default class Section extends Component{
    state = {
        showToast:false,
        toastWord:'复制成功',
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
        const {showToast,toastWord}=this.state
        const {describeName,descriptionInfo} = this.props.datas
        return(
            <View>
                <AtToast isOpened={showToast} text={toastWord} duration={2000}></AtToast>
                <View className='fd-text-infor'>
                    <View className='fd-text-infor-title'>
                        <View className='fd-text-title-ctt'>{describeName}</View>
                        <Image src={icon3} className='fd-text-title-icon'  onClick={()=>{this.cpStr(this.refs.text)}}/>
                        <Text className='fd-text-title-copy'  onClick={()=>{this.cpStr(this.refs.text)}}>复制</Text> 
                    </View>
                    <View className='fd-text-infor-ctt' ref="text">
                        {descriptionInfo}
                    </View>
                </View>
            </View>
        )
    }
}