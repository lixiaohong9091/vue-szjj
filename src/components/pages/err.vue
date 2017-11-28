<template>
  <div>
    <myhead></myhead>
    <div class="banner">
      <img :src="require('../../assets/images/404.gif')" />
    </div>
    <div class="btn">
      <span @click="$router.back()">返回上个页面</span>
      <div style="padding-top:.3rem">
        <router-link :to="{ name: 'Index' }">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import myhead from '@/components/base/header'
export default {
  data() {
    return {
    }
  },
  components:{
    myhead
  },
  props:{},
  created() {},
  methods: {}
}
</script>

<style scoped>
.banner{ width: 5.18rem; margin: 0 auto; margin-top: 2rem;}
.btn{ text-align: center; padding: .5rem 0;}
.btn span{ display: inline-block; background-color: #23c683; height: .68rem; line-height: .68rem;padding: 0 .5rem; color: #fff; border-radius: .06rem;}

</style>
