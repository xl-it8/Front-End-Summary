"use strict";(self["webpackChunkadmin"]=self["webpackChunkadmin"]||[]).push([[85],{3149:function(t,i,s){s.d(i,{Z:function(){return h}});s(7658);var e,n,o=s(588),a={data(){return{}},methods:{async onSubmit(t,i){this.id?(console.log(this.form),await(0,o.ht)(t,this.form),this.$mes()):(await(0,o.k4)(t,this.form),this.$mes()),this.$router.push({path:i})},async fetchId(t){return new Promise((async i=>{const s=await(0,o.qC)(t,this.id);this.form=s,i(s)}))},async findCategoryList(t,i=!0){const s=await(0,o.mY)(t,{isOnlyParent:i});if(this.tableData)this.tableData=s;else if(this.formFields)for(let e in this.formFields){const t=this.formFields[e];if(t.hasOwnProperty("options")&&!t.options){t.options=s;break}}},async remove(t,i){await(0,o.uu)(t,i),this.findCategoryList(this.listUrl,!1),this.$mes()}}},r=a,l=s(1001),m=(0,l.Z)(r,e,n,!1,null,null,null),h=m.exports},8597:function(t,i,s){s.r(i),s.d(i,{default:function(){return u}});var e=function(){var t=this,i=t._self._c;return i("div",{staticClass:"main-container"},[i("h3",[t._v(t._s(t.id?"编辑":"新建")+"物品分类")]),i("IForm",{attrs:{formFields:t.formFields,form:t.form},on:{onSubmit:t.submit}})],1)},n=[],o=s(5256),a=s(3149),r={props:["id"],data(){return{form:{name:"",icon:void 0},formFields:[{type:"input",label:"名称",value:"name",attrs:{placeholder:"请输入内容"}},{type:"upload",label:"图标",value:"icon",attrs:{placeholder:"请输入内容"},url:"http://localhost:803/items/upload"}]}},components:{IForm:o.Z},mixins:[a.Z],created(){this.id&&this.fetchId("items/list/"),this.findCategoryList("items/list")},methods:{submit(){const t=this.id?"items/edit":"items/create";this.onSubmit(t,"/items/list")}}},l=r,m=s(1001),h=(0,m.Z)(l,e,n,!1,null,null,null),u=h.exports}}]);
//# sourceMappingURL=85.4c77c774.js.map