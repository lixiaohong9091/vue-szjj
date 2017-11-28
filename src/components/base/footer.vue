<template>

   <div class="footer footer-nav">
	<ul class="flexbox">

		<li><router-link :to="{name:'Index'}"> 首页 </router-link></li>
		<li><a href="/YearCard/buyCard">亲子一卡通</a></li>
		<li><a href="/bj/acl/">亲子活动</a></li>
		<li><a href="http://www.edu-china.com/client/download.htm">下载APP</a></li>
	</ul>
	<div class="px24" style="padding:.12rem 0 0">神州佳教客服电话  <span class="red"> <a href="tel:400-706-7131">400-706-7131</a> </span></div>
	<div class="px24" style="padding:.12rem 0">Copyright©2016 神州佳教 京ICP备13031045号-1</div>
</div>
</template>
<style scoped>
.footer-nav  .red{color:#fa5758;text-decoration: underline;}
</style>
