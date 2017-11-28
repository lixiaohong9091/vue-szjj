<template>
    <div class="play-list">
        
        <div class="img">
            <img src="../../../assets/images/playerList_1.png" alt="">
            <img src="../../../assets/images/playerList_2.png" alt="">
            <img src="../../../assets/images/playerList_3.png" alt="">
            <img src="../../../assets/images/playerList_4.png" alt="">
        </div>
        <div class="list">
            <h3>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAAdCAMAAACHbckVAAADAFBMVEVMaXEtFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW4tFW5ihhccAAAA/3RSTlMA+/zPA/79AQcE8vX64Qv4DO6VEb0UsuUOodvqBe0QCBYrBvRv4gIa+eBnKhfjiKobsSPzE+wszd6QGH++1+tKSy1Wh+TGKPelINbdhLqF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">
            </h3>
            <ul>
                <li class="fn_clear" >
                    <div class="fl frist">排名</div>
                    <div class="fl second">获奖用户</div>
                    <div class="fl third">发布总数</div>
                    <div class="fl four">有用数</div>
                </li>
                <li class="fn_clear" v-for="(item,index) in lists" :key="index">
                    <div class="fl frist">{{index+1}}</div>
                    <div class="fl second elp"> <img :src="item.head_portrait" alt=""> {{item.nick}}</div>
                    <div class="fl third elp">{{item.comment_num}}</div>
                    <div class="fl four elp">{{item.recomment_num}}</div>
                </li>               
            </ul>

        </div>
    </div>
</template>
<script >
import HeaderNav from '../../base/header.vue'
export default {
    components: { HeaderNav },
    data() {
        return {

            lists:[]

        }
    },
    methods: {
        getshowData() {
            this.$http.get('/YearCard/getLiveShowRand')
                .then((renspond) => {

                    if(renspond.status==200){
                        this.lists = renspond.data.list;

                    }

                   

                    

                })
        }
    },
    created:function(){
        this.getshowData()
    }

}
</script>
<style scoped>
.play-list {
    background: #1b008d;
    padding-bottom: .5rem;
}

.play-list .img img {
    width: 100%;
    height: auto;
}

.play-list .list {
    background: #fff;
    margin: .25rem .25rem 0;
    border-radius: .08rem;
}

.play-list .list ul li {
    position: relative;
}



.play-list .list ul {
    padding-bottom: .35rem;
}

.play-list .list h3 {
    text-align: center;
    height: .95rem;
    line-height: .95rem;
}

.play-list .list h3 img {
    width: 2.69rem;
    height: .29rem;
}

.play-list .list li {
    height: .55rem;
    line-height: .55rem;
}

.play-list .list li:first-child {
    background: #f2efff;
}

.play-list .list li div {
    width: 25%;
}
.play-list .list li img{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
}

.play-list .list li div.frist {
    text-indent: .2rem;
    width: 18%;
}

.play-list .list li div.second{
    width: 28%;
}

.play-list .list li div.third,
.play-list .list li div.four {
    text-align: center;
    width: 27%
}
</style>


