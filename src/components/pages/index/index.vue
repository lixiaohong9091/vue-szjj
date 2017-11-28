
<template>
	<div class="home">
		<HeaderNav :home="true" :address="address"></HeaderNav>

		<MySwpiper :imgs='ads'></MySwpiper>
		<ul class="tap-list fn_clear" v-if='eightProts.length > 0'>
			<li class="fl" v-for="(eightProt, index) in eightProts" :key="index">
				<a :href="eightProt.action">
					<div class="img">
						<img :src="eightProt.content" alt="">
					</div>
					<div class="txt">
						{{eightProt.title}}
					</div>
				</a>
			</li>

		</ul>
		<div v-if="tuanAd.content" class="seckill-group fn_clear">
			<router-link  tag="div" class="seckill fl" :to="{name: 'Seckill', params: {id: seckill.id || ' '}}">
				<h3>爆款特价抢</h3>
				<div class="time">{{seckill.showTxt}}
					<Downtimer v-if="seckill.showTime" :lefttime='seckill.liveTime' @onChange="setTimmer" @onEnd='getData'>
						<i>{{timershow.h}}</i> :
						<i>{{timershow.n}}</i> :
						<i>{{timershow.s}}</i>
					</Downtimer>
				</div>
				<div style="padding-top: .15rem" class="img">
					<img :src="seckillImg" alt="">
				</div>
			</router-link>
			<router-link v-if="tuanAd.content" tag='div' class="group fl" :to="{name:'TuanIndex'}">
				<h3>拼团更实惠</h3>
				<div class="img">
					<a href="">
						<img :src="tuanAd.content" alt="">
					</a>
				</div>

			</router-link>

		</div>
		<div class="calendar-wp" v-if="activityCalendars.length>0">
			<div class="calendar">活动日历</div>
			<section class="time ">
				<ul class="time-wrap">
					<li class="time-list" v-for="(activityCalendar, index) in activityCalendars" :key="index">
						<a :href="activityCalendar.dateLink">
							<div class="img">
								<img :src="activityCalendar.image_url" alt="" />

							</div>
							<div class="date">{{activityCalendar.showDate}}</div>
						</a>
					</li>

				</ul>
			</section>
		</div>
		<div class="show-wp">
			<div v-if='showAd.content' class="show-img">
				<a :href="showAd.action">
					<img :src="showAd.content" alt="">
				</a>

			</div>

			<div  v-if="commenList.actId" class="txt show fn_clear" id="liveshow">
				<div class="show_left fl ">

					<router-link to="liveShow" append>
						<div class="show_icon"></div>
						<div>
							<span id="commentTotal">{{commentTotal}}</span>人秀过
						</div>
					</router-link>

				</div>
				<div class="show_right ">
					<ul>
						<li v-if="ok"> 加载中...</li>
						<li v-else>
							<a :href="commenList.actId">
								<span class="elp" style="display:inline-block;    max-width: 3rem;position: relative;top: .05rem;">[{{commenList.actName}}</span><span>]</span> {{commenList.userName}}说：{{commenList.comment}}
							</a>
						</li>
					</ul>

				</div>

			</div>
		</div>
		<div v-if="hotSaleCards.length>0" class="card-list">
			<ul>
				<li v-for="(hotSaleCard , index) in  hotSaleCards" :key="index">
					<div>
						<a :href=" '/YearCard/listSzjj/source/1/cardId/'+ hotSaleCard.id">
							<h3 class="top-bar elp">{{hotSaleCard.name}}
								<span>更多</span>
							</h3>
							<div v-if="hotSaleCard.keyWords.length>0" class='key-word'>
								<span v-for="(keyWord ,  index) in hotSaleCard.keyWords" :key="index">{{keyWord}}</span>

							</div>
						</a>
					</div>
					<ul class="flexbox  card-act">
						<li v-for="(cardActivity ,index) in  hotSaleCard.cardActivityList" :key="index">
							<a :href="'/YearCard/activityDetail/id/'+ cardActivity.id">
								<div class="img">
									<img :src="cardActivity.image_url" alt="">
								</div>
								<h4>{{cardActivity.name}}</h4>
							</a>

						</li>

					</ul>
				</li>

			</ul>
			<div class="card-more">
				<a href="/YearCard/buyCard">查看更多卡
					<span></span>
				</a>

			</div>
		</div>
		<div class="teacher">
			<a href="/bj/cl/">
				<img :src="require('../../../assets/images/teacher.png')" alt="">
			</a>

		</div>
		<div v-if="hotActivityList.length>0" class="card-list activity-list">
			<div>
				<a href="/bj/acl/">
					<h3 class="top-bar">人气推荐
						<span>更多</span>
					</h3>

				</a>
			</div>
			<ul>
				<li v-for="(hotActivity,index) in hotActivityList" :key="index">
					<a :href="hotActivity.actId">
						<div class="img" :class="{coupon:parseInt(hotActivity.is_promotion)}">

							<img :src="hotActivity.image_url" alt="">
						</div>
						<div class="name-price">
							<div class="name">
								{{hotActivity.name}}
							</div>
							<div class="price">
								<div class="red">
									<span>{{hotActivity.showPrice}}</span>
								</div>
								<div class="fr" v-if="hotActivity.discount_price_type">
									<del v-if="hotActivity.price!=' '">￥{{hotActivity.price}} <span v-if="hotActivity.is_qi==1">起</span> </del>
								</div>

							</div>
						</div>
						<div class="adress-time elp">
							<span>
								{{hotActivity.city}}
							</span>
							<span class="time">
								{{hotActivity.out_date}}
							</span>
						</div>
					</a>

				</li>

			</ul>
			<div class="card-more">
				<a href="/bj/acl/">更多人气推荐活动
					<span></span>
				</a>

			</div>
		</div>

		<FooterNav></FooterNav>
		<FooterLoad></FooterLoad>

	</div>
</template>
<script>

require('@/assets/styles/global.css')

import Vue from 'vue'
import FooterNav from '../../base/footer.vue'
import FooterLoad from '../../base/footer_load.vue'
import HeaderNav from '../../base/header.vue'
import MySwpiper from '../../base/myswiper.vue'
import Downtimer from '../../base/downtimer.vue'
export default {
	data() {
		return {
			ads: [],
			activityCalendars: [],
			commentTotal: '',
			commenList: {},
			ok: true,
			eightProts: [],
			timershow: { h: '--', n: '--', s: '--' },
			seckill: {},
			seckillImg: {},
			tuanAd: {},
			showAd: {},
			hotSaleCards: [],
			hotActivityList: [],
			address: ''
		}
	},
	components: {

		FooterNav,
		FooterLoad,
		HeaderNav,
		MySwpiper,
		Downtimer
	},
	methods: {
		index: function() {
			console.log(1111)
		},
		cutString(str, num) {

			if (str.length > num) {
				return str = str.substr(0, num) + '...'

			} else {
				return str
			}

		},
		setTimmer(data) {
			this.timershow = data;
			/* console.log(data); */
		},
		getData() {
			this.$http.get('/Index/getHomeData')
				.then((response) => {
					if (response.header) {
						this.address = response.header.city.name
					}
					this.ok = false;
					if(response.data.adObject.content){
						this.ads = response.data.adObject.content.contentList;

					}




					if (response.data.eightProt) {
						this.eightProts = response.data.eightProt.contentList;
					}




					if (response.data.hasSeckill == 1) {

						this.seckill = response.data.seckill;
						this.seckillImg = response.data.seckill.avator;

						if (this.seckill.time_type == 2) {
							this.seckill.showTime = true;

						} else {
							this.seckill.showTime = false;
						}

						if (this.seckill.time_type == 2 && this.seckill.status == 1) {
							this.seckill.showTxt = '距开始'
						}

						if (this.seckill.time_type == 2 && this.seckill.status == 2) {
							this.seckill.showTxt = '距结束'
						}

						if (this.seckill.time_type == 1) {
							this.seckill.showTxt = this.seckill.left_time
						}

						if (this.seckill.time_type == 2) {
							this.seckill.liveTime = parseInt(this.seckill.left_time)
						}

					} else {
						this.seckill.showTxt = '敬请期待'
						this.seckillImg = response.data.seckillAvator;

					}

					if (response.data.tuanAd) {

						this.tuanAd = response.data.tuanAd.contentList[0];


					}

					if (response.data.showAd) {
						this.showAd = response.data.showAd.contentList[0];
					}



					if (response.data.activityCalendar) {

						var activityCalendars = response.data.activityCalendar;
						var newAC = [];
						activityCalendars.forEach(function(item, index, self) {
							var showDate = item.showDate;
							var date = item.date;
							if (item.activityList) {
								item.activityList.forEach(function(item, index, self) {
									item.showDate = showDate;
									item.date = date;
									item.dateLink = '/YearCard/calendar/date/' + date;
									newAC.push(item);
								});

							}

						});

						this.activityCalendars = newAC;

					}


					if (response.data.commentTotal) {
						this.commentTotal = response.data.commentTotal;
					}


					if (response.data.commentList) {
						var commenList = response.data.commentList;
						var showCommen = {};
						var t = 0;
						showCommen.actName = commenList[t].actName;
						showCommen.userName = commenList[t].userName;
						showCommen.comment = commenList[t].comment;
						if (commenList[t].type == 'activity') {
							showCommen.actId = '/bj/acd' + commenList[t].actId;

						} else {
							showCommen.actId = '/YearCard/activityDetail/id/' + commenList[t].actId;

						}

						this.commenList = showCommen;
						setInterval(function() {
							if (t < commenList.length - 1) {

								t++;
								showCommen.actName = commenList[t].actName;
								showCommen.userName = commenList[t].userName;
								showCommen.comment = commenList[t].comment;
								if (commenList[t].type == 'activity') {
									showCommen.actId = '/bj/acd' + commenList[t].actId;

								} else {
									showCommen.actId = '/YearCard/activityDetail/id/' + commenList[t].actId;

								}
								this.commenList = showCommen;



							} else {
								t = 0;
								showCommen.actName = commenList[t].actName;
								showCommen.userName = commenList[t].userName;
								showCommen.comment = commenList[t].comment;
								if (commenList[t].type == 'activity') {
									showCommen.actId = '/bj/acd' + commenList[t].actId;

								} else {
									showCommen.actId = '/YearCard/activityDetail/id/' + commenList[t].actId;

								}
								this.commenList = showCommen;

							}
						}, 3000);
					}

					if (response.data.hotSaleCard) {

						var newHotSaleCard = response.data.hotSaleCard;

						newHotSaleCard.forEach(function(item, index, self) {
							item.keyWords = item.tags.split(",");


						});

						this.hotSaleCards = newHotSaleCard;

					}

					if (response.data.hotActivityList) {
						this.hotActivityList = response.data.hotActivityList;

						this.hotActivityList.forEach(function(item, index, self) {
							item.actId = '/acd' + item.id;
							var qi = item.is_qi == 1 ? '起' : '';


							if (item.discount_price_type == 1) {
								item.showPrice = '会员 ￥' + item.discount_price + qi

							} else if (item.discount_price_type == 2) {
								item.showPrice = '团 ￥' + item.discount_price + qi

							} else if (item.discount_price_type == 3) {
								item.showPrice = '抢 ￥' + item.discount_price + qi

							} else {
								item.showPrice = '￥'+ item.price + qi;
								item.price = ' ';
							}



						})
					}

				},

			)
		}

	},
	created: function() {

		this.getData()

	}
}
</script>
<style scoped>
@import "../../../assets/styles/index.css";
</style>
