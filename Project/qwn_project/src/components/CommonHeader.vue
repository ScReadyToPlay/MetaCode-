<template>
    <el-header>
        <div class="l-content">
            <!-- 图标展示 -->
            <el-button size = "mid"  @click="handCollapse" color = "#09517d">
                <el-icon :size="30" color = "#4fb6f3">
                    <CaretLeft />
                </el-icon>
            </el-button>

            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                background-color = "#09517d"
                text-color = "#fff"
                ellipsis = false
            >
                <el-menu-item index="1" @click="changeMenu1">我的</el-menu-item>
                <el-menu-item index="2" @click="changeMenu2">信息管理</el-menu-item>
                <el-menu-item index="3">事务填报</el-menu-item>
                <el-menu-item index="4">Processing Center</el-menu-item>
                
            </el-menu>
        </div>
            <div>
                <el-breadcrumb separator="/" class="bread">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

         

            <div class="r-content">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img class = 'user' :src = "getImgSrc('user')" alt="" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            
                            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
        </div>

        
    </el-header>
</template>

<script>

import{useStore} from "vuex"
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default{
    setup() {
        let store = useStore();
        const getImgSrc = (user) =>{
            return new URL(`../assets/images/${user}.png`,import.meta.url).href;
        };
        let handCollapse = () =>{
            store.commit('updateIsCollapse')
        }
        const current = computed(() =>{
            return store.state.currentMenu;
        })
        const clickMenu = (item) =>{
            router.push({
                name:item.name,
            })
        };
        const router = useRouter()
        const handleLoginOut = ()=>{
            store.commit('cleanMenu')
            router.push({
                name:'login'
            })
        }

       
        const changeMenu1  = () =>{
                store.state.chooseMenu = 1
                console.log(store.state.chooseMenu)
         }
         const changeMenu2  = () =>{
                store.state.chooseMenu = 2
                console.log(store.state.chooseMenu)
          }
        return{
            getImgSrc,
            handCollapse,
            current,
            clickMenu,
            handleLoginOut,
            changeMenu1,
            changeMenu2,
        };
    }
}
</script>


<style lang = 'less' scoped>
.el-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #09517d;
    
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        
        margin-right: 20px;
    }
    h3{
        color:#fff;
    }
}
:deep(.bread span){
    color: #fff !important;
    cursor: pointer  !important;
}
</style>