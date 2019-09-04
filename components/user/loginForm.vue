<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-02 19:19:10
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-04 20:58:33
 -->
<template>
  <el-form  class="form" :model="loginForm" :rules="rules" ref="loginForm"  @keyup.ctrl.13.native="login">
    <el-form-item class="form-item" prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名/手机" >
        </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码" >
        </el-input>
    </el-form-item>
    <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button class="submit" type="primary" @click="login">
      登录
    </el-button>
  </el-form>
  
</template>

<script>
export default {
  data(){
    return  {
      loginForm:{
        username:'',
        password:''
      },
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          // 1.使用mutations进行同步数据存储，状态管理
          this.$axios({
        url:'/accounts/login',
        method:'POST',
        data:this.loginForm
      })
      .then(res=>{
        // console.log(res)
        if(res.status===200){
          // 使用commit调用mutations下的方法
          // commit接收两个参数，第一个参数是mutations参数的方法名，第二个参数是传入数据
          this.$store.commit('user/setUserInfo',res.data)
        } else {
          this.$message.error('登录失败')
        }
      })

      // // 2.使用actions进行异步数据存储，状态管理
      // this.$store.dispatch('user/login',this.loginForm)
      // .then(res=>{
      //   this.$message.success('登录成功，正在跳转')
      //   // console.log(res)
      // })
      // -----------------------------------------------------
      setTimeout(() => {
        this.$router.replace('/')
      }, 1000)
        } else {
          this.$message.error('请输入必填数据')
          this.$refs.loginForm.clearValidate(['username','password'])
        }
      })
    }
  }


}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>