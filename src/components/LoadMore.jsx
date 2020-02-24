import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'

export default class PageView extends Component {
  constructor() {
    super(...arguments)
    this.state = {
        scrollTop:0,
        loadMore:true
    }
  }
  render() {
    const Threshold = this.props.threshold || 20
    return (
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={this.state.scrollTop}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
            onScrollToLower={()=>this.onScrollToLower()}
            onScroll={()=>{this.onScroll(event)}}>
                {this.props.children}
          </ScrollView>
    )
  }
  //滚动监听函数
  onScroll(event){
    let {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY} = event.detail
    this.setState({
        scrollTop:scrollTop//必须将当前滚动距离设置，以免加载数据是滚动回到顶部
    })
    this.props.getScrollStatus({scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY})
  }
  //触底是触发函数，规定父组件传loadmore必须是一个promise对象
  onScrollToLower(){
    if(this.props.arriveEnd){
      this.setState({
        loadMore:false
      })
    }else if(this.props.isLoading){
      return
    }else{
      console.log('触发loadMore触底函数')
      this.props.loadmore()
    }
  }
}