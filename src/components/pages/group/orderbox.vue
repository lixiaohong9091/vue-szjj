<template>
  <div>
    <div class="orderbox" :class="{showSku:show}">
      <div class="ot">
        <img :src="item.image_url"/>
        <div class="dname px28">
          {{subStr(item.name,24)}}
        </div>
      </div>
        <iscroll-view class="scroller" :options="{preventDefault: true,click:true}">
        <skuselector @onSelected="getSku" :skudata="item.skuList"></skuselector>
        <ul class="pinfo">
          <li>
            购买数量（库存{{stocks}}）<counter @onUpdate="getCount" :max="max_buy_num-0" class="rit"></counter>
          </li>
          <li>
            单价<span style="float:right">￥<big>{{price}}</big>{{!this.skuSelected ? this.qi:''}}</span>
          </li>
          <li style="text-align:right" v-if="showtotal">
            总价 <span class="red">￥<big>{{tatolprice}}</big></span>
          </li>
        </ul>
      </iscroll-view>
      <div class="subbtn" @click="submit" :class="{disabled:!showtotal}">确定</div>
    </div>
    <div class="cover" v-show="show"  @click="$emit('hide')"></div>
  </div>
</template>

<script>
import counter from '@/components/base/counter'
import skuselector from '@/components/base/skuselector'
import Vue from 'vue'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
Vue.use(IScrollView, IScroll)
export default {
  data() {
    return {
      skuSelected:null,
      showSku:false,
      skuid:0,
      price:0,
      count:0,
      stocks:0,
      max_buy_num:0,
      qi:"",
      isshow:false
    }
  },
  components:{skuselector,counter},
  props:{
    show:{
      type:Boolean,
      default:false
    },
    item:{
      type:Object,
      default:{}
    }
  },
  created() {
    if(!this.item.itemPropList.length){
      this.item.skuList=[];
    }
    this.stocks = this.item.inventory_num-0;
    this.max_buy_num = this.item.max_buy_num-0>this.stocks-0?this.stocks:this.item.max_buy_num;
    this.price = this.item.discount_price-0
    this.qi = this.item.is_qi-0 ? "起":"";
  },
  methods: {
    getSku(data){
      if(data){
        this.skuSelected=data;
        this.skuid = data.id
        this.price = data.price-0;
        this.stocks = data.inventory_num-0;
      }else{
        this.skuSelected=null;
        this.skuid = 0;
        this.price = this.item.discount_price-0;
        this.stocks = this.item.inventory_num;
      }
    },
    subStr(str,len){
      if(!str) return str;
      return str.substring(0,len)+(str.length>len?"...":"")
    },
    submit(){
      if(!this.showtotal) return;
      this.$emit("onsubmit",{
        skuid:this.skuid,
        count:this.count
      })
    },
    getCount(val){
      this.count = val;
    }
  },
  computed:{
    tatolprice(){
      return (this.count*this.price).toFixed(2)-0;
    },
    showtotal(){
      return this.item.skuList.length ? !!this.skuSelected:true;
    }
  }
}
</script>

<style scoped>
 .orderbox{ position: fixed; bottom: -100%; background-color: #fff; width: 100%; left: 0; z-index:10; transition:.5s; -webkit-transition:.5s;}
 .orderbox.showSku{bottom:0}
 .orderbox .ot{ padding: .25rem; position: relative;min-height:.7rem;}
 .orderbox .ot img{ width:1.8rem; height: 1.2rem; border-radius: .08rem; position: absolute; margin-top: -.4rem;}
 .orderbox .ot .dname{ padding-left: 2rem;}
 .orderbox .scroller{ padding-left: .25rem; max-height: 5rem; overflow-y: hidden; position: relative;touch-action: none;}

 .orderbox .pinfo li{ height: .76rem; line-height: .76rem; border-bottom: #eee 1px solid; padding-right: .25rem; position: relative; overflow: hidden;}
 .orderbox .pinfo .rit{ position: absolute; right: .25rem; top: .16rem;}
 .orderbox .red{ color: #fa5758}

 .orderbox .subbtn{ height: .86rem; line-height: .86rem; background-color: #23c683; color: #fff; text-align: center;}
 .orderbox .subbtn.disabled{ background-color: #ccc; color: #aaa;}
 .cover{ background-color: rgba(0,0,0,.4); position: fixed; width: 100%; height: 100%; left:0; top: 0; z-index: 9;}
</style>
