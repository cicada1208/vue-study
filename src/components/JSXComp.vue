<script>
export default {
  name: 'JSXComp',
  data: () => ({
    msg: 'jsx comp msg data',
  }),
  render() {
    return <p>{this.msg}</p>;
  },
  // render: function(h) {
  //   return <p>hello</p>;
  // },
};
</script>
