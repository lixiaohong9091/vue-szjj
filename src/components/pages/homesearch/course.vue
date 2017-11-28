<template>
  <div>
    <ul class="course">
      <li v-for="item in list">
        <a :href="(item.is_voucher-0?'/vd':'/cd')+item.id">
          <div class="img"><img :src="item.courseImageUrlList[0]"><span class="star2" :class="'s'+item.credit_rate*2"></span></div>
          <div class="right">
            <h3 class="px24 hideTxt">{{item.title}}</h3>
            <div class="inst"><div class="hideTxt">{{item.institution_short_name}}</div><span>{{item.distance}}</span></div>
            <span class="price"><small v-if="item.is_vip_price-0">会员价：</small>￥{{item.is_vip_price-0?item.vip_price:item.price}}</span>
            <div class="tags"><span class="pay" v-if="item.is_pay-0">支付</span><span class="trial" v-if="item.is_listen-0">试听</span></div>
          </div>
        </a>
      </li>
    </ul>
    <loadlist @ondataupdate="getdata" :apiurl="'/index/search/type/courses/searchKey/'+$route.params.kw.trim()+posStr+'/p/@p'" v-if="posready" @onempty="(fun)=>{$emit('onEmpty');fun()}"></loadlist>
    <loadbar :text="'正在获取地理位置..'" v-if="!posready"></loadbar>
  </div>
</template>
<script>
import loadlist from '../../base/loadlist.vue'
import map from "@/assets/scripts/bdmap.js"
import loadbar from '@/components/base/loadingbar'
export default{
  name:'course',
  data(){
    return {
      list:[],
      pos: {lat:0,lng:0},
      posready:false
    }
  },
  props:{
    //kw:Number
  },
  components:{loadlist,loadbar},
  created(){
    //alert(this.kw)
  },
  methods:{
    getdata(datas){
      this.list = this.list.concat(datas.objectList);
    }
  },
  mounted(){
    map.getBaiduPos((pos)=>{
      this.pos = pos;
      this.posready = true
    },(err)=>{
      this.posready = true
      console.log(err);
    });
  },
  computed:{
    posStr(){
      let lat = this.pos.lat?'/latitude/'+this.pos.lat:'';
      let lng = this.pos.lng?'/longitude/'+this.pos.lng:'';
      return lat+lng;
    }
  }
}
</script>
<style scoped>
.course{ background-color: #fff;}
.course li{ padding:.3rem 0; height:1.26rem; border-bottom:1px solid #e6e6e6}
.course li a{ display:block; color:#adadad; position:relative; height:100%;padding-left:2.04rem; margin: 0 .25rem;}
.course li .img{ width:1.8rem; height:1.26rem; position:absolute; background-color:#fcfcfc; left:0}
.course li .img img{ width:100%; height:100%;}
.course li .img span{ position:absolute; left:50%; margin-left:-.62rem; bottom:-.22rem;}
.course li .right{  position:relative; height:100%;box-sizing:border-box}
.course li h3{ font-weight:normal; color:#505050}
.course li .inst{ position:relative; line-height:.6rem;}
.course li .inst div{ padding-right:1rem;}
.course li .inst span{ position:absolute; right:0; top:0}
.course li .price{ color:#ff525d; position:absolute; left:0; bottom:0}
.tags{ position:absolute; right:0; bottom:0;}
.tags span{ display:inline-block; width:.4rem; height:.2rem; line-height:.2rem; color:#fff; text-align:center; font-size:.14rem; margin-left:.06rem;}
.tags span.pay{ background-color:#ffad4c}
.tags span.verify{background-color:#43cbe8;}
.tags span.cert{background-color:#23c683;}
.tags span.trial{background-color:#ff57aa;}
.star2{ width:1.25rem; height:.16rem; background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAQCAYAAADj5tSrAAAA0klEQVR42rXRMQ4BQRSAYZuILRQKpZ5zKIREIRqNuMGWGlG5gdBxBFsoyF5ApRKtRoVSo0E8v2SLzUskMzsUXzGZvP0z+zIiYiWKog5WNjO2AR9HCBr/igSQ2Baea0QH8rhAElq/jgwhyh7ZVJHPIJoYYa1eoN2wwRhdFE0jPUhKC9NIAYcUgTuqRpE4VMbVMhJYL56hOp6GgbnN4nVoYBDYIucS6RhEQjVnHembvMQ1MoEoD3U+u0aW6t/XUMIsEXu57mSKHdrw1F0FIU7wv33jDY/PpXa31mrmAAAAAElFTkSuQmCC"); background-size:.25rem .16rem; background-repeat:repeat-x; position:relative;}
.star2:after{ position:absolute; content:" "; top:0; left:0; height:100%; background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAQCAYAAADj5tSrAAAAz0lEQVR42rXUsQ7BQBjAcZJGB4PBaOc5DEJiEIYu0jfoaBGTNxA2HkEHA29g6iRWiwmjxYL4/AdDc6W59mr4DZcm/ffyXS8nIlE9N46DdczzyPuSRmwcIWj9K+JBPgLks44UcYGEdLKOjCCKPay0EQttjLFRdqC6YYsJ+ijrRlxISkvdSAmHFIE76klmUsU1YcRLM/gmnpqBhcnpGmoEAhRMIo5GxDf9TwY6OzGNTCGKh7I+m0ZWyhc3UME8FHuZzmSGHbpfLsQafJxg/4q8AReE27fFrTTzAAAAAElFTkSuQmCC");background-size:.25rem .16rem; }
.star2.s0:after{ width:0;}
.star2.s1:after{ width:10%;}
.star2.s2:after{ width:20%;}
.star2.s3:after{ width:30%;}
.star2.s4:after{ width:40%;}
.star2.s5:after{ width:50%;}
.star2.s6:after{ width:60%;}
.star2.s7:after{ width:70%;}
.star2.s8:after{ width:80%;}
.star2.s9:after{ width:90%;}
.star2.s10:after{ width:100%;}
</style>
