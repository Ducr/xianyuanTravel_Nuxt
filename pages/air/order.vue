<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Email: dulant_du@126.com
 * @Date: 2019-09-10 11:01:30
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-10 21:15:28
 * @Note: 
 -->
<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm/>

            <!-- 其他代码... -->
            <OrderAside :data="$store.state.air.airInfo"></OrderAside>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue"
import OrderAside from "@/components/air/orderAside.vue"

export default {
    components: {
        OrderForm , OrderAside
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>