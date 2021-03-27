<template>
  <!-- 當使用通配符時，$route.params 內會自動添加 pathMatch 參數，
  它包含了 URL 通過通配符被匹配的部分。 -->
  <div>404 Not found: {{ this.$route.params.pathMatch }}</div>
</template>
