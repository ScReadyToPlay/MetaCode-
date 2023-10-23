<template>
    <el-aside :width="$store.state.isCollapse ? '200px' :  '64px'">
        <el-menu class="el-menu-vertical-demo" background-color = "#0b679e" text-color = "#fff"
            :collapse = "!$store.state.isCollapse">
        
            <h3 v-show="$store.state.isCollapse" >
                <img src="../assets/images/gdutLogo2.png" alt="" class="logo2">    
            </h3>
            <h3 v-show="!$store.state.isCollapse" class="logo1">
                <img src="../assets/images/gdutLogo.png" alt="" class="logo1">
            </h3>
        <el-menu-item :index="item.path" v-for="item in menu()" :key = "item.path"
         @click="clickMenu(item)" v-show="$store.state.chooseMenu == 1">
          <component class = "icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>

        <el-menu-item :index="item.path" v-for="item in list1" :key = "item.path"
         @click="clickMenu(item)" v-show="$store.state.chooseMenu == 2">
          <component class = "icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script>
import {useRouter} from "vue-router";
import { useStore } from 'vuex';

export default{
    setup(){
        const router = useRouter();
        const store =useStore();

        const list1 = [
            {
                path:'/myinformation',
                name:'myinformation',
                label:'基本信息',
                icon:'User',
            },
            {
                path: '/experience',
                name:'experience',
                label:'个人经历',
                icon:'MessageBox',
            },
        ]
        const menu = () =>{
            return asyncList.filter((item) => !item.children);
        };

        const asyncList = store.state.menu
        
        const clickMenu = (item) =>{
            router.push({
                name:item.name,
            })
            store.commit("selectMenu", item);
        };

        

        return{
            menu,
            clickMenu,
            list1,
        }
    }
}
</script>

<style lang = 'less' scoped>
.icons{
    width: 18px;
    height: 18px;
}
.el-menu{
    border-right: none;
    .logo2{
            margin-left: 20px;
            margin-top: 12.5px;
            margin-bottom:12.4px ;
            display: block;
            width :160px;
            height: auto;
        }
    .logo1{
        width: 40px;
        margin-left: 6px;
            margin-top: 6px;
            margin-bottom:3.1px ;
    }
}

</style>