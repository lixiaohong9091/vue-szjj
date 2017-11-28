import Vue from 'vue'
import Router from 'vue-router'
import Homesearch from '@/components/pages/homesearch/homesearch'
import LiveShow from '@/components/pages/liveShow/liveShow'
import Index from '@/components/pages/index/index'
import TuanIndex from '@/components/pages/group/index'
import TuanDetail from '@/components/pages/group/detail'
import TuanOrder from '@/components/pages/group/order'
import TuanProg from '@/components/pages/group/prog'
import Vip from '@/components/pages/vip/index'
import Vipapp from '@/components/pages/vip/index_app'
import vipOrder from '@/components/pages/vip/order'
import Agreement from '@/components/pages/vip/agreement'
import AgreementApp from '@/components/pages/vip/agreement_app'
import MyOrder from '@/components/pages/mine/myorder'
import err from '@/components/pages/err'
// seckill
import seckill from '@/components/pages/seckill/seckill';
import selectSku from '@/components/pages/seckill/selectSku';

Vue.use(Router)
let routedatas = [
	{
		path: '/',
		title:"神州佳教 - 首页",
		name: 'Index',
		component: Index
	}, {
		path: '/homesearch/:type?/:kw?/',
		title:'搜索',
		name: 'Homesearch',
		component: Homesearch
	}, {
		path: '/liveshow/:type',
		title:'现场秀',
		name: 'LiveShow',
		component: LiveShow
	}, {
		path: '/liveshow',
		redirect: {
			name: "LiveShow",
			params: {
				type: "showAll"
			}
		}
	},
	{
		title:'拼团广场',
		path: '/group/',
		name: 'TuanIndex',
		component: TuanIndex
	}, {
		path: '/group/order/',
		title:'我的拼团订单',
		name: 'TuanOrder',
		component: TuanOrder
	}, {
		title:'拼团详情',
		path: '/group/:id',
		name: "TuanDetail",
		component: TuanDetail
	}, {
		title:'拼团进度',
		path: '/group/prog/:id',
		name: 'TuanProg',
		component: TuanProg
	}, {
		title:'会员专享',
		path: '/vip/app',
		name: 'Vipapp',
		component: Vipapp
	},
	{
		title:'会员协议',
		path: '/vip/agreement',
		name: 'Agreement',
		component: Agreement
	},
	{
		title:'会员协议',
		path: '/vip/agreement_app',
		name: 'AgreementApp',
		component: AgreementApp
	},
	{
		title:'订单',
		path: '/vip/order/:id',
		name: 'vipOrder',
		component: vipOrder
	},
	{
		title:'会员专享',
		path: '/vip/:callback?',
		name: 'Vip',
		component: Vip
	},
	{
		title:'我的订单',
		path:'/mine/myorder',
		name:'MyOrder',
		component:MyOrder
	}
	, {
		title: '秒杀',
		path: '/seckill/:id',
		name: 'Seckill',
		component: seckill,
		beforeEnter: function(to, from, next) {
			if (to.params.id === ' ') {
				next(false);
			} else {
				next();
			}
		},
		children: [{
			path: 'selectSku',
			name: 'SelectSku',
			component: selectSku,
			components: {
				selectSku,
			},
			beforeEnter: function(to, from, next){
				if (!from.name) {
					next({
						name: 'Seckill',
						params: {
							id: to.params.id
						}
					});
				} else {
					next();
				}
			}
		}]
	},
	{
		path: '*',
		title:"404 not found",
		name: 'err',
		component: err
	}
];

// for (let i in routedatas) {
// 	routedatas[i].path = "/main"+routedatas[i].path
// }

const router = new Router({
	mode: 'history',
	routes: routedatas,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}  else {
			return {
				x: 0,
				y: 0
			}
		}
	}
});
let setTitle = name=>{
	for (var i in routedatas) {
		if(routedatas[i].name==name){
			document.title = routedatas[i].title;
			break;
		}
	}
}
router.afterEach((to, from, next) => {
	setTitle(to.name);
	for (var i in to.params) {
		if (to.params.hasOwnProperty(i)) {
			if(to.params[i]==undefined) to.params[i] = "";
		}
	}
	//console.log("c:"+to.fullPath);
});
export default router
