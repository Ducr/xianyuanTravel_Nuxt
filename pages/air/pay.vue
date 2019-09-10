<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Email: dulant_du@126.com
 * @Date: 2019-09-10 20:46:26
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-11 00:07:25
 * @Note: 
 -->
<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{$store.state.air.allPrice}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// 引入生成二维码的插件
import QRCode from 'qrcode'
export default {
    mounted(){
        // 请求订单详情
        // 因为刷新页面的时间比获取store状态数据的时间要短，使用这样永远也取不到store里面的状态
        // 添加一个队列，使用定时器即可，确保加载页面完成后再进行获取store的状态数据
        var timer = setTimeout(()=>{
            this.$axios({
            url: '/airorders/' + this.$route.query.id,
            // 单独加上请求头的token
            headers:{
                Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
            }
        })
        .then(res =>{
            console.log(res)
            if(res.status === 200){
                // 获取到canvas的节点元素,即要在哪里生成二维码
                let canvas = document.getElementById('qrcode-stage')
                // 获取要生成二维码的链接
                const { code_url } = res.data.payInfo
                // 调用方法生成二维码
                // toCanvas(canvas, text, [options], [cb(error)])
                QRCode.toCanvas(canvas,code_url,{
                    width: 240
                })
            }
        })
        },10)
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>