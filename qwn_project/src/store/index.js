import {createStore} from "vuex"
import Cookie from 'js-cookie'
export default createStore({
    state:{
        isCollapse:true,
        currentMenu:null,
        menu:[],
        token:'',
        chooseMenu:1
    },
    mutations:{
        updateIsCollapse(state,payload){
            state.isCollapse = !state.isCollapse;
        },

        selectMenu(state,val){
            val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val);
        },
        setMenu(state,val){
            state.menu = val
            localStorage.setItem('menu',JSON.stringify(val))
        },
        addMenu(state,router){
            if(!localStorage.getItem('menu')){
                
                return;
            }

            const menu = JSON.parse(localStorage.getItem('menu'))
            
            state.menu = menu;

            const menuArray = []

            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        
                        item.component = () => import(/* @vite-ignore */url)
                        return item

                        })
                        menuArray.push(...item.children)
                    }else{
                        let url = `../views/${item.url}.vue`
                        item.component = () => import( /* @vite-ignore */url)
                        menuArray.push(item)
                    }
                })
                menuArray.forEach(item=>{
                    router.addRoute('home1',item)
                })
        },
        cleanMenu(state){
            state.menu = []
            localStorage.removeItem('menu')
        },
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)
        },
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }

        
    },
    
})