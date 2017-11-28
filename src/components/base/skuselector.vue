<template>
  <ul class="skubox">
    <li v-for="g in skuShowData">
      <div class="tit">{{g.gname}}</div>
      <div class="items">
        <a  v-for="itm in g.gitems" @click="select(g.gid,itm)" :class="{actived:itm.actived,disabled:itm.disabled}">{{itm.itemname}}</a>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        skuShowData:{},
        selected:[],
        resdata:null
      }
    },
    props:{
      skudata:{
        type:Array,
        default(){
          return [{"id":"2520","event_id":"1237","event_type":"activity","price":"50.00","inventory_num":"14","properties":"19:1179;32:1051;69:1141","properties_name":"19:1179:\u7968\u4ef7:50\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:50\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2520","type":"package","show_type":"\u6570\u91cf","price":"50.00","size_num":"1"}]},{"id":"2521","event_id":"1237","event_type":"activity","price":"50.00","inventory_num":"20","properties":"19:1179;32:1051;69:1142","properties_name":"19:1179:\u7968\u4ef7:50\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:50\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2521","type":"package","show_type":"\u6570\u91cf","price":"50.00","size_num":"1"}]},{"id":"2522","event_id":"1237","event_type":"activity","price":"90.00","inventory_num":"20","properties":"19:1180;32:1051;69:1141","properties_name":"19:1180:\u7968\u4ef7:90\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:90\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2522","type":"package","show_type":"\u6570\u91cf","price":"90.00","size_num":"1"}]},{"id":"2523","event_id":"1237","event_type":"activity","price":"90.00","inventory_num":"18","properties":"19:1180;32:1051;69:1142","properties_name":"19:1180:\u7968\u4ef7:90\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:90\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2523","type":"package","show_type":"\u6570\u91cf","price":"90.00","size_num":"1"}]},{"id":"2524","event_id":"1237","event_type":"activity","price":"140.00","inventory_num":"20","properties":"19:1181;32:1051;69:1141","properties_name":"19:1181:\u7968\u4ef7:140\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:140\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2524","type":"package","show_type":"\u6570\u91cf","price":"140.00","size_num":"1"}]},{"id":"2525","event_id":"1237","event_type":"activity","price":"140.00","inventory_num":"20","properties":"19:1181;32:1051;69:1142","properties_name":"19:1181:\u7968\u4ef7:140\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:140\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2525","type":"package","show_type":"\u6570\u91cf","price":"140.00","size_num":"1"}]},{"id":"2526","event_id":"1237","event_type":"activity","price":"190.00","inventory_num":"20","properties":"19:1182;32:1051;69:1141","properties_name":"19:1182:\u7968\u4ef7:190\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:190\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2526","type":"package","show_type":"\u6570\u91cf","price":"190.00","size_num":"1"}]},{"id":"2527","event_id":"1237","event_type":"activity","price":"190.00","inventory_num":"20","properties":"19:1182;32:1051;69:1142","properties_name":"19:1182:\u7968\u4ef7:190\u5143;32:1051:**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:190\u5143,**\u7968\u52a1\u7c7b\u578b:\u5355\u4eba\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2527","type":"package","show_type":"\u6570\u91cf","price":"190.00","size_num":"1"}]},{"id":"2528","event_id":"1237","event_type":"activity","price":"250.00","inventory_num":"18","properties":"19:1183;32:1052;69:1141","properties_name":"19:1183:\u7968\u4ef7:250\u5143;32:1052:**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:250\u5143,**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2528","type":"package","show_type":"\u6570\u91cf","price":"250.00","size_num":"1"}]},{"id":"2529","event_id":"1237","event_type":"activity","price":"250.00","inventory_num":"19","properties":"19:1183;32:1052;69:1142","properties_name":"19:1183:\u7968\u4ef7:250\u5143;32:1052:**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:250\u5143,**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2529","type":"package","show_type":"\u6570\u91cf","price":"250.00","size_num":"1"}]},{"id":"2530","event_id":"1237","event_type":"activity","price":"350.00","inventory_num":"20","properties":"19:1184;32:1052;69:1141","properties_name":"19:1184:\u7968\u4ef7:350\u5143;32:1052:**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:350\u5143,**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2530","type":"package","show_type":"\u6570\u91cf","price":"350.00","size_num":"1"}]},{"id":"2531","event_id":"1237","event_type":"activity","price":"350.00","inventory_num":"20","properties":"19:1184;32:1052;69:1142","properties_name":"19:1184:\u7968\u4ef7:350\u5143;32:1052:**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:350\u5143,**\u7968\u52a1\u7c7b\u578b:\u53cc\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2531","type":"package","show_type":"\u6570\u91cf","price":"350.00","size_num":"1"}]},{"id":"2532","event_id":"1237","event_type":"activity","price":"350.00","inventory_num":"20","properties":"19:1184;32:1053;69:1141","properties_name":"19:1184:\u7968\u4ef7:350\u5143;32:1053:**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:350\u5143,**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2532","type":"package","show_type":"\u6570\u91cf","price":"350.00","size_num":"1"}]},{"id":"2533","event_id":"1237","event_type":"activity","price":"350.00","inventory_num":"20","properties":"19:1184;32:1053;69:1142","properties_name":"19:1184:\u7968\u4ef7:350\u5143;32:1053:**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:350\u5143,**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2533","type":"package","show_type":"\u6570\u91cf","price":"350.00","size_num":"1"}]},{"id":"2534","event_id":"1237","event_type":"activity","price":"500.00","inventory_num":"19","properties":"19:1185;32:1053;69:1141","properties_name":"19:1185:\u7968\u4ef7:500\u5143;32:1053:**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968;69:1141:\u573a\u6b21:8\u670826\u65e514\uff1a30","properties_show_name":"\u7968\u4ef7:500\u5143,**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e514\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2534","type":"package","show_type":"\u6570\u91cf","price":"500.00","size_num":"1"}]},{"id":"2535","event_id":"1237","event_type":"activity","price":"500.00","inventory_num":"19","properties":"19:1185;32:1053;69:1142","properties_name":"19:1185:\u7968\u4ef7:500\u5143;32:1053:**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968;69:1142:\u573a\u6b21:8\u670826\u65e519\uff1a30","properties_show_name":"\u7968\u4ef7:500\u5143,**\u7968\u52a1\u7c7b\u578b:\u4e09\u4eba\u5957\u7968,\u573a\u6b21:8\u670826\u65e519\uff1a30","show_type":"\u6570\u91cf","size_num":"1","activityPriceList":[{"event_id":"1237","sku_id":"2535","type":"package","show_type":"\u6570\u91cf","price":"500.00","size_num":"1"}]}]
        }
      }
    },
    created() {
      let groups = [];
      let arr = this.skudata;
      //console.log(this.skudata);
      if(arr.length==0) return;
      let giArr = arr[0].properties.split(";");
      let gnArr = arr[0].properties_show_name.split(",");
      for (let i = 0; i < giArr.length; i++) {
        let gid = giArr[i].split(":")[0];
        let gname = gnArr[i].split(":")[0];
        let gitems = [];
        let tmparr = [];
        for (let j = 0; j < arr.length; j++) {
          let gia = arr[j].properties.split(";");
          let gna = arr[j].properties_show_name.split(",");
          let itmid = gia[i].split(":")[1];
          if(tmparr.indexOf(itmid)<0){
            tmparr.push(itmid);
            gitems.push({itemid:itmid,itemname:gna[i].split(":")[1],actived:false,disabled:false});
          }
        }
        let group = {gid:gid,gname:gname,gitems:gitems}
        groups.push(group);
      }
      this.skuShowData = groups;
      console.log(groups);
      //console.log(this.skuShowData);
    },
    methods: {
      select(gid,item){
        if(item.disabled) return;

        this.active(gid,item);
        this.setDisabled(gid);
        this.getSkuid();
      },
      active(gid,item){
        this.deldouble(gid);
        let itmid = item.itemid
        if(!item.actived){
          let istr  =gid+":"+itmid;
          this.selected.push(istr);
        }

        let arr = this.skuShowData;
        for (let i = 0; i < arr.length; i++) {
          let ia = arr[i].gitems;
          if(gid==arr[i].gid){
            for (let j = 0; j < ia.length; j++) {
              if(ia[j].itemid==itmid && !item.actived){
                ia[j].actived = true;
              }else{
                ia[j].actived = false;
              }
            }
            break;
          }
        }
      },
      delself(str){
        let arr = this.selected;
        let arrtmp = [];
        for (var i = 0; i < arr.length; i++) {
          if(arr[i].indexOf(str)<0){
            arrtmp.push(arr[i]);
          }
        }
        return arrtmp;
      },
      setDisabled(gid){
        let arr = this.skudata;
        let gp = this.skuShowData;

        for (let i = 0; i < gp.length; i++) {
          // console.log("i:"+i);
          let items = gp[i].gitems;
          let gpid = gp[i].gid;
          if(gpid!=gid){
            for (let j = 0; j < items.length; j++) {
              var arrtmp = this.delself(gpid);
              let pp = gpid+":"+items[j].itemid;
              arrtmp.push(pp)
              this.skuShowData[i].gitems[j].disabled = true;
              for (let n = 0; n < arr.length; n++) {
                let allpp = arr[n].properties;
                if(this.haveAll(arrtmp,allpp)){
                  //console.log(arrtmp+"\n"+this.selected);
                  this.skuShowData[i].gitems[j].disabled = false;

                }
              }
            }
          }
        }
      },
      haveAll(arr,str){
        let res = true;
        for (var i = 0; i < arr.length; i++) {
          if(str.indexOf(arr[i])<0){
            res=false;
          }
        }
        return res;
      },
      deldouble(gid){
        var sa = this.selected;
        let res = true;
        for (let i = 0; i < sa.length; i++) {
           if(sa[i].indexOf(gid+":")>=0){
             res = false;
             this.selected.splice(i,1)
             break;
           }
        }
        return res;
      },
      getSkuid(){
        let sd = this.selected.sort();
        let data = this.skudata;
        let group = this.skuShowData;
        this.resdata=null;
        if(sd.length!=group.length) return;
        for (let i = 0; i < data.length; i++) {
          let pps = data[i].properties.split(";");
          pps.sort();
          if(sd.join(";")==pps.join(";")){
            this.resdata = data[i];
          }
        }
      }
    },
    watch:{
      resdata(val){
        this.$emit('onSelected',val);
      }
    }
  }
</script>

<style scoped>
.skubox a{ margin-right: .2rem; display: inline-block; height: .52rem; line-height: .52rem;padding: 0 .24rem; border:1px solid #e8e8e8; background-color: #fff; border-radius: .06rem; margin-top: .16rem;}
.skubox a.actived{ background-color: #23c683; color: #fff; border-color: #23c683;}
.skubox a.disabled{ color:#d3d3d3;background-color: #f8f8f8; }
.skubox .tit{color:#989998}
.skubox li{ border-bottom: 1px solid #eee; padding: .16rem 0;}
</style>
