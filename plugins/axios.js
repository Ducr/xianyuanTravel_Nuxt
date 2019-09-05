/*
 * @Description:  用于处理axios的请求拦截插件 是用于处理axios的请求拦截插件
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-05 09:32:26
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-05 15:57:14
 */
// 解构，按需引入
import { Message } from 'element-ui'
// export default ( nuxt ) => { //有个默认参数nuxt，里面有个$axios,将其解构出来
export default ({ $axios ,redirect }) => {
  // 错误拦截，onError用于错误拦截
  $axios.onError( res => {
    // 返回的res是一个错误的对象，Error对象下都有一个response的属性，可以访问错误的信息
    // 解构出错误的信息，和状态代码
    const { message, statusCode } = res.response.data
    // 重定向
    if (statusCode === 401 || statusCode === 403) {
      Message.warning('请先登录')
      redirect('/user/login')
    }
    if (statusCode === 400) {
      // Message=this.$message
      Message.error(message)
    }
  })
}