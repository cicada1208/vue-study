<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link> 默認會被渲染成 <a> 標籤 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/study">Study</router-link>
    </div>
    <!-- <router-view /> 路由匹配到的組件將渲染在這裡 -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
