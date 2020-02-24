import Taro, { Component, Config } from '@tarojs/taro'
import {View} from '@tarojs/components';
import "./index.scss"

export default class Loading extends Component{
    constructor () {
        super(...arguments)
    }
    render(){
        return(
            <div class="spiner-box">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <div class="spinner-word">{this.props.children}</div>
            </div>
            

        )
    }
}