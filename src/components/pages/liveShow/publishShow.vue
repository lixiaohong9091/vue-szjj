<template>
	<div>
		
		<ShowList :showData="list"></ShowList>

		<loadlist @ondataupdate="getdata" :apiurl="'/Parent/getMyCommentList/pageSize/20/p/@p'"></loadlist>

	</div>
</template>
<script>
import loadlist from '../../base/loadlist.vue'
import ShowList from '../../pages/liveShow/showList.vue'


export default {
	data() {
		return {

			list: []
		}
	},
	components: { loadlist, ShowList,  },
	props: {
	},
	created() {
		/* this.getdata(); */
	},
	methods: {
		getdata(datas) {
			datas.list.forEach(function(item, index, self) {
				item.actId = '/YearCard/showDetail/showId/' + item.id;
				if (item.itemInfo.type == 'activity') {
					item.itemInfo.actId = '/bj/acd' + item.itemInfo.key;

				} else {
					item.itemInfo.actId = '/YearCard/activityDetail/id/' + item.itemInfo.key;

				}

			});
			this.list = this.list.concat(datas.list);

			
		}
	}

}
</script>

<style>

</style>

