<template>
  <div>
    <topbar></topbar>
    <div class="itembar" @click="goDetail(itembase.event_type,itembase.event_id)">
      <img :src="itembase.image_url"/>
      <h2 class="px28">{{itembase.name}}</h2>
      <div class="px24" style="padding-top:.1rem">
        {{tuanitem.number}}人团 　<span class="red">拼团 ￥<big>{{itembase.discount_price}}</big>{{!itembase.is_qi?"起":""}}</span>
      </div>
    </div>
    <div class="sect proginfo" v-if="tuanitem.status==1">
      <span class="red">还差{{tuanitem.have_number}}人成团</span>　 距结束 <downtimer :lefttime="tuanitem.have_time-0" @onChange="ctime"><i>{{timetmp.h}}</i>：<i>{{timetmp.n}}</i>：<i>{{timetmp.s}}</i></downtimer>
    </div>
    <div class="users sect">
      <span v-for="user in userList"><img :src="user.value"/></span>
      <span v-if="tuanitem.status==1"><img src="../../../assets/images/inv.gif"/></span>
    </div>
    <div class="sect stuts" v-if="tuanitem.status==1">
      <img src="../../../assets/images/handing.gif"  style="height:1.3rem"/>
      <div>
        此单拼团成功送<span class='red'>相应积分</span>，抓紧邀请好友加入拼团吧！<br />可在“我的-积分商城”中查看结果
      </div>
    </div>
    <div class="sect stuts" v-if="tuanitem.status==3">
      <img src="../../../assets/images/fail.gif"/>
      <div>
        <h1>拼团失败</h1>如对此拼团有任何疑问，可拨打神州佳教<br />客服热线 <span class='red'>400-706-7131</span>,周一至周五9:00--18:00
      </div>
    </div>
    <div class="sect stuts"  v-if="tuanitem.status==2">
      <img src="../../../assets/images/suc.gif"/>
      <div>
        <h1 class="txtgr">拼团成功</h1><span class='red'>相应积分</span>已到您账户<br />可在“我的-积分商城”中查看结果
      </div>
    </div>
    <ul class="flexbox fixbt">
      <router-link class="bggr" tag="li" :to="{name:'TuanOrder'}">
        我的拼团
      </router-link>
      <li @click="showSku=true" v-if="tuanitem.status==1">
        去参团
      </li>
    </ul>
    <orderbox :item="itembase"  @onsubmit="submit" :show="showSku" v-if="complate && tuanitem.status==1" @hide="showSku=false" ></orderbox>
  </div>
</template>


<script>
import downtimer from '@/components/base/downtimer'
import topbar from '@/components/base/header'
import orderbox from '../group/orderbox'
  export default {
    data() {
      return {
        datas:{},
        tuanitem:{},
        itembase:{},
        userList:[],
        timetmp:{h:"--",n:"--",s:"--"},
        lt:60,
        stat:"handing",
        showSku:false,
        complate:false
      }
    },
    components:{
      topbar,downtimer,orderbox
    },
    created() {
      this.loadprog()
    },
    methods: {
      ctime(val){
        this.timetmp = val;
      },
      loadprog(){
        this.$http.get("/tuan/tuanProgress/tuanItemId/"+this.$route.params.id).then(response=>{
          let datas = response.data;
          this.userList = datas.userList;
          this.tuanitem = datas.tuanItem;
          this.itembase = datas.itemBase;
          this.complate = true
        },err=>{
        });
      },
      submit(data){
        this.$http.post("/tuan/partinTuan",{
          tuanItemId:this.tuanitem.id,
          sku_id:data.skuid,
          number:data.count
        }).then(response=>{
          if(response.status==200){
            location.href = '/Order/pay/id/'+response.data
          }
        });
      },
      goDetail(type,id){
        // courses，课程；activity，活动；teacher,教师;voucher，代金券；card，会员卡
        let urls = {
          courses:'/cd'+id,
          activity:'/acd'+id,
          teacher:'/td'+id,
          voucher:'/vd'+id,
          card:'/YearCard/listSzjj/source/1/cardId/'+id,
        }
        if(urls.hasOwnProperty(type)){
          location.href = urls[type];
        }else{
          App.showToast({
            title:'类型错误',
            icon:'warning'
          });
        }
      }
    }
  }
</script>

<style scoped>
.sect{ background-color: #fff; margin-bottom: .18rem;}
.itembar{ padding: .34rem .25rem; padding-left: 2.2rem;background-color: #fafafa; position: relative; box-sizing: border-box; min-height: 1.88rem;}
.itembar img{ position: absolute; width: 1.8rem; height: 1.2rem; left: .25rem; background-color: #eee;}
.itembar h2{ padding: 0}
.proginfo{ text-align: center; padding: .36rem 0;}
.proginfo i{ background-color: #232725; color: #fff; text-align: center; padding: 0 .06rem; font-style: normal; border-radius: .06rem;}
.red{ color: #ff5454;}
.users{ padding: .25rem; }
.users span{ display: inline-block; width: .7rem; height: .7rem; background-color: #eee; border-radius: 50%; margin: .1rem; position: relative; }
.users span img{ width: 100%; height: 100%; border-radius: 50%;}
.users span:first-child::after{ position: absolute; content: "团长"; background-color: #fa5758; top:.04rem; right: -.25rem; color: #fff; height: .28rem; line-height: .28rem; font-size: .18rem; padding: 0 .1rem; border: 1px solid #fff; border-radius: .14rem; border-top-left-radius: 0}
.stuts{ padding: .9rem 0; text-align: center;color: #989998}
.stuts img{ height: .9rem; margin-bottom: .3rem;}
.stuts h1{ font-size: .3rem; margin-bottom: .2rem;}
.txtgr{ color: #23c683}
.fixbt{ width: 100%; height: .86rem; line-height: .86rem; position: fixed; bottom: 0; text-align: center; background-color: #ffaf2f; color: #fff; left: 0}
.bggr{ background-color: #23c683}
</style>
