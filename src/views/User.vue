<template>
  <div>
    user name: {{ $route.params.userName }} <br />
    post id: {{ $route.params.postId }} <br />
    query.search: {{ $route.query.search }} <br />
    query.type: {{ $route.query.type }}
    <div id="nav">
      <router-link :to="'/user/' + $route.params.userName + '/profile'"
        >profile</router-link
      >
      |
      <router-link :to="'/user/' + $route.params.userName + '/note'"
        >note</router-link
      >
    </div>
    children: <router-view />
  </div>
</template>

<script>
export default {
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
