<template>
<span>
<slot>{{timeShow.h}}:{{timeShow.n}}:{{timeShow.s}}</slot>
</span>
</template>

<script>
  export default {
    data() {
      return {
        timeShow:{h:"--",n:"--",s:"--"},
        ltime:0,
        isEnd:false
      }
    },
    props:{
      lefttime:{
        type:Number,
        default:3600
      }
    },
    created() {
      this.start()
    },
    watch:{
      lefttime(val){
        this.ltime = val;
        if(this.isEnd){
          this.start();
        }
      }
    },
    methods: {
      sFomart(ts){
        let h = 0;
        let n = 0;
        let s = 0;
        if(ts>0){
          h = parseInt(ts/3600);
          n = parseInt((ts-h*3600)/60);
          s = (ts-h*3600) % 60;
        }
        h = (h+"").length>1?h:"0"+h;
        n = (n+"").length>1?n:"0"+n;
        s = (s+"").length>1?s:"0"+s;
        return {h:h,n:n,s:s}
      },
      start(){
        this.ltime = this.lefttime;
        let tmr = setInterval(()=>{
          //alert(nt)
          this.timeShow = this.sFomart(--this.ltime);
          //alert(JSON.stringify(this.timeShow) )
          this.$emit('onChange',this.timeShow);
          if(this.ltime<0){
            clearInterval(tmr);
            this.$emit('onEnd');
            this.isEnd=true;
          }
        },1000);
      }
    }
  }
</script>

<style>
</style>
