<template>
  <div class="artlist">
    <ul>
      <li class="ct-item" :class="{article : !vo.contentImageList.length}"  v-for="vo in list" @click="redirect('/ard'+vo.id)">

        <div class="item-txt" v-if="vo.contentImageList.length">{{vo.title}}</div>
        <div class="item-img" v-if="vo.contentImageList.length">
          <span v-for="img in vo.contentImageList"><img :src="img"></span>
        </div>
        <div class="item-related" v-if="vo.contentImageList.length">
          <span class="item-label elp" @click.stop="redirect('/gl/article/'+vo.topicInfo.code+'.html')">{{vo.topicInfo.name}}</span>
          <span>{{vo.comment_num}}评论</span> <span>{{vo.praise_num}}赞</span> <span>{{vo.create_time}}</span>
        </div>

        <div class="item-art" v-if="!vo.contentImageList.length">
          <div class="item-txt">{{vo.title}}</div>
          <div class="item-related">
            <span class="item-label elp" @click.stop="redirect('/gl/article/'+vo.topicInfo.code+'.html')">{{vo.topicInfo.name}}</span>
            <span class="elp">{{vo.comment_num}}评论</span><span class="elp">{{vo.praise_num}}赞</span><span class="elp">{{vo.create_time}}</span>
          </div>
        </div>
        <div class="item-img item-right" v-if="!vo.contentImageList.length">
          <span><img :src="vo.image_url"></span>
        </div>

      </li>
    </ul>
    <loadlist @ondataupdate="getdata" :apiurl="'/index/search/type/article/searchKey/'+$route.params.kw+'/p/@p'" @onempty="(fun)=>{$emit('onEmpty');fun()}"></loadlist>
  </div>
</template>
<script>
import loadlist from '@/components/base/loadlist'
export default{
  name:'articles',
  data(){
    return {
      list:[]
    }
  },
  props:{
    //kw:Number
  },
  components:{
    loadlist
  },
  methods:{
    getdata(data){
      this.list = this.list.concat(data.objectList);
    },
    redirect(url){
      location.href = url;
    }
  },
  created(){
    //alert(this.kw)
  }
}
</script>
<style scoped>
.artlist ul{ padding: 0 .25rem; background-color: #fff}
.ct-item{position: relative;padding: .24rem 0; cursor: pointer;border-bottom: 1px solid #efefef;}
.ct-item.article{display: -webkit-box;display: -webkit-flex;display: flex;padding: 0;}
.ct-item.ad{padding: .2rem 0;}

.item-art{box-flex: 1;-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;display: -webkit-box;display: box;display: flexbox;display: -webkit-flex;display: flex;overflow: hidden;padding: .24rem 0;-webkit-box-orient: vertical;box-orient: vertical;-webkit-flex-direction: column;flex-direction: column;-webkit-box-pack: center;box-pack: center;-webkit-justify-content: center;justify-content: center;}
.item-q,.item-txt{color: #333;display: -webkit-box;-webkit-box-orient: vertical;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp: 2;padding-bottom: 0;max-height: 2.8em;}
.item-a{padding-bottom: 0;-webkit-line-clamp: 3;}
.ct-item.answer .item-q{color: #b8bac0;margin-bottom: .1rem;font-size: .24rem;}
.ct-item.question .item-q{color: #333;margin-bottom: 0;}

.item-related{margin-top: .24rem;line-height: normal;color: #b8bac0;font-size: .2rem;}
.item-related>span{display: inline-block;vertical-align: top;}
.item-related>span+span{margin-left: .1rem;}
.item-label{max-width: 40%;color: #23c683;}

.item-img{padding-top: .2rem;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-pack: justify;box-pack: justify;-webkit-justify-content: space-between;justify-content: space-between;}
.item-img>span{position: relative;display: block;width: 1.82rem;height: 1.28rem;line-height: 1.28rem;overflow: hidden;}
.item-img img{position: absolute;top: -100%;right: -100%;bottom: -100%;left: -100%;margin: auto;width: auto;height: 100%;}

.item-right{margin-left: .24rem;width: 1.4rem;-webkit-flex-basis: 1.4rem;flex-basis: 1.4rem;padding-bottom: .2rem;}
.item-right>span{position: relative;display: block;width: 1.4rem;height: 1.4rem;line-height: 1.4rem;overflow: hidden;}


</style>
