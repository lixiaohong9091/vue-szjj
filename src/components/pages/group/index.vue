<template>
  <div class="tuanindex">
    <topbar></topbar>
    <div class="nav">
      <ul>
        <li v-for="type in datas.typeList" :class="{actived:currtype==type.key}" @click="changetab(type.key)">
          <span>{{type.value}}</span>
        </li>
      </ul>
    </div>

    <dl class="item" v-for="tuan in tuanList">
  		<dt>
  			<img :src="tuan.image_url"/>
  			<h2 class="px32 hideTxt">{{tuan.title}}</h2>
  			<p class="px24">{{tuan.descript}}</p>
  		</dt>
  		<dd v-for="info in tuan.tuanInfoList">
  			<router-link :to="{ name: 'TuanDetail', params: {id:info.id} }">
  				<span class="tuan">{{info.number}}人团</span>
  				<big>￥{{info.price}}<small>{{info.is_qi-0?' 起':''}}</small></big>
  				<del>￥{{info.old_price}}{{info.is_qi-0?' 起':''}}</del>
  				<span class="btn">去拼团</span>
  			</router-link>
  		</dd>
    </dl>
    <loadlist :apiurl="apiurl" @ondataupdate="getdata" v-if="reload"></loadlist>
    <div class="btmfix">
      <span class="grpdesc" @click="showDesc"><i></i>拼团说明</span>
      <router-link class="mygrp" tag="span" :to="{name:'TuanOrder'}">我的拼团</router-link>
    </div>
    <imgmodel :imgurl="imgurl" :show="showimgModel" @hide="showimgModel=false"></imgmodel>
  </div>
</template>

<script>
import topbar from '@/components/base/header'
import loadlist from '@/components/base/loadlist'
import imgmodel from '@/components/pages/group/imgModel'

  export default {
    data() {
      return {
        reload:true,
        datas:{},
        tuanList:[],
        totalCount:0,
        currtype:'',
        apiurl:"/Tuan/tuanList/p/@p",
        showimgModel:false,
        imgurl:""
      }
    },
    components:{
      topbar,loadlist,imgmodel
    },
    beforecreate(){

    },
    created() {

    },
    methods: {
      changetab(type){
        this.currtype = type;
      },
      getdata(datas){
        this.datas = datas;
        this.tuanList = this.tuanList.concat(datas.tuanList);
      },
      showDesc(){
        this.imgurl = this.datas.explain_img;
        this.showimgModel = true;
      }
    },
    updated(){
      if(!localStorage.getItem("invitetuan")){
        localStorage.setItem("invitetuan",1);
        this.imgurl = this.datas.award_img;
        this.showimgModel = true;
      }
    },
    watch:{
      currtype(val){
        this.tuanList=[];
        this.reload = false;
        val = val?"/type/"+val:"";
        this.apiurl = "/Tuan/tuanList"+val+"/p/@p"
        let tmr = setTimeout(()=>{
          this.reload = true;
          clearTimeout(tmr)
        },100)
      }
    }
  }
</script>

<style scoped>
.tuanindex{ padding-top: .8rem; padding-bottom: .86rem;}
.tuanindex .item{ margin-bottom:.2rem; margin-top: .2rem;}
.tuanindex .item dt{padding:.2rem;background-color:#fff; }
.tuanindex .item img{ width:100%;}
.tuanindex .item h2{ padding: 0;font-weight:normal; line-height:1.8em; padding-top:.1rem;}
.tuanindex .item p{ color:#8e8e8e;}
.tuanindex .item dd{ margin-top:1px;background-color:#fff; position:relative;}
.tuanindex .item dd a{ display:block; height:.92rem; line-height:.92rem; padding:0 .28rem; font-size:.24rem; }
.tuanindex .item dd span{ vertical-align:middle}
.tuanindex .item dd .tuan{ display:inline-block; width:1rem; position:relative;}
.tuanindex .item dd big{vertical-align:middle; font-size:.26rem; color:#ff4b4b; display:inline-block; width:1.2rem;}
.tuanindex .item dd del{vertical-align:middle; color: #989998}
.tuanindex .item dd .btn{ position: absolute; right:.2rem;width:1.52rem; height:.6rem; line-height:.6rem; color:#ffaf2f; top:50%; margin-top:-.3rem; text-align:center; border-radius:.04rem; border: 1px solid #fac126; font-size: .28rem;}
.tuanindex .item dd .stat{ position: absolute; right:.2rem; padding:0 .25rem;height:.42rem; line-height:.42rem; color:#ff4b4b; top:50%; margin-top:-.21rem; text-align:center; border-radius:.04rem; border:1px solid #8e8e8e}
.tuanindex .item dd .stat.over{ color:#8e8e8e}
.tuanindex .nav{ height: .78rem; background-color: #fff; margin-bottom: .2rem; overflow: hidden;white-space:nowrap; position: fixed; top: .8rem; left: 0; width: 100%; z-index: 999; border-bottom: 1px #eeefef solid;}
.tuanindex .nav ul{ width:100%; height:100%; overflow-x: auto; overflow-y: hidden;-webkit-overflow-scrolling:touch; padding: 0 .25rem;;}
.tuanindex .nav li{ font-size: .28rem; line-height: .78rem;  padding: 0 .18rem; display: inline-block;}
.tuanindex .nav li span{ display: inline-block; padding: 0 .08rem;}
.tuanindex .nav li.actived span{ color: #23c683; position: relative;}
.tuanindex .nav li.actived span::after{ position: absolute; content: ' ';width: 100%; left: 0; bottom: 0; border-bottom: .04rem #23c683 solid;}
.tuanindex .btmfix{ position: fixed; bottom: 0; height: .86rem; line-height: .86rem; text-align: center; width: 100%; left: 0; padding-left:2.3rem; box-sizing: border-box;}
.tuanindex .btmfix span{ display: block; background-color: #fff;}
.tuanindex .btmfix span.grpdesc{ position: absolute; left: 0; width: 2.3rem;}
.tuanindex .btmfix span.mygrp{ background-color: #23c683; color: #fff;}
.tuanindex .btmfix span.grpdesc i{ display: inline-block; width:.36rem; height:.36rem; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABPklEQVR42u3YsUrDUBSH8WDFIoWCk4uKuhUHH0DfwCdwyOgUFdfOrkIFA8UHcHJw1FdwjIPURbcOSodU6vrvN6RQghwwaW6L3OE3neUbzg3kBJICPeyHSJBW6B3nqCH4FS2TGDnURs0KSiD0EVfoDcIAm1bQCEIXQYXOoMyeFfQNoVNx0AmUaVlBKYS44qAIymwsWtARWlO25h2U9zV5fe6DbBdW0BKOERcQoW4EXSKa0oPwYQXtQCUcGEGN3OwGwo8VtIZHpAU8YzsfZDz7awhDc4ewjGYBdQR/CIohpJUttQ+aR9AK2ngq4ArNWQftQiUczjqogVu8FnCPdb/UPqisf7bU7p+9+w+jX2of5INoWZRf6Q6EoctjwymUWc3NuhBGLs8xPShzl5v1IbzYByv3QlcnvQE+jXmCULSMAbH8b5mPBxSCAAAAAElFTkSuQmCC") no-repeat; background-size: 100% 100%; vertical-align: middle; margin-right: .1rem}
</style>
