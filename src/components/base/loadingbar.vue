<template>
<div class="loadbar">
  <i class="loadicon" v-show="status"></i>{{text}}
</div>
</template>
<script>
export default{
  name:'loadingbar',
  data(){
    return{}
  },
  props:{
    status:{
      type:Boolean,
      default:true
    },
    text:{
      type:String,
      default:"正在加载"
    }
  }
}
</script>
