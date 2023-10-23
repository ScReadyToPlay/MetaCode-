<template>
    <div class = "table">

      <el-table :data="list" style="width: 100%" max-height="500" size="large">
      <el-table-column 
      v-for="item in tableLabel"
      :key="item.prop"
      :label ="item.label"
      :prop = "item.prop"
      :width="item.width ? item.width : 155" />
    
      <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleCheck(scope.row)"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-button type="primary" class="addButton" @click="handleAdd">
    <el-icon><Plus /></el-icon>　申请外出</el-button>

      <el-pagination 
      background 
      layout="prev, pager, next" 
      :total="config.total" 
      @current-change="changePage"
      class="pager mt-4"/>

    <el-dialog
    v-model="dialogVisible"
    width="45%"
    :title="action == 'add' ? '新增用户':'查看用户'"
    :before-close="handleShut"
  >

  <el-form :model="formData" label-width="100px" :inline ="true" ref = "leaveForm">
    <el-form-item label="申请类型"  :rules="[{ required: true, message: '此项是必填项' }]" prop = 'outType'>
      <el-select v-model="formData.outType" placeholder="请选择" :disabled = 'action == "check"'>
        <el-option label="在校外出" value=1 />
        <el-option label="居家外出" value=2 />
      </el-select>
    </el-form-item>
    <el-form-item  label="申请外出时间" :rules="[{ required: true, message: '此项是必填项' }]" prop = 'outDate'>
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder=""
          style="width: 100%"
          v-model="formData.outDate"
          format="YYYY-MM-DD"
          :disabled = 'action == "check"'
          
        />
      </el-col>
    </el-form-item>
    <el-form-item label="外出地点" prop = 'destination'>
      <el-input v-model="formData.destination" type="textarea" :disabled = 'action == "check"'/>
    </el-form-item>   
    <el-form-item label="外出事由" :rules="[{ required: true, message: '此项是必填项'}]" prop = 'outreason'>
      <el-input v-model="formData.outreason" type="textarea" :disabled = 'action == "check"'/>
    </el-form-item>   
    <el-form-item>
      <div class="demo-progress">
      <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="warning"
      v-show="formData.stateCode == '未审核'">
      <span>未审核</span>
    </el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="100"
      status="success"
      v-show="formData.stateCode == '审核通过'">
      <span>审核通过</span>
    </el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="100"
      status="exception"
      v-show="formData.stateCode == '审核不通过'">
      <span>审核不通过</span>
    </el-progress>
      </div>
    </el-form-item>
    <el-form-item v-show = "action == 'add'">
      <el-button @click="dialogVisible = false" >关闭</el-button>
        <el-button type="primary" @click="onSubmit" >提交</el-button>
    </el-form-item>   
  </el-form>

  </el-dialog>


    </div>
  
      
</template>

<script>
import { defineComponent,getCurrentInstance, ref,reactive} from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
export default defineComponent({
    setup() {
        const {proxy} = getCurrentInstance()
        const list = ref([])

        const tableLabel = reactive([
      {
        prop: "stateCode",
        label: "审核状态",
        width:120
      },
      {
        prop: "outDate",
        label: "请假时间",
      },
      {
        prop: "destination",
        label: "前往地区",
        width:200
      },
      {
        prop: "applyDate",
        label: "申请日期",
        width: 180,
      },
      {
        prop: "agreeDate",
        label: "学院审核时间",
        width: 320,
      },
    ]);
        let pageSize = ref(0)
        const currentPage = ref(1)
        const dialogVisible = ref(false)
        
        const formData = reactive({
          stateCode:'0',
          id: '@increment',
          outType: '',
          outDate:'',
          applyDate:'',
          agreeDate:'',
          destination: '',
          outreason:""
        });
        

        //新增数据
        const timeFormat = (time) => {
          var time = new Date(time);
          var year = time.getFullYear();
          var month = time.getMonth() + 1;
          var date = time.getDate();
          function add(m) {
            return m < 10 ? "0" + m : m;
          }
          return year + "-" + add(month) + "-" + add(date);
        };
        const onSubmit = () => {
            proxy.$refs.leaveForm.validate(async (valid) => {
          if (valid) {
            if (action.value == "add") {
              formData.outDate = timeFormat(formData.outDate);
              let res = await proxy.$api.addLeave(formData);
              console.log(res)
              if (res) {
                dialogVisible.value = false;
                
                proxy.$refs.leaveForm.resetFields();
                getLeaveData(config);
              }
            }
          //  else {
          //   // 查看的接口
          //   let res = await proxy.$api.checkLeave(formData);
          //   if (res) {
          //     // console.log(proxy.$refs);
          //     proxy.$refs.leaveForm.resetFields();
          //     getLeaveData(config);
          //   }
          //   }
          }
         else {
            ElMessage({
              showClose: true,
              message: "请输入正确的内容",
              type: "error",
            });
          }
      });
    };
        const action = ref("add");
        const handleAdd = () => {
           action.value = "add";
          dialogVisible.value = true;
        };
        //改变页数
        const config = reactive({
            total:0,
            page:1,
        })
        const changePage = (page)=>{
          console.log(page);
          config.page = page
          getLeaveData(config)
        }
        //获取数据
        onMounted(() => {
            getLeaveData(config)
            
        })
        const getLeaveData = async (config) => {
        let res = await proxy.$api.getLeaveList(config);
            config.total = res.totalPage
            list.value = res.data
            dataTransform(res.data,res.data.length)
            console.log(res.data)
            config.total = res.total
          };

          const dataTransform = (datalist,n) =>{
            for(let i = 0;i < n;i++)
            {
              if(datalist[i].stateCode == 2)datalist[i].stateCode = '审核不通过'
              else if(datalist[i].stateCode == 1)datalist[i].stateCode = '审核通过'
              else if(datalist[i].stateCode == 0)datalist[i].stateCode = '未审核'

              if(datalist[i].outType == 1)datalist[i].outType = '在校外出'
              else if(datalist[i].outType == 2)datalist[i].outType = '居家外出'
            }
          }

          //查看
          const handleCheck = (row) => {
          // 浅拷贝
          action.value = "check";
          dialogVisible.value = true;
          proxy.$nextTick(() => {
            Object.assign(formData, row);
          });
        };
          const handleShut=  () =>{
            dialogVisible.value = false
            proxy.$refs.leaveForm.resetFields();
          }
        return{
            list,
            tableLabel,
            config,
            changePage,
            dialogVisible,
            getLeaveData,
            pageSize,
            currentPage,
            formData,
            onSubmit,
            handleAdd,
            handleCheck,
            action,
            handleShut,
        }
    },
})
</script>



<style lang="less" scoped>

.table {
  height: 520px;
  position: relative; 
  width:100%;
  .el-table{
    position: absolute; 
  }
  .addButton{
    position: absolute;
    background-color: #2d8cf0;
    bottom: -20px;
  }
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
  
}

.user-header {
  display: flex;
  justify-content: space-between;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
