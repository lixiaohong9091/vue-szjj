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
		<ul class="noActShow">

			<li v-for="(list, index) in noShowData" :key="index">

				<div class="img-name">
					<a :href="list.activityId">
						<div class="img">
							<img :src="list.image_url" alt="">
						</div>
						<div class="name">
							<h3>{{list.name}}</h3>
							<div class="time">{{list.consume_time}}</div>
						</div>
					</a>
					<div class="go-show">
						<a :href="list.actId">我要秀</a>
					</div>
				</div>
				<div class="head-portrait">

					<img v-for='(img,index) in list.commentList' :key="index" :src="img.head_portrait" alt="">
					<img v-if="list.commentTotal > list.commentList.length" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAFp3oPPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDIzREZBQjY4NjE5MTFFNzlBMEVGRTYwQTFDODA5QUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDIzREZBQjc4NjE5MTFFNzlBMEVGRTYwQTFDODA5QUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMjNERkFCNDg2MTkxMUU3OUEwRUZFNjBBMUM4MDlBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMjNERkFCNTg2MTkxMUU3OUEwRUZFNjBBMUM4MDlBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsZXtiYAAAPESURBVHjaYnz37h0DFBwCYjsQgwUq8B+JVgUJ9ly9epXh+YvnDCBdYaFhtxmh2mEqQeApE5QBo88DsQxAAMFUCgNxCRBXggSQtUGU//79G1WAlZUVRYARSQcjQAAxIrkexSwo2APErkx4FICAC0gOpMiZgQAAKdoLxDF41DACBBCym0CgA4gtgTgQiOESsBA+DMQ2SIrfwkyBWaeNpgAZ/IcpukKMw8Fg1epVcPrnz58Mt27fgkk1YkQIFmANMuk1AUXHQIrE8CjwRw4CkFcvAbEuciDCGAABhB6YIGALTar4ACjAT2ANAWiq+E+EISBwHKp2I7qL/qGlRVIASC8zyEURFBgC85UPiNBHFj185DA4gj9//gzmr1u/Dh7x79+/B7OPnziObpgetsxMDmCEBTYbBYawIMfab2g4BZFggDdUz19c6QgZ8AOxOVKUf8alECCA8BkUDMTRQCwHxA+BeDkQryHWkAvosYgGzgKxCUYAQYEgctmCBxhDY5cP5kVYADMTaQAy+IRcToHAdzKj+hvMEJD/Wck0hAOI1UCGbKUw9W4FGSJNoSEqTOgioEy3ZesWSMH9/z+Yf/rMaTB/0+ZN8AyKq9CCg+/fIeH8588fSJXxFlJp/PjxA2eKpTRHg11ykEIztoNcwgVkfKXAEHYmaIK5RqYBoMbIL+QMSGpB/he9cIKxPxFpwAfkzMuEpSAKJ2BAEDTHE1UogYApECsA8T1oOYIVAAQYIUOQ62YfIM4AYndo0UEIgMrv7UA8A0oTtgSPY9ihjap8CitP5ATQDcQ1oExFrGP4oRlCn4F24AS0TfoNX5nQCE1RtHQICFhAM245rpDZAq1z6Q1WA3EYcshMHCCHgEAoNG2CQ0YdSN9gGHggzwQLInzg1atXDPcf3Gf49esXZpn39y/Dw4cPGZ4+ewquvJABqBtx//59htevXxPjmBAWAp0Dhm3btzF8+fIFzD4NhFZWVgwy0jKQsvPDB4Zdu3ch9bYYGUKCQ8A0yIEnT51EZFF+fgZ3N3d8VomyEIoiRwdHhouXLjJ8+/qNQVlZGe4QEBAQEGCwt7NnuH79OgMzCzODvp4+2CHgMJeXB4fU3Xt3GXi4eRgMDAwIhcwtUJrhhTbEWAYwvYDaF0JM0CZi1gAn3lRQ0waWtWcDcekAOSQbiJdiqw4MoH0GDjo44iu0F3ADV3UA6kZwAnEmrOdDAwCqJOOBmAc98zDh0DADmqDViOx0EwP2QNs0oP7CIkraM7A2jS205QWqcdXxqL0JxDuBeAU02okCAGOgOnzY1Sc3AAAAAElFTkSuQmCC">

					<div class="fr show-number">{{list.commentTotal}}人秀过</div>

				</div>

			</li>

		</ul>
	</div>
</template>
<script >
export default {
	data() {
		return {
			list: []
		}
	},
	props: {
		noShowData: Array,
		showempty: Boolean,

	},


}
</script>

<style>
.empty {
	background: #f4f6f5;
	text-align: center;
	padding: .5rem
}

.empty img {
	padding: .35rem 0;
}

.noActShow {
	background: #fff;
	margin-top: .25rem;
}

.noActShow li {
	padding: .3rem .25rem .3rem 0;
	margin-left: .25rem;
	border-bottom: 1px solid #e3e3e3
}

.noActShow li:last-child {
	border: none;
}

.noActShow .img-name {
	position: relative;
	height: 1.22rem
}

.noActShow .img-name .img {
	width: 1.82rem;
	height: 1.22rem;
	border-radius: .1rem;
	overflow: hidden;
	position: absolute;
	left: 0rem;
	top: .0;
}

.noActShow .img-name .img img {
	width: 100%;
	height: auto;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
}

.noActShow .name {
	margin-left: 2.07rem;
	width: 2.9rem;
}

.noActShow .name h3 {
	-webkit-line-clamp: 2;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	font-size: .28rem;
	color: #232725;
	width: 2.5rem;
}

.noActShow .name .time {
	font-size: .22rem;
	color: #888888;
	margin-top: .1rem;
}

.noActShow .go-show {
	position: absolute;
	top: .3rem;
	right: 0;
	background: #ff5454;
	width: 1.03rem;
	height: .53rem;
	line-height: .53rem;
	text-align: center;
	border-radius: .05rem;
}

.noActShow .go-show a {
	display: block;
	width: 100%;
	height: 100%;
	color: #fff;
}

.noActShow .head-portrait {
	margin-top: .1rem;
	height: .35rem;
}

.noActShow .head-portrait img {
	width: .35rem;
	height: .35rem;
	border-radius: 50%;
	margin-left: .02rem;
}

.noActShow .head-portrait .fr {
	float: right
}
</style>

