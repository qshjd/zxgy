import Taro, { Component, Config } from '@tarojs/taro';
import {View,Picker,Input} from '@tarojs/components';
import './orderlist.scss';

import { AtDrawer } from 'taro-ui'

import Orderpanel from '../orderpanel/orderpanel';
import Drawer from '../drawer/drawer';

export default class Orderlist extends Component{
    constructor () {
        super(...arguments);
    }
    state={  
        orders1:[
            {
                num:0,
                people:'111',
                submitTime:'2019.03.25 12:27:15',
                fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                fruitPrice:'145.5',
                origin:'四川眉山',
                postagePrice:'0.00',
                totalPrice:'145.5',
                costumer:'刘德华',
                telnumber:'15621543256',
                addr:'四川省成都市龙泉驿区十陵上街成都大学'
            }
        ],
        orders2:[
            {
                num:0,
                people:'222',
                submitTime:'2019.03.25 12:27:15',
                fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                fruitPrice:'145.5',
                origin:'四川眉山',
                postagePrice:'0.00',
                totalPrice:'145.5',
                costumer:'刘德华',
                telnumber:'15621543256',
                addr:'四川省成都市龙泉驿区十陵上街成都大学'
            },
            
        ],
        orders3:[
            {
                num:0,
                people:'333',
                submitTime:'2019.03.25 12:27:15',
                fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                fruitPrice:'145.5',
                origin:'四川眉山',
                postagePrice:'0.00',
                totalPrice:'145.5',
                costumer:'刘德华',
                telnumber:'15621543256',
                addr:'四川省成都市龙泉驿区十陵上街成都大学'
            },
            {
                num:0,
                people:'333',
                submitTime:'2019.03.25 12:27:15',
                fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                fruitPrice:'145.5',
                origin:'四川眉山',
                postagePrice:'0.00',
                totalPrice:'145.5',
                costumer:'刘德华',
                telnumber:'15621543256',
                addr:'四川省成都市龙泉驿区十陵上街成都大学'
            },
            {
                num:0,
                people:'333',
                submitTime:'2019.03.25 12:27:15',
                fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                fruitPrice:'145.5',
                origin:'四川眉山',
                postagePrice:'0.00',
                totalPrice:'145.5',
                costumer:'刘德华',
                telnumber:'15621543256',
                addr:'四川省成都市龙泉驿区十陵上街成都大学'
            }
        ],
        orders4:[
            {
                num:0,
                people:'444',
                submitTime:'2019.03.25 12:27:15',
                fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                fruitPrice:'145.5',
                origin:'四川眉山',
                postagePrice:'0.00',
                totalPrice:'145.5',
                costumer:'刘德华',
                telnumber:'15621543256',
                addr:'四川省成都市龙泉驿区十陵上街成都大学'
            }
        ],
        orders:[
            [
                {
                    id:1,
                    num:0,
                    people:'1',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                }
            ],
            [
                {
                    id:1,
                    num:1,
                    people:'2',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                },
                {
                    id:2,
                    num:1,
                    people:'2',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                },
                {
                    id:3,
                    num:1,
                    people:'2',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                }
            ],
            [
                {
                    id:1,
                    num:2,
                    people:'3',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                }
            ],
            [
                {
                    id:1,
                    num:3,
                    progress:0,
                    people:'4',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                },
                {
                    id:2,
                    num:3,
                    progress:1,
                    people:'4',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'刘德华',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                },
                {
                    id:3,
                    num:3,
                    progress:2,
                    people:'4',
                    submitTime:'2019.03.25 12:27:15',
                    fruitName:'四川眉山爱媛猕猴桃5斤（果径65mm+）',
                    fruitPrice:'145.5',
                    origin:'四川眉山',
                    postagePrice:'0.00',
                    totalPrice:'145.5',
                    costumer:'嘻嘻',
                    telnumber:'15621543256',
                    addr:'四川省成都市龙泉驿区十陵上街成都大学'
                }
            ],
        ]
    }
    componentDidUpdate(){
        // console.log('当前页数',this.props.now)
    }
    componentWillMount(){

    }
    render(){
        let {orders1,orders2,orders3,orders4} = this.state;
        let {now} = this.props
        let orderlists={};
        orderlists = this.state.orders[now].map((item)=>{
            return  <View key={now}>
                <Orderpanel orderdatas={item} />
            </View>
        })
        return(
            <View className='sub-container'>
                <View className='orders-line'></View>
                    {orderlists}
                <View className='sub-bottom'>已经到底啦~</View>
            </View>
        )
    }
}