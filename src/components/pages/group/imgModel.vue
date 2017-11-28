<template>
  <div class="imgModel" v-if="show">
    <div class="imgwrap">
      <img :src="imgurl"/>
      <span @click="$emit('hide')"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    imgurl:String,
    show:{
      type:Boolean,
      default:false
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.imgModel{ position: fixed; width: 100%; height: 100%; left: 0; top: 0; background-color: rgba(0,0,0,.6); z-index: 999}
.imgwrap{position: absolute;top:50%; transform: translateY(-50%); width:5.6rem; left: 50%; margin-left: -2.8rem;}
.imgwrap img{ width: 100%;}
.imgwrap span{ left:50%; margin-left:-.26rem ;position: absolute;bottom:-1.38rem ;width: .52rem; height: .52rem; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEjklEQVR42tWa3WsUVxjGHbcN3vgPSGlBvFBE9N42xk382prEtFmXWPwMjYIhKBqwqaD12xuRCiGUeiFV6pW2QW2o4EfbmFykVSNB4weKYlvRVmNsFD92fAZ+gUPWNDuzZ3bHgR/kTOY87/vMzpx5z5kZ5bqubWJikqgSa8RGsQs2sq+KY2K249sSGifqRavoE9luffRpQKOghhzxsfhJvCTBV+KqOCL2ivWiVqRgBfv2csxV+rhotKHp5NvQPPGHYaJDbBEJMd0P9PkKDcxJW/vzYeg9cYSgz/k7SWI2SKL5nBhHiRmKoQrxgECdIkUSYZAihkvMSpuGHLFVpEW/2EzQfLCZmGlycHI1FBPfcqZuiIUEyidJYrvkEgtqyBEHELoo5hKgEMwlB5ecnCCGdiJwQZQiXEhKycUlN1+GFnLdXhdzEIwCc8jJJcesDH0gHoknxkgWJVLk1keuIxpq5QxsQiCKbCLH1pEMlXNgOx2jzBlyrRjO0GjRw1O6+i0w9Cm5dgsnwxAHUG7QKfocJefKDEP8hC8D/DofMsdJ5JhcWYA+1eR8aqih8QzTHQFEV3OWbosFAfoXi5MkVue3v1Glv28aWp/DyDZL9NL/jqjy0XcGZ9dlKK7JYcRrNA21cYOV5VCaXEH4rvgkiz4lxkjVL1YFvVTJvW3QUJH4T1y08BTvIcE/RfUIZn4xzHyeY+wLeCjyDE1D+LCl0uQSen9h6k1m2jnmsai1EPcwetM8QzU0ducqDLNFN5p/D5lyzBQdxgLJcksxd6O5yDPUSKPBhjjMMirje9RfcWMW+siWGWhAt9EztJ3GkhDK/fNo3zcWVR6KpZZjLUV7h2foaxrJkOYwXWJw+1csDiFONfr7PEPNNLiBw/mV2P4Rn4VoqNkztCekS67MuI8eiN9D/JWWoL3HM7SBRj3/tD3S3Rc1jHCdId1H9eg2eYZSNHbYmyZjhhEu4xlkf6TbiWbKMzSVxiFLZnqGeQaZpn61/Cw6iN5Uz9AY8VR0WVhqujxClWCaOmuxWujCw5jB4vS0eCbiAQXnid4s6zjT1CkL9Vyc3E+b1faXCH8R8DLr9VFpmxSbpnz2BQY1eTANTWCCdyaAYFOAuZDJR+KEeBzw4X6W3OUBQ9DOvKLCp+AMJlnzaeeTCnI+96Y1hUWc6e85OPKQq0vuGYbeEdfEAM6jbqacXK+Re4Yhc27081tg6Bi51vzfyqljjDrromqG3NIM1c6whmCiGKCIrIygmUpyGyDXrF6nrBQuZUxphMyUGqXVSn8vvJgnUXcVR8BMsVEDNgd5gxcTPxpvI+IFNBM3qvQfRMy3ISgyvkvoFuUFGZ6ZjpBLUa6v9WOixZhCr82jmbXEdMkhZvPDixWsTqa5FBMhGkkQI03M2rA+jZls3Jj9Yr9lYwk0+4nxGzFD/XjJEcvETYI+o1peI0oCmCih73G0vO0WMZx8fl72rlg+ZN3tKQsh34gmLpWkSECSfU0c00kfNmlJE+2CfgA4RWwlwRci2+0FfbahEZkvGk3GMkeqw2SL+A5a2FfHMWNtx38N/BGBn9PQpU4AAAAASUVORK5CYII=") no-repeat; background-size: 100% 100%;}
</style>
