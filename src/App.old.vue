<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/vue.core">VueCore</router-link> |
      <router-link to="/user/cicada/post/123?search=pig&type=small"
        >Router</router-link
      >
      | <router-link to="/user/plumes/post/456">Router2</router-link> |
      <router-link to="/vuex">Vuex</router-link>
      <router-link to="/api.query">ApiQuery</router-link> |
    </div>
    <!-- <router-view> 是動態組件，可用 <transition> 組件添加過渡效果 -->
    <transition name="slide-fade" mode="out-in">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<style lang="scss">
@import '@/css/transition.module.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
