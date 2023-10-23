<script setup>

</script>

<template>
  <!-- <Login/> -->
  <router-view />
</template>

<script>
import { defineComponent} from 'vue';
import Login from './views/User/Login.vue';
export default defineComponent({
  components:{
    Login
  }
})
</script>
<style lang="less" scoped>
#app{
  height: 100%;
}
</style>