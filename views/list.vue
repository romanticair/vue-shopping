<template>
  <div v-show="list.length">
    <div class="list-control">
      <!--过滤-->
      <div class="list-control-filter">
        <span>品牌：</span>
        <span class="list-control-filter-item"
              v-for="item in brands"
              :class="{ on: item === filterBrand }"
              @click="handleFilterBrand(item)">{{ item }}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span class="list-control-filter-item"
              v-for="item in colors"
              :class="{ on: filterColors.includes(item) }"
              @click="handleFilterColors(item)">{{ item }}</span>

        <!--替换成支持多选-->
        <!--:class="{ on: item === filterColor }"-->
        <!--@click="handleFilterColor(item)">{{ item }}</span>-->
      </div>

      <!--排序-->
      <div class="list-control-order">
        <span>排序：</span>
        <span class="list-control-order-item"
              :class="{ on: order === '' }"
              @click="handleOrderDefault">默认</span>
        <span class="list-control-order-item"
              :class="{ on: order === 'sales' }"
              @click="handleOrderSales">
          销量
          <template v-if="order === 'sales'">↓</template>
        </span>
        <span class="list-control-order-item"
              :class="{ on: order === 'cost' }"
              @click="handleOrderCost">
          价格
          <template v-if="order === 'cost-asc'">↑</template>
          <template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>

    <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
    <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
  </div>
</template>
<script>
  import Product from '../components/product.vue'

  export default {
    components: { Product },
    data () {
      return {
        // 排序依据 sales, cost-desc, cost-asc
        order: '',
        filterBrand: '',
        // filterColor: ''
        // 支持多选
        filterColors: []
      }
    },
    computed: {
      list () {
        // 从 Vuex 获取商品列表数据
        return this.$store.state.productList
      },
      filteredAndOrderedList () {
        // copy
        let list = [...this.list]

        // 按品牌过滤
        if (this.filterBrand !== '') {
          list = list.filter(item => item.brand === this.filterBrand)
        }

        // 按颜色过滤
        /*
        if (this.filterColor !== '') {
          list = list.filter(item => item.color === this.filterColor)
        }
        */

        // 支持多选
        if (this.filterColors.length) {
          list = list.filter(item => this.filterColors.includes(item.color))
        }

        // 排序
        if (this.order !== '') {
          if (this.order === 'sales') {
            list = list.sort((a, b) => b.sales - a.sales)
          } else if (this.order === 'cost-desc') {
            list = list.sort((a, b) => b.cost - a.cost)
          } else if (this.order === 'cost-asc') {
            list = list.sort((a, b) => a.cost - b.cost)
          }
        }

        return list
      },
      brands () {
        return this.$store.getters.brands
      },
      colors () {
        return this.$store.getters.colors
      },
    },
    methods: {
      handleOrderDefault () {
        this.order = ''
      },
      handleOrderSales () {
        this.order = 'sales'
      },
      handleOrderCost () {
        if (this.order === 'cost-desc') {
          this.order = 'cost-asc'
        } else {
          this.order = 'cost-desc'
        }
      },
      handleFilterBrand (brand) {
        // toggle
        if (this.filterBrand === brand) {
          this.filterBrand = ''
        } else {
          this.filterBrand = brand
        }
      },
      /*
      handleFilterColor (color) {
        // toggle
        if (this.filterColor === color) {
          this.filterColor = ''
        } else {
          this.filterColor = color
        }
      },*/
      // 替换成支持多选
      handleFilterColors (color) {
        if (this.filterColors.includes(color)) {
          this.filterColors.splice(this.filterColors.indexOf(color), 1)
        } else {
          this.filterColors.push(color)
        }
      }
    },
    mounted () {
      // 初始化，请求数据
      this.$store.dispatch('getProductList')
    }
  }
</script>
<style scoped>
  .list-control {
    margin: 16px;
    padding: 16px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  }

  .list-control-filter {
    margin-bottom: 16px;
  }

  .list-control-filter-item,
  .list-control-order-item {
    display: inline-block;
    padding: 2px 6px;
    margin-right: 6px;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    cursor: pointer;
  }

  .list-control-filter-item.on,
  .list-control-order-item.on {
    border-color: #f2352e;
    color: #fff;
    background: #f2352e;
  }

  .product-not-found {
    padding: 32px;
    text-align: center;
  }
</style>