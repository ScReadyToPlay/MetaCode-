<template>
    <el-form  class="login-container" :v-model="loginForm">
        <h3>系统登陆</h3>
        <el-form-item>
            <el-input type="input" aria-placeholder="请输入账号" v-model="loginForm.username">

            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" aria-placeholder="请输入密码" v-model="loginForm.password">   
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">
                登陆
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default{
    setup(){
        const loginForm = reactive({
            username:'',
            password:'',
        });
        const {proxy} = getCurrentInstance()
        const store = useStore()
        const router = useRouter()
        const login = async() =>{
            const res = await proxy.$api.getMenu(loginForm)
            console.log(res)
                store.commit('setMenu',res.data.menu)
                store.commit('addMenu',router)
                store.commit('setToken',res.data.token)
                router.push({
                    name:'home'
                })
            
         }
        return{
            loginForm,
            login,
        }
    },
    
}
</script>

<style lang="less" scoped>
.login-container{
    width: 300px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin:180px auto;
}
</style>