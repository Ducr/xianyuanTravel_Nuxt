<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-05 19:50:34
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-08 18:36:18
 -->
<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <FlightsFilters :filtersData="cacheFlightsListData" @setShowData="handleFilterShow"></FlightsFilters>
                </div>
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead></FlightsListHead>
                </div>
                <!-- 航班信息 -->
                <div>
                    <FlightsItem
                  v-for="(item,index) in dataList"
                  :key="index"
                  :itemData="item"
                  ></FlightsItem>
                    <!-- 如果无航班信息，提示用户选择其他航班信息 -->
                  <div class="remind" v-if='total===null'>
                    <span>正在加载数据 <i class="el-icon-loading"></i></span>
                    <!-- 信息提示 -->
                  </div> 
                  <div class="remind" v-else-if='total===0'>
                    <span>{{$route.query.departCity}} - {{$route.query.destCity}} / {{$route.query.departDate}} 暂无该选项航班,
                      <nuxt-link class="jump" to="/air">点击此处更换其他航班！</nuxt-link>
                    </span>
                    <!-- 信息提示 -->
                  </div> 
                  <!-- 分页 -->
                  <!-- size-change：每页条数切换的时候触发 -->
                  <!-- current-change:页码切换时候触发 -->
                  <!-- current-page：当前页码 -->
                  <!-- page-size：当前显示条数 -->
                  <!-- total：总条数 -->
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
                 
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'

export default {
    data(){
        return {
          // 机票返回的总数据，总数据包含4个属性：flights、info、options、total
          flightsListData: {
            // 避免请求数据未回来前，子组件引用数据出错，设个默认值
            info: {},
            options: {}
          },
          // 缓存的机票的原始数据，和最初的flightsListData数据一致
          // 该数据不会因为子组件进行筛选而被改变，确保每次筛选的数据都是原始的数据
          cacheFlightsListData: {
            // 避免请求数据未回来前，子组件引用数据出错，设个默认值
            info: {},
            options: {}
          },
          // 当前显示的列表数组，由于是只请求一次数据，需要每自行处理显示的数据
          dataList: [],
          currentPage: 1,
          pageSize:5,
          total: null
        }
        
    },
    components:{
      FlightsListHead,FlightsItem,FlightsFilters
    },
    mounted(){
      // 请求航班列表数据
      this.$axios({
        url:'airs',
        // 路由的url参数
        params:this.$route.query
      })
      .then(res=>{
        console.log(res)
        if(res.status === 200){
          // 赋值给总数据
          this.flightsListData =res.data
          // 赋值给缓存数组
          this.cacheFlightsListData = { ...res.data }
          this.total = res.data.total
          // 赋值给显示的列表数组,默认显示第一页的数据
          this.dataList = res.data.flights.slice( 0,this.pageSize )
        }
      })
    },
    methods:{
      // 1.处理每页条数切换，默认参数为被选中的值
      handleSizeChange(val){
        // 切换每页条数
        this.pageSize = val
        // 确保切换后，都返回第一页
        this.currentPage = 1
        // 修改后的值，赋值给显示的列表数组，显示范围为（0，this.pageSize）
          this.dataList = this.flightsListData.flights.slice( 0, this.pageSize )
      },
      // 2.处理页码切换，默认参数为被选中的值
      handleCurrentChange(val){
        // 切换当前页码
        this.currentPage = val
        // 修改后的值，赋值给显示的列表数组
        // 显示范围为（this.currentPage*this.pageSize，(this.currentPage+1)*this.pageSize）
          this.dataList = this.flightsListData.flights.slice(
            (this.currentPage-1) * this.pageSize,this.currentPage * this.pageSize
            )
      },
      // 3.处理筛选后的显示数组 dataList
      handleFilterShow(filterData){
        // 修改总的航班列表
        this.flightsListData.flights = filterData
       // 确保切换后，都返回第一页
        this.currentPage = 1
        // 修改后的值，赋值给显示的列表数组，显示范围为（ 0，this.pageSize ）
        this.dataList = this.flightsListData.flights.slice( 0, this.pageSize )
        // 修改总条数
        this.total = filterData.length

      }
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
    .remind{
      // width: 1125px;
      height: 100px;
      line-height: 100px;
      color:#999;
      font-size:16px;
      text-align: center 
    }
    .jump{
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-decoration: underline;
      color:#429efd;
      font-weight: 600;
    } 
</style>