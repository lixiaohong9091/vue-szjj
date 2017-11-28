<template>
  <div id="app" class="wrap">
    <dialogui></dialogui>
    <router-view></router-view>
  </div>
</template>

<script>
require("./assets/styles/global.css")
import dialogui from '@/components/base/dialog'
export default {
  name: 'app',
  created(){

  },
  components:{dialogui},
  mounted(){
  }
}
</script>
