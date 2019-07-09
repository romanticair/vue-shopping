import Vue from 'vue'
import VueRouter from 'vue-router'
import Routers from './router.js'
import Vuex from 'vuex'
import App from './app.vue'
import './style.css'

import product_data from './product.js'

Vue.use(VueRouter)
Vue.use(Vuex)

// 路由配置
const RouterConfig = {
  // 使用 H5 的 history 路由模式
  mode: 'history',
  routes: Routers
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// 数组去重
function getFilterArray (array) {
  const res = []
  const json = {}
  for (let i = 0, len = array.length; i < len; i++) {
    const data = array[i]
    if (!json[data]) {
      res.push(data)
      json[data] = 1
    }
  }

  return res
}

// 本地数据键名
const KEY = 'shopping'

 // 数据状态配置
const store = new Vuex.Store({
  state: {
    // 商品列表
    productList: [],
    // 购物车列表
    cartList: []
  },
  getters: {
    brands: state => {
      const brands = state.productList.map(item => item.brand)
      return getFilterArray(brands)
    },
    colors: state => {
      const colors = state.productList.map(item => item.color)
      return getFilterArray(colors)
    }
  },
  mutations: {
    // 添加商品列表
    setProductList (state, data) {
      state.productList = data
    },
    // 加入购物车
    addCart (state, id) {
      const isAdded = state.cartList.find(item => item.id === id)
      if (isAdded) {
        isAdded.count++
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }

      // 实时同步更新
      // this.commit('updateLocalCartList')
    },
    editCartCount (state, payItem) {
      const product = state.cartList.find(item => item.id === payItem.id)
      product.count += payItem.count
      // this.commit('updateLocalCartList')
    },
    deleteCart (state, id) {
      const index = state.cartList.findIndex(item => item.id === id)
      state.cartList.splice(index, 1)
      // this.commit('updateLocalCartList')
    },
    emptyCart (state) {
      // 清空购物车
      state.cartList = []
      // this.commit('updateLocalCartList')
    },
    // 添加购物车列表
    setCartList (state, array) {
      state.cartList = array
      // this.commit('updateLocalCartList')
    },
    // 更新本地数据购物车列表
    updateLocalCartList (state) {
      const carts = [...state.cartList]
      try {
        localStorage.setItem(KEY, JSON.stringify(carts))
      } catch (e) {
        console.log(e)
      }
    }
  },
  actions: {
    // 请求商品列表
    getProductList (context) {
      // 真实环境通过 Ajax 获取，这里用异步模拟
      setTimeout(() => {
        context.commit('setProductList', product_data)
      }, 500)
    },
    buy (context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('结算完成')
          // 清空
          context.commit('emptyCart')
          resolve()
        }, 500)
      })
    },
    // 获取本地购物车数据
    getCartListFromLocal (context) {
      let data = JSON.parse(localStorage.getItem(KEY))
      if (Array.isArray(data)) {
        context.commit('setCartList', data)
      } else {
        context.commit('setCartList', [])
      }
    },
    // 将购物车列表存储入本地数据
    storeCartListToLocal (context) {
      context.commit('updateLocalCartList')
    }
  }
})

const app = new Vue({
  el: '#app',
  router: router,
  store: store,
  render (h) {
    return h(App)
  }
})
