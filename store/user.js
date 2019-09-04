/*
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-02 20:16:51
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-04 18:33:19
 */
// 用户管理
// state 代表数据
// mutation 同步修改state的数据
// actions 异步修改state的数据

// 设置数据
export const state =()=>{
  // 采用接口返回的数据结构
  return {
    userInfo:{
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
  setUserInfo(state, data) {
    // data是后台返回的用户信息
    state.userInfo = data
  },
  // 2.清空userInfo
  clearUserInfo(state) {
    state.userInfo = {
      token: '',
      user:''
    }
  }
  
}
// 异步修改数据
export const actions = {
  // 登录
  login({ commit }, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data:data
    })
      .then(res => {
        const data = res.data
        console.log(data)
        // 保存到state
        commit('setUserInfo', data)
        return data
    })
  }
}