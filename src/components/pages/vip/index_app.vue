
<template>
	<div class="home">
		<div class="vip-head">
			<div v-if="vipdata.isLogin==1" class="user">
				<div class="head-portrait">
					<img :src="vipdata.avator" alt="">
				</div>
				<div class="message">
					<div class="name">
						{{vipdata.nick}}
					</div>
					<div class="time">
						{{vipdata.tips}}
					</div>
				</div>

			</div>
			<div class="img">
				<img src="../../../assets/images/vip.png" alt="">
			</div>
		</div>
		<swiper class="vip" if="vipdata.seckill" :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
			<!-- slides -->
			<swiper-slide v-for="(item,index) in vipdata.seckill" :key="index">

				<a :href="'javascript:openNative(\'appTarget://secKill/id='+item.id+'\');'">

					<div class="swiper-act">
						<div class="img">
							<img :src="item.avator" alt="">
						</div>
						<div class="txt">
							<div class="big-name elp">新品限时惠</div>
							<div class="name elp">{{item.name}}</div>
							<div class="price">
								<span>￥{{item.price}}</span>
								<del>￥{{item.org_price}}</del>

							</div>

						</div>

					</div>
				</a>

			</swiper-slide>

			<!-- Optional controls -->
			<div class="swiper-pagination" slot="pagination"></div>
			<!-- <div class="swiper-button-prev" slot="button-prev"></div>
																<div class="swiper-button-next" slot="button-next"></div>
																<div class="swiper-scrollbar"   slot="scrollbar"></div> -->
		</swiper>
		<h3 class="tap-header">会员亲子专享</h3>
		<ul class="flexbox tap">
			<li :class="{active:(indexs==index)}" v-for='(btn,index) in tapBnts' :key="index" @click='tapClick(index)'>
				<span>{{btn}}</span>
			</li>

		</ul>

		<div class="all-list" v-if="vipdata.activity">
			<div v-if="indexs == 0">
				<ul>
					<li v-for="(item,index) in vipdata.activity[100011]" :key="index">
						<a :href="'javascript:openNative(\'appTarget://activityInfo/id='+item.id+'\');'">
							<div class="list-act">
								<div class="img">
									<img :src="item.avator" alt="">
								</div>
								<div class="txt">
									<div class="big-name elp">{{item.name}}</div>
									<div class="name elp">{{item.start}}</div>
									<div class="price">
										<span>会员￥{{item.price}}</span>
										<!-- <del>￥{{item.valid}}</del> -->

									</div>

								</div>
							</div>
						</a>
					</li>

					<li>
						<a :href="'javascript:openNative(\'appTarget://findActivity/category=100011/\');'">查看更多&gt; </a>
					</li>
				</ul>
			</div>
			<div v-if="indexs == 1">
				<ul>
					<li v-for="(item,index) in vipdata.activity[100012]" :key="index">
						<a :href="'javascript:openNative(\'appTarget://activityInfo/id='+item.id+'\');'">
							<div class="list-act">
								<div class="img">
									<img :src="item.avator" alt="">
								</div>
								<div class="txt">
									<div class="big-name elp">{{item.name}}</div>
									<div class="name elp">{{item.start}}</div>
									<div class="price">
										<span>会员￥{{item.price}}</span>
										<!-- <del>￥{{item.valid}}</del> -->

									</div>

								</div>
							</div>
						</a>
					</li>

					<li>
						<a :href="'javascript:openNative(\'appTarget://findActivity/category=100012/\');'">查看更多&gt; </a>
					</li>
				</ul>
			</div>
			<div v-if="indexs == 2">
				<ul>
					<li v-for="(item,index) in vipdata.activity[100013]" :key="index">
						<a :href="'javascript:openNative(\'appTarget://activityInfo/id='+item.id+'\');'">
							<div class="list-act">
								<div class="img">
									<img :src="item.avator" alt="">
								</div>
								<div class="txt">
									<div class="big-name elp">{{item.name}}</div>
									<div class="name elp">{{item.start}}</div>
									<div class="price">
										<span>会员￥{{item.price}}</span>
										<!-- <del>￥{{item.valid}}</del> -->

									</div>

								</div>
							</div>
						</a>
					</li>

					<li>
						<a :href="'javascript:openNative(\'appTarget://findActivity/category=100013/\');'">查看更多&gt; </a>
					</li>
				</ul>
			</div>

		</div>
		<div class="class-line fn_clear">
			<div class="class fl">
				<a :href="'javascript:openNative(\'appTarget://articleInfo/id=23324\');'">
					<h3>专家
						<span>微课堂</span>
					</h3>
					<div>育儿专家微信课堂</div>
					<div class="img">
						<img src="data:image/png;base64,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" alt="">
					</div>

				</a>

			</div>
			<div class="line fl border">
				<a :href="'javascript:openNative(\'appTarget://articleInfo/id=23325\');'">
					<h3>
						<span class="orage">1对1</span>在线解答</h3>
					<div>育儿心经/早期教育</div>
					<div class="img">
						<img src="data:image/png;base64,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" alt="">
					</div>
				</a>

			</div>
		</div>
		<div class="add-reason">
			<h3>加入有礼</h3>
			<div>
				<img style="    width: 100%;height: auto;padding-bottom: .15rem" src="../../../assets/images/vip-package.png" alt="">
			</div>
			<div class="txt">
				1、活动时间：即日起至2017年12月31日；<br> 2、活动规则：
				<br> （1）VIP会员99元/年，活动期间内，加入VIP会员仅需88元/年，送VIP会员大礼包一份！
				<br> （2）老用户（已过期一卡通）用户加入VIP会员特惠价78元/年。送VIP会员大礼包一份！
				<br> （3）10月31日之前拥有并激活神州亲子一卡通用户免费获得会员身份。
				<br> 3、VIP会员大礼包：神州佳教平台现金优惠券100元、神小佳定制图册一本、彩色铅笔一筒、神小佳胸章一枚，爬梯朗读胸章一枚，会员感谢信一封，和VIP会员卡（可免费畅玩10多家优质亲子场馆）
				<br> 4、领取规则：购买后点击领取按钮填写收货地址即可领取VIP会员大礼包，如未填写即视为自动放弃；
				<br> 会员默认同意
				<router-link :to="{name:'Agreement'}">《神州佳教会员协议》</router-link>（可点击查看）。<br> 注：会员大礼包预计在12月31日前寄出。
			</div>

		</div>

	</div>
</template>
<script>

require('@/assets/styles/vip.css')
require('swiper/dist/css/swiper.css')
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'


export default {
	data() {
		return {

			// NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
			// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
			notNextTick: true,
			swiperOption: {
				// swiper optionss 所有的配置同swiper官方api配置
				direction: 'horizontal',
				grabCursor: true,
				setWrapperSize: true,
				/* autoHeight: true, */
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: true,
				/* prevButton:'.swiper-button-prev',
			  nextButton:'.swiper-button-next',
			  scrollbar:'.swiper-scrollbar', */
				mousewheelControl: true,
				observeParents: true,
				// if you need use plugins in the swiper, you can config in here like this
				// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
				debugger: true,
				// swiper callbacks
				// swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
				onTransitionStart(swiper) {
					/* console.log(swiper) */
				},
				// more Swiper configs and callbacks...
				// ...
			},
			tapBnts: ['亲子活动', '亲子场馆', '亲子演出'],
			indexs: 0,
			showPopup: false,
			vipdata: {},
			url: ''



		}
	},
	components: {


		swiper: swiper,
		swiperSlide: swiperSlide,
	},
	methods: {
		getData() {
			if (this.$route.query.token) {
				this.url = 'ajaxVip/appIndex?token=' + this.$route.query.token
			} else {
				this.url = 'ajaxVip/appIndex'
			}
			this.$http.get(this.url)
				.then((response) => {
					this.vipdata = response.data;


				},

			)
		},
		tapClick(indx) {
			this.indexs = indx;
		},
		test() {
			console.log(1111)
		}

	},
	created: function() {

		this.getData()


	},
	mounted() {
		window.openNative = (act) => {
			console.log(act)
			let ua = window.navigator.userAgent;
			let isIos = ua.match(/(iPhone|iPod|iPad);?/i);
			let isAdr = ua.toLowerCase().indexOf("android") >= 0;
			let isSzjj = ua.toLowerCase().indexOf("edu-china") >= 0;

			if (isIos) {
				window.location = "shenzhoujiajiao://action?" + act;
			}
			if (isAdr) {
				window.fh50szjj.favorablelist(act);
			}

		}
	}
}
</script>

 


