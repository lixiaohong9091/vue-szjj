<template>
  <div>
    <ul class="qlist">
      <li v-for="vo in list">
        <a :href="'/YearCard/activityDetail/itemId/'+vo.id+'/myCardId/'+vo.my_card_id+'/source/1'">
          <div class="litop">
            <div class="right">
              <img :src="vo.image_url">
              <span v-if="vo.bindRights.length">{{cnNumber(vo.bindRights.length)}}选一</span>
            </div>
            <div class="left px20">
              <h2 class="px26 hideTxt /*new*/">{{vo.item_name}}</h2>
              <div class="hideTxt clred">{{vo.rights}}</div>
              <div class="tags hideTxt">{{vo.category_name}} | {{vo.free_reseve-0?"免预约":""}}</div>
              <div class="clgray" style="position:relative;">减免价值： <del>￥{{vo.par_value-0}}</del>　</div>
            </div>
          </div>
        </a>
        <a class="shows" href="/YearCard/activityDetail/itemId/10172/myCardId/0#showli" v-if="vo.liveShowList.length">
          <img :src="users.head_portrait" v-for="users in vo.liveShowList">
          <span>{{vo.liveShowTotal}}人秀过</span>
        </a>
        <dl class="clgray px20 addr">
          <dd class="hideTxt">{{vo.address}}</dd>
          <dt>{{vo.distance}}</dt>
        </dl>
        <div class="libot px20 clgray">
          {{vo.status==2?'消费时间：':''}}
          {{vo.status==3?'预约时间：':''}}
          {{(vo.status==2 || vo.status==3)?vo.valid_time:''}}
          <span>{{['未消费','已消费','已预约','停止预约','已下线'][vo.status-1]}}</span>
        </div>
        <div class="mbox" v-if="vo.bindRights.length">
          <div>
            <span class="hideTxt px20" :data-str="cnnums.charAt(vo.bindRights.length)+'选一'">
              {{vo.bindRights.join[' | ']}}
            </span>
          </div>
        </div>
      </li>
    </ul>

    <loadlist @ondataupdate="getdata" :apiurl="'/index/search/type/cardActivity/searchKey/'+$route.params.kw.trim()+posStr+'/p/@p'" v-if="posready" @onempty="(fun)=>{$emit('onEmpty');fun()}"></loadlist>
    <loadbar :text="'正在获取地理位置..'" v-if="!posready"></loadbar>
  </div>
</template>
<script>
import loadlist from '@/components/base/loadlist'
import map from "@/assets/scripts/bdmap.js"
import loadbar from '@/components/base/loadingbar'
export default{
  name:'card',
  data(){
    return {
      list:[],
      posready:false,
      pos:{lat:0,lng:0},
      cnnums:'一二三四五六七八九十'
    }
  },
  components:{
    loadlist,loadbar
  },
  props:{
  },
  methods:{
    getdata(data){
      this.list = this.list.concat(data.objectList)
    }
  },
  created(){
    //alert(this.kw)
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

.qlist{padding-bottom: .75rem;}
.qlist li{ margin:.12rem; background-color:#fff;}
.qlist li a{ display:block}
.qlist li .litop{position:relative; padding:.16rem .2rem;padding-left:2.02rem; overflow:hidden}
.qlist li .litop:before,.qlist li .litop:after{ content:" "; position:absolute; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAACNCAMAAABWm3DRAAAAJ1BMVEVMaXHz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/NUME2XAAAADHRSTlMA8h9I4uH5IJmXmPFBmZfYAAAAVklEQVR42u1SWw7AIAgrykOc9z/vnIksnsAf+lUIKWlTAMVFxQsmKo0PVAF7JlmDoY0NBwcXaHA99v99g1HoHPpA6azc19/7uJ9Des8OpPfsQOawc3gB5l0cCOKMZeUAAAAASUVORK5CYII=") no-repeat; background-size:100% 100%; width:.11rem; height:1.41rem; top:50%; margin-top:-.7rem;}
.qlist li .litop:before{ left:-.05rem;}
.qlist li .litop:after{ right:-.05rem;}
.qlist li .litop .left{line-height: .38rem;}
.qlist li .litop .left a{ display:block; padding:.1rem .28rem; }
.qlist li .litop h2{max-width:100%; padding-bottom: .06rem; font-weight: normal;}
.qlist li .litop .right span{position:absolute; right: 0;bottom:0; height:.3rem; line-height:.3rem; padding:0 .14rem; background-color:#ff5555; color:#fff; font-size:.18rem;}
.qlist li .litop .right i{ position:absolute; left: 0;top:0; height:.3rem; line-height:.3rem; padding:0 .14rem; color:#fff; font-size:.18rem; font-style: normal;}
.qlist li .litop .right i.gray{ background-color: #d6d6d6;}
.qlist li .litop .right i.green{ background-color: #3ddb99}
.qlist li .litop .right em{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background:url(/images/m/used.png)  no-repeat center rgba(128,128,128,.5); background-size: .79rem .46rem; }
.qlist li h2.new{ padding-left:.5rem; position:relative;}
.qlist li h2.new:before{ position:absolute;content:"NEW"; background-color:#ff8150; color:#fff; width:.4rem; height:.2rem; font-size:.16rem; line-height:.2rem; text-align:center;left:0; top:50%; margin-top:-.1rem;}

.qlist .right{position:absolute; width:1.62rem; height:1.62rem; left:.2rem; top:.16rem; border-left:.02rem #f3f3f3 solid;text-align:center; overflow:hidden}
.qlist .libot{ border-top:1px solid #f3f3f3; padding:0 .18rem; height:.5rem; line-height:.5rem; position:relative;}
.qlist .libot span{ position:absolute; right:0; height:100%; width:1.46rem; text-align:center; border-left:1px solid #f3f3f3;}
.qlist .addr{ position:relative; line-height:.46rem; border-top: 1px solid #f0f0f0;}
.qlist .addr dd{ padding-left:.2rem; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAMAAAB4HKeYAAAAllBMVEVMaXGtra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra0nCZbkAAAAMXRSTlMAAyv42PG9BWUE7+7tzmbs62rw+l9pVPk12ha7Wf4BSdQQur/jLs1gIsyOLLL1ftD09if6QwAAAJ1JREFUeNpNjkcWwjAMRMckcUmv9N476P6XQygJj7+Q54+1EBhjdUSRtgbCwKcWfyAaUE/AhZHf/JLLhoHlx7MKynqcLDTPFF9SThohUabEVUYUgssELQlnlESxE3UxUYkZl414w2mLmmdVGJii4lTDreWSl1x1dMDhQT3hGcy818UKwrXzJ1rcTvS+RMd0zzrZ4Md4RO8b/jh5QwgftCYZ8KagBj4AAAAASUVORK5CYII=") no-repeat left center; background-size:.15rem .19rem; padding-right:.8rem; margin: 0 .18rem;}
.qlist .addr dt{ position:absolute; right:.18rem; top:0;}
.qlist .right img{ height:100%; position: absolute; left: 50%; transform: translateX(-50%);-webkit-transform: translateX(-50%);}
.qlist .right .red{ color:#ff525d; line-height:2em;}
.qlist .right a{ display:block; width:100%;  background-color:#0fc191; color:#fff; line-height:.4rem; margin:.2rem 0}
.qlist .right span{display:inline-block;}
.qlist .right .used{width:100%; background-color:#c4c4c4; color:#fff; line-height:.4rem; margin-bottom:.1rem;}
.qlist .shows{ padding:.2rem; padding-top:0; font-size:0;}
.qlist .shows img{ width:.3rem; height:.3rem;vertical-align:middle; margin-right:.1rem; border-radius:50%;}
.qlist .shows span{color:#adadad; font-size:.2rem; display:inline-block; vertical-align:middle; }
.qlist .tags{ color: #7e7e7e}
.qlist .mbox{ padding: .12rem; border-top:solid #f9f9f9 1px;}
.qlist .mbox>div{ background-color: #3ddb99; height: .36rem; line-height: .36rem; color: #fff; padding: 0 .16rem;}
.qlist .mbox span{ display: inline-block; max-width: 100%; height: 100%; padding-right: .7rem; box-sizing: border-box; position:relative;}
.qlist .mbox span::after{ position: absolute; right: 0; top: 0; height: 100%; content: attr(data-str);}


</style>
