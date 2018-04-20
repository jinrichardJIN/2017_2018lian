import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios';

// 引入组件2期
//首页
const Index = resolve => require(['components/index/index.vue'], resolve);
const Home = resolve => require(['components/index/home.vue'], resolve);
//机型列表组件
const GoodsList = resolve => require(['components/goodsList/goodsList.vue'], resolve);
//消息列表组件
const Message = resolve => require(['components/message/message.vue'], resolve);
//个人中心组件
const User = resolve => require(['components/user/user.vue'], resolve);
//帮助中心
const HelpCenter = resolve => require(['components/help-center.vue'], resolve);
//我的账户
const Account = resolve => require(['components/user/account.vue'], resolve);
//账户明细
const Detail = resolve => require(['components/user/detail.vue'], resolve);
//收入总金额
const balance = resolve => require(['components/user/balance.vue'], resolve);
//体现总金额
const turnoutlist = resolve => require(['components/user/turnoutlist.vue'], resolve);
//
const rebind = resolve => require(['components/user/rebind.vue'], resolve);
//
const trunout = resolve => require(['components/user/trunout.vue'], resolve);

//发布组件-发布实商品
const Release = resolve => require(['components/release/release.vue'], resolve);
//发布组件-虚拟商品
const Virtual = resolve => require(['components/release/virtual.vue'], resolve);
const BrandChoice = resolve => require(['components/release/releaseItem/brandChoice.vue'], resolve);
const SelectCategory = resolve => require(['components/release/releaseItem/selectCategory.vue'], resolve);
//发布商品子组件——省、市、区
const SelectLocation = resolve => require(['components/release/releaseItem/selectLocation.vue'], resolve);
const SellingSkills = resolve => require(['components/release/releaseItem/sellingSkills.vue'], resolve);

//发布商品子组件——预览图片
const ViewImage = resolve => require(['components/release/releaseItem/viewImage.vue'], resolve);

//商品详细列表组件
const goodsItem = resolve => require(['components/goodsList/goodsItem/goodsItem.vue'], resolve);
//实体商品详情
const PhysicalGoodsDetails = resolve => require(['components/goodsList/goodsItem/physicalGoodsDetails.vue'], resolve);
//留言列表
const MessageList = resolve => require(['components/goodsList/goodsItem/messageList.vue'], resolve);
//对话留言列表
const DialogueList = resolve => require(['components/goodsList/goodsItem/dialogueList.vue'], resolve);
//举报
const Report = resolve => require(['components/goodsList/goodsItem/report.vue'], resolve);
//搜索框组件
const NavSearch = resolve => require(['components/navSearch/navSearch.vue'], resolve);
//商品分类--
const MobAll = resolve => require(['components/goods/mobAll.vue'], resolve);

//登陆
const Login = resolve => require(['components/user/Login.vue'], resolve);

//个人中心--账户设置
const accountSetting = resolve => require(['components/user/accountSetting/accountSetting.vue'], resolve);
//个人中心--账户设置--编辑个人资料
const editIndividual = resolve => require(['components/user/accountSetting/editIndividual.vue'], resolve);
//个人中心--账户设置--地址管理
const addressManagement = resolve => require(['components/user/accountSetting/addressManagement.vue'], resolve);
//个人中心--账户设置--密码修改
const changePassword = resolve => require(['components/user/accountSetting/changePassword.vue'], resolve);
//个人中心--实名认证
const realNameAuthentication = resolve => require(['components/user/RealNameAuthentication/realNameAuthentication.vue'], resolve);
//个人中心--我的发布
const myRelease = resolve => require(['components/user/myRelease/myRelease.vue'], resolve);


//1期暂定不使用
/*import Index from '../components/index.vue';
import Home from '../components/home.vue';
import MobAll from '../components/goods/mobAll.vue';
import Mine from '../components/user/mine.vue';
import EvaluatePublic from '../components/components/evaluatePublic.vue';
import EvaluatePrice from '../components/goods/evaluate-price.vue';
import OrderUpImg from '../components/goods/order-upImg.vue';
import ChoiceRecycling from '../components/order/choice-recycling.vue';
import ReviewCenter from '../components/review-center.vue';
import StoreRecycling from '../components/order/store-recycling.vue';
import StoreSuccess from '../components/order/store-success.vue';
import OnsiteRecycling from '../components/order/onsite-recycling.vue';
import OnsiteSuccess from '../components/order/onsite-success.vue';
import ExpressRecovery from '../components/order/express-recovery.vue';
import ExpressSuccess from '../components/order/express-success.vue';
import OrderCenter from '../components/order/order-center.vue';
import HelpCenter from '../components/help-center.vue';
import MyConcern from '../components/user/my-concern.vue';
import OrderDetails from '../components/order/order-details.vue';
import OrderDetailsChildren from '../components/order/order-detailsChildren.vue';
import SelectCity from '../components/select-city.vue';
import SearchModel from '../components/search-model.vue';
import GoodsList from '../components/goods/goods-list.vue';
import Login from '../components/user/Login.vue';
//import BaiduMap from '../components/components/baidu-map';
import Assessment from '../components/order/assessment.vue';
import ReQuo from '../components/components/reQuo.vue';
import ReQuoNow from '../components/components/reQuoNow.vue';
import Rated from '../components/rated.vue';
import Account from '../components/user/account.vue';
import RetedSuccess from '../components/retedSuccess.vue';
import Detail from '../components/user/detail.vue';
import trunout from '../components/user/trunout.vue';
import setpay from '../components/user/setpay.vue';
import checkmobile from '../components/user/checkmobile.vue';
import balance from '../components/user/balance.vue';
import turnoutlist from '../components/user/turnoutlist.vue';
import choose from '../components/user/choose.vue';
import detailinfo from '../components/user/detailinfo.vue';
import rebind from '../components/user/rebind.vue';*/
/*//配置axios
//将axios赋给this.$http方便调用
Vue.prototype.$http = Axios

Vue.prototype.$http
Axios.defaults.withCredentials = true
Axios.defaults.baseURL = 'http://idle.zhihuiup.com'

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.headers.post['Access-Control-Allow-Origin']
*/

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/index',
			name: 'index',
			component: Index,
			'children': [{
					path: '/home',
					name: 'home',
					component: Home
				},
				{
					path: '/goodsList',
					name: 'goodsList',
					component: GoodsList
				},
				{
					path: '/message',
					name: 'message',
					component: Message
				},
				{
					path: '/user',
					name: 'user',
					component: User
				},
			]
		},
		{
			path: '/goodsItem',
			name: 'goodsItem',
			component: goodsItem
		},
		{
			path: '/release',
			name: 'release',
			component: Release,
			'children': [{
					path: '/brandChoice',
					name: 'brandChoice',
					component: BrandChoice
				},
				{
					path: '/selectCategory',
					name: 'selectCategory',
					component: SelectCategory
				},
				{
					path: '/selectLocation',
					name: 'selectLocation',
					component: SelectLocation
				},
				{
					path: '/sellingSkills',
					name: 'sellingSkills',
					component: SellingSkills
				},
				{
					path: '/viewImage/:img/:index',
					name: 'viewImage',
					component: ViewImage
				}
			]
		},
		{   /******************************账户设置******************************/
			path: '/accountSetting',
			name: 'accountSetting',
			component: accountSetting
		},
		{
			path: '/changePassword',
			/******************************账户设置密码修改******************************/
			name: 'changePassword',
			component: changePassword
		},
		{
			path: '/editIndividual',
			/******************************账户设置个人信息编辑******************************/
			name: 'editIndividual',
			component: editIndividual
		},
		{
			path: '/addressManagement',
			/******************************账户设置地址管理******************************/
			name: 'addressManagement',
			component: addressManagement
		},
		
		{	/******************************个人中心实名认证******************************/
			path: '/realNameAuthentication',
			name: 'realNameAuthentication',
			component: realNameAuthentication
		},
		{	/******************************个人中心我的发布******************************/
			path: '/myRelease',
			name: 'myRelease',
			component: myRelease
		},
		{
			path: '/virtual',
			name: 'virtual',
			component: Virtual
		},
		{
			path: '/physicalGoodsDetails',
			name: 'physicalGoodsDetails',
			component: PhysicalGoodsDetails
		},
		{
			path: '/messageList/:id',
			name: 'messageList',
			component: MessageList
		},
		{
			path: '/navSearch',
			name: 'navSearch',
			component: NavSearch
		},
		{
			path: '/report',
			name: 'report',
			component: Report
		},
		{
			path: '*',
			redirect: '/home'
		},
		{
  			path: '/account',
			name: 'account',
			component: Account
  		},
		{
			path: '/mobAll',
			name: 'mobAll',
			component: MobAll
		},
		{
  			path: '/rebind',
			name: 'rebind',
			component: rebind
  		},
		{
  			path: '/helpCenter',
			name: 'helpCenter',
			component: HelpCenter
  		},
  		{
  			path: '/trunout',
			name: 'trunout',
			component: trunout
  		},
		{
  			path: '/detail',
			name: 'detail',
			component: Detail,
			'children': [
		            { 
		            	path: "/detail/balance",
		                name:'balance',
		                component: balance 
		            },
		            { 
		            	path: "/detail/turnoutlist",
		            	name:'turnoutlist',
		            	component: turnoutlist 
		            },
		            { 
						path: "/detail/",
				    	redirect: "/detail/balance" 
					}
		        ]
	  	},
		/*{
  		path: '/index',
			name: 'index',
			component: Index,
			'children': [
				{
					path: '/home',
					name: 'index.home',
					component: Home
				},
				
				{
					path: '/mine',
					name: 'index.mine',
					component: Mine
				}
			]
  	},
		{
			path: '/evaluatePublic',
			name: 'evaluatePublic',
			component: EvaluatePublic,
		},
		{
			path: '/evaluatePrice',
			name: 'evaluatePrice',
			component:EvaluatePrice
		},
//		{
//			path: '/baiduMap',
//			name: 'baiduMap',
//			component:BaiduMap
//		},
		{
			path: '/choiceRecycling',
			name: 'choiceRecycling',
			component: ChoiceRecycling
		},
		{
			path: '/orderupimg',
			name: 'orderupimg',
			component: OrderUpImg
		},
		{
			path: '/reviewCenter',
			name: 'reviewCenter',
			component: ReviewCenter
		},
		{
			path: '/storeRecycling',
			name: 'storeRecycling',
			component: StoreRecycling
		},
		{
			path: '/storeSuccess',
			name: 'storeSuccess',
			component: StoreSuccess
		},
		{
			path: '/onsiteRecycling',
			name: 'onsiteRecycling',
			component: OnsiteRecycling
		},
		{
			path: '/onsiteSuccess',
			name: 'onsiteSuccess',
			component: OnsiteSuccess
		},
		{
			path: '/expressRecovery',
			name: 'expressRecovery',
			component: ExpressRecovery
		},
		{
			path: '/expressSuccess',
			name: 'expressSuccess',
			component: ExpressSuccess
		},
		{
			path: '/orderCenter',
			name: 'orderCenter',
			component: OrderCenter
		},
  	{
			path: '*',
			redirect: '/home'
  	},
  	{
  		path: '/helpCenter',
			name: 'helpCenter',
			component: HelpCenter
  	},
  	{
  		path: '/myConcern',
			name: 'myConcern',
			component: MyConcern
  	},
  	{
  		path: '/orderDetails',
			name: 'orderDetails',
			component: OrderDetails
  	},
  	{

  		path: '/selectCity',
			name: 'selectCity',
			component: SelectCity
  	},
  	{
  		path: '/orderDetailsChildren',
			name: 'orderDetailsChildren',
			component: OrderDetailsChildren
  	},

  	{
  		path: '/assessment',
			name: 'assessment',
			component: Assessment
  	},
  	{
  		path: '/searchModel',
			name: 'searchModel',
			component: SearchModel
  	},
  	{
  		path: '/goodsList',
			name: 'goodsList',
			component: GoodsList
  	},
  	{

  		path: '/reQuo',
			name: 'reQuo',
			component: ReQuo
  	},
  	{
  		path: '/reQuoNow',
			name: 'reQuoNow',
			component: ReQuoNow
  	},
  	{
  		path: '/rated',
			name: 'rated',
			component: Rated
  	},
  	{
  		path: '/login',
			name: 'login',
			component: Login
  	},
  	{
  		path: '/account',
			name: 'account',
			component: Account
  	},
  	{
  		path: '/retedSuccess',
			name: 'retedSuccess',
			component: RetedSuccess

  	},
  	{
  		path: '/detail',
			name: 'detail',
			component: Detail,
			children: [
						{ path: "/detail/", redirect: "/detail/balance" },
            { path: "/detail/balance",
            name:'balance',
            component: balance },
             { path: "/detail/turnoutlist",
            name:'turnoutlist',
            component: turnoutlist }
        ]
  	},
  	{
  		path: '/trunout',
			name: 'trunout',
			component: trunout
  	},
  	{
  		path: '/setpay',
			name: 'setpay',
			component: setpay
  	},
  	{
  		path: '/checkmobile',
			name: 'checkmobile',
			component: checkmobile
  	},
  	{
  		path: '/choose',
			name: 'choose',
			component: choose
  	},
  	{
  		path: '/rebind',
			name: 'rebind',
			component: rebind
  	},
  	{
  		path: '/detailinfo',
			name: 'detailinfo',
			component: detailinfo
  	}*/

	]
});