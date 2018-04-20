const Index = resolve => require(['../components/index/index.vue'], resolve);
const Security = resolve => require(['../components/security/security.vue'], resolve);
const Investment = resolve => require(['../components/Investment/Investment.vue'], resolve);
const Download = resolve => require(['../components/download/download.vue'], resolve);
const LandingPage = resolve => require(['../components/landingPage/landingPage.vue'], resolve);
const Loan = resolve => require(['../components/loan/loan.vue'], resolve);
const Gewala = resolve => require(['../components/gewala/gewala.vue'], resolve);
const Template = resolve => require(['../components/template/template.vue'], resolve);
const LoanLogin = resolve => require(['components/loanCenter/login/login.vue'], resolve);
const LoanToUp = resolve => require(['components/loanCenter/topUp/topUp.vue'], resolve);
const SafetyGuarantee = resolve => require(['components/safetyGuarantee/safetyGuarantee.vue'], resolve);
//    多点金融个人中心
const investAccount = resolve => require(['components/userCenter/investAccount/investAccount.vue'], resolve);
const investRecord = resolve => require(['components/userCenter/investRecord/investRecord.vue'], resolve);
const centerCommon = resolve => require(['components/userCenter/centerCommon/centerCommon.vue'], resolve);
const login = resolve => require(['components/userCenter/login/login.vue'], resolve);
//    多点金融个人中心
export  default {
  base: __dirname,
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/security',
      name: 'security',
      component: Security
    },
    {
      path: '/Investment',
      name: 'Investment',
      component: Investment
    },
    {
      path: '/download',
      name: 'download',
      component: Download
    },
    {
      path: '/loan',
      name: 'loan',
      component: Loan,
      meta: {
        isLoan: true
      }
    },
    {
      path: '/safetyGuarantee',
      name: 'safetyGuarantee',
      component: SafetyGuarantee,
      meta: {
        SafetyGuarantee: true
      }
    },
    {
      path: '/landingPage',
      name: 'landingPage',
      component: LandingPage,
      meta: {
        isLandingPage: true
      }
    },
    {
      path: '/gewala',
      name: 'gewala',
      component: Gewala
    },
    {
      path: '/template',
      name: 'template',
      component: Template
    },
    {
      path: '/loanLogin',
      name: 'loanLogin',
      component: LoanLogin,
      meta: {isShow: 'loan'}
    },
    {
      path: '/loanToUp',
      name: 'loanToUp',
      component: LoanToUp,
      meta: {isShow: 'loan'}
    },
    {
      path: '/center',
      name: 'center',
      component: centerCommon,
      children:[
        {
          path: 'investAccount',
          name:'investAccount',
          component: investAccount,
          meta:{center:'center'}   // 如果路由到我的个人中心页面  header的背景图修改  根据提交ISCENTER 状态
        },
        {
          path: 'investRecord',
          name:'investRecord',
          component: investRecord,
          meta:{center:'center'}  // 如果路由到我的个人中心页面  header的背景图修改  根据提交ISCENTER 状态
        }
      ]
    },
    {
      path: '/login',
      name:'login',
      component: login,
      meta:{center:'center',isShow:'loan'}
    },
    {path: '*', redirect: {name: "index"}}//默认index
  ]
}

