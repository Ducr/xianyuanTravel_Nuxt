<template>
  <div class="tabs">
      <span style="margin-right:10px"
      v-for="(item,index) in ['新闻','体育','娱乐']" 
      :key="index" :class="{active:current===index}" 
      @click="tabBar(index)">{{item}}</span>
      <span class="news" v-show="current===0">
          <ul>
              <li>Apple 发布会 9月10日</li>
              <li>Apple 发布会 9月10日</li>
              <li>Apple 发布会 9月10日</li>
          </ul>
      </span>
      <span class="sport" v-show="current===1">
          <ul>
              <li>男篮世界杯中国队开门红</li>
              <li>男篮世界杯中国队开门红</li>
              <li>男篮世界杯中国队开门红</li>
          </ul>
      </span>
      <span class="amusement" v-show="current===2">
          <ul>
              <li>鹿依否认与吴亦凡的恋情</li>
              <li>鹿依否认与吴亦凡的恋情</li>
              <li>鹿依否认与吴亦凡的恋情</li>
          </ul>
      </span>
  </div>
</template>

<script>
export default {
    data(){
        return{
            current:0
        }
    },
    methods:{
        tabBar(index){
            this.current=index
        }
    },
    mounted(){
            var timeId=setInterval(() => {
                this.tabBar()
                console.log(1)
            }, 2000);
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    margin: 20px,100px;
    span{
        cursor: pointer
    }
}
.active{
    color:red;
    background-color: pink;
}
</style>