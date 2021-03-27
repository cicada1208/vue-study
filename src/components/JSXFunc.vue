<script>
// JSX functional component: 無狀態(沒有響應式數據)，也沒有實例(沒有this上下文)，
// 若該 component 只接受一些 prop，便適合實作 functional component，渲染開銷也低很多

const Loading = () =>
  import(
    /* webpackChunkName: "loading" */
    '@/components/Loading.vue'
  );

import Error from '@/components/Error.vue';

export default ({ props }) => {
  if (props.option === '1') return <Loading />;
  else return <Error />;
};
</script>
