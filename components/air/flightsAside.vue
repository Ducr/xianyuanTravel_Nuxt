<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Email: dulant_du@126.com
 * @Date: 2019-09-08 18:42:55
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-10 18:43:38
 * @Note: 
 -->
<template>
    <div class="aside">
        <div class="statement">
            <el-row type="flex" justify="space-between" class="statement-list">
                <el-col :span="8">
                    <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
                    <span>航协认证</span>
                </el-col>
                <el-col :span="8">
                    <i class="iconfont iconbaozheng" style="color:green;"></i>
                    <span>出行保证</span>
                </el-col>
                <el-col :span="8">
                    <i class="iconfont icondianhua" style="color:#409EFF;"></i>
                    <span>7x24</span>
                </el-col>
            </el-row>
            <p class="service-tel">
                免费客服电话：4006345678转2
            </p>
        </div>

        <div class="history">
            <h5>历史查询</h5>
            <nuxt-link
            v-for="(item,index) in history"
            :key="index"
            :to="`/air/flights/?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" >
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="history-item"
                v-show="history.length!==0"
                >
                    <div class="air-info">
                        <div class=" deleteBtn" @click="clearHistory(index)">
                        <i class="el-icon-close"></i>
                        </div>
                        <div class="to-from">{{item.departCity}} - {{item.destCity}}</div>
                        <p>{{item.departDate}}</p>
                    </div>
                    <span>选择</span>
                </el-row>
            </nuxt-link>
            <nuxt-link to='$route'>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="history-item"
                v-show="historyLength===null"
                >
                    <div class="history-loading">
                        查询中
                        <i class="el-icon-loading"></i>
                    </div>
                </el-row>
            </nuxt-link>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="history-item"
                v-show="historyLength===0"
                >
                    <div class="history-info">
                        暂无历史查询！
                    </div>
                </el-row>
            <p class="clearAll"
            v-show="history.length!==0"
            >
                <span
                @click="clearAllHistory"
                >清空
                    <i class="el-icon-delete"></i>
                </span>
                </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            history: [],
            historyLength: null
        }
    },
    mounted(){
        // 获取本地存储
       this.history =JSON.parse(localStorage.getItem('airs')) || []
       this.historyLength = this.history.length
        
    },
    methods:{
        // 1.移除单个历史记录
        clearHistory(index){
            let historyArr = JSON.parse(localStorage.getItem('airs'))
            for (let i = 0; i < historyArr.length; i++) {
                if( i===index ){
                    historyArr.splice(i,1)
                    break
                }
            }
            localStorage.setItem('airs',JSON.stringify(historyArr))
            // 赋值给当前遍历的数组，实时更新历史记录的展示
            this.history = historyArr
            this.historyLength = this.history.length
            // this.$router.go(0)
        },
        // 2.清除所有的历史记录
        clearAllHistory(){
            localStorage.setItem('airs',JSON.stringify([]))
            // 赋值给当前遍历的数组，实时更新历史记录的展示
            this.history = []
            this.historyLength = this.history.length
        }
    }
}
</script>

<style scoped lang="less">
.statement{
    border:1px #ddd solid;

    .statement-list{
        padding: 10px 0;
        > div{
            text-align: center;
            i{
                display: block;
                font-size: 40px;
            }
            span{
                font-size:12px;
            }
        }
    }
    .service-tel{
        height: 32px;
        line-height: 32px;
        padding:0 10px;
        background: #f6f6f6;
        font-size: 14px;
    }
}

.history{
    border:1px #ddd solid;
    padding:10px;
    margin-top:10px;

    h5{
        font-size: 16px;
        font-weight: normal;
        padding-bottom: 10px;
        border-bottom:1px #eee solid;
    }

    .history-item{
        position:relative;
        padding:10px 0;
        font-size: 14px;
        border-bottom: 1px #eee solid;

        &:last-child{
            border:none;
        }

        .to-from{
            margin-bottom: 5px;
        }

        .history-info{
            width:100%;
            height: 14px;
            line-height: 14px;
            padding: 10px 0px 0px 0px;
            color:rgb(250, 11, 51);
            text-align: center;
        }
        .history-loading{
            width:100%;
            height: 14px;
            line-height: 14px;
            padding: 10px 0px 0px 0px;
            color:#999;
            text-align: center;
        }

        p{
            font-size: 12px;
            color:#666;
        }

        span{
            position: absolute;
            right:0px;
            bottom:10px;
            color:#fff;
            display: block;
            padding:2px 10px;
            background: orange;
            border-radius: 4px;
            font-size:12px;
            cursor: pointer;
        }
        .deleteBtn{
            position: absolute;
            display: none;
            right:5px;
            top:5px;
        }
        &:hover{
                .deleteBtn{
                    display: block;
                    cursor: pointer;
                }
            
        }
    }

    .clearAll{
        // width:100%;
        display: none;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        padding: 10px 0px 0px 0px;
        text-align: center;
        span{
            width: 50px;
            color:#fff;
            display: block;
            margin:0 auto;
            padding:3px 5px;
            background: #fe5622;
            border-radius: 4px;
            font-size:12px;
            cursor: pointer;
        }
    }
    &:hover{
        .clearAll{
            display: block;
        }
    }
}
</style>