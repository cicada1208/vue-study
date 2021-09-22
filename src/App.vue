<template>
  <!-- v-app 組件是應用程序的根節點，直接替換默認的 vue 入口 <div id="app">。 -->
  <v-app>
    <!--
      v-app-bar 賦予 app prop, vuetify 知道它是佈局的一部分。
      v-main 獲取我們的 bar 的註冊高度，並從其可用內容區域中移除相應大小的空間。
      例如 64px 的空間從 v-main 的容器頂部移除。
    -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>VUE STUDY</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <!-- <div id="nav">
        <template v-for="(link, idx) in links">
          <router-link :to="link.path" :key="idx">{{ link.text }}</router-link>
          {{ idx !== links.length - 1 ? '|' : '' }}
        </template>
      </div> -->

      <!-- <div id="nav">
        <v-btn v-for="(link, idx) in links" :key="idx" block class="mb-4">
          <router-link :to="link.path">{{ link.text }}</router-link>
        </v-btn>
      </div> -->

      <v-list nav dense>
        <v-list-item-group active-class="primary--text">
          <v-list-item v-for="(link, idx) in links" :to="link.path" :key="idx">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ link.text }}
              <!-- <router-link :to="link.path">{{ link.text }}</router-link> -->
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- v-main 組件替換 main HTML 元素和您應用程序的根節點內容的語義替代。 -->
    <v-main>
      <!-- <router-view> 是動態組件，可用 <transition> 組件添加過渡效果。 -->
      <transition name="slide-fade" mode="out-in">
        <!-- <keep-alive> -->
        <router-view />
        <!-- </keep-alive> -->
      </transition>

      <!-- <v-fade-transition>
        <router-view />
      </v-fade-transition> -->
    </v-main>

    <!-- 滾動指令 $vuetify.goTo:
    target: 可以是從頁面頂部的像素偏移，也可是 css 選擇器，或是元素引用 this.$refs.xxx。 -->
    <v-btn
      @click="$vuetify.goTo(target, options)"
      fixed
      bottom
      right
      fab
      small
      color="primary"
      style="opacity:70%"
    >
      <v-icon>
        mdi-chevron-up
      </v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: null,

    links: [
      {
        path: '/',
        text: 'Home',
        icon: 'mdi-home'
      },
      {
        path: '/vue.core',
        text: 'VueCore',
        icon: 'mdi-vuejs'
      },
      {
        path: '/user/cicada/post/123?search=pig&type=small',
        text: 'VueRouter',
        icon: 'mdi-router'
      },
      {
        path: '/user/plumes/post/456',
        text: 'VueRouter2',
        icon: 'mdi-router'
      },
      {
        path: '/vuex',
        text: 'Vuex',
        icon: 'mdi-database'
      },
      {
        path: '/api.query',
        text: 'ApiQuery',
        icon: 'mdi-database-search'
      },
      {
        path: '/vuetify',
        text: 'Vuetify',
        icon: 'mdi-vuetify'
      },
      {
        path: '/css.test',
        text: 'CssTest',
        icon: 'mdi-language-css3'
      }
    ]
  }),

  computed: {
    target() {
      const value = -9999;
      if (!isNaN(value)) return Number(value);
      else return value;
    },

    options() {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      };
    }
  }
};
</script>

<style lang="scss">
// @import: with the ability to import Sass and CSS stylesheets, providing access to mixins, functions, and variables and combining multiple stylesheets' CSS together.
// @import 將會棄用，改使用 @use，於 vue.config.js 導入
// @import '@/styles/main.scss';

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #4b4b4b;

    &.router-link-exact-active {
      color: #b9b7b7;
    }
  }
}
</style>
