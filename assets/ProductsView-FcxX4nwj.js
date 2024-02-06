import{S as c}from"./sweetalert2.all-L1Rgk2SD.js";import{P}from"./PaginationComponent-FVPfM-WD.js";import{_ as k,r as h,o as i,c as a,b as _,a as t,F as u,e as C,n as I,t as l,f as p,d as m}from"./index-ScyphKIx.js";const b="https://vue3-course-api.hexschool.io/v2/api/rayray-project",x=c.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:s=>{s.onmouseenter=c.stopTimer,s.onmouseleave=c.resumeTimer}}),L={components:{PaginationComponent:P},data(){return{isLoading:!0,products:[],loadingItems:[],pagination:{}}},methods:{getProducts(s=1){this.$http.get(`${b}/products?page=${s}`).then(n=>{console.log("getProducts",n.data),this.products=n.data.products,this.pagination=n.data.pagination,this.isLoading=!1}).catch(n=>{alert(n.response.data.message)})},addToCart(s){this.loadingItems.push(s);const n={product_id:s,qty:1};this.$http.post(`${b}/cart`,{data:n}).then(d=>{x.fire({icon:"success",title:"加入購物車成功"}),this.loadingItems=this.loadingItems.filter(g=>g!==s)}).catch(d=>{alert(d.response.data.message)})},goProduct(s){this.$router.push(`/product/${s}`)}},mounted(){this.getProducts()}},V={class:"row"},T={class:"mt-4"},$={class:"table align-middle"},w=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),B={style:{width:"200px"}},N={key:0,class:"h5"},S={class:"h6"},z={class:"h5"},F={class:"btn-group btn-group-sm float-end"},U=["disabled","onClick"],j={key:0,class:"fas fa-spinner fa-pulse"},q=["disabled","onClick"],A={key:0,class:"fas fa-spinner fa-pulse"},D={class:"float-end"};function E(s,n,d,g,o,r){const f=h("VueLoading"),v=h("PaginationComponent");return i(),a(u,null,[_(f,{active:o.isLoading},null,8,["active"]),t("div",V,[t("div",T,[t("table",$,[w,t("tbody",null,[(i(!0),a(u,null,C(o.products,e=>(i(),a("tr",{key:e.id},[t("td",B,[t("div",{style:I([{height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${e.imageUrl})`}])},null,4)]),t("td",null,l(e.title),1),t("td",null,[e.origin_price===e.price?(i(),a("div",N,l(e.origin_price)+" 元 ",1)):(i(),a(u,{key:1},[t("del",S,"原價 "+l(e.origin_price)+" 元",1),t("div",z,"現在只要 "+l(e.price)+" 元",1)],64))]),t("td",null,[t("div",F,[t("button",{type:"button",class:"btn btn-outline-secondary",disabled:o.loadingItems.includes(e.id),onClick:y=>r.goProduct(e.id)},[o.loadingItems.includes(e.id)?(i(),a("i",j)):p("",!0),m(" 查看更多 ")],8,U),t("button",{type:"button",class:"btn btn-outline-danger",disabled:o.loadingItems.includes(e.id)||!e.is_enabled,onClick:y=>r.addToCart(e.id)},[o.loadingItems.includes(e.id)?(i(),a("i",A)):p("",!0),m(" 加到購物車 ")],8,q)])])]))),128))])]),t("div",D,[_(v,{pagination:o.pagination,onPageChange:r.getProducts},null,8,["pagination","onPageChange"])])])])],64)}const H=k(L,[["render",E]]);export{H as default};
