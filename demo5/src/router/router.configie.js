
import Index from '../components/index/index.vue'
import Security from '../components/security/security.vue'
import Download from '../components/download/download.vue'
import LandingPage from '../components/landingPage/landingPage.vue'
import Gewala from '../components/gewala/gewala.vue'
import Template from '../components/template/template.vue'
export  default {
   base: __dirname,
   linkActiveClass:'active',
	 routes:[
	   {
	     path:'/index',
	     name:'index',
	     component:Index
	   },
	   {
	   	 path:'/security',
	     name:'security',
	     component:Security
	   },
	   {
         path:'/download',
         name:'download',
         component:Download
	   },
	     {
        path:'/loan',
        name:'loan',
        component:Loan,
        meta:{
        isLoan:true
        }
	   },
	   {
         path:'/landingPage',
         name:'landingPage',
         component:LandingPage,
         meta:{
         	isLandingPage:true
         }
	   },
	   {
         path:'/gewala',
         name:'gewala',
         component:Gewala
	   },
	   {
       path:'/template',
       name:'template',
       component:Template
     },
	   {path:'*',redirect:{name:"index"}}//默认index
	]
}

