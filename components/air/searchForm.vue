<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-05 15:53:30
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-08 17:07:14
 -->
<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span 
            v-for="(item,index) in tabBar" :key="index"
            :class="{active: currentTab===index}"
            @click="searchTab(index)">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="searchForm" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions: 每次输入时候都会执行，获取搜索建议，并且显示在输入框的下拉框中 -->
                <!-- select：在下拉框中选中时候时候触发的事件 -->
                <el-autocomplete
                placeholder="请搜索出发城市"
                class="el-autocomplete"
                v-model="searchForm.departCity"
                :fetch-suggestions='queryDepartSearch'
                @select="handleDepartSelect"
                @blur="handleDepartBlur"
                ></el-autocomplete>
            </el-form-item>
                <!-- fetch-suggestions: 每次输入时候都会执行，获取搜索建议，并且显示在输入框的下拉框中 -->
                <!-- select：在下拉框中选中时候时候触发的事件 -->
            <el-form-item label="到达城市">
                <el-autocomplete
                placeholder="请搜索到达城市"
                class="el-autocomplete"
                v-model="searchForm.destCity"
                :fetch-suggestions='queryDestSearch'
                @select="handleDestSelect"
                @blur="handleDestBlur"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                v-model="searchForm.departDate"
                @change="handleDate"
                :picker-options="pickerOptions"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="submitSearch"
                >
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse"
                >换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
      return {
        tabBar: [
          {icon:'iconfont icondancheng',name:'单程'},
          {icon:'iconfont iconshuangxiang',name:'往返'}
          ],
        currentTab: 0,
        searchForm:{
          departCity:'',
          departCode:'',
          destCity:'',
          destCode:'',
          departDate:''
        },
        pickerOptions: {
          // 限制选择日期只能是当前日期之后的
          disabledDate(time){
            // 获取毫秒数的三种方法
            // console.log(time.valueOf())
            // console.log(Date.parse(time))
            //console.log(time.getTime())
            return Date.parse(time) < (Date.now()-1*24*3600*1000)
          }
        },
        departSelect: [],//存储后台返回的出发城市数组
        destSelect: []//存储后台返回的到达城市数组
      }
    },
    mounted(){
      // 默认选择当前的航班
        this.searchForm.departDate = moment(new Date()).format('YYYY-MM-DD')
    },
    methods:{
      // 0.tab栏切换时触发
      searchTab(index){
        this.currentTab = 0
        this.$confirm('目前暂时不支持往返','提示',{
          confirmButtonText:'确认',
          showCancelButton:false,
          type:'warning',
          center:true
        })
      },
      // 1.触发城市输入框获得焦点时触发
      // value是选中的值，callback是回调函数，接收要展示的列表，
      // callback的参数要求：
      // （1）callback调用时必须接收一个数组
      // （2）这个数组中元素必须是一个对象
      // （3）对象中必须有value属性
      queryDepartSearch(value,callback){
        if(!value){
          // 传递空数组时，不会出现下拉框
          callback([])
          return
        }
        // 根据用户输入的请求建城市
        this.$axios({
          url:'/airs/city',
          params:{ name: value }
        })
        .then( res =>{
          // console.log(res)
          const { data } = res.data
          // console.log(data)
          var selectShow=[]
          data.forEach( v =>{
            // this.searchForm.departCode=v.sort
            // 添加value属性
            v.value=v.name.replace('市','')
            // 把带有value属性的对象添加到数组中
            selectShow.push(v)
          })
          // （1） 默认选中第一个，防止用户不点击选项
          // 此方法如果不选择第一项，则后续会掺杂为如下格式：广元————>广州元，采用失焦事件改进
          // this.searchForm.departCity = selectShow[0].value
          // this.searchForm.departCode = selectShow[0].sort
          // 存储当前城市数组，因为作用域的原因，无法访问进来
          this.departSelect = selectShow
          // 显示在下拉列表中
          callback(selectShow)
        })
      },
      // 2.出发城市下拉选择时触发
      // item是当前选中的对象
      handleDepartSelect(item){
        // 把选中的值赋值给表单
        // console.log(item)
        this.searchForm.departCity=item.value
        this.searchForm.departCode=item.sort
      },
      // 3.处理出发城市失焦事件
      handleDepartBlur(){
        // 判断是否有值，否则赋空值，避免报错
        this.searchForm.departCity = this.departSelect[0] ? this.departSelect[0].value : ''
        this.searchForm.departCode = this.departSelect[0] ? this.departSelect[0].sort : ''
      },
      // 4.触发城市输入框获得焦点时触发
      // value是选中的值，callback是回调函数，接收要展示的列表
      queryDestSearch(value,callback){
                if(!value){
          // 传递空数组时，不会出现下拉框
          callback([])
          return
        }
        // 根据用户输入的请求建城市
        this.$axios({
          url:'/airs/city',
          params:{ name: value }
        })
        .then( res =>{
          // console.log(res)
          const { data } = res.data
          // console.log(data)
          var selectShow=[]
          data.forEach( v =>{
            // this.searchForm.departCode=v.sort
            // 添加value属性
            v.value=v.name.replace('市','')
            // 把带有value属性的对象添加到数组中
            selectShow.push(v)
          })
          // （1） 默认选中第一个，防止用户不点击选项
          // 此方法如果不选择第一项，则后续会掺杂为如下格式：广元————>广州元，采用失焦事件改进
          // this.searchForm.destCity = selectShow[0].value
          // this.searchForm.destCode = selectShow[0].sort
          // 存储当前城市数组，因为作用域的原因，无法访问进来
          this.destSelect = selectShow
          // 显示在下拉列表中
          callback(selectShow)
        })
      },
      // 5.目标城市下拉选择时触发
      handleDestSelect(item){
        this.searchForm.destCity = item.value
        this.searchForm.destCode = item.sort
      },
      // 6.处理到达城市失焦事件
      handleDestBlur(){
        // 判断是否有值，否则赋空值，避免报错
        this.searchForm.destCity = this.destSelect[0] ? this.destSelect[0].value : ''
        this.searchForm.destCode =  this.destSelect[0] ? this.destSelect[0].sort : ''
      },
      // 7.确认选择日期时触发
      handleDate(time){
        // console.log(time)
        // 处理时间格式为：xxxx-xx-xx
        this.searchForm.departDate = moment(time).format('YYYY-MM-DD')
        
      },
      // 8.出发和目标城市切换时触发
      handleReverse(){
        // 解构出来是一个新对象，是一个新的引用地址，不会共享一个引用地址，而产生对象属性相互污染的情况
        const { departCity,departCode,destCity,destCode } =this.searchForm
        // 交叉赋值
        this.searchForm.departCity = destCity
        this.searchForm.departCode = destCode
        this.searchForm.destCity = departCity
        this.searchForm.destCode = departCode
      },
      // 9.确认搜索时触发
      submitSearch(){
        // console.log(this.searchForm)
        // 进行输入框的非空判断
        const { departCity, destCity, departDate } = this.searchForm
        if(!departCity){
          this.$confirm("出发城市不能为空","提示",{
            cinfirmButtonText:"确认",
            showCancelButton:false,
            type:"warning",
            center: true
          })
          return
        }
        if(!destCity){
          this.$confirm("目标城市不能为空","提示",{
            cinfirmButtonText:"确认",
            showCancelButton:false,
            type:"warning",
            center: true
          })
          return
        }
        if(!departDate){
          this.$confirm("出发日期不能为空","提示",{
            cinfirmButtonText:"确认",
            showCancelButton:false,
            type:"warning",
            center: true
          })
          return
        }
        // 提交搜索请求 
        this.$axios({
          url:"/airs",
          method:"GET",
          params:this.searchForm
        })
        .then(res=>{
          // console.log(res)
          if(res.status===200){
            // 请求成功，跳转到机票列表页 /air/flights
            this.$router.push({
              path:'/air/flights',
              query: this.searchForm
            })
          }
        })
      }
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>