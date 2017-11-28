<template>
  <div class="loadbar" v-show="!isLastpage" @click="onscroll()">
    <i class="loadicon" v-show="isloading"></i>{{barText}}
  </div>
</template>
<script>
import loadingbar from "@/components/base/loadingbar.vue"

export default{
  name:'loadlist',
  data(){
    return {
      pageCount:0,
      currPage:1,
      isScrollBottom:false,
      isloading:false,
      isLastpage:false,
      barText:'正在加载...',
      showicon:true
    }
  },
  components:{loadingbar},
  props:{
    apiurl:String
  },
  created(){
    //alert(this.kw)
    this.getActivityList();
  },
  methods:{
    getActivityList(){
      this.isloading = true;
      this.axios.get(this.apiurl.replace("@p",this.currPage)).then((response)=>{

        let datas = response.data;
        switch(response.status+""){
          case "200":
            let total = datas.total;
            if(total-0){
              this.pageCount = Math.ceil(total/20);
              this.$emit('ondataupdate',datas);
              if(this.currPage >= this.pageCount) this.isLastpage = true;
              this.currPage++;
            }else{
              this.barText = "没有找到相关结果"
              this.$emit('onempty',()=>{this.isLastpage = true});
            }
            break;
          case "400":
            this.barText = "错误：(400)"+datas.message;
            break;
          case "512":
            this.$emit('nologin','');
            this.isLastpage = true;
            break;
        }
        this.isloading = false;
      },(err)=>{
        this.isloading = false;
        this.barText = "加载失败，轻触重新加载"
      });
    },
    onscroll(){
      this.isScrollBottom = document.body.scrollHeight-document.body.scrollTop-window.innerHeight<30;
      if(!this.isloading && this.isScrollBottom && !this.isLastpage){
        this.getActivityList();
      }
    }
  },
   mounted(){
     window.addEventListener('scroll', this.onscroll);
   },
   destroyed(){
     window.removeEventListener('scroll', this.onscroll);
   }
}
</script>
