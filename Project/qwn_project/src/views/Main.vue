<template>
    <div class="common-layout">
      <el-container>
        <common-aside />
      <el-container>
        <common-header />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent} from 'vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
  }
})
</script>

<style lang = 'less' scoped>
.el-container{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  .el-main{
    float: right;
  }
}
// .lay-container {
//     flex-wrap: wrap;
//     .right-main {
//       height: calc(100% - 124px) !important;
//     }
//   }
.common-layout {
  height: 100%;
  & > .el-container{
    height: 100%;
    & > .el-aside{
      height: 100%;
      background-color:#0b679e ;
      .el-main{
        width: 100;
      }
    }
  }
}


</style>