/*
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Email: dulant_du@126.com
 * @Date: 2019-09-10 21:03:15
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-10 21:25:25
 * @Note: 
 */
 export const state = () => {
  return {
    // 存储机票的信息
    airInfo: {
      seat_infos:{}
    },
    // 存储总价格
    allPrice: 0
  }
}
export const mutations = {
  // 修改机票信息
  setAirInfo(state,data) {
    state.airInfo = data    
  },
  // 修改机票总价格
  setAllPrice(state,data) {
    state.allPrice = data
  }
}