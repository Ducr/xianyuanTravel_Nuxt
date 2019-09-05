/*
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-05 15:51:24
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-05 15:52:57
 */
// 文章状态管理
// state 代表数据
// mutation 同步修改state的数据
// actions 异步修改state的数据

// 设置数据
export const state =()=>{
  // 采用接口返回的数据结构
  return {
    postInfo:{
      token: '',
      user: ''
    }
  }
}
// 同步修改数据
export const mutations = {
  // 1.保存用户信息到state
  // mutations下的方法第一个参数固定是state
  // data参数不是必须的，是调用方法时候传入的（数据）参数
  setPostInfo(state, data) {
    // data是后台返回的用户信息
    state.postInfo = data
  },
  // 2.清空userInfo
  clearPostInfo(state) {
    state.postInfo = {
      token: '',
      user:''
    }
  }
  
}