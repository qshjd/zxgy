const checkMethod = {
    //手机号正则校验
    telCheck:/^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/,
    //收货人姓名（不含特殊字符）
    nameCheck1:/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im,
    //不含emoji表情
    nameCheck2:/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,
    //只能输入中文、字母、数字8位以内
    nameCheck3:/^[\u4e00-\u9fa5|a-zA-Z0-9]{2,8}$/,
    nameCheck5:/^[一-龥0-9]{2,6}$/,
    nameCheck4:/[一-龥A-Za-z0-9]{2,6}$/,
    //实名校验
    nameReg:/^[\u4E00-\u9FA5]{2,4}$/,
    //身份证号校验
    idReg:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
}
export default checkMethod;