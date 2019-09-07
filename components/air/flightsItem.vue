<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-07 15:10:03
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-07 18:37:37
 -->
<template>
    <div class="flight-item">
        <div @click="itemIsShow=!itemIsShow">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{itemData.airline_name}} </span> {{itemData.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{itemData.dep_time}}</strong>
                            <span>{{itemData.org_airport_name}}{{itemData.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{intervalTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{itemData.arr_time}}</strong>
                            <span>{{itemData.dst_airport_name}}{{itemData.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{itemData.base_price / 2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle"
            v-show="itemIsShow"
            >
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                  <!-- 可能会有多个座位，需要循坏显示 -->
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell"
                    v-for="(item,index) in itemData.seat_infos"
                    :key="index"
                    >
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
      return {
        itemIsShow: false
      }
    },
    // 不清楚itemData的类型，引用错误
    // props：['data']
    props: {
        // itemData：表示组件可以接收的属性
        // 这个itemData是父组件传递子组件的数据，这种方式称为 “单向数据流”
        // itemData使用起来就和data里面定义的数据一样使用即可
        itemData: {
          // type：不能修改，用于声明属性的类型
            type: Object,
            // 如果调用组件不传值，采用default的默认值
            default: {}
        }
    },
    // computed和data一样都可以在模板中渲染，区别在computed的属性值是一个函数
    // 最终的变量的值是由函数返回
    computed:{
      // 计算出发时间和到达时间的的时间差
      intervalTime(){
        // 获取时间值
        const dep = this.itemData.dep_time.split(':')
        const arr = this.itemData.arr_time.split(':')
        // 判断时间是否为跨过了24点，即进入第二天，则0点需要加上24
        if(dep[0]>arr[0]){
          // arr[0]= 24 + +arr[0]
          arr[0] += 24
        }
        // 计算总时间数（分钟）
        const count = (arr[0] * 60 + +arr[1]) - (dep[0] * 60  + +dep[1])
        // 计算小时数,向下取整
        const hours = Math.floor(count/60)
        // 计算分钟数，求模取余
        const minutes = count % 60
        return `${hours}时${minutes}分`
      }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>