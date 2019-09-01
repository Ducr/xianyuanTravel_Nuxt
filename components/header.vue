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
        <div class="login">
            <nuxt-link  to='/user/login'>登录 / 注册</nuxt-link>
        </div>
    </el-row>
  </div>
</template>

<script>
export default {

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
</style>>

</style>