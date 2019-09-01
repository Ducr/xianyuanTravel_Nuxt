<template>
  <div class="header">
      <div class="logo">
          <img src="./../static/logo.jpg" alt="">
      </div>
      <div class="navs">
          <nuxt-link to='/'>首页</nuxt-link>
          <nuxt-link to='/post'>旅游攻略</nuxt-link>
          <nuxt-link to='/hotel'>酒店</nuxt-link>
          <nuxt-link  to='/air'>国内机票</nuxt-link>
      </div>
      <div class="login">
          <nuxt-link  to='/user/login'>登录 / 注册</nuxt-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>