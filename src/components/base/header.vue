<template>
	<div class="header-wp" :class="{hoemHight:home}">
		<div class="header">
			<div v-if="home" class="adress">
				<a href="/Index/chooseCity">
					{{address}}
				</a>

			</div>
			<div v-if="! home" class="back header-icon"  @click="$router.back()"></div>
			<div class="txt header-icon">
				<router-link :to="{name:'Index'}" tag="div" class="home-link"></router-link>
			</div>
			<div v-if="home" class="routr-link">
				<router-link to="homesearch" append class="search header-icon" tag="div"></router-link>
			</div>
			<div class="mine header-icon" :class="{border:home}">
				<a href="/Parent/index"></a>
			</div>

		</div>
	</div>
</template>
<script >
export default {
	props: {
		home: Boolean,
		address:String
	}
}
</script>


<style scoped>
.header-wp {
	 height: .8rem
}

.header-wp.hoemHight{
	height: 0;
}

.header {
	position: fixed;
	height: .3rem;
	padding: .25rem 0;
	background: #fff;
	top: 0;
	left: 0;
	right: 0;
	z-index: 9;
}

.header-icon {
	background: url(../../assets/images/header-icon_2.png) no-repeat;
	background-size: 1.36rem .85rem;
}

.header-icon .home-link{
	width: 1.4rem;
	height: 100%;
	margin: 0 auto
}

.routr-link {
	width: 1.36rem;
	height: .30rem;
	text-align: center;
	margin: 0 auto;
}

.header .txt {
	width: 1.36rem;
	height: .30rem;
	text-align: center;
	margin: 0 auto;
	background-position: 0 -.55rem;
}

.header .adress{
	position: absolute;
	left: .25rem;
}

.header .back{
	width: .36rem;
	height: .36rem;
	background-position:-1.03rem 0;
	position: absolute;
	left: .25rem;
}



.header .adress a {
	color: #7a7f7c;
	font-size: .28rem;
	position: relative;
	padding-right: .2rem
}

.header .adress a:before {
	content: '';
	position: absolute;
	bottom: 0;
	right: 0;
	width: 0;
	height: 0;
	border: .07rem solid transparent;
	border-right-color: #959a97;
	border-bottom-color: #959a97;
}

.header .search {
	position: absolute;
	right: 1.1rem;
	background-position: -.55rem 0;
	width: .323rem;
	height: .32rem;
	top: 50%;
	margin-top: -.16rem;
}

.header .search a,
.header .mine a {
	display: block;
	width: 100%;
	height: 100%;
}

.header .mine {
	position: absolute;
	right: .25rem;
	width: .36rem;
	height: .36rem;
	background-position: 0 -.017rem;
	top: 50%;
	margin-top: -.18rem;
}

.header .mine.border:after {
	content: '';
	position: absolute;
	top: .02rem;
	left: -.23rem;
	width: 1px;
	height: .33rem;
	background-color: #d9dcda;
}
</style>
