/*
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-04 17:04:11
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-04 17:32:14
 */
import createPersistedState from 'vuex-persistedstate'
// export default 函数是nuxt插件的固定的格式
// 函数有一个参数，这个参数是nuxt对象
export default ({ store }) => {
  // 插件的方法
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'store',//可以是任意的字符串
        // paths: []
    })(store)
  })
}