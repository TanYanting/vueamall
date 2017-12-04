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
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/1.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">999</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/2.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">1000</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/3.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">500</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/4.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">2499</div>
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

//导出
export default{
  data(){
    return{
      msg:'hello vue'
    }
  },
  //ES写法，会转为key:value形式，同名
  components:{
    NavHeader,
    NavFooter,
    NavBread
  }
}

</script>

<!-- ----css------ -->
<style>
</style>
