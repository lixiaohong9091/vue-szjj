<template>
	<div>
		<NoShowList :noShowData="list" :showempty="showempty" ></NoShowList>


		<loadlist @ondataupdate="getdata"  @onempty="showEmpty" :apiurl="'/YearCard/getConsumeActivityList/type/cardActivity/pageSize/20/cardId/0/p/@p'"></loadlist>

	</div>
</template>
<script>
import loadlist from '../../base/loadlist.vue'
import NoShowList from '../../pages/liveShow/noShowList.vue'

export default {
	data() {
		return {
			
			list:[],
			showempty:false
		}
	},
	components: { loadlist,NoShowList },
	props: {
	},
	created() {
	
	},
	methods: {
		getdata(datas) {
			datas.activityList.forEach(function(item,index,self) {
				item.actId = '/YearCard/publishShow/id/' +item.id+"/type/cardActivity/source/detail";
				item.activityId = '/YearCard/activityDetail/id/' +item.id;
				
			});
			this.list = this.list.concat(datas.activityList);
			
		},
		showEmpty(fun){
			fun();
             this.showempty= true;
		}
	}

}
</script>

<style>

</style>




