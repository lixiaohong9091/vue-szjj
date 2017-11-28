<template>
	<div id="seckill" v-cloak>
		<svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M511.4481 66.2047C266.1325 66.2047 66.5426 265.7946 66.5426 511.1112c0 245.3176 199.5899 444.9065 444.9065 444.9065 245.3176 0 444.9065-199.5889 444.9065-444.9065C956.3556 265.7946 756.7667 66.2047 511.4481 66.2047zM511.4481 900.4032C296.789 900.4032 122.156 725.7723 122.156 511.1112 122.156 296.4511 296.789 121.8181 511.4481 121.8181c214.6601 0 389.2941 174.633 389.2941 389.2931C900.7421 725.7723 726.1082 900.4032 511.4481 900.4032zM678.2884 483.3044H539.2568319999999V344.270848c0-15.3692-12.4375-27.8057-27.8077-27.8057-15.3702 0-27.8067 12.4375-27.8067 27.8057v139.0336H344.61081600000006c-15.3723 0-27.8077 12.4375-27.8077 27.8067 0 15.3416 12.4365 27.8057 27.8077 27.8057h139.030528v139.0336c0 15.3416 12.4375 27.8057 27.8067 27.8057 15.3713 0 27.8077-12.4641 27.8077-27.8057V538.9168639999999h139.031552c15.3713 0 27.8077-12.4641 27.8077-27.8057C706.0961 495.7409 693.6596 483.3044 678.2884 483.3044z"></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M553.568 512l270.112-270.112c11.488-11.488 11.488-30.08 0-41.568-11.488-11.488-30.08-11.488-41.568 0L512 470.432 241.88800000000003 200.35199999999998c-11.488-11.488-30.08-11.488-41.568 0-11.488 11.488-11.488 30.08 0 41.568L470.432 512l-270.112 270.112c-11.488 11.488-11.488 30.08 0 41.568 11.488 11.488 30.08 11.488 41.568 0L512 553.568l270.112 270.112c11.488 11.488 30.08 11.488 41.568 0 11.488-11.488 11.488-30.08 0-41.568L553.568 512z"></path></symbol><symbol id="icon-arrow-down" viewBox="0 0 1024 1024"><path d="M512.002047 652.228765l-367.407858-363.565343-42.032302 41.548278 409.439136 405.124878 409.435043-405.124878-41.964764-41.548278-367.469255 363.565343z"></path></symbol><symbol id="icon-menu" viewBox="0 0 1024 1024"><path d="M512 512.1m-1.4210854715202004e-14-64a64 64 0 1 0 2.842170943040401e-14 128 64 64 0 1 0-2.842170943040401e-14-128Z" fill=""></path><path d="M768 512.1m-1.4210854715202004e-14-64a64 64 0 1 0 2.842170943040401e-14 128 64 64 0 1 0-2.842170943040401e-14-128Z" fill=""></path><path d="M256.2999999999999 512.1000000000001m-1.4210854715202004e-14-64a64 64 0 1 0 2.842170943040401e-14 128 64 64 0 1 0-2.842170943040401e-14-128Z" fill=""></path></symbol><symbol id="icon-minus" viewBox="0 0 1024 1024"><path d="M512 62c-248.542 0-450 201.458-450 450s201.458 450 450 450 450-201.488 450-450-201.458-450-450-450zM512 905.75c-217.463 0-393.75-176.287-393.75-393.75s176.287-393.75 393.75-393.75 393.75 176.287 393.75 393.75-176.287 393.75-393.75 393.75zM680.75 483.875h-337.5c-15.525 0-28.125 12.6-28.125 28.125s12.6 28.125 28.125 28.125h337.5c15.525 0 28.125-12.6 28.125-28.125s-12.6-28.125-28.125-28.125z"></path></symbol></svg>
		<div class="countdown underway fixed" v-if="seckill.status === '1' && seckill.time_type === '2'">距开始还有：<i>{{h}}</i>:<i>{{m}}</i>:<i>{{s}}</i></div>
		<div class="countdown ending fixed" v-else-if="seckill.status === '2'">距结束还剩：<i>{{h}}</i>:<i>{{m}}</i>:<i>{{s}}</i></div>
		<div class="countdown fixed" v-else-if="seckill.status === '1' && seckill.time_type === '1'">{{timeText}}</div>
		<div class="header">
			<div class="banner"><img :src="seckill.avator"></img></div>
			<div class="titlebar">
				<div class="title">{{seckill.name}}</div>
				<div class="price">
					<span class="icon-privilege" v-if="seckill.only_vip === 1">会员专享</span>
					<span class="icon-vie" v-else>抢</span>
					<template v-if="goods.is_qi === '1'">
						<span class="price-hot"><i>￥</i>{{goods.price}}起</span>
						<span class="price-normal">￥<span>{{goods.org_price}}起</span></span>
					</template>
					<template v-else>
						<span class="price-hot"><i>￥</i>{{goods.price}}</span>
						<span class="price-normal">￥<span>{{goods.org_price}}</span></span>
					</template>
				</div>
			</div>
		</div>
		<router-link tag="div" class="sku" :to="{name: 'SelectSku'}" append>
			<template v-if="!goodsInfo">
				<div class="state">选择</div>
				<div class="option">请选择套餐类型</div>
			</template>
			<template v-else>
				<div class="state">已选</div>
				<div class="option">{{goodsInfo.skuText + goodsInfo.amount + '件'}}</div>
			</template>
			<svg class="icon icon-menu" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-menu"></use></svg>
		</router-link>
		<div class="details" :class="{unfold: showMore}">
			<header><span>图文详情</span></header>
			<div class="txt" v-html="seckill.content"></div>
			<div class="showmore">
				<div class="bg"></div>
				<div class="btn-show" @click="showMore = true">
					<span>阅读更多</span>
					<svg class="icon icon-arrow-down" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-down"></use></svg>
				</div>
			</div>
		</div>
		<router-link to="/vip" class="btn justvip fixed" v-if="userStatus === '1'">仅会员可购买，立即加入会员</router-link>
		<a class="btn soon fixed" href="javascript:;" v-else-if="seckill.status === '1'">即将开始</a>
		<a class="btn underway fixed" href="javascript:;" v-else-if="seckill.status === '2'" @click="submitOrder">立即抢购</a>
		<a class="btn end fixed" href="javascript:;" v-else-if="seckill.status === '3'">已结束</a>
		<a class="btn end fixed" href="javascript:;" v-else-if="seckill.status === '4'">已抢光</a>

		<transition :name="transitionName">
			<keep-alive>
				<router-view name="selectSku" :id="seckill.id" :goods="goods" :status="seckill.status" :tmtGoodsInfo.sync="goodsInfo"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
const qs = require('querystring');
export default {
	data() {
		return {
			transitionName: 'slide-up',
			showMore: false,
			seckill: {},
			goods: {},
			shareInfo: {},
			userStatus: '',
			timeText: '', // 倒计时时间字符串
			h: '', // 时
			m: '', // 分
			s: '', // 秒
			goodsInfo: null, // 商品信息文本
		};
	},
	watch: {
		'$route'(to, from) {
			const toDepth = to.path.split('/').length,
				fromDepth = from.path.split('/').length;
			this.transitionName = toDepth < fromDepth ? 'slide-down' : 'slide-up';
		},
	},
	created() {
		const that = this;
		this.$http.get('/ajaxSeckill/detail', {
			params: {
				id: this.$route.params.id,
			},
		})
		.then(res => {
			if (~~res.status === 200) {
				// console.log(res);
				that.seckill = res.data.seckill;
				that.userStatus = res.data.userStatus;
				that.shareInfo = res.data.shareInfo;
				that.goods = res.data.seckill.goods;
				that.changeTime();
			} else {
				console.warn(res.message);
			}
		})
		.catch(error => {
			console.warn(error);
		});
	},
	methods: {
		// 倒计时
		changeTime() {
			const seckill = this.seckill;
			if (seckill.status === '1') {
				// 即将开始
				if (seckill.time_type === '1') {
					// 日期串
					this.timeText = seckill.left_time;
				} else {
					// 秒数
					this.countDown(seckill.left_time);
				}
			} else {
				// 即将结束
				this.countDown(seckill.left_time);
			}
		},
		countDown(tt) {
			var that = this,
				duration = this.seckill.duration;
			tick();
			const tid = setInterval(tick, 1000);

			function tick() {
				var h, m, s, total = tt--;
				h = toDub(parseInt(total / 3600));
				total %= 3600;
				m = toDub(parseInt(total / 60));
				total %= 60;
				s = toDub(total);
				that.h = h;
				that.m = m;
				that.s = s;
				if (that.seckill.status === '1') {
					if (h === '00' && m === '00' && s === '00') {
						that.seckill.status = '2';
						tt = duration + 1;
					}
				} else if (that.seckill.status === '2') {
					if (h === '00' && m === '00' && s === '00') {
						that.seckill.status = '3';
						clearInterval(tid);
						that.timeText = '已结束';
					}
				}
			}
			function toDub(n) {
				return n < 10 ? '0' + n : '' + n;
			}
		},
		submitOrder() {
			if (!this.goodsInfo) {
				this.$router.push(`/seckill/${this.$route.params.id}/selectSku?submit=true`);
			} else {
				this.$http.post('/ajaxSeckill/launch',{
					id: this.seckill.id,
					skuId: this.goodsInfo.skuId,
					number: this.goodsInfo.amount,
				}).then(res => {
					// console.log(res);
					if (~~res.status === 200) {
						location.href = '/Order/pay/id/' + res.data.ordId;
					}
				});
			}
		},
	},
};
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/ellipsis.stylus'

.slide-up-enter-active
.slide-up-leave-active
.slide-down-enter-active
.slide-down-leave-active
	transition: all 300ms;
.slide-up-enter
.slide-up-leave-active
.slide-down-enter
.slide-down-leave-active
	opacity: 0;

.icon
	/* 通过设置 font-size 来改变图标大小 */
	width: 1em; height: 1em;
	/* 图标和文字相邻时，垂直对齐 */
	vertical-align: -0.15em;
	/* 通过设置 color 来改变 SVG 的颜色/fill */
	fill: currentColor;
	/* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
		normalize.css 中也包含这行 */
	overflow: hidden;

#seckill
	color rgb(35,39,37)
	font-size .28rem
	padding-bottom 1.1rem
	.countdown
		position fixed
		top 0
		left 0
		right 0
		padding .1rem 0
		height .4rem
		line-height .4rem
		font-size .26rem
		text-align center
		background-color #23c883
		color #fff
		z-index 998
		&>i
			display inline-block
			width .4rem
			height .4rem
			margin 0 .12rem
			vertical-align top
			border-radius .06rem
			font-size .22rem
			background-color #fff
			color #ff5454
	.countdown.ending
		background-color #ff5454
	&>div
		background-color #fff
	.banner
		height 4.2rem
		&>img
			width 100%
			height 100%
	.titlebar
		padding .3rem
		.title
			ellipsis(2)
			font-size .3rem
		.price
			margin-top	.14rem
			font-size .22rem
			color #ff5454
			&>span
				display inline-block
			.icon-privilege
				padding 0 .1rem
				border-radius .16rem
				background-color #feeeec
			.price-hot
				font-size .32rem
				&>i
					font-size .22rem
			.price-normal
				margin-left .1rem
				color #bcbcbc
				&>span
					text-decoration line-through
	.sku
		display flex
		padding .2rem .3rem
		margin .2rem 0
		font-size .28rem
		line-height .5rem
		.state
			flex none
			color #989898
		.option
			flex 1
			margin 0 .3rem
		.icon-menu
			width .5rem
			height .5rem
			flex none
	.sku.ready
		.option
			color rgb(255,84,84)
	.details
		position relative
		header
			position relative
			font-size .32rem
			color rgb(35, 198, 131)
			&>span
				display block
				margin-left .3rem
				border-bottom 1px solid rgb(232, 232, 232)
				padding .3rem 0
			&::before
				content: ''
				position absolute
				top 50%
				left 0
				display block
				width .06rem
				height .32rem
				transform translateY(-50%)
				background-color rgb(35, 198, 131)
		.txt
			position relative
			max-height 4rem
			padding .22rem .3rem
			line-height 1.6
			text-align justify
			overflow hidden
		.showmore
			position absolute
			left 0
			right 0
			top 0
			bottom 0
			.bg
				width 100%
				height 100%
				background-image linear-gradient(to top, rgba(256,256,256,1) 0%, rgba(256,256,256,.9) 10%, rgba(256,256,256,0) 30%, rgba(256,256,256,0) 100%)
			.btn-show
				position absolute
				left 0
				right 0
				bottom 0
				line-height 3
				font-size .3rem
				color #989898
				text-align center
				.icon-arrow-down
					width .3rem
					height .3rem
	.details.unfold
		.txt
			max-height none
		.showmore
			display none
	.btn
		position fixed
		left 0
		right 0
		bottom 0
		line-height .9rem
		font-size .34rem
		text-align center
		color rgb(231,231,231)
		background-color rgb(189,190,189)
		z-index 999
		&.soon
			color #fff
			background-color #23c883
		&.underway
			color #fff
			background-color rgb(255,84,84)
		&.justvip
			color #fff
			background-color #23c883
		&.end
			color #e6e6e6
			background-color #bebebe

</style>
