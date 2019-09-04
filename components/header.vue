<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-01 18:55:46
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-04 21:05:34
 -->
<template>
  <div class="header">
    <el-row class="tab" type="flex" justify="space-between">
        <div class="logo">
            <!-- <nuxt-link> 相当于vue里面的<router-link> -->
            <nuxt-link to='/'><img src="./../static/images/logo.jpg" alt=""></nuxt-link>
        </div>
        <el-row type="flex" class="navs">
            <nuxt-link to='/'>首页</nuxt-link>
            <nuxt-link to='/post'>旅游攻略</nuxt-link>
            <nuxt-link to='/hotel'>酒店</nuxt-link>
            <nuxt-link  to='/air'>国内机票</nuxt-link>
        </el-row>
        <div class="login" v-if="!$store.state.user.userInfo.token">
            <nuxt-link  to='/user/login'>登录 / 注册</nuxt-link>
            <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        </div>
        <div class="register" v-else>
            <el-dropdown >
                <el-row type="flex" align="middle" class="el-dropdown-link">
                    <nuxt-link to="#">
                        <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"/>
                        {{$store.state.user.userInfo.user.nickname}} 
                    </nuxt-link>
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-row>
                
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <!-- 给第三方组件添加事件需要加上native -->
                    <el-dropdown-item
                    @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-row>
  </div>
</template>

<script>
export default {
    mounted(){
        // console.log(this.$store.state)
    },
    methods:{
        logout(){
            this.$store.commit('user/clearUserInfo')
            this.$router.push('/user/login')
            this.$message.success('退出成功')
        }
    }
    
}
</script>

<style lang="less" scoped>
.header{
    width:100%;
    height: 60px;
    line-height: 60px;
    box-shadow:0 2px 2px #ddd; 
    border-bottom:1px #ddd solid;
}
.tab{
    width:1000px;
    margin:0 auto;
}
.logo{
    padding-top:9px;
    img{
    display: block;
    width:156px;
    height: 42px;
    }
}
.navs{
    flex:1;
    margin:0 20px;
    a{
        display: block;
        box-sizing: border-box;
        padding: 0 20px;
        height: 60px;
        &:hover{
            color: #429efd;
            border-bottom:5px #429efd solid;
        }
    }
    // 该class是nuxt自动匹配nuxt-link的to的值，如果url和to的值相等就会自动加上下面的class
    .nuxt-link-exact-active{
        background-color: #429efd;
        color: #fff;
        &:hover{
            color:#fff;
        }
    }
}
.register img{
    width:36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    border:2px transparent solid;
    &:hover{
        border:2px #409eff solid;
    }
}
</style>>

</style>