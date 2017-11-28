<template>
  <div>
    <topbar></topbar>
    <ul class="orderlist">
      <li v-for="(od,i) in orderList" :key="i">
        <div class="otop"  @click="goprog(od.show_status,od.tuanItemId,od.id)">
          <div class="img">
            <img :src="od.image_url" />
          </div>
          <h3 class="px28 hideTxt">{{od.name}}</h3>
          <div class="info px22">
            <span class="ticon">{{od.number}}人团</span>
            <span class="red">￥{{od.pay_amount}}</span>
            <span class="green" v-if="od.show_status==1">已成团</span>
            <span class="red" v-if="od.show_status==2">等待支付</span>
            <span class="gray" v-if="od.show_status==3">未成团已退款</span>
            <span class="green" v-if="od.show_status==4">拼团中</span>
            <span class="gray" v-if="od.show_status==5">已关闭</span>
          </div>
        </div>
        <div class="obot" v-if="od.show_status==2">
          <span class="cancel" @click="cancelOrder(i,od.id)">取消订单</span>
          <span class="gopay" @click="gopay(od.id)">去支付</span>
        </div>
      </li>
    </ul>
    <loadlist apiurl="/Tuan/myTuanList/p/@p" @ondataupdate="getdata" @nologin="nolog" @onempty="(fun)=>{nores=true;fun()}"></loadlist>
    <div class="nores" v-show="nores">
      您还没参加过任何拼团快去参加~
      <div style="padding:.1rem 0;">
        <router-link :to="{ name: 'TuanIndex'}" tag="span">去拼团</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '@/components/base/header'
import loadlist from '@/components/base/loadlist'
export default {
  data() {
    return {
      orderList:[],
      nores:false
    }
  },
  components:{topbar,loadlist},
  created() {
  },
  methods: {
    getdata(data){
      this.orderList = this.orderList.concat(data.list);
    },
    nolog(){
      App.showToast({
        title:'未登录',
        icon:'warning',
        complete:()=>{
          location.href = "/Login/index"
        }
      });
    },
    goprog(st,tid,oid){
      if(st==2){
        location.href = '/Order/pay/id/'+oid;
      }else{
        this.$router.push({name:'TuanProg',params:{id:tid}});
      }

    },
    cancelOrder(i,id){
      if(!confirm('您确定要取消该订单吗？')) return;
      this.$http.get("/Order/cancelOrder/id/"+id).then(resp=>{
        if(resp.status==200){
          this.orderList[i].show_status=6;
        }
      });
    },
    gopay(id){
      location.href = '/Order/pay/id/'+id;
    }
  }
}
</script>

<style scoped>
.orderlist li{ background-color: #fff;}
.orderlist li{ margin-top: .2rem}
.orderlist .otop{ padding: .32rem .25rem;position: relative; min-height: 1.2rem; box-sizing:content-box; padding-left: 2.2rem;}
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
.nores{ text-align: center; padding-top: .2rem;}
.nores span{display:inline-block;height: .58rem; border:1px solid #4cc774; color: #4cc774; line-height: .58rem; padding: 0 .32rem; border-radius: .06rem;}
</style>
