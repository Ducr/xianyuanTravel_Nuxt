<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Email: dulant_du@126.com
 * @Date: 2019-09-10 10:59:46
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-10 21:48:01
 * @Note: 
 -->
<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" 
                v-for="(item,index) in users"
                :key="index"
                >
                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select"  v-model="users[index].id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item"
                v-for="(item,index) in cacheData.insurances"
                :key="index"
                >
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" 
                    border
                    @change="handleChange(item.id)"
                    >
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <!-- 引用一下计算属性，负责不会起效果 -->
        <span v-show="false">{{allPrice}}</span>
    </div>
</template>

<script>
export default {
    data(){
      return {
        //提交机票订单，后台所需参数
        users: [{           //用户列表
          username:'',      //乘机人姓名
          id:''             //证件号码
        }],
        insurances: [],     //保险id
        contactName: '',    //联系人姓名
        contactPhone: '',   //联系人电话
        invoice: false,     //是否需要发票，默认为false
        captcha:'',         //手机验证码
        seat_xid: '',       //座位id
        air: '',            //航班id
        // 保存当前机票数据
        cacheData: {}
      }
    },
    mounted(){
        // 请求机票数据，后台需要参数：机票id 和 座位seat_xid
        // 解构当前路由 URl参数 进行获取
        const { id , seat_xid } = this.$route.query
        // 请求机票数据
        this.$axios({
          url: `/airs/${id}`,
          params:{
            seat_xid
          }
        })
        .then( res => {
          // console.log(res)
          if(res.status === 200 ){
            // 保存机票数据
            this.cacheData = res.data
            console.log(res.data)
            // 将机票信息存到store中
            this.$store.commit('air/setAirInfo', this.cacheData)
          }
        })
    },
    computed: {
      allPrice(){
        // 如果请求未完成，暂时不需要计算，返回 0
        if(!this.cacheData.seat_infos){
          return 0
        }
        let price = 0
        //先计算单价
        // 机票费
        price += this.cacheData.seat_infos.org_settle_price
        // 燃油费
        price += this.cacheData.airport_tax_audlet
        // 保险费
        price += 30 * this.insurances.length
        // 计算总价钱
        price *= this.users.length
        // 存储到store里面
        this.$store.commit('air/setAllPrice',price)
        return price
      }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({
            username:'',      //乘机人姓名
            id:''             //证件号码
        })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
          this.users.splice(index,1)
        },
        
        // 处理保险勾选与取消
        handleChange(id){
          // 判断id是否已存在，存在则删除，不存在就添加
          let index = this.insurances.indexOf(id)
          if( index !== -1){
            // 该id存在
            this.insurances.splice(index,1)
          } else {
            // 该id不存在
            this.insurances.push(id)
          }
        },

        // 发送手机验证码
        handleSendCaptcha(){
            // 判断手机号码是否为空
            if(!this.contactPhone){
              this.$message.error('请输入联系号码')
              return
            }
            this.$axios({
              url: '/captchas',
              method: 'POST',
              data: {
                tel: this.contactPhone
              }
            })
            .then( res =>{
              // 解构赋值
              const { code } = res.data
              // 自动填充验证码
              this.captcha = code
              // 提示验证码给用户
              this.$confirm(`手机验证码是：${code}`,'提示',{
                confirmButtonText: '确认',
                showCancelButton: false,
                type: 'success',
                center: true
              })
            })
        },

        // 提交订单
        handleSubmit(){
            // 拼接订单数据
            const submitData = {
              users: this.users,
              insurances: this.insurances,
              contactName: this.contactName,
              contactPhone: this.contactPhone,
              invoice: false,
              captcha: this.captcha,
              seat_xid: this.$route.query.seat_xid,
              air: this.$route.query.id
            }
            
            console.log(submitData)
            // 提交订单前进行非空判断
            // 判断乘机人是否为空
            if(!this.users[0].username || !this.users[0].id){
              this.$message.error('乘机人信息不能为空')
              return
            }
            // 判断联系人姓名是否为空
            if(!this.contactName){
              this.$message.error('联系人姓名不能为空')
              return
            }
            // 判断联系号码是否为空
            if(!this.contactPhone){
              this.$message.error('联系人号码不能为空')
              return
            }
            // 判断验证码是否为空
            if(!this.captcha){
              this.$message.error('验证码不能为空')
            }
            // 提交订单
            this.$axios({
              url: '/airorders',
              method: 'POST',
              data: submitData,
              // 单独给该请求添加Authorization
              headers:{
                Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
              }
            })
            .then( res =>{
              // console.log(res)
              if(res.status === 200 ){
                // 订单提交成功，跳转到付款页
                // 携带参数是订单id
                const { id } = res.data.data
                this.$message.success('正在生成订单，请稍等！')
                setTimeout(()=>{
                  // 延时1秒后再跳转
                  this.$router.push({
                    path: '/air/pay',
                    query:{
                      id
                    }
                  })
                },1000)
              }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>