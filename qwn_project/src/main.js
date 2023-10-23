import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// import './assets/less/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api'
import axios from 'axios'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$api = api
app.use(router).use(store)
store.commit('addMenu',router)
function checkRouter(path){
  let hasCheck = router.getRoutes().filter(route => route.path == path).length
  if(hasCheck){
    return true;
  }else{
    return false;
  }
}
// 全局的路由守卫
router.beforeEach((to,from,next) =>{
  store.commit('getToken')
  const token = store.state.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(!checkRouter(to.path)){
    next({name:'home'})
  }
  else{
    next()
  }
})
app.mount('#app')


