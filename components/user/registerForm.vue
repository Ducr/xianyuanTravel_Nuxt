<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-02 19:19:26
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-04 21:02:06
 -->
<template>
    <el-form class="registerForm" :model="registerForm" :rules="rules" ref="registerForm" @keyup.ctrl.13.native="register">
      <el-form-item prop="username" class="form-item">
        <el-input v-model="registerForm.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha" class="form-item">
        <el-input v-model="registerForm.captcha" placeholder="验证码">
          <template slot="append">
            <!-- 内部实现了调用 this.$emit("click") 触发传递的方法 -->
            <el-button @click="sendCaptcha">
              发送验证码
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname" class="form-item">
        <el-input v-model="registerForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="registerForm.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword"  class="form-item">
        <el-input v-model="registerForm.checkPassword" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-button class="submit" type="primary" @click.native="register">注 册</el-button>
    </el-form>
</template>

<script>
export default {
    data(){
      // rule当前的规则
      // value输入框的值
      // callback是回调函数，必须要调用
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          // 代表验证通过
          callback()
        }
      };
      return{
        registerForm:{
          username:'',
          nickname:'',
          captcha:'',
          password:'',
          checkPassword:''
        },
        rules:{
          username:[
            {required:true,message:'请输入用户名',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ],
          nickname:[
            {required:true,message:'请输入昵称',trigger:'blur'}
          ],
          captcha:[
            {required:true,message:'请输入验证码',trigger:'blur'}
          ],
          // validator不能改，表示指向验证函数
          checkPassword:[
            { validator: checkPassword, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      // 1.发送验证码
      sendCaptcha(){
        // 判断输入手机号是否为空，是则不请求
        if(!this.registerForm.username){
          this.$message.error('请输入手机号码')
          return
          }
            this.$axios({
              url:'/captchas',
              method:'POST',
              data:{
                tel:this.registerForm.username
              }
            })
            .then(res=>{
              // console.log(res)
              // 解构赋值
              const {code}=res.data
              this.registerForm.captcha=code
                this.$confirm(`手机验证码是：${code}`, '提示', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'success',
                  center: true
                })
            })
      },
      // 2.实现注册
      register(){
      //  提价之前进行二次验证
      this.$refs['registerForm'].validate(valid=>{
        if(valid){
          // 使用 ... + 变量名 会指向剩余的属性
          const { checkPassword , ...submitForm }= this.registerForm
          this.$axios({
            url:'/accounts/register',
            method:'POST',
            data:submitForm
          })
          .then(res=>{
            // 之后的过程与登录过程一致
            // 注册成功帮用户自动登录
            this.$store.commit('user/setUserInfo',res.data)
            this.$router.replace('/')
          })
        } else {
          this.$message.error('请输入必填数据')
        }
      })
      }
    }
}
</script>

<style scoped lang="less">
    .registerForm{
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