import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'gdut001' && password === '123456') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'home/Home'
            },
            {
              path: '/home-stu-leave',
              name: 'leave',
              label: '外出申请',
              icon: 'location',
              url: 'User/Leave'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
     } else {
      return {
        code: -999,
        data: {
          message: '账号或密码错误'
        }
      }
    }

  }
}