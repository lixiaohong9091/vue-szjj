<template>
  <div class="hseach" v-if="show">
    <h2>热门搜索</h2>
    <div class="adw">
      <ul class="flexbox" v-for="i in Math.ceil(imgs.length/2)">
        <li v-for="j in 2">
          <a :href="imgs[j-1+2*(i-1)].action">
            <img :src="imgs[j-1+2*(i-1)].content"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  name:'deftab',
  data(){
    return {
      imgs:[],
      show:true
    }
  },
  props:{
    //kw:Number
  },
  created(){
    //alert(this.kw)
    this.$http.get("/Index/searchInit").then((response)=>{
      this.imgs = response.data.hotSearch.contentList;
      if(!this.imgs) this.show = false;
    },(err)=>{
      this.show = false;
    });
  }
}
</script>
<style scoped>
h2{ padding: .26rem; padding-bottom: 0;font-size: .22rem; font-weight: normal;}
.hseach .adw{ padding: .13rem}
.hseach .adw ul li{ padding: .13rem;}
.hseach .adw ul img{ width: 100%;}
</style>
