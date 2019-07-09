<template>
  <div class="product">
    <router-link
      :to="'/product/' + info.id"
      class="product-main">
      <img :src="info.image">
      <h4>{{ info.name }}</h4>
      <div class="product-color"
           :style="{ background: colors[info.color] }">
      </div>
      <div class="product-cost">￥ {{ info.cost }}</div>
      <div class="product-add-cart"
           @click.prevent="handleCart">
        加入购物车
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'product',
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        colors: {
          '白色': '#fff',
          '金色': '#dac272',
          '蓝色': '#233472',
          '红色': '#f2352e'
        }
      }
    },
    methods: {
      handleCart () {
        this.$store.commit('addCart', this.info.id)
      }
    }
  }
</script>

<style scoped lang="less">
  @prefix-cls: product;

  .@{prefix-cls} {
    float: left;
    width: 25%;

    &-main {
      position: relative;
      display: block;
      overflow: hidden;
      margin: 16px;
      padding: 16px;
      border: 1px solid #dddee1;
      border-radius: 6px;
      text-align: center;
      background: #fff;

      img {
        width: 100%;
      }
    }

    & h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #222;
    }

    &:hover h4 {
      color: #0070c9;
    }

    &-color {
      width: 16px;
      height: 16px;
      margin: 6px auto;
      border: 1px solid #dddee1;
      border-radius: 50%;
    }

    &-cost {
      margin-top: 6px;
      color: #de4037;
    }

    &-add-cart {
      position: absolute;
      display: none;
      top: 5px;
      right: 5px;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 12px;
      cursor: pointer;
      color: #fff;
      background: #2d8cf0;
    }

    &:hover .product-add-cart {
      display: block;
    }
  }
</style>