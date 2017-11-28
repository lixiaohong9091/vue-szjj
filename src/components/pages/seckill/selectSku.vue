<template>
	<div id="sku" class="fixed">
		<div class="bg" @click="backSku"></div>
		<div class="goods">
			<header class="header">
				<div class="avator"><img :src="goods.avator"></div>
				<div class="title">{{goods.name}}</div>
				<svg class="icon icon-close" aria-hidden="true" @click="backSku"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg>
			</header>
			<div class="sku-list">
				<div class="sku-item" v-for="(name, i) of keyArr" :key="i">
					<div class="key-name">{{goods.sku_prop_info[i].name}}</div>
					<ul class="sku-opt clearfix">
						<li class="opt-item" v-for="(sku, j) of skuArr[i]" :key="j" :class="{disabled: skuIsDis[i][j], selected: selectedSku[i] === sku}" @click="selectSku(name, sku, i, j)">{{sku}}</li>
					</ul>
				</div>
				<template v-if="findedSkuObj !== null">
					<div class="count clearfix">
						<div class="key-name">数量(库存: {{findedSkuObj.inventory_num}}，限购: {{goods.quota_left}})</div>
						<div class="counter">
							<svg class="icon icon-minus" aria-hidden="true" @click="minusAmount"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-minus"></use></svg>
							<span class="amount">{{amount}}</span>
							<svg class="icon icon-add" aria-hidden="true" @click="addAmount"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add"></use></svg>
						</div>
					</div>
					<div class="price price-unit clearfix">
						<span class="key-name">单价</span>
						<span class="price-txt">￥{{findedSkuObj.price}}</span>
					</div>
					<div class="price price-total">
						<span class="key-name">总价</span>
						<span class="price-txt"><i>￥</i>{{mul(findedSkuObj.price, amount)}}</span>
					</div>
				</template>
			</div>
			<div class="killfooter">
				<div class="tips">温馨提示：五分钟内未支付，订单将自动取消</div>
				<div class="btn-buy" @click="confirm" :class="{effective: findedSkuObj !== null && amount > 0}">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
const qs = require('querystring');
export default {
	props: {
		id: String,
		goods: Object,
		status: String, // 目前秒杀状态
		tmtGoodsInfo: Object, // 选择之后的sku信息
	},
	data() {
		return {
			skuObjJson: {},
			findedSkuObj: null,
			keyArr: [],
			skuArr: [],
			selectedSku: [],
			initSelectedSku: [],
			combSet: [],
			skuIsDis: [],
			initSkuIsDis: [],
			pathArr: [],
			spliter: '@',
			amount: 0, // 选择的商品数量
			goodsInfo: null, // 选好之后本地sku信息
		};
	},
	created() {
		this.init();
	},
	activated() {
		this.selectedSku = JSON.parse(JSON.stringify(this.initSelectedSku));
		this.skuIsDis = JSON.parse(JSON.stringify(this.initSkuIsDis));
		this.amount = 0;
		if (this.goods.sku_prop_info.length === 0) {
			this.findedSkuObj = this.goods.sku_info[0];
			this.goodsInfo = {
				skuId: this.findedSkuObj.id,
				amount: this.amount,
				skuText: '',
			};
		} else {
			this.findedSkuObj = null;
			this.goodsInfo = null;
		}
	},
	methods: {
		init() {
			const that = this,
				spliter = this.spliter,
				skuInfo = this.goods.sku_info || [],
				skuProp = this.goods.sku_prop_info || [];
			// 没有sku
			if (skuProp.length === 0) {
				this.findedSkuObj = skuInfo[0];
				this.goodsInfo = {
					skuId: this.findedSkuObj.id,
					amount: this.amount,
					skuText: '',
				};
				return this;
			}
			// 数据结构太垃圾，需要对skuInfo做额外处理
			skuInfo.forEach(function (item, index, self) {
				item.properties_name.split(';').forEach(function (val, i, arr) {
					var v = val.split(':');
					item[v[0]] = v[3];
				});
			});

			initSku(skuInfo, skuProp);
			function initSku(goodsSku, skuProp) {
				const keyArr = [],
					skuArr = [],
					skuObjJson = {},
					selectedSku = [],
					initSelectedSku = [],
					skuIsDis = [],
					initSkuIsDis = [],
					pathArr = [],
					combSet = [];

				skuProp.forEach(function (item, index, self) {
					keyArr.push(item.id);
				});

				keyArr.forEach(function (val, index, self) {
					skuIsDis[index] = [];
					initSkuIsDis[index] = [];
					skuArr[index] = [];
					selectedSku[index] = '';
					initSelectedSku[index] = '';
				});

				goodsSku.forEach(function (item, key, self) {
					let p = [];
					keyArr.forEach(function (val, index, self) {
						let f = skuArr[index],
							s = item[val];
						f.indexOf(s) === -1 && (f.push(s), initSkuIsDis[index].push(false));
						p.push(s);
					});
					skuObjJson[p.join(spliter)] = item;
					pathArr.push(p);
				});

				pathArr.forEach(function (item, index, self) {
					let m = powerSet(item);
					m.forEach(function (val, key, self) {
						let cell = val.join(spliter);
						combSet.indexOf(cell) === -1 && combSet.push(cell);
					});
				});

				that.spliter = spliter;
				that.keyArr = keyArr;
				that.skuArr = skuArr;
				that.selectedSku = selectedSku;
				that.initSelectedSku = initSelectedSku;
				that.skuObjJson = skuObjJson;
				that.initSkuIsDis = initSkuIsDis;
				that.skuIsDis = initSkuIsDis;
				that.pathArr = pathArr;
				that.combSet = combSet;
			};

			function powerSet(arr) {
				let ps = [[]], i, j, len;
				for (i = 0; i < arr.length; i++) {
					for (j = 0, len = ps.length; j < len; j++) {
						ps.push(ps[j].concat(arr[i]));
					}
				}
				return ps;
			}
		},
		backSku() {
			this.$router.go(-1);
		},
		minusAmount() {
			this.amount = --this.amount < 0 ? 0 : this.amount;
		},
		addAmount() {
			let n = ~~this.findedSkuObj.inventory_num < ~~this.goods.quota_left ? this.findedSkuObj.inventory_num : this.goods.quota_left;
			this.amount = ++this.amount > n ? n : this.amount;
		},
		mul(m, n) {
			let mArr = m.split('.'),
				nArr = (n + '').split('.'),
				ml = mArr[1] ? mArr[1].length : 0,
				nl = nArr[1] ? nArr[1].length : 0;
			return (m * Math.pow(10, ml)) * (n * Math.pow(10, nl)) / Math.pow(10, (ml + nl));
		},
		selectSku(key, sku, i, j) {
			if (this.skuIsDis[i][j]) {
				this.selectedSku = JSON.parse(JSON.stringify(this.initSelectedSku));
				this.skuIsDis = JSON.parse(JSON.stringify(this.initSkuIsDis));
				this.findedSkuObj = null;
				this.goodsInfo = null;
				this.amount = 0;
			}

			this.$set(this.selectedSku, i, sku);
			this.updateStatus();
			this.getSkuObj();
		},
		updateStatus() {
			const skuIsDis = JSON.parse(JSON.stringify(this.skuIsDis)),
				selectedSku = this.selectedSku,
				spliter = this.spliter,
				combSet = this.combSet,
				skuArr = this.skuArr;

			this.keyArr.forEach(function (val, i, self) {
				const everySku = skuArr[i],
					copySel = selectedSku.slice(),
					cellStatus = skuIsDis[i];
				everySku.forEach(function (sku, j, self) {
					if (selectedSku[i] !== sku) {
						copySel[i] = sku;
						const trimPath = copySel.filter(function (val) {
							if (val) return val;
						}).join(spliter);
						if (combSet.indexOf(trimPath) === -1) {
							cellStatus[j] = true;
						} else {
							cellStatus[j] = false;
						}
					}
				});
			});
			this.skuIsDis = skuIsDis;
		},
		getSkuObj() {
			let skuObjJson = this.skuObjJson,
				spliter = this.spliter,
				selectedSku = this.selectedSku,
				tempselSku = selectedSku.filter(function (val) {
					if (val) return val;
				}),
				findedSkuObj = skuObjJson[tempselSku.join(spliter)] || null;
			if (tempselSku.length === selectedSku.length) {
				this.findedSkuObj = findedSkuObj;
				this.goodsInfo = {
					skuId: findedSkuObj.id,
					amount: this.amount,
					skuText: tempselSku.join('，') + '，',
				};
			}
		},
		confirm() {
			// 把goodsInfo传出去
			if (this.goodsInfo && this.amount > 0) {
				this.goodsInfo.amount = this.amount;
				this.$emit('update:tmtGoodsInfo', this.goodsInfo);
				if (this.$route.query.submit) {
					this.$http.post('/ajaxSeckill/launch', qs.stringify({
						id: this.id,
						skuId: this.goodsInfo.skuId,
						number: this.goodsInfo.amount,
					}))
					.then(res => {
						console.log(res);
						if (~~res.status === 200) {
							location.href = '/Order/pay/id/' + res.data.ordId;
						}
					});
				} else {
					this.backSku();
				}
			}
		},
	},
};
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/ellipsis.stylus'

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

#sku
	position fixed
	left 0
	right 0
	top 0
	bottom 0
	background-color transparent !important
	z-index 1000
	.bg
		width 100%
		height 100%
		background-color rgba(0,0,0,.3)
	.goods
		position absolute
		left 0
		right 0
		bottom 0
		height: 70%
		display flex
		flex-direction column
		background-color #fff
		.header
			position relative
			flex none
			height 1.4rem
			border-bottom 1px solid #b5b5b5
			.avator
				position absolute
				left .3rem
				top -.3rem
				width 2.1rem
				height 1.4rem
				background-color #232323
				border-radius .08rem
				overflow hidden
				&>img
					width 100%
					height 100%
			.title
				position absolute
				left 2.6rem
				right 1rem
				bottom .3rem
				font-size .3rem
				color #272727
				text-align justify
				ellipsis(2)
			.icon-close
				position absolute
				top .2rem
				right .2rem
		.sku-list
			flex 1
			padding 0 .3rem
			overflow-y auto
			-webkit-overflow-scrolling touch
			font-size .26rem
			.key-name
				color #989898
			.sku-item
				border-top none
				.key-name
					padding-bottom .2rem
				.sku-opt
					.opt-item
						float left
						margin-right .3rem
						margin-bottom .4rem
						padding .1rem .2rem
						border 1px solid #b5b5b5
						border-radius .05rem
						font-size .22rem
					.opt-item:last-child
						margin-right 0
					.opt-item.selected
						color #24c685
						border 1px solid #24c685
					.opt-item.disabled
						color #999
						border 1px dashed #666
			.sku-item:first-child
				.key-name
					padding-top .4rem
			.count
				padding .2rem 0
				line-height .5rem
				border-top: 1px solid #b5b5b5;
				border-bottom: 1px solid #b5b5b5;
				.key-name
					float left
				.counter
					float right
					.icon
						width .5rem
						height .5rem
						border-radius 50%;
					.icon-minus
						float left
						fill #989898
						background-color #f6f6f6
					.amount
						float left
						width .66rem
						text-align center
					.icon-add
						float left
						fill #23c883
						background-color #eafdf4
			.price
				line-height .9rem
			.price-unit
				border-bottom: 1px solid #b5b5b5;
				.key-name
					float left
				.price-txt
					float right
			.price-total
				text-align right
				.key-name
					padding-right .2rem
				.price-txt
					color rgb(250,87,88)
					font-size .32rem
					&>i
						font-size .22rem
		.killfooter
			flex none
			text-align center
			.tips
				height .5rem
				line-height .5rem
				font-size .2rem
				color rgb(250,87,88)
				background-color #feedee
			.btn-buy
				height .9rem
				line-height .9rem
				color #fff
				background-color #23c883
				font-size .32rem
				opacity .6
				pointer-events none
			.btn-buy.effective
				opacity 1
				pointer-events auto

</style>
