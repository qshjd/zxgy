import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
import './index.scss';
export default class IncomePanel extends Component{
    constructor () {
        super(...arguments)
    }
    render(){
        let {type,money,time} = this.props.datas
        let typeName,typeDetail,source;
        // console.log('/*/*/',type)
        switch(type){
            case '2':
                source = '管'
                typeName = '管理奖金';
                typeDetail = '平台奖励'
                break;
            case '3':
                source = '伯'
                typeName = '伯乐奖金';
                typeDetail = '平台奖励'
                break;
            case '5':
                source = '间'
                typeName = '间接培训津贴';
                typeDetail = '间接推荐臻选达人'
                break;
            case '6':
                source = '商'
                typeName = '达20元培训津贴';
                typeDetail = '成员佣金达20元培训津贴'
                break;
            case '7':
                source = '商'
                typeName = '达80元培训津贴'
                typeDetail = '成员佣金达80元培训津贴'
                break;
            default:
                console.log('意料之外的错误');
                break;
        }
        return(
            <View className='ah-content-detail-line'>
                <View className='ah-content-detail-line-icon'>
                    <View className='ah-content-detail-line-icon-word'>{source}</View>
                </View>
                <View className='ah-content-detail-line-words'>
                    <View className='ah-content-detail-line-words-top'>
                        <View className='ah-content-detail-line-words-top-1'>{typeName}</View>
                        <View className='ah-content-detail-line-words-top-2'>+{money}</View>
                    </View>
                    <View className='ah-content-detail-line-words-bot'>
                        <View className='ah-content-detail-line-words-bot-1'>{typeDetail}</View>
                        <View className='ah-content-detail-line-words-bot-1'>{time}</View>
                    </View>
                </View>
            </View>
        )
    }
}