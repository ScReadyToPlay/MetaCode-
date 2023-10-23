import { createRouter,createWebHashHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        name:'home1',
        redirect: '/home',
        component:  () => import('../views/Main.vue'),
        
        children:[
            {
                path:'/home',
                name:'home',
                component: () => import('../views/home/Home.vue')
            },
            {
                path: '/home-stu-leave',
                name:'leave',
                component: () => import('../views/User/Leave.vue')
            },
            {
                path:'/myinformation',
                name:'myinformation',
                label:'基本信息',
                icon:'house',
                component: () => import('../views/information/myInformation.vue')
            },
            {
                path: '/experience',
                name:'experience',
                label:'个人经历',
                icon:'house',
                component: () => import('../views/information/experience.vue')
            },
        ],
        },
    {
        path:'/login',
        name:'login',
        component:() => import('../views/User/Login.vue')
    }
]

const router = createRouter(
    {
        history:createWebHashHistory(),
        routes
    }
)

export default router