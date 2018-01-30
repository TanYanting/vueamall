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
          <a href="javascript:void(0)" class="price" @click="sortGoods">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
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
              <ul >
                <li v-for="item in goodsList">
                  <div class="pic">
                    <!-- 图片懒加载 -->
                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <img src="./../assets/loading-bubbles.svg" v-show="loading">
              </div>
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
  data(){ //数据
    return{
      goodsList: [],//商品列表
      sortFlag: true,//排序 1true升序-1false降序
      page: 1,//当前页
      pageSize: 8,//页面容量
      busy:true,//插件vue-infinie-scroll,是否可以使用（发起请求,false:不禁用true禁用
      priceFilter:[
        {
          startPrice:"0.00",
          endPrice:"100.00"
        },
        {
          startPrice:"100.00",
          endPrice:"500.00"
        },
        {
          startPrice:"500.00",
          endPrice:"1000.00"
        },
        {
          startPrice:"1000.00",
          endPrice:"5000.00"
        }
      ],
      priceChecked:"all",
      filterBy: false,
      overLayFlag: false
    }
  },
  components:{ //组件
    NavHeader, //ES6写法，会转为key:value形式，同名
    NavFooter,
    NavBread
  },
  mounted:function () {
    this.getGoodsList(); //获取商品列表
  },
  methods:{
    getGoodsList (flag) { //获取商品列表,flag区分第一次和第二页及以上需要累加的数据
      let param ={ //参数 传递给后台
        "page": this.page,
        "pageSize": this.pageSize,
        "sort": this.sortFlag?1:-1,
        "priceLevel":this.priceChecked
      };
      this.loading = true;//显示加载中vue-infinite-scroll
      //要设置代理，实际访问localhost:8090下的/goods,因此要转发的localhost:3000下的/goods
      axios.get("/goods",{params:param}).then((response)=>{
        let res = response.data;
        if(res.status == '0'){
          if(flag){
            this.goodsList = this.goodsList.concat(res.result.list);
            if(res.result.count == 0){//滚动加载的开关
              this.busy = true;
            }else{
              this.busy = false;
            }
          }else{
            this.goodsList = res.result.list;
            this.busy = false;
          }
          // this.goodsList = this.goodsList.concat(res.result.list);
        }else{
            this.goodsList = [];
        }
        this.loading = false;//隐藏加载中vue-infinite-scroll
      })
    },
    sortGoods () { //排序
      this.sortFlag = !this.sortFlag; //toggle正/降序
      this.page = 1; //分页从1开始
      this.getGoodsList(); //刷新列表
    },
    setPriceFilter (index) {
      this.priceChecked = index;
      this.filterby = false;
      this.overLayFlag = false;
      this.page = 1;
      this.getGoodsList();
    },
    showFilterPop () {
      this.filterby = true;
      this.overLayFlag = true;
    },
    closePop () {
      this.filterby = false;
      this.overLayFlag = false;
    },
    loadMore () { //配合插件 vue-infinite-scroll，应该是根据鼠标滚动的时候发请求，但是鼠标滚动太快，会发起很多次请求，因此设置setTimeout，当一次请求接受才可以发起下一次请求
      this.busy = true;
      setTimeout( () => {
        this.page++;//页码++
        this.getGoodsList(true);
      },500);
    },
    addCart (pid) { //加入购物车
      axios.post("/goods/addCart",{productId:pid}).then((res) => {
        let result = res.data;
        if(result.status == 0){
          alert("已加入购物车！");
        }else{
          alert(result.msg);
        }
      });

    }
  }
}

</script>

<!-- ----css------ -->
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
