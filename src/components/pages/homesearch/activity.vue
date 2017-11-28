<template>
  <div>
    <ul class="activitys"  v-if="list.length">
      <li v-for="item in list">
        <a :href="'/bj/acd'+item.id">
          <div :class="{coupon:item.is_promotion==1,over:item.valid_status==2}"><img :src="item.image_url"></div>
          <div class="topic">
            <div class="elp2">{{item.name}}</div>
            <div class="price">
              <div class="prc">
                <small class="px24">{{['会员','团','抢'][item.discount_price_type-1]}}</small>
                <small class="px24">￥</small><strong>{{item.discount_price_type-0?item.discount_price: item.min_price}}</strong>
                <small class="px24">{{item.is_qi-0?"起":""}}</small>
              </div>
              <div class="delprc px22" v-if="item.discount_price_type-0">
                <del>￥{{item.min_price}}</del>
              </div>
            </div>

          </div>
          <div class="vice">
            <span>{{item.city_name}}</span>
            <span class="hideTxt" style="width:3.5rem;">{{item.out_date}}</span>
          </div>
        </a>
      </li>
    </ul>
    <loadlist @ondataupdate="getdata" :apiurl="'/index/search/type/activity/searchKey/'+$route.params.kw.trim()+'/p/@p'" @onempty="(fun)=>{$emit('onEmpty');fun()}"></loadlist>
  </div>
</template>
<script>
import loadlist from '../../base/loadlist.vue'

export default{
  name:'activity',
  data(){
    return {
      list:[]
    }
  },
  components:{loadlist},
  props:{
  },
  created(){
    //alert(this.kw)
  },
  methods:{
    getdata(datas){
      this.list = this.list.concat(datas.objectList);
    }
  }

}
</script>
<style>
.activitys{padding: .25rem; background-color: #fff;}
.activitys li{ padding:.26rem 0; border-bottom: 1px solid #e8e8e8}
.activitys li img{ width:100%; border-radius: .06rem;}
.activitys li .topic{margin:.2rem 0; line-height:1.4em; font-size:.26rem; position: relative; padding-right: 1.6rem;}
.activitys li .topic .price{position: absolute; top:0; right: 0; position:absolute; right:0; bottom:0; margin-right:0; text-align: right;}
.activitys li .topic .prc{color: #ff525d; font-size:.34rem;}
.activitys li .topic .delprc{ color: #989998; line-height: 1.6em}
.activitys li .vice{  position:relative;}
.activitys li .vice span{ margin-right:.34rem; color:#adadad;margin-right:.34rem;}
.elp2{-webkit-line-clamp: 2;display: -webkit-box;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;}
.coupon,.over{ position: relative;border-radius: .06rem; overflow: hidden;}
.coupon::after{ position: absolute; font-size: .22rem;width: 1.6rem; height: .42rem; line-height: .44rem;content: "领红包";text-align: center;top: .12rem; left: -.46rem; background-color:#ff5454; color:#fff600; transform: rotate(-45deg);}
.over::before{position: absolute; content: " "; width: 100%; height: 100%; background: url(../../../assets/images/over.png) no-repeat center;background-color: rgba(0,0,0,.4); background-size: 2.29rem 1.98rem;}
.vice span{ display: inline-block; vertical-align: middle;}
</style>
