<template>
<div>
  <p>{{msg}}</p>
  <el-row :gutter="20" >
    <el-col :span="12">
      <div class="grid-content bg">
        <el-switch
          v-model="isOpen"
          on-text="ON"
          off-text="OFF"
          @change="handleChange"
        >
          
        </el-switch>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg">
        <el-switch
          v-model="isSet"
          on-color="#13ce66"
          off-color="#ff4949"
          @change="handleChange"
        >
          
        </el-switch>      
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="block">
        <el-slider v-model="slider"></el-slider>
      </div>
    </el-col>
    <el-col :span="24" >
      <div class="block">
        <el-time-select
        v-model="time"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间">
        </el-time-select>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          >
        </el-date-picker>        
      </div>
    </el-col>   
    
  </el-row>
</div>
</template>

<style>

  .bg {
    padding: 20px 0;
    background-color: #878F95;
  }
</style>
<script>
export default {
  name: 'home',
  data() {
    return {
      msg: '欢迎使用Vuejs',
      isOpen:true,
      isSet:false,
      slider:20,
      time:"",
      date:new Date()

    };
  },
  methods:{
    handleChange:function(){
      this.$message({
        showClose:1,
        message:this.isOpen,
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
