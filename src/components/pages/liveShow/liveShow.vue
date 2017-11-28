<template>
	<div class="showNow">
		<HeaderNav v-if="this.$route.params.type!='playerlistApp'"></HeaderNav>
		<div v-if="this.$route.params.type!='publishShow'&&this.$route.params.type!='playerlist'&&this.$route.params.type!='playerlistApp'">
			
			<div class="img">
				<a :href="headerImg.action">
					<img v-if="headerImg.content" :src="headerImg.content" alt="">
				</a>
			</div>

			<ul class="flexbox show-tap">
				<li :class="{active:$route.params.type=='showAll'}">
					<router-link :to="{name:'LiveShow',params:{type:'showAll'}}">
						<div class="big">{{numbers.commentNum}}</div>
						<div>大家都在秀</div>
					</router-link>
				</li>
				<li :class="{active:$route.params.type=='noCardShow'}" @click="geturl('noCardShow')">
					<!-- <router-link :to="{name:'LiveShow',params:{type:'noCardShow'}}"> -->
					<div class="big" :class="{red:numbers.showCardActivityNum}">
						<span>{{numbers.cardActivityNum}}</span>
					</div>
					<div>待发布一卡通秀</div>
					<!-- </router-link> -->
				</li>
				<li :class="{active:$route.params.type=='noActShow'}" @click="geturl('noActShow')">
					<!-- <router-link :to="{name:'LiveShow',params:{type:'noActShow'}}"> -->
					<div class="big " :class="{red:numbers.showActivityNum}">
						<span>{{numbers.activityNum}}</span>
					</div>
					<div>待发布活动秀</div>
					<!-- </router-link> -->
				</li>
			</ul>
		</div>
		<div class="publish-show" v-if="this.$route.params.type!='playerlist'&&this.$route.params.type!='publishShow'&&this.$route.params.type!='playerlistApp'" @click="geturl('publishShow')">
			<!-- <router-link :to="{name:'LiveShow',params:{type:'publishShow'}}"> -->
			<div>
				已发<br>
				布秀
			</div>
			<!-- </router-link> -->
		</div>
		<showAll v-if="this.$route.params.type=='showAll'"></showAll>
		<noCardShow v-if="this.$route.params.type=='noCardShow'"></noCardShow>
		<noActShow v-if="this.$route.params.type=='noActShow'"></noActShow>
		<publishShow v-if="this.$route.params.type=='publishShow'"></publishShow>
		<playerList v-if="this.$route.params.type=='playerlist'"></playerList>
		<playerList v-if="this.$route.params.type=='playerlistApp'"></playerList>

	</div>
</template>
<script>
import Vue from 'vue'
import showAll from '../../pages/liveShow/showAll.vue'
import noCardShow from '../../pages/liveShow/noCardShow.vue'
import noActShow from '../../pages/liveShow/noActShow.vue'
import publishShow from '../../pages/liveShow/publishShow.vue'
import playerList from '../../pages/liveShow/playerList.vue'
import HeaderNav from '../../base/header.vue'

export default {
	components: {
		showAll, noCardShow, noActShow, publishShow, playerList, HeaderNav
	},
	data() {
		return {
			numbers: {},
			headerImg: {}
		}


	},
	methods: {

		getshowData() {
			this.$http.get('/YearCard/getCommentHomepage')
				.then((renspond) => {
					this.numbers = renspond.data;
					if (renspond.data.adObject) {
						this.headerImg = renspond.data.adObject.contentList[0]
					}

					if (renspond.data.activityNum == 0) {
						this.numbers.showActivityNum = false;
					} else {
						this.numbers.showActivityNum = true;
					}

					if (renspond.data.cardActivityNum == 0) {
						this.numbers.showCardActivityNum = false;
					} else {
						this.numbers.showCardActivityNum = true;
					}



				})
		},
		geturl(type) {

			if (this.numbers.isLogin == 0) {
				window.location.href = '/Login/index.html';

			} else {
				this.$router.push({ name: 'LiveShow', params: { type: type } });

			}
		},
	},
	created: function() {
		this.getshowData()

	}


}
</script>


<style>
.showNow .show-tap {
	background: #fff;
	padding: .2rem 0;
}

.showNow .show-tap li {
	width: 3rem;
	text-align: center;
}

.showNow .show-tap li .big {
	font-size: .3rem;
	margin-bottom: .1rem;
}

.showNow .show-tap li .red {
	color: #ff5454;

	text-decoration: none;
}

.showNow .show-tap li .red span {
	position: relative;
}

.showNow .show-tap li:nth-of-type(2) {
	border-left: 1px solid #ededed;
	border-right: 1px solid #ededed;
}

.showNow .show-tap li .red span:before {
	content: '';
	position: absolute;
	right: -.15rem;
	top: -.06rem;
	width: .15rem;
	height: .15rem;
	background: #ff5454;
	border-radius: 50%;
}

.showNow .show-tap li.active {
	position: relative;
}

.showNow .show-tap li.active {
	color: #23c683
}

.showNow .show-tap li.active a {
	color: #23c683
}

.showNow .show-tap li.active::before {
	content: '';
	position: absolute;
	width: 80%;
	height: .03rem;
	background: #23c683;
	bottom: -.17rem;
	left: 50%;
	margin-left: -40%;
}

.showNow .img img {
	width: 100%;
	height: auto
}

.showNow .publish-show {
	background: #23c683;
	position: fixed;
	bottom: .25rem;
	right: .25rem;
	padding: .2rem;
	border-radius: .5rem;
	height: .6rem;
	width: .6rem;
	text-align: center;
	overflow: hidden;
	line-height: 1.3em;
	z-index: 2;
	color: #fff;
}

.showNow .publish-show a {
	color: #fff;
}
</style>

