let ua = window.navigator.userAgent;
let ios = true
if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    ios = true
}else{
    ios = false
}
export default ios;