<template>
  <div class="orderbox">
    <div class="ot">
      <img :src="datas.image_url"/>
      <div class="dname px28">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="scroller">
      <slot name="skuselector"></slot>
      <ul class="pinfo">
        <li>
          购买数量（库存<slot name="stocks"></slot>）<slot name="counter"></slot>
        </li>
        <li>
          单价<slot name="price"></slot>
        </li>
        <li>总价：<slot name="totalprice"></slot></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props:{},
    created() {},
    methods: {}
  }
</script>

<style scoped>

</style>
