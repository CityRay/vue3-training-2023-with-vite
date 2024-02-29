import{_ as x,l as L,r as a,o as c,c as m,b as o,a as i,t as C,w as n,d as e,j as A,h as $,f as h,F as v}from"./index-9IrnIm9m.js";import{S as u}from"./sweetalert2.all-bH93S6nv.js";import{F as V}from"./FooterComponent-wcf8E1DZ.js";const p="https://vue3-course-api.hexschool.io/v2",w={name:"AdminLayout",components:{FooterComponent:V},data(){return{title:"ADMIN 管理頁面",isLoading:!0,checkSuccess:!1}},methods:{userCheck(){this.$http.post(`${p}/api/user/check`).then(t=>{this.checkSuccess=!0}).catch(t=>{u.fire({title:t.response.data.message,text:"",icon:"error"}),this.$router.replace("/adminLogin")}).finally(()=>{this.isLoading=!1})},signOut(){this.$http.post(`${p}/logout`).then(t=>{u.fire({title:"登出成功",text:"",icon:"success"}),document.cookie=`hexToken=1; expires=${new Date("1999/01/02")}; path=/`,this.$router.push("/")}).catch(t=>{u.fire({title:t.response.data.message,text:"",icon:"error"})})}},mounted(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");t===""?this.$router.replace("/adminLogin"):(L.defaults.headers.common.Authorization=t,this.userCheck())}},y={class:"header px-5 py-2"},F={class:"mt-3"},S=i("hr",null,null,-1),N={key:0,class:"container"};function R(t,l,B,O,r,d){const _=a("VueLoading"),s=a("RouterLink"),f=a("RouterView"),k=a("FooterComponent");return c(),m(v,null,[o(_,{active:r.isLoading},null,8,["active"]),i("div",null,[i("div",y,[i("h1",F,C(r.title),1),o(s,{to:"/"},{default:n(()=>[e("回前台首頁")]),_:1}),e(" | "),o(s,{to:{name:"AdminProducts"}},{default:n(()=>[e("產品管理")]),_:1}),e(" | "),o(s,{to:{name:"AdminOrders"}},{default:n(()=>[e("訂單管理")]),_:1}),e(" | "),o(s,{to:{name:"AdminCoupons"}},{default:n(()=>[e("優惠卷管理")]),_:1}),e(" | "),o(s,{to:{name:"AdminArticles"}},{default:n(()=>[e("文章管理")]),_:1}),e(" | "),i("a",{href:"#",onClick:l[0]||(l[0]=A((...g)=>d.signOut&&d.signOut(...g),["prevent"]))},"登出")]),S]),r.isLoading?h("",!0):(c(),m("div",N,[r.checkSuccess?(c(),$(f,{key:0})):h("",!0)])),o(k)],64)}const M=x(w,[["render",R]]);export{M as default};
