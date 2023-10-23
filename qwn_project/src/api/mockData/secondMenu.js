import Mock from 'mockjs'
export default {
  changeMenu: config => {
      return {
        code: 200,
        data: {
          menu: [
            {
                path:'/myinformation',
                name:'myinformation',
              label: '首页',
              icon: 'house',
              url: 'home/Home'
            },
            {
                path: '/experience',
                name:'experience',
              label: '外出申请',
              icon: 'location',
              url: 'User/Leave'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } 
}