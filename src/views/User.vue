<template>
  <div>
    <p>route.path: {{ $route.path }}</p>
    <p>params.userName: {{ $route.params.userName }}</p>
    <p>params.postId: {{ $route.params.postId }}</p>
    <p>query.search: {{ $route.query.search }}</p>
    <p>query.type: {{ $route.query.type }}</p>
    <button @click="onGoBack">go back</button>
    <button @click="onGoUserPage">go user page</button>
    <div id="nav">
      <!--
        <router-link> 默認會被渲染成 <a> 標籤。
        點擊 <router-link :to="..."> 等同調用 router.push(...)
      -->
      <template v-for="(link, idx) in links">
        <router-link
          :to="'/user/' + $route.params.userName + '/' + link"
          :key="link"
          >{{ link }}</router-link
        >
        {{ idx !== links.length - 1 ? '|' : '' }}
      </template>
    </div>
    <!-- <router-view /> 路由匹配到的組件將渲染在這裡 -->
    <!-- 若未設置 name，默認為 default -->
    <p>children default:</p>
    <router-view />
    <!-- 命名視圖: 有設置 name -->
    <p>children profile:</p>
    <router-view name="profile" />
    <p>children note:</p>
    <router-view name="note" />
  </div>
</template>

<script>
export default {
  data: () => ({
    links: ['profile', 'note', 'all'],
  }),

  methods: {
    onGoBack() {
      // router.go(1) 等同 window.history.forward()
      // router.go(-1) 等同 window.history.back()
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
    onGoUserPage() {
      // router.push(location, onComplete?, onAbort?): 導航到其他 URL，向 history 添加新記錄。
      // path、params 無法同時存在。
      // this.$router.push({ path: '/user/panda/post/999' });
      this.$router.push(
        {
          name: 'UserHome',
          params: { userName: 'panda', postId: '999' },
          query: { search: 'dog', type: 'big' },
        },
        () => console.log('complete'), // 導航成功完成後執行(在所有的異步鉤子被解析之後)
        () => console.log('abort') // 終止後執行(導航到相同的路由、或在當前導航完成之前導航到另一個不同的路由)
      );
    },
  },

  // 從 /user/cicada 導航到 /user/plumes，原來的組件實例會被復用。
  // 因為兩個路由 /user/:userName 都渲染同個組件 UserHome，復用顯得更加高效。
  // 不過，這也意味著組件的生命週期鉤子不會再被調用。
  // params or query changes won't trigger enter/leave navigation guards.
  // 但若想對路由參數的變化作出響應，可使用 watch 或 beforeRouteUpdate。
  // watch: {
  //   $route(to, from) {
  //     // 對路由變化作出響應...
  //     console.log('from:', from);
  //     console.log('to:', to);
  //   },
  // },

  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
    // 可以訪問組件實例 this
    console.log('from:', from);
    console.log('to:', to);
    next(); // resolve 這個鉤子，進行下一個鉤子
    // next(false); // 中斷當前導航，URL 重置到 from 路由對應的地址
    // next('/'); // next({ name: 'VueCore' }); // 跳轉到一個不同的地址
  },

  beforeRouteLeave(to, from, next) {
    // 通常用來禁止用戶在還未保存修改前突然離開
    const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
    );
    if (answer) next();
    else next(false);
  },
};
</script>
