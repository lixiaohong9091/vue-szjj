<template>
  <div style="padding-top:1.78rem;">
    <div class="fixtop">
      <div class="sbox">
        <form @submit.prevent="goSearch">
          <input type="search" name="kw" v-model="kw" placeholder="搜索一卡通 / 亲子活动" v-focus/>
          <a @click="$router.back()" class="cancel">取消</a>
        </form>
      </div>
      <ul class="tab flexbox px26">
        <li :class="{active:$route.params.type=='card'}"><router-link :to="getRouter('card')" replace>一卡通</router-link></li>
        <li :class="{active:$route.params.type=='activity'}"><router-link :to="getRouter('activity')" replace>亲子活动</router-link></li>
        <li :class="{active:$route.params.type=='course'}"><router-link :to="getRouter('course')" replace>报班</router-link></li>
        <li :class="{active:$route.params.type=='articles'}"><router-link :to="getRouter('articles')" replace>文章</router-link></li>
      </ul>
    </div>
    <card v-if="this.$route.params.type=='card' && this.$route.params.kw.trim() && kwChange" @onEmpty="nores=true"></card>
    <activity v-if="this.$route.params.type=='activity'&& this.$route.params.kw.trim() && kwChange" @onEmpty="nores=true"></activity>
    <course v-if="this.$route.params.type=='course' && this.$route.params.kw.trim() && kwChange" @onEmpty="nores=true"></course>
    <articles v-if="this.$route.params.type=='articles' && this.$route.params.kw.trim() && kwChange" @onEmpty="nores=true"></articles>
    <deftab v-if="!this.$route.params.kw.trim()"></deftab>
    <div v-if="nores" class="nores">
      <img :src="require('../../../assets/images/fail.png')" />
      <div>
        没有匹配信息
      </div>
    </div>
  </div>
</template>
<script>

import card from '../../pages/homesearch/card.vue'
import activity from '../../pages/homesearch/activity.vue'
import course from '../../pages/homesearch/course.vue'
import articles from '../../pages/homesearch/articles.vue'
import deftab from '../../pages/homesearch/deftab.vue'
export default{

  name:'homesearch',
  data(){
    return {
      type:this.$route.params.type,
      kw:this.$route.params.kw.trim(),
      kwChange:true,
      nores:false
    }
  },
  components:{
    card,activity,course,articles,deftab
  },
  methods:{
    getRouter(tp){
      return {name:'Homesearch',params:{type:tp,kw:this.kw.trim()?this.kw.trim():undefined}}
    },
    goSearch(){
      this.$router.replace({name:'Homesearch',params:{type:this.$route.params.type,kw:this.kw.trim()?this.kw:undefined}});
      this.kwChange=false;
      setTimeout(()=>{
        this.kwChange=true;
      },100);
    }
  },
  created(){

  },
  mounted(){

  },
  beforeRouteEnter(to,from,next){
    if(!to.params.type){
      to.params.type = "card";
    }
    next(true)
  },
  watch:{
    $route(){
      this.nores = false;
    }
  },
  directives:{
    focus:{
      inserted(el){
        el.focus();
      }
    }
  }
}
</script>
<style scoped>
.fixtop{ position: fixed; width: 100%; background-color: #fff; top: 0; left:0; border-bottom: 1px solid #ebebeb; z-index: 1}
.sbox{ padding: .24rem .25rem; padding-right: .98rem; position: relative;}
.sbox input{ width: 100%; height: .5rem; border-radius: .25rem; padding-left: .68rem; box-sizing: border-box; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAACAUlEQVR42rXVP0iUcRzH8ScSukQCS8jlCg8kA/9EDYZEOBxhGHUatCU5tmQ0NpQ0NWli1FDSYNFw0FBDWDRZmdUQdSQSDUYmF2qBZYLDp/cPvg88xPn4XPw8eA3fL9zvPdxzzy+QFOTz+bVUIodrmEQRy/iBAu6iFxl3Tpy40Hl8hBJYxhDS5YQyeAKZadxANxqRRj2yuIwXkPmGXJJQK4oQ5tGHLQjW0YlJyPTFhRqwCGECGQRJ2BkpDELmTKlQBV5BeI3tCJKKHhiJrWDvv6ELEBawC8H/huy8MQhPw51bVmEOwjkEHkL1WIGQDUOnbDGDCh8hi92GMBqGbtliAIHH0FEIc9jmFu9sccJzqAY/Iex3i3kbmnyGLPYewhE3/LIhswGhNxCOueG7DS0bECpAyLrhrQ0nPf9GO7EEYZ9b3LRh2HPoOIQvqHKLXOQxTHkMjUIYCf9HWzFjy4ue3gzNWIVwKPquO2vLJezxEHoO4WGpa+IZhCmkyw3ZOdV4BGERdaVCuzELoYDmMu+jHZiIXO0dcTdsAz5BWMUV1CSIncY0FAl1rRkytXAfmVncQy/a0IQD6MYAPkDmJe5DJhcXCvXYF5VAEZdQaefdsf1vHI4Nmc1oRz/GMIWv+IxxXEcXaks8eQ8g/MHBcFmOTQn/sCmMQ3gcE/LyUq3GVXT+BQr+tl2PZ17YAAAAAElFTkSuQmCC) no-repeat .2rem center #f5f5f5; background-size: .26rem .27rem; font-size: .24rem;}
.cancel{ position: absolute; width: .98rem; right: 0; text-align: center; height: 100%; height: .98rem; line-height: .98rem; top: 0}
.tab{ height: .78rem; line-height: .78rem; text-align: center; padding: 0 .46rem;}
.tab li a{ display: block;}
.tab li.active{ position: relative;}
.tab li.active::after{ position:absolute; bottom: -1px; left: 0;content: " ";height: 2px; width: 100%; background-color: #3bc485;}
.tab li.active a{ color: #3bc485}
.nores{ text-align: center; padding-top: 1rem;}
.nores img{ width: 1.04rem; height: 1.12rem; margin-bottom: .2rem;}
</style>
