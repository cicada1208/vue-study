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
      <!-- <router-link> 默認會被渲染成 <a> 標籤。
      點擊 <router-link :to="..."> 等同調用 router.push(...) -->
      <router-link :to="'/user/' + $route.params.userName + '/profile'"
        >profile</router-link
      >
      |
      <router-link :to="'/user/' + $route.params.userName + '/note'"
        >note</router-link
      >
    </div>
    <!-- <router-view /> 路由匹配到的組件將渲染在這裡 -->
    children: <router-view />
  </div>
</template>

<script>
export default {
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
  // 因為兩個路由都渲染同個組件，復用顯得更加高效。
  // 不過，這也意味著組件的生命週期鉤子不會再被調用。
  // 若想對路由參數的變化作出響應，可使用 watch 或 beforeRouteUpdate。
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
    console.log('from:', from);
    console.log('to:', to);
    next();
  },
};
</script>
