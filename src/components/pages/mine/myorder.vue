<template>
  <div>
    <topbar></topbar>
    <ul class="orderlist">
      <li v-for="(od,i) in orderList" :key="i">
        <div class="otop" @click="redirect('/Parent/getOrderInfo/id/'+od.id)">
          <span>订单号 {{od.id}}</span>
          <span style="float:right" :class="{red:od.status-0==2||od.status-0==4}">
            {{od.show_status}}
          </span>
        </div>
        <div class="omid" @click="redirect('/Parent/getOrderInfo/id/'+od.id)">
          <div class="img">
            <img :src="od.image_url" />
          </div>
          <h3 class="px28 hideTxt">{{od.name}}</h3>
          <div class="info px22">
            <div v-if="od.channel=='tuan'" class="red">
              {{od.tuan_number}}人团
            </div>
            <div v-if="od.status-0==2 && od.channel=='seckill'" class="red">
              剩余支付时间<downtimer :lefttime="have_pay_time" @onEnd="changestat(i)"></downtimer>
            </div>
          </div>
        </div>
        <div class="vice">
          <span>{{od.update_time}}</span>
          <span style="float:right">数量 {{od.number}} 共计<span class="red">￥<big>{{od.pay_amount}}</big></span></span>
        </div>
        <div class="obot" v-if="od.status-0==2">
          <span class="cancel" @click="cancelOrder(i,od.id)">取消订单</span>
          <span class="gopay" @click="gopay(od.id)">去支付</span>
        </div>
      </li>
    </ul>
    <loadlist apiurl="/Parent/getOrderList/p/@p" @ondataupdate="getdata" @nologin="nolog"></loadlist>
  </div>
</template>

<script>
import topbar from '@/components/base/header'
import loadlist from '@/components/base/loadlist'
import downtimer from '@/components/base/downtimer'

export default {
  data() {
    return {
      orderList:[]
    }
  },
  components:{topbar,loadlist,downtimer},
  created() {
  },
  methods: {
    getdata(data){
      this.orderList = this.orderList.concat(data.list);
    },
    nolog(){
      location.href = "/Login/index"
    },
    cancelOrder(i,id){
      if(!confirm('您确定要取消该订单吗？')) return;
      this.$http.get("/Order/cancelOrder/id/"+id,).then(resp=>{
        if(resp.status==200){
          this.orderList[i].status=6;
          this.orderList[i].show_status = '已关闭';
        }
      });
    },
    changestat(i){
      this.orderList[i-1].status = 6;
    },
    gopay(id){
      location.href = '/Order/pay/id/'+id;
    },
    redirect(url){
      location.href = url;
    }
  }
}
</script>

<style scoped>
.orderlist li{ background-color: #fff;}
.orderlist li{ margin-top: .2rem}
.orderlist .otop{ height: .92rem; line-height: .92rem; padding: 0 .25rem;}
.orderlist .omid{ padding: .32rem .25rem;position: relative; min-height: 1.2rem; box-sizing:content-box; padding-left: 2.2rem; background-color: #fafafa;}
.orderlist h3{ font-weight: normal; line-height: 1.8em}
.orderlist .img{ width: 1.8rem; height: 1.2rem; position: absolute; left: .25rem; overflow: hidden;border-radius: .06rem;}
.orderlist .img img{ width: 100%; height: 100%;}
.orderlist .info{ color: #888; line-height:2em;}
.orderlist .info span{ margin-right: .16rem}
.orderlist .red{color:#fa5758}
.orderlist .green{color:#23c683}
.orderlist .gray{ color: #979797;}
.orderlist .ticon{ padding-left:.3rem ;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAACuc5z4AAABmElEQVR42qXWTyiDYRzAcRcXR6SQG8LBZcSBFJHI7lpxWshtq7WLQpKW5K6UA8NKLkzNSbO7pCQt0fy5CQeH6ef71qPWw7s9z+vwuTzvs2/v++7X01smIkaSyeQEMnjDC7bhc9tvGt2DuJi1DqvoPqSEYeOwijZDDFzahqchhlpswqsWYb9NeMYi3GYTbjWMXnuZigOD8JjXOT4sEo3azrEe70AcWVxhERVu+02CQWwggAbUoRq1CGMLNcZh9eMERJPFnbb2gK6SYXU3LxBLQ65h57HwBPGo2y08B/mHnNPRo+X4hPzTyl933IdBBLHmMXyvR/2IYB0htKPRwzt//QlW4chl0zyacG4R/vgJZ7QLx9q4xVCJvGH4zYmGIJpOnOkHDZZtwjcQTQCP2tom+g3DeScsyg6iSjMmEVXrghP0Goa/nPArBGnElU4sIY50wXvvMQyPOOFdiGYYt9paBL4SwSwGnIFwwvUQzRQuCtfU9IRdgu9Y+HW6qX9cihhV+2JI4xQJzGO86HmsHjOFHPJ4Rkr7PjP2DQ2obxxsF+8eAAAAAElFTkSuQmCC") no-repeat left center; background-size: .22rem auto;}
.orderlist .obot{ padding:.16rem .25rem; text-align: right; border-top: 1px solid #f7f7f7;}
.orderlist .obot span{ margin-left: .26rem; display: inline-block; height: .56rem; width: 1.5rem; line-height: .56rem; text-align: center; border-radius: .04rem}
.orderlist .obot span.gopay{ border: 1px solid #23c683; background-color: #23c683; color: #fff}
.orderlist .obot span.cancel{ border: 1px solid #c2c2c2; color: #9b9b9b;}
.orderlist .vice{ color:#989998; line-height: .78rem; padding: 0 .25rem;}
</style>
