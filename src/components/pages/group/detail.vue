<template>
  <div class="tuanDetail" v-if="complate">
    <topbar></topbar>
    <div class="headimg"><img :src='datas.image_url'/></div>
    <section class="pdlr pdtb">
      <h1 class="px32">{{datas.name}}</h1>
      <div class="vice pdtb">
        <span>{{datas.number}}人团</span>
        <span class="red">拼团 ￥<big class="px34">{{item.discount_price-0}}</big>{{qi}}</span>
        <span class="gray">原价 ￥<del>{{item.org_price-0}}</del></span>
      </div>
      <div class="tip pdlr red">
        支付后开团并邀请{{datas.number-1}}人参团，人数不足自动退款
      </div>
    </section>
    <section class="currlist" v-show="datas.tuanItemList.length">
      <div class="tit px30">以下拼团正在进行中可以直接参团</div>
      <div class="curritem pdlr" v-for="(info,i) in datas.tuanItemList" :key="i">
        <span class="red">还差{{info.have_number}}人成团</span> 距结束
        <downtimer :lefttime="info.have_time-0" @onEnd="remove(i)"></downtimer>
        <router-link class="btn" :to="{ name: 'TuanProg', params: {id:info.id} }" tag="span">去参团</router-link>
      </div>
    </section>
    <section class="currlist" v-show="datas.tuanInfoList.length">
      <div class="tit px30">该商品还支持以下拼团</div>
      <div class="curritem pdlr rel" v-for="(info,i) in datas.tuanInfoList">
        <span>{{info.number}}人团</span>
        <span class="red">拼团￥<big>{{info.price}}</big><small>{{info.is_qi-0?'起':''}}</small></span>
        <del>￥{{info.old_price}}</del>
        <router-link class="btn grn" :to="{ name: 'TuanDetail', params: {id:info.id} }" tag="span" replace>去看看</router-link>
      </div>
    </section>
    <section class="detail">
      <div class="tit px28">
        商品详情
      </div>
      <div class="content">
        <contenter :html="datas.content" v-if="datas.content"></contenter>
      </div>
    </section>
    <div class="bottombar">
      {{datas.number}}人团<span class="red">拼团 ￥<big>{{item.discount_price-0}}</big>{{qi}}</span>
      <a  @click="showSku = (true)">去开团</a>
    </div>
    <orderbox :item="item" @onsubmit="submit" :show="showSku" v-if="complate" @hide="showSku=false"></orderbox>
  </div>
</template>

<script>
import topbar from '@/components/base/header'
import downtimer from '@/components/base/downtimer'
import contenter from '@/components/base/contenter'
import orderbox from '../group/orderbox'

  export default {
    data() {
      return {
        datas:{},
        item:{},
        isShowList:false,
        timeShow:[],
        skuSelected:null,
        showSku:false,
        qi:"",
        complate:false,
        timeoutcount:0
      }
    },
    components:{
      topbar,downtimer,contenter,orderbox
    },
    created() {
      this.fetchdata();
    },
    methods: {
      fetchdata(){
        this.complate = false;
        var url = '/Tuan/detail/tuanInfoId/'+this.$route.params.id;
        this.$http.get(url).then((response)=>{
          this.datas=(response.data);
          if(this.datas.hasOwnProperty('tuanItemList')){
            this.item = this.datas.itemBase;
            this.isShowList = this.datas.tuanItemList.length;
            this.qi = this.item.is_qi-0 ? "起":"";
            this.price = this.item.discount_price-0;
            this.stocks = this.item.inventory_num;
            this.complate = true;
          }else{
            App.showToast({
              title:'数据错误',
              icon:'warning',
              duration:0
            });
          }
        }, (err)=>{
        });
      },
      remove(i){
        this.datas.tuanItemList[i].have_time=0;
        this.delTimeout();
      },
      delTimeout(){
        var itemli = this.datas.tuanItemList
        if(this.timeoutcount==0){
          this.timeoutcount=itemli.length;
        }
        var itemli = this.datas.tuanItemList;
        for (var i in itemli) {
          if(itemli[i].have_time==0){
            itemli.splice(i,1);
            if(this.timeoutcount>0) this.delTimeout();
            break;
          }
        }
        this.timeoutcount--;
      },
      getCount(val){
        this.count = val;
      },
      submit(data){
        let params = {
          tuanInfoId:this.$route.params.id,
          sku_id:data.skuid,
          number:data.count
        }

        this.$http.post("/tuan/beginTuan",params).then(response=>{
          if(response.status=='200'){
            location.href = "/Order/pay/id/"+response.data;
          }
        });
      }
    },
    mounted(){
      // this.wxConfig(config,(wx)=>{
      // });
    },
    watch:{
      '$route':'fetchdata'
    }
  }
</script>

<style scoped>
.tuanDetail { line-height:1.8em; padding-bottom: .84rem;}
.tuanDetail .pdlr{padding-left:.25rem;padding-right:.25rem;}
.tuanDetail .pdtb{padding-top:.25rem; padding-bottom:.25rem;}
.tuanDetail .headimg img{ width: 100%;}
.tuanDetail section{ background-color: #fff; margin-bottom:.18rem;}
.tuanDetail h1{ font-weight: normal;}
.tuanDetail .gray{ color: #989998}
.tuanDetail .red{ color: #ff5454}
.tuanDetail .tip{ background-color: #ffefef;}
.tuanDetail .vice span{ padding-right: .26rem;}
.tuanDetail .currlist .tit{ text-align: center; line-height: .94rem;}
.tuanDetail .curritem{ height: .94rem; line-height: .94rem; border-top: 1px solid #f4f6f5; position: relative;}
.tuanDetail .curritem .btn{ position: absolute; height: .58rem; right: .25rem; border:1px solid #fac126; color: #fac126; line-height: .58rem; top: 50%; margin-top: -.29rem; padding: 0 .32rem; border-radius: .06rem;}
.tuanDetail .curritem .btn.grn{ border-color: #4cc774; color: #4cc774}
.tuanDetail .curritem.rel span{ display: inline-block;}
.tuanDetail .curritem.rel span:first-child{ width: 1.2rem;}
.tuanDetail .curritem.rel span:nth-of-type(2){ width: 2rem;}
.tuanDetail .curritem.rel del{ color: #a2a2a2}
.tuanDetail .detail{ padding-bottom: .26rem;}
.tuanDetail .detail .tit{ height: .94rem; line-height:.94rem ;padding-left: .26rem; color: #23c683; position: relative;}
.tuanDetail .detail .tit::after{ position: absolute; content: " ";left: 0; width: .05rem; height: .26rem; top: 50%; margin-top: -.13rem; background-color: #23c683}
.tuanDetail .content{margin-left: .26rem; padding-right: .26rem; border-top: 1px solid #e8e8e8;}
.tuanDetail .bottombar{ position: fixed; height: .84rem; background-color: #fff; line-height: .84rem; bottom: 0; width: 100%; left: 0; padding: 0 .26rem; box-sizing: border-box;}
.tuanDetail .bottombar a{ background-color: #ffaf2f; color: #fff; width: 2.74rem; height: 100%; position: absolute; right: 0; text-align: center;}
.tuanDetail .bottombar span{ margin-left: .3rem;}
.tuanDetail .orderbox{ position: fixed; bottom: -100%; background-color: #fff; width: 100%; left: 0; z-index:10; transition:.5s; -webkit-transition:.5s;}
.tuanDetail .orderbox.showSku{bottom:0}
.tuanDetail .orderbox .ot{ padding: .25rem; position: relative;min-height:.7rem;}
.tuanDetail .orderbox .ot img{ width:1.8rem; height: 1.2rem; border-radius: .08rem; position: absolute; margin-top: -.4rem;}
.tuanDetail .orderbox .ot .dname{ padding-left: 2rem;}
.tuanDetail .orderbox .scroller{ padding-left: .25rem; max-height: 5rem; overflow-y: hidden; position: relative;touch-action: none;}
.tuanDetail .pinfo li{ height: .76rem; line-height: .76rem; border-bottom: #eee 1px solid; padding-right: .25rem; position: relative; overflow: hidden;}
.tuanDetail .pinfo .rit{ position: absolute; right: .25rem; top: .16rem;}
.tuanDetail .red{ color: #fa5758}
.tuanDetail .cover{ background-color: rgba(0,0,0,.4); position: fixed; width: 100%; height: 100%; left:0; top: 0; z-index: 9;}
.tuanDetail .subbtn{ height: .86rem; line-height: .86rem; background-color: #23c683; color: #fff; text-align: center;}
.tuanDetail .subbtn.disabled{ background-color: #ccc; color: #aaa;}
</style>
