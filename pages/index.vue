<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-01 10:51:27
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-02 16:15:04
 -->
<template>
  <div class="index">
    <div class="container">
      <el-carousel
      :interval='3000'
      arrow="always">
        <el-carousel-item 
        v-for="(item, index) in banners" 
        :key="index">
            <!-- 轮播图的背景图片-->
            <div class="banner-image" 
            :style="`
            background:url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;
            background-size:contain contain;
            `">
            </div>
        </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
        <div class="search-bar">
            <!-- tab栏 -->
            <el-row 
            type="flex" 
            class="search-tab">
                <!-- 动态的class，当然的索引和循环的索引相等时候就加上active -->
                <span 
                v-for="(item, index) in options"
                :key="index"
                @click="handleClick(index)"
                :class="{ active: current === index }">
                  <i>{{ item.title }}</i>
                </span>
            </el-row>
            
            <!-- 输入框 -->
            <el-row 
            type="flex" 
            align="middle" 
            class="search-input">
                <input 
                :placeholder="options[current].placeholder" 
                />
                <i class="el-icon-search"></i>
            </el-row>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      banners:[],
      options:[
        {
          title: '旅游',
          placeholder: '请输入城市'
        },
        {
          title: '酒店',
          placeholder: '请输入城市搜索酒店'
        },
        {
          title: '机票',
          placeholder: ''
        }
      ],
      current:0
    }
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners'
    })
    .then(res=>{
      console.log(res)
      if(res.status===200){
        this.banners=res.data.data
        console.log(this.banners)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },
  methods:{
    handleClick(index){
      // 索引是2时，即为机票，进行路由跳转，直接使用this.$router.push()
      if(index===2){
        // 路由规则虽然pages可以直接访问，不需要配置
        // 但是可以通用路由的方法
        this.$router.push('/air')
      }
      this.current=index
    }
  }

}
</script>

<style scoped lang="less">
.index{
    .container{
      min-width:1000px;
      margin:0 auto;
      position:relative;

      /deep/ .el-carousel__container{
          height:700px;
      }

      .banner-image{
          width:100%;
          height:100%;
      }

      .banner-content{
          z-index:9;
          width:1000px;
          position:absolute;
          left:50%;
          top:45%;
          margin-left: -500px;
          border-top:1px transparent solid;

          .search-bar{
              width:552px;
              margin:0 auto;
          }

          .search-tab{
              .active{
                  i{
                  color:#333;
                  }
                  &::after{
                  background: #eee;
                  }
              }

              span{
                  width:82px;
                  height:36px;
                  display:block;
                  position: relative;
                  margin-right:8px;
                  cursor: pointer;

                  i{
                  position:absolute;
                  z-index:2;
                  display: block;
                  width:100%;
                  height:100%;
                  line-height:30px;
                  text-align:center;
                  color:#fff;
                  }

                  &:after{
                  position: absolute;
                  left:0;
                  top:0;
                  display:block;
                  content: "";
                  width:100%;
                  height:100%;
                  border: 1px rgba(255,255,255,.2) solid;
                  border-bottom: none;
                  transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                  transform-origin: bottom left;
                  background: rgba(0,0,0,.5);
                  border-radius:1px 2px 0 0;
                  box-sizing:border-box;
                  }
              }
          }

          .search-input{
              width:550px;
              height:46px;
              background:#fff;
              border-radius: 0 4px 4px 4px;
              border: 1px rgba(255,255,255,.2) solid;
              border-top:none;
              box-sizing: unset;

              input{
                  flex:1;
                  height:20px;
                  padding: 13px 15px;
                  outline: none;
                  border:0;
                  font-size:16px;
              }

              .el-icon-search{
                  cursor :pointer;
                  font-size:22px;
                  padding:0 10px;
                  font-weight:bold;
              }
          }
      }
  }
}
</style>