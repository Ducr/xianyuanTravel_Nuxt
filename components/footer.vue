<!--
 * @Description: 
 * @version: 
 * @Author: Ducr
 * @Date: 2019-09-01 18:55:57
 * @LastEditors: Ducr
 * @LastEditTime: 2019-09-05 22:00:13
 -->
<template>
  <div class="foooter">
      <div class="container">
            <el-row type="flex"  class="support" justify="space-between">
                <el-col :span="6" :offset="1" class="travel">
                    <h5>闲云旅游旅游网</h5>
                    <p>上亿旅行者共同打造的"旅行神器"</p>
                    <p><span>60,000</span>&nbsp;多个全球旅游目的地</p>
                    <p><span>600,000</span>&nbsp;多个细分目的地新玩法</p>
                    <p><span>760,000,000</span>&nbsp;次攻略下载</p>
                    <p><span>38,000</span>&nbsp;家旅游产品供应商</p>
                </el-col>
                <el-col :span="5.5" class="introduction">
                    <h5>关于我们</h5>
                    <p>隐私政策&nbsp;商标声明</p>
                    <p>服务协议&nbsp;游记协议</p>
                    <p>商城平台服务协议</p>
                    <p>网络信息侵权通知指引</p>
                    <p>闲云旅游旅游网服务监督员</p>
                    <p>网站地图加入闲云旅游</p>
                </el-col>
                <el-col :span="5.5" class="service">
                    <h5>旅行服务</h5>
                    <p>旅游攻略&nbsp;酒店预订</p>
                    <p>旅游特价&nbsp;国际租车</p>
                    <p>旅游问答&nbsp;旅游保险</p>
                    <p>旅游指南&nbsp;订火车票</p>
                    <p>旅游资讯&nbsp;APP下载</p>
                </el-col>
                <el-col :span="6" class="QRCode">
                    <div class="picture">
                        <img src="./../static/images/QRCode.png" alt="">
                    </div>
                    <p>关注我们</p>
                </el-col>
            </el-row>
            <div class="copyright">
                <p>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</p>
            </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .foooter{
    background-color: #323232;
    color:#ccc;
    font-size: 12px;
    min-width: 1000px;
    .container{
        margin: 0 auto;
        width: 1000px;
        .support{
            padding-top: 30px;
            margin: 0;
            .travel,.introduction,.service{
                width:250px;
                h5{
                    font-size: 16px;
                    font-weight: normal;
                    height: 21px;
                    line-height: 21px;
                    margin-bottom:10px;
                }
                p{
                    height: 21px;
                    line-height: 21px;
                    span{
                        color:#FFA500;
                    }
                }
            }
            .introduction,.service{
                width:208px;
            }
            .QRCode{
                width:250px;
                height:162px;
                    .picture{
                        width:250px;
                        height: 146px;
                        img{
                            display: block;
                            margin:0 auto;
                            width:140px;
                            height: 140px;
                        }
                    }
                    p{
                        text-align: center;
                    }
            
            }

        }
        .copyright{
            margin: 0 auto;
            width: 1000px;
            margin-top:20px;
            border-top:1px #656565 solid;

            p{
                padding:50px 0;
                text-align: center;
            }
        }
    }
}
</style>