<template>
    <div>

        <form @submit.prevent="submit" >
        <div class="section">
            <div class="owner orderhead">
                <div class="hideTxt">{{itemInfo.name}}</div>
                <div>
                    <span class="cl999">总 价：￥{{itemInfo.price}}</span>
                    <em id="total_price"></em>
                </div>
                <ul>
                    <li v-for="(item,index) in itemInfo.const_prop " :key="index">
                        {{item.key}}:{{item.value}}
                    </li>
                </ul>
            </div>

        </div>

        <div class="section">
            <ul class="orderitems">
                <li>
                    <span>邀 请 码：</span><input v-model="leavecode" type="text" name="invite_code" placeholder="输入邀请码，可获得交易额3%的返现奖励！" value="" />
                </li>
            </ul>
        </div>

        <div class="buybar">
            <span class="price">
                <small class="cl333 px20">应付：</small>￥{{itemInfo.price}}
                <em id="order_price"></em>
            </span>
            <input type="submit" id="showsku" value="提交订单">
        </div>
        </form>

    </div>
</template>
<script>
const querystring = require('querystring');
import Vue from 'vue'
export default {
    data() {
        return {
            confirmdata: {},
            itemInfo: {},
            leavecode: '',

        }
    },
    methods: {
        getData() {
            this.$http.get('/ajaxOrder/confirm/itemId/' + this.$route.params.id)
                .then((response) => {

                    this.itemInfo = response.data.itemInfo;




                },

            )
        },
        submit() {

            let params = {
                itemId: this.itemInfo.id,
                inviteCode: this.leavecode

            }
            this.$http.post('/ajaxOrder/submit', params)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response)
                        location.href = "/Order/pay/id/" + response.data.ordId;
                    }
                },

            )


        }


    },
    created: function() {

        this.getData()


    }

}
</script>

<style scoped>
.section {
    background-color: #fff;
    padding: 0.2rem;
    margin-bottom: 0.13rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 0.26rem;
    color: #333;
    box-shadow: 0px 1px 1px rgba(200, 200, 200, .2);
}

.orderhead {
    line-height: 0.36rem;
}

.owner {

    position: relative;
}

.orderitems li {
    padding: 0.2rem 0;
    padding-left: 1.2rem;
    line-height: 0.5rem;
    position: relative;
    min-height: 0.5rem;
    position: relative;
}

.orderitems li span {
    color: #8c8c8c;
    position: absolute;
    left: 0;
    top: 0.2rem;
}

.orderhead .ex {
    border: 1px #d2d2d2 solid;
    width: 1.5rem;
    height: 1rem;
    line-height: 1rem;
    border-radius: 0.06rem;
    background-color: #fff;
    text-align: center;
    font-size: 0;
    left: 0rem;
    position: absolute
}

.orderhead .ex img {
    max-width: 100%;
    max-height: 100%;
}

.orderhead .teacherEx {
    width: 1.24rem;
    height: 1.24rem;
    border-radius: 0.62rem;
    overflow: hidden;
}

.buybar {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgba(240, 240, 240, .8);
    width: 100%;
    border-top: #d7d7d7 1px solid;
    z-index: 1;
    -webkit-user-select: none;
    -webkit-backdrop-filter: blur(5px)
}

.buybar .price {
    color: #ff2323;
    padding-left: 0.2rem;
}

.buybar input {
    position: absolute;
    height: 100%;
    background-color: #ff4f4f;
    right: 0;
    padding: 0 0.56rem;
    color: #fff;
    border-radius: 0;
    font-size: 0.3rem;
}

.buybar input:disabled {
    background-color: #999;
    text-shadow: 0 -1px 0 #666;
}

.orderitems input[type=text],
.orderitems input[type=tel],
.orderitems input[type=number] {
    vertical-align: middle;
    height: 0.5rem;
    border: 1px solid #d7d7d7;
    padding: 0 1em;
    border-radius: 0.04rem;
    -webkit-box-shadow: inset 0 0 3px rgba(143, 143, 143, .41);
    width: 100%;
    box-sizing: border-box
}
</style>
