<template>
	<div class="foot-load  foot-fix img"  v-show="showCardIntro">
		<div>
			<img src="../../assets/images/load.png" alt="">
		</div>
		<div class="click-load">
			<a href="http://www.edu-china.com/client/download.htm">下载APP</a>

		</div>
		<div class="logo">
			<img src="../../assets/images/load_logo.png" alt="">
		</div>
		<div class="del" @click="closeFootBar">
			<img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAB5lBMVEVMaXFpcHppcHtpcHppcHtpcHppcHtob3ppcHppcHtpcHtpcHtpcHtpcHppcHtpcHppcHtpcHppcHtob3ppcHtob3ppcHtpcHppcHppcHtpcHtpcHtpcHtob3ppcHtpcHppcHppcHppcHtpcHtob3ppcHtpb3pob3ppcHtpcHppcHtob3ppcHppcHppcHtpcHppcHtpcHtob3ppcHppcHtpcHtpcHpob3ppcHtpcHtpcHppcHtpcHtob3pob3ppcHtpcHppcHtpcHppcHtpcHppcHtpcHppcHpob3ppcHtpcHtpcHppcHppcHpob3pob3ppcHpob3ppcHtob3ppcHtpcHppcHtpcHtpcHtob3ppcHtpcHtpcHppcHtpcHtpcHtob3ppcHppcHtpcHtpcHppcHtpcHppcHppcHpob3ppcHppcHppcHtpcHtob3ppcHppcHpob3ppcHv////29/f7+/vV19mUmaDT1thtc35tc33T1dhtdH9sc35pb3ptdH6Jj5eJjpd3fYiTmKCUmaHV19pyeIPR09dudYCZnaSboKfO0NTP0dXW2Ntwd4GTmJ+IjpbQ0tX7/PzU19mJjpb19/dtcn2Jj5iTmaDT1dmNkpqMkprc3uDe4OLU1tlscn3+/v6IjZbuhE49AAAAcHRSTlMAmLKf293+/gie6AW4/YTgYAGIAfSRAUNcgQ9XVix6O1+sEuA/sQbu2iTzJB4t/BM4YdzwDhhaHBxyLr/EinXDwq4XqE9fOb/96QaLPeaeqKIHebsr7ng/yT0p8QdVRcou/E25p8wb6U5JPgovUylWZjBbIAAAAkpJREFUeNp1kwVfG0EQxQcoJHjd3d3dW+ru7u6dvUuAAAkFSt3d5Zv2vZlfmlDoy2XvdvPf92Z3L9JTG3ddOH3mXFL+px2b9m7XKAoazp+tO9EXkVyxW0MEBbQhCjXzeyGT+0UKEwUCAHetqFzcExk7l8OqJJQiOH1METGghAnBbdBAjNVp4wrMQDUXK8Zb9tEsmpNHhnuZBM0EiTlV81040pFlMzWirBbipMGwp5XONHAmR9RdNDhjRoktRA5ts46+eN0VbDqRlqfPYcnsi2RK1BM6U2+aSJPLtMbP+EzfOyLVhzmbGfdS6SZbj7a0xo3tFourTuS4kg+smVCAMkCysHHqssgRX7ZZAfoUGdLuS2dbe1PKbLXosMSPcPr5mUGBwzmr+pbUBA3Gm9XvVPpb3N1mOfkNvy7rjEXXN+brr/g7ED8Mr+CurNLCcUdcUYzV0YKg+V+TDXzCRemH5vjHF9SU87OlsUY3ZI2S5gf70hw3toWOVPo+hiyH4BVZajZWSwZIFrkd79NdDvBYr4osqSADhC5vrdzoHZ3sCXaXRGS9+huWYRBg2iPuJYcZeRvMeA8OT+LubABh0KvUw+BpVafAVNcbFB49zpKAEx06H/iLq2uFGuW7hVZtmPL3H215UkylPsSvUz6Dk2qHiWsi/3+Y5IySsnhAIySvWVX4jdZGMhg30mWD5K9mlNtxuZgDFhoyVIo0bwqcCoy5DO4v/2j0JDLcXUcSE2ZLL01dsDrBRDM6uWel9K3lm3eWbj12cN+Bo/ulSH8AnRWXtcFx/EUAAAAASUVORK5CYII=">
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			showCardIntro:!sessionStorage.closed
		}
	},
	methods:{
		closeFootBar(){
			sessionStorage.closed=1;
			this.showCardIntro = 0;
		}
	}
}
</script>
<style>
 .foot-fix {
	position: fixed;
	bottom: 0
}

.foot-load.img img {
	width: 100%;
	height: auto
}

.foot-load.foot-fix .click-load {
	position: absolute;
	bottom: .25rem;
	right: .65rem
}

.foot-load.foot-fix .click-load a {
	display: block;
	background: #fff;
	width: 1.54rem;
	height: .44rem;
	line-height: .44rem;
	text-align: center;
	border-radius: .2rem;
	color: #3dc586;
}

.foot-load.foot-fix .logo {
	position: absolute;
	right: .3rem;
	bottom: .5rem;
}

.foot-load.foot-fix .logo img {
	width: .71rem;
	height: 1.12rem
}
.foot-load.foot-fix .del{
	position: absolute;
	top:-.43rem;
	right: .13rem;
}
.foot-load.foot-fix .del img{
	width: .35rem;
	height: .35rem;
}
</style>
