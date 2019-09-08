<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Email: dulant_du@126.com
 * @Date: 2019-09-08 11:24:46
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-08 18:35:16
 * @Note: 
 -->
<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                <!-- 广州 - 上海 
                / 
                2019-06-17 -->
                {{filtersData.info.departCity}} - {{filtersData.info.destCity}} / {{filtersData.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in filtersData.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in filtersData.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in filtersData.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in planeSize"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                type="primary" 
                round 
                plain 
                size="mini" 
                @click="handleFiltersCancel"
                >
                撤销
    		    </el-button>
        </div>
    </div>
</template>

<script>
export default {
    // props和data都是放数据的，使用方法完全一致
    // props表示来自外部的数据，而data表示来自内部的数据
    props:{
      filtersData:{
        // 此处的type只是起个提示作用
        // 如果传过来的数据的type类型错误了，不会调用后面的default:{},不符合语法的话，就直接报错，只有不传值时，才会启用默认值
        type: Object,
        default: {}
      }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            planeSize: [
              {label:"小",value:"S"},
              {label:"中",value:"M"},
              {label:"大",value:"L"}
            ]
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // 过滤数据，只保留选中的机场的航班
            const showData = this.filtersData.flights.filter( v => v.org_airport_name === value )
            // 发射事件进行传递筛选后的数据
            this.$emit('setShowData',showData)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            // 获取选中的时间的的小时数值
            const [ from,to ] = value.split(',')
            // 过滤数据，只保留选中时间段的数据,注意：需转换为数值进行比较大小
            const showData = this.filtersData.flights.filter( v =>{
              // 获取出发时间的小时数值
              const departTime = v.dep_time.split(':')[0]
              return  +departTime >= +from && +departTime < +to })
            // 发射事件进行传递筛选后的数据
            this.$emit('setShowData',showData)
        },

         // 选择航空公司时候触发
        handleCompany(value){
            // 过滤数据，只保留选中的航空公司的数据
            const showData = this.filtersData.flights.filter( v => v.airline_name === value )
            // 发射事件进行传递筛选后的数据
            this.$emit('setShowData',showData)
        },

         // 选择机型时候触发
        handleAirSize(value){
          // 过滤数据，只保留选中的机型数据
           const showData = this.filtersData.flights.filter( v => v.plane_size === value )
          // 发射事件进行传递筛选后的数据
          this.$emit('setShowData',showData)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
          // 重置筛选的数据
          this.airport = ""       // 机场
          this.flightTimes = ""    // 出发时间
          this.company = ""        // 航空公司
          this.airSize = ""       // 机型大小
          // 返回全部的数据
          this.$emit('setShowData', this.filtersData.flights)
        }
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>