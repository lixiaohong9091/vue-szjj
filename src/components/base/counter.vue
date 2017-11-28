<template>
  <span class="counter">
    <i @click="minus" class="minus">－</i> {{count}} <i @click="plus" class="plus">＋</i>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        count:0
      }
    },
    props:{
      def:{
        type:Number,
        default:1
      },
      max:{
        type:Number,
        default:0
      },
      min:{
        type:Number,
        default:1
      }
    },
    created() {
      this.count = this.def;
      if(this.def<this.min) this.count = this.min;
      if(this.def>this.max && this.max) this.count = this.max;
    },
    methods: {
      minus(){
        if(this.count>this.min) this.count--;
      },
      plus(){
        if(this.max){
          if(this.count<this.max) this.count++;
        }else{
          this.count++
        }
      }
    },
    watch:{
      count(val){
        this.$emit('onUpdate',val);
      },
      max(){
        if(this.count>this.max && this.max) this.count = this.max;
      },
      min(){
        if(this.count<this.min) this.count = this.min;
      }
    }
  }
</script>

<style scoped>
.counter{ line-height: .4rem;}
.counter i{ font-style: normal; display: inline-block; width: .4rem; height: .4rem; border-radius: 50%; line-height: .4rem; text-align: center; font-size: .3rem;}
.counter i.minus{ background-color: #f6f6f6; border: 1px solid #a7a7a7; color: #a7a7a7;}
.counter i.plus{ color: #27c785; border: 1px solid #27c785; background-color: #ebfcf5}
</style>
