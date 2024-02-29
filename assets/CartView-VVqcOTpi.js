import{S as c}from"./sweetalert2.all-jySR6WsC.js";import{_ as I,r as b,o as d,h as F,w,a as e,b as i,i as x,c as h,f as C,t as p,F as k,e as S,d as B,g as $,v as L}from"./index-9hlq6F06.js";const E={name:"",email:"",tel:"",address:""},O={props:{cart:{type:Object,default:()=>({})}},data(){return{form:{user:{...E},message:""}}},methods:{onFormSubmit(){this.$emit("submit-form",this.form,()=>{this.cleanFrom()})},cleanFrom(){this.$refs.form.resetForm()},isPhoneRule(o){return/^(09)[0-9]{8}$/.test(o)?!0:"需要正確的電話號碼"}}},T={class:"mb-3"},U=e("label",{for:"email",class:"form-label"},"Email",-1),q={class:"mb-3"},N=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),M={class:"mb-3"},j=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),P={class:"mb-3"},R=e("label",{for:"address",class:"form-label"},"收件人地址",-1),z={class:"mb-3"},D=e("label",{for:"message",class:"form-label"},"留言",-1),Q={class:"text-end"},A=["disabled"];function G(o,t,n,u,s,a){const f=b("VeeField"),_=b("ErrorMessage"),l=b("VeeForm");return d(),F(l,{ref:"form",class:"col-md-6",onSubmit:a.onFormSubmit},{default:w(({errors:m})=>{var v,y,V;return[e("div",T,[U,i(f,{id:"email",name:"Email",type:"email",class:x(["form-control",{"is-invalid":m.Email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:s.form.user.email,"onUpdate:modelValue":t[0]||(t[0]=r=>s.form.user.email=r)},null,8,["class","modelValue"]),i(_,{name:"Email",class:"invalid-feedback"})]),e("div",q,[N,i(f,{id:"name",name:"姓名",type:"text",class:x(["form-control",{"is-invalid":m.姓名}]),placeholder:"請輸入姓名",rules:"required|min:2|max:10",modelValue:s.form.user.name,"onUpdate:modelValue":t[1]||(t[1]=r=>s.form.user.name=r)},null,8,["class","modelValue"]),i(_,{name:"姓名",class:"invalid-feedback"})]),e("div",M,[j,i(f,{id:"tel",name:"電話",type:"text",class:x(["form-control",{"is-invalid":m.電話}]),placeholder:"請輸入電話",rules:a.isPhoneRule,modelValue:s.form.user.tel,"onUpdate:modelValue":t[2]||(t[2]=r=>s.form.user.tel=r),maxlength:"10"},null,8,["class","rules","modelValue"]),i(_,{name:"電話",class:"invalid-feedback"})]),e("div",P,[R,i(f,{id:"address",name:"地址",type:"text",class:x(["form-control",{"is-invalid":m.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:s.form.user.address,"onUpdate:modelValue":t[3]||(t[3]=r=>s.form.user.address=r)},null,8,["class","modelValue"]),i(_,{name:"地址",class:"invalid-feedback"})]),e("div",z,[D,i(f,{as:"textarea",id:"message",name:"message",class:"form-control",cols:"30",rows:"10",modelValue:s.form.message,"onUpdate:modelValue":t[4]||(t[4]=r=>s.form.message=r)},null,8,["modelValue"])]),e("div",Q,[(v=n.cart.carts)!=null&&v.length?(d(),h("button",{key:0,type:"submit",class:"btn btn-warning me-3",onClick:t[5]||(t[5]=(...r)=>a.cleanFrom&&a.cleanFrom(...r))}," 重新輸入 ")):C("",!0),e("button",{type:"submit",class:"btn btn-danger",disabled:!((y=n.cart.carts)!=null&&y.length)},p((V=n.cart.carts)!=null&&V.length?"送出訂單":"請先購物"),9,A)])]}),_:1},8,["onSubmit"])}const H=I(O,[["render",G]]),g="https://vue3-course-api.hexschool.io/v2/api/rayray-project",J={components:{OrderComponent:H},data(){return{cart:{},isLoading:!0,loadingItems:[]}},methods:{getCart(){this.$http.get(`${g}/cart`).then(o=>{this.cart=o.data.data,this.isLoading=!1}).catch(o=>{c.fire({title:o.response.data.message,text:"",icon:"error"})})},onOrderSubmit(o,t){this.isLoading=!0,this.$http.post(`${g}/order`,{data:o}).then(n=>{t&&t(),this.getCart(),c.fire({title:n.data.message,text:"",icon:"success"})}).catch(n=>{c.fire({title:n.response.data.message,text:"",icon:"error"})}).finally(()=>{this.loadingItems=this.loadingItems.filter(n=>n!=="createOrder")})},cartQtyChange(o,t,n=1){this.loadingItems.push(o);const u={product_id:t,qty:n};this.$http.put(`${g}/cart/${o}`,{data:u}).then(s=>{this.getCart()}).catch(s=>{c.fire({title:s.response.data.message,text:"",icon:"error"})}).finally(()=>{this.loadingItems=this.loadingItems.filter(s=>s!==o)})},cleanCart(){c.fire({title:"確定清空購物車?",text:"此動作將無法復原!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"確定",cancelButtonText:"取消"}).then(o=>{o.isConfirmed&&(this.isLoading=!0,this.$http.delete(`${g}/carts`).then(t=>{c.fire({title:"已清空購物車!",text:"",icon:"success"}),this.getCart(),this.loadingItems=[]}).catch(t=>{this.loadingItems=this.loadingItems.filter(n=>n!=="cleanCart"),c.fire({title:t.response.data.message,text:"",icon:"error"}),this.isLoading=!1}))})},removeToCart(o,t){c.fire({title:`確定移除此商品
「${t}」?`,text:"此動作將無法復原!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"確定",cancelButtonText:"取消"}).then(n=>{n.isConfirmed&&(this.loadingItems.push(o),this.$http.delete(`${g}/cart/${o}`).then(u=>{this.getCart()}).catch(u=>{c.fire({title:u.response.data.message,text:"",icon:"error"})}).finally(()=>{this.loadingItems=this.loadingItems.filter(u=>u!==o)}))})}},mounted(){this.getCart()},computed:{disableBtn(){var o;return!!(!((o=this.cart.carts)!=null&&o.length)||this.loadingItems.includes("createOrder"))}}},K={class:"row"},W=e("h1",null,"購物車",-1),X={class:"text-end"},Y=["disabled"],Z={class:"table align-middle"},ee=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",{style:{width:"150px"}},"數量/單位"),e("th",null,"單價")])],-1),te=["onClick"],se={key:0,class:"fas fa-spinner fa-pulse"},oe={key:1},le={key:0,class:"text-success"},ne={class:"input-group input-group-sm"},ae={class:"input-group mb-3"},re=["disabled","onUpdate:modelValue","onBlur"],ie={class:"input-group-text",id:"basic-addon2"},ce={class:"text-end"},de={key:0,class:"text-success"},ue=e("td",{colspan:"3",class:"text-end"},"總計",-1),me={class:"text-end"},he=e("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),fe={class:"text-end text-success"},_e={class:"my-5 row justify-content-center"};function pe(o,t,n,u,s,a){const f=b("VueLoading"),_=b("OrderComponent");return d(),h(k,null,[i(f,{active:s.isLoading},null,8,["active"]),e("div",K,[W,e("div",X,[e("button",{class:"btn btn-outline-danger",type:"button",disabled:a.disableBtn,onClick:t[0]||(t[0]=(...l)=>a.cleanCart&&a.cleanCart(...l))}," 清空購物車 ",8,Y)]),e("table",Z,[ee,e("tbody",null,[s.cart.carts?(d(!0),h(k,{key:0},S(s.cart.carts,l=>(d(),h("tr",{key:l.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:m=>a.removeToCart(l.id,l.product.title)},[s.loadingItems.includes(l.id)?(d(),h("i",se)):(d(),h("span",oe,"x"))],8,te)]),e("td",null,[B(p(l.product.title)+" ",1),l.final_total!=l.total?(d(),h("div",le," 已套用優惠券 ")):C("",!0)]),e("td",null,[e("div",ne,[e("div",ae,[$(e("input",{min:"1",type:"number",class:"form-control",disabled:s.loadingItems.includes(l.id),"onUpdate:modelValue":m=>l.qty=m,onBlur:m=>a.cartQtyChange(l.id,l.product_id,l.qty)},null,40,re),[[L,l.qty,void 0,{number:!0,lazy:!0}]]),e("span",ie,p(l.product.unit),1)])])]),e("td",ce,[l.final_total!=l.total?(d(),h("small",de,"折扣價：")):C("",!0),B(" "+p(l.final_total),1)])]))),128)):C("",!0)]),e("tfoot",null,[e("tr",null,[ue,e("td",me,p(s.cart.total),1)]),e("tr",null,[he,e("td",fe,p(s.cart.final_total),1)])])])]),e("div",_e,[i(_,{cart:s.cart,onSubmitForm:a.onOrderSubmit},null,8,["cart","onSubmitForm"])])],64)}const xe=I(J,[["render",pe]]);export{xe as default};