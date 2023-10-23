import Mock from "mockjs";

function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}
const getDate = () =>{
  const nowDate = new Date();
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  };
  const newmonth = date.month >= 10 ? date.month : "0" + date.month;
  const day = date.date >= 10 ? date.date : "0" + date.date;
  return date.year + "-" + newmonth + "-" + day;
}

const data = Mock.mock({
      total:29,
      pageSize : 10,
    'leaveList|29': [
      {
        stateCode:'@integer(0,2)',
        id: '@increment',
        outType: '@integer(1,2)',
        outDate:'@date(yyyy-MM-dd)',
        applyDate:'@date(yyyy-MM-dd)',
        agreeDate:'@date(yyyy-MM-dd)',
        destination: '@city(true)',
        "outreason|1-10":"="
      }
    ]
  })
//获取
Mock.mock(RegExp('/home-stu-leave/getLeaveList'), 'get', (options) => {
    
    const {page = 1, limit = 10 } = param2Obj(options.url)
    const pageList = data.leaveList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 200,
      success: true,
      message: '获取用户列表成功',
      data: pageList,
      total:data.leaveList.length,
    }
  })
//添加
  Mock.mock(RegExp('/home-stu-leave/addLeave'), 'post', (options) => {
    const params = JSON.parse(options.body)
    data.leaveList.unshift(
      Mock.mock({
        id: '@increment',
        stateCode:0,
        outType: params.outType,
        outDate: params.outDate,
        applyDate:getDate(),
        agreeDate:'',
        destination: params.destination,
        outreason: params.outreason,
        date: params.date,
      })
    )
    return {
      code: 200,
      success: true,
      message: '用户添加成功'
    }
  })

  //查看
  Mock.mock(RegExp('/home-stu-leave/checkLeave'), 'post', (options) => {
    const params = JSON.parse(options.body)
    for (let i = 0; i < data.leaveList.length; i++) {
      if (data.leaveList[i].id === params.id) {
        data.leaveList[i] = params
      }
    }
    return {
      code: 200,
      success: true,
      message: '用户查看成功'
    }
  })

export default{

  getLeaveList : (params) => {
    return request({
      url: '/home-stu-leave/getLeaveList',  // 此处的接口地址与模拟的 mockjs 接口地址一致
      method: 'get',
      params
    })
  },
  addLeave :(data) => {
    return request({
      url:'/home-stu-leave/addLeave',
      method: 'post',
      data
    })
  }
  }


