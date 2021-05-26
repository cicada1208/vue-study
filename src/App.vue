<template>
  <!-- v-app 組件是應用程序的根節點，直接替換默認的 vue 入口 <div id="app">。 -->
  <v-app>
    <!--
      v-app-bar 賦予 app prop, vuetify 知道它是佈局的一部分。
      v-main 獲取我們的 bar 的註冊高度，並從其可用內容區域中移除相應大小的空間。
      例如 64px 的空間從 v-main 的容器頂部移除。
    -->
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div id="nav">
        <template v-for="(link, idx) in links">
          <router-link :to="link.path" :key="idx">{{ link.text }}</router-link>
          {{ idx !== links.length - 1 ? '|' : '' }}
        </template>
      </div>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- v-main 組件替換 main HTML 元素和您應用程序的根節點內容的語義替代。 -->
    <v-main>
      <!-- <router-view> 是動態組件，可用 <transition> 組件添加過渡效果 -->
      <transition name="slide-fade" mode="out-in">
        <!-- <keep-alive> -->
        <router-view />
        <!-- </keep-alive> -->
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    links: [
      {
        path: '/',
        text: 'Home',
      },
      {
        path: '/vue.core',
        text: 'VueCore',
      },
      {
        path: '/user/cicada/post/123?search=pig&type=small',
        text: 'Router',
      },
      {
        path: '/user/plumes/post/456',
        text: 'Router2',
      },
      {
        path: '/vuex',
        text: 'Vuex',
      },
      {
        path: '/api.query',
        text: 'ApiQuery',
      },
      {
        path: '/vuetify',
        text: 'Vuetify',
      },
    ],
  }),
};
</script>

<style lang="scss">
@import '@/styles/transition.module.scss';

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
