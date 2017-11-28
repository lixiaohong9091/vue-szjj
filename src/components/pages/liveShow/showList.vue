<template>
	<div>
		<ul>
			<li v-if='showempty' class="empty">
				<div>
					<img src="../../../assets/images/fail.png" alt="">
				</div>
				<div>暂无待发布的现场秀</div>

			</li>
		</ul>
		<ul class="show-all">

			<li v-for="(list, index) in showData" :key="index">
				<dl>
					<dt>
						<a :href="list.actId">
							<img :src="list.userInfo.head_portrait" alt="" />
						</a>
					</dt>
					<dd>
						<a :href="list.actId">
							<div class="head fn_clear">
								<span class="fl hideTxt">{{list.userInfo.nick}}</span>
								<span class="fr">{{list.create_time}}</span>
							</div>
						</a>
						<a :href="list.actId">
							<div class="content">{{list.content}}
							</div>
							<div class="img    fn_clear" :class="{four:list.imageList.length==4}">
								<img v-for='(image,index ) in list.imageList ' :key="index" :src="image" alt="" />

							</div>
						</a>
						<div class="name-wp">
							<a :href="list.itemInfo.actId">
								<div class="name"  :class="{red:list.itemInfo.type=='cardActivity'}" style="padding: 0 0;">
									<div style="max-width: 1.8rem" class="elp">{{list.itemInfo.value}}</div>
								</div>
							</a>
							<div class="right-bar">
								<div class="fl con-num">
									<span></span>{{list.commentCount}}</div>
								<div z_id="" class="zan fl" :class="{on:parseInt(list.isUseful)}" @click="clickUseful(index)">
									<span>{{list.usefulCount}}</span>有用
								</div>
							</div>
						</div>
					</dd>
				</dl>

			</li>

		</ul>
		<div v-if='wantShow' class="fix-show">
			<a href="">我要秀</a>
		</div>
	</div>
</template>
<script >
export default {
	props: {
		showData: Array,
		wantShow: Boolean,
		showempty: Boolean,

	},
	methods: {
		clickUseful(index) {

			if (this.showData[index].isUseful == 0) {
				this.$http.get('/YearCard/setLiveShowUseful/commentId/' + this.showData[index].id)
					.then((response) => {
						if (response.status == 200) {
							this.showData[index].isUseful = 1;
							this.showData[index].usefulCount = Number(this.showData[index].usefulCount) + 1

						}

					},

				)

			} else {
				return
			}

		},

	}
}
</script>

<style scoped>
.empty {
	background: #f4f6f5;
	text-align: center;
	padding: .5rem
}

.empty img {
	padding: .35rem 0;
}

.show-all {
	background: #fff;
	margin-top: .25rem
}

.show-all li {
	padding: .3rem .25rem .3rem 0;
	margin-left: .25rem;
	border-bottom: 1px solid #e3e3e3;
}

.show-all li:last-child {
	border: none
}

.show-all li:last-child {
	border: none
}

.show-all dl {
	position: relative;
}

.show-all dl dt {
	position: absolute;
	top: -.1rem;
	left: -.0rem;
}

.show-all dl dt img {
	width: .6rem;
	height: .6rem;
	border-radius: 50%;
}



.show-all dl dd .head {
	margin-left: .75rem
}

.show-all dl dd .content {
	text-align: justify;
	margin: .4rem 0 .05rem 0;
}

.show-all dl dd .img {
	padding-bottom: .05rem
}

.show-all dl dd .img img {
	float: left;
	width: 33%;
	height: 1.4rem;
	padding-right: .2rem;
	margin-top: .05rem;
	box-sizing: border-box;
}

.show-all dl dd .img.four img:nth-child(2) {
	margin-right: 1rem
}

.show-all .fl {
	float: left
}

.show-all .fr {
	float: right
}

.show-all .name-wp {
	height: .4rem;
	overflow: hidden;
	margin-top: .15rem;
	position: relative;
}

.show-all .name-wp .right-bar {
	position: absolute;
	right: 0;
	top: 0;
}

.show-all .name-wp .right-bar .con-num {
	margin-right: .6rem;
	color: #acacac;
}

.show-all .name-wp .right-bar .con-num span {
	position: relative;
	top: .034rem;
	display: inline-block;
	width: .36rem;
	height: .28rem;
	background-size: 100%;
	background-repeat: no-repeat;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAABKUlEQVR42t3WPUoDURSG4UggYAiIgpBBiIuwsUrlGkTEHQTEBQR0AwGxsbMT7TUJFpbTDSGIEAhoIRYJiBAl+FPM8S1uKxK/MzJYPM1p7ttczimYWa7kMyiO46y5Bi2hgQs84ANTJGihjrm/CCqjiQnsB33UswxaRQ82gxRHKHkH1TCC/VIXJa+gCm5gomOvoH2YgxQbatAyXmFOemrQHszZuhLUhTk7VIKGsKCDKOgI874SNIUFEQpBJMw/laC3bx6oCvMXJegeFrRRxQrawnyoBJ3BnJ0rQZswZztKUAVPjjFjzKurY9cxqOGxy4q4homuUJSDgkXcCjEJFrwPtFPhV5W9D7RtpDOGDLCV1Ql7ghHeYZjgGY+4wwAJLnGAtSyOfNm/DsqVL+AVdGJiaTlaAAAAAElFTkSuQmCC);
}

.show-all .name-wp .zan {
	font-size: .24rem;
	padding-left: .3rem;
	background-repeat: no-repeat;
	color: #acacac;
	height: .28rem;
	line-height: .35rem;
	background-size: .36rem .28rem;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAAA/UlEQVR42s3WPQrCMBTA8dalziIujuLSrAUHu3kDNxfBAwjewHgBDyB4Ay8gnePgnsFNnDyBCIrxIcUsRpLY9+LwH0N+hHxFSqlICOFbE2pDse0YmO9rv4DqkCo7Qf3QoN4LoztCtZCg1RujY6FAHejyAZSHAMVQoRHhV2hhwNyghBo0hh4G0I76lI2gO6QMcUrQVGOMsSpBV8MkUZmqoK0L6IwK0jFb0IEIlNuC9kSgzBZUEIEatqANAUi6bOo1AYi7gJYEIOYCmiODpOvFOEMGcVfQBBnEXEFDRJD0ecsGiCDuA8oQQakPqIsEkr7fjxYSiPuCEiRQ6gP6q57cz4EYhEu+GAAAAABJRU5ErkJggg==);
}

.show-all .name-wp .zan.on {
	color: #23c683;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAABAklEQVR42sXWMQrCMBSA4dalziIujsWlWQsOdvMGbi6CBxC8gRF3DyB4Ay8g3Tu4d3ATJ08ggmJ8iJilKcmj72X419ePkCYJlFLG4mJTVxfqQyEU2AZza8OC2pD6dYVGvkHDL0Z3gVo+Qbs/Rid8gWLoXgHKfIBCKNcI/yu0NmCeUMQNmkFvA6ho7C+zHDSFXpAyJDlBC40xJpoEPSo/ooeoBjq6gG6kIJ2wBZ2ZQJkt6MQESm1BOROoYws6MIBKl029ZwBJF9CWASRcQCtiUOl6MC6JQdIVNCcGCVfQhBBUYu6yMSFIYkApISjBgAZEoBL7/OgRgSQWFBGBEiyILAzoAxrf/BFS/vjKAAAAAElFTkSuQmCC);
}

.show-all dl dd .name {
	font-size: .2rem;
	border-top-right-radius: .04rem;
	border-bottom-right-radius: .04rem;
	color: #23c683;
	display: inline-block;
	padding: .0rem .1rem;
	position: relative;
	height: .34rem;
	line-height: .34rem;
}

.show-all dl dd .name.red{
	color: #fa5758
}

.show-all dl dd .name>span {
	display: inline-block;
	width: .33rem;
	height: .34rem;
	position: absolute;
	left: -.33rem;
	background-size: 100% 100%;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAASFBMVEVMaXEjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoMjxoP3yF1KAAAAF3RSTlMA4h+XFfL53BzTSOEgmRKYFxiu5/GT4wYBu6IAAACbSURBVHjahdTbDsIgEATQAQRtaa33+f8/NRrDJma7s0/zcALLFUGdy51kAA4TPyUBJaAEDEAoLhNjcTrSSgJKwACYyKW3XrKBfzHXb6izD4jl8Ut1cQGxjliAqwETacQO3OiINmIDGsUYJvw+1p1ZljrWYp0G++GtFshbamnLgE/ksRCSQBJIAkmgb7J+DZJAEkgCScIf5vki+Qb82i3wqBVJ9wAAAABJRU5ErkJggg==);
}



.show-all dl dd .head {
	font-size: .22rem;
	color: #adadad;
	margin-bottom: .05rem;
	margin-top: .15rem;
}

.show-all dl dd .head .fl {
	width: 2.8rem;
}

.show-all h3 {
	font-size: .24rem;
	line-height: .65rem;
	padding: 0 .25rem;
	border-top: 1px solid #e3e3e3;
	font-weight: normal;
}

.show-all .show {
	float: right;
	color: #23c683;
}

.show-all .right-arrow {
	margin-left: .15rem;
	left: .15rem;
	display: inline-block;
	width: 0;
	height: 0;
	border: .15rem solid transparent;
	border-left: 0.15rem solid #23c683;
	position: relative;
	top: .06rem;
}

.show-all .right-arrow:before {
	content: '';
	position: absolute;
	left: -.17rem;
	top: -.15rem;
	display: inline-block;
	width: 0;
	height: 0;
	border: .15rem solid transparent;
	border-left: 0.15rem solid #fff;
}

.fix-show {
	position: fixed;
	bottom: 0;
	background: #23c683;
	height: .8rem;
	line-height: .8rem;
	width: 100%;
}

.fix-show a {
	display: block;
	height: 100%;
	color: #fff;
	text-align: center;
	font-size: .3rem
}
</style>
