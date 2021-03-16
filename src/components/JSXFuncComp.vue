<script>
// JSX functional component: 無狀態(沒有響應式數據)，也沒有實例(沒有this上下文)，
// 若該 component 只接受一些 prop，便適合實作 functional component，渲染開銷也低很多

const LoadingComp = () =>
  import(
    /* webpackChunkName: "loading-comp" */
    '@/components/LoadingComp.vue'
  );

import ErrorComp from '@/components/ErrorComp.vue';

export default ({ props }) => {
  if (props.option === '1') return <LoadingComp />;
  else return <ErrorComp />;
};
</script>
