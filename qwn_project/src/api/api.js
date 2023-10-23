/**
 * 整个项目api的管理
 * 
 */
import request from "./request"
export default {
  // home组件 左侧表格数据获取
  
  getLeaveList(params){
    return request({
      url: '/home-stu-leave/getLeaveList',
      method: 'get',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  addLeave(params) {
    return request({
      url: '/home-stu-leave/addLeave',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  checkLeave(data) {
    return request({
      url: '/home-stu-leave/checkLeave',
      method: 'post',
      data
    })
  },
  getMenu(params){
    return request({
      url:'/permission/getMenu',
      method:'post',
      mock:false,
      data:params
    })
  }
}