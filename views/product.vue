<template>
  <div v-if="product">
    <div class="product">
      <div class="product-image">
        <img :src="product.image">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-cost">￥ {{ product.cost }}</div>
        <div class="product-add-cart" @click="handleAddCart">加入购物车</div>
      </div>
      <div class="product-desc">
        <h2>产品介绍</h2>
        <img v-for="n in 10"
             :src="'http://ordfm6aah.bkt.clouddn.com/shop/' + n + '.jpeg'">
      </div>
    </div>
  </div>
</template>

<script>
  // 导入本地数据用作匹配，真实场景不需要
  import product_data from '../product.js'

  export default {
    data () {
      return {
        // 获取路由中的参数
        id: parseInt(this.$route.params.id),
        product: null
      }
    },
    methods: {
      getProduct () {
        // 真实环境用 AJax 获取，这里异步模拟
        setTimeout(() => {
          this.product = product_data.find(item => item.id === this.id)
        }, 500)
      },
      handleAddCart () {
        this.$store.commit('addCart', this.id)
      }
    },
    mounted () {
      this.getProduct()
    }
  }
</script>

<style scoped>
  .product {
    overflow: hidden;
    margin: 32px;
    padding: 32px;
    border: 1px solid #dddee1;
    border-radius: 10px;
    background: #fff;
  }

  .product-image {
    float: left;
    width: 50%;
    height: 550px;
    text-align: center;
  }

  .product-image img {
    height: 100%;
  }

  .product-info {
    float: left;
    width: 50%;
    height: 150px;
    padding: 150px 0 250px;
    text-align: center;
  }

  .product-cost {
    margin: 8px 0;
    color: #f2352e;
  }

  .product-add-cart {
    display: inline-block;
    margin: 8px 0;
    padding: 8px 64px;
    border-radius: 4px;
    color: #fff;
    background: #2d8cf0;
    cursor: pointer;
  }

  .product-desc {
    margin: 32px;
    padding: 32px;
    border: 1px solid #dddee1;
    border-radius: 10px;
    text-align: center;
    background: #fff;
  }

  .product-desc img {
    display: block;
    width: 50%;
    padding: 32px;
    margin: 32px auto;
    border-bottom: 1px solid #dddee1;
  }
</style>