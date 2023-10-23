import Mock from 'mockjs'
import leaveApi from './mockData/leave'
import permissionApi from './mockData/permission'

Mock.mock('/home-stu-leave/getLeaveList',leaveApi.getLeaveList)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
