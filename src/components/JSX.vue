<script>
export default {
  name: 'JSX',

  data: () => ({
    msg: 'jsx comp msg data',
    user: { firstName: 'H', lastName: 'W' },
  }),

  methods: {
    onAlertMsg: function(event) {
      alert(event.target.value);
    },
  },

  render() {
    const inputAttrs = {
      type: 'email',
      placeholder: this.msg,
    };

    return (
      <input
        // placeholder={this.msg}
        onClick={this.onAlertMsg}
        style={{ color: 'red', fontSize: '14px' }}
        {...{ attrs: inputAttrs }}
      />
    );
  },
};
</script>
