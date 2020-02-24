import Taro, { Component, Config } from '@tarojs/taro';
import {View} from '@tarojs/components';
// import './index.scss';
import allapi from '../../../../api'
import IncomePanel from '../incomePanel'
export default class Moneydetail extends Component{
    constructor () {
        super(...arguments)
    }
    state={
        datas:[],
        total:0,
        page:1,
        size:3,
        now:this.props.now,
        queryType:[2,3,5,6,7],
    }
    componentDidUpdate(){
        
    }
    componentWillReceiveProps(){
        // console.log('当前页数',this.props.now)
    }
    componentDidMount(){
        allapi.detail.get_income_detail({
            page:this.state.page,
            pageSize:this.state.size,
            amountType:this.state.queryType
        })
        .then(res => {
            console.log('收入明细：',res)
            this.setState({
                total:res.total,
                datas:res.value
            })
        })
    }
    render(){
        // let {datas} = this.state
        let incomeList = this.state.datas.map(item => {
            return <IncomePanel datas={item}/>
        })
        return(
            <View>
                {incomeList}
            </View>
        )
    }
}