<template>
  <div>
    <div class="header">
      <router-link to="/list" class="header-title">
        电商网站示例
      </router-link>
      <div class="header-menu">
        <router-link to="/cart" class="header-menu-cart">
          购物车
          <span v-if="cartList.length">{{ cartList.length }}</span>
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    computed: {
      cartList () {
        return this.$store.state.cartList
      }
    },
    mounted () {
      // 初始化，获取本地数据
      this.$store.dispatch('getCartListFromLocal')
    },
    updated () {
      // 写入本地数据库
      this.$store.dispatch('storeCartListToLocal')
    },
    // beforeDestroy () {}
  }
</script>