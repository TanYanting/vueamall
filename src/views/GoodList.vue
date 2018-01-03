<!-- --------html-------- -->
<template>
  <div>
    <!-- 使用 NavHeader 组件 -->
    <nav-header></nav-header>
    <!-- 面包屑 -->
    <nav-bread>
      <span> Goods </span>
    </nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)" >
                <a href="javascript:void(0)" :class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <!-- 图片懒加载 -->
                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 遮罩 -->
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

    <nav-footer></nav-footer>

  </div>
</template>

<!-- ---------javascript--------- -->
<script>
//引入css文件
import './../assets/css/base.css'
import './../assets/css/product.css'
//@ 的定义在build/webpack.base.conf.js:26里面找，代表的是src 即跟目录（我的理解
//导入组建 不要和h5原有标签名冲突
//nav-header
import NavHeader from '@/components/NavHeader.vue'
//nav-footer
import NavFooter from '@/components/NavFooter.vue'
//nav-bread
import NavBread from '@/components/NavBread.vue'
//axios
import axios from 'axios'

//导出
export default{
  data(){
    return{
      goodsList:[],
      priceFilter:[
        {
          startPrice:"0.00",
          endPrice:"500.00"
        },
        {
          startPrice:"500.00",
          endPrice:"1000.00"
        },
        {
          startPrice:"1000.00",
          endPrice:"2000.00"
        }
      ],
      priceChecked:"all",
      filterBy: false,
      overLayFlag: false
    }
  },
  //ES写法，会转为key:value形式，同名
  components:{
    NavHeader,
    NavFooter,
    NavBread
  },
  mounted:function () {
    this.getGoodsList();
  },
  methods:{
    getGoodsList () {
      //要设置代理，实际访问localhost:8090下的/goods,因此要转发的localhost:3000下的/goods
      axios.get("/goods").then((response)=>{
        let res = response.data;
        if(res.status == '0'){
          this.goodsList = res.result.list;
        }else{
            this.goodsList = [];
        }
      })
    },
    setPriceFilter (index) {
      this.priceChecked = index;
      this.filterby = false;
      this.overLayFlag = false;
    },
    showFilterPop () {
      this.filterby = true;
      this.overLayFlag = true;
    },
    closePop () {
      this.filterby = false;
      this.overLayFlag = false;
    }
  }
}

</script>

<!-- ----css------ -->
<style>
</style>
