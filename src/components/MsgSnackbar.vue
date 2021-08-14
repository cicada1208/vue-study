<template>
  <!-- or using @input="visibleChange" -->
  <v-snackbar
    :value="visible"
    :color="colorDisplay"
    :timeout="timeout"
    centered
    @input="$emit('input', $event)"
  >
    <span class="text-break">{{ msgDisplay }}</span>
    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="$emit('input', false)">
        mdi-close-circle
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'MsgSnackbar',
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    msgType: {
      type: [Boolean, String],
      default: false,
      //required: true,
      validator: function(value) {
        return (
          [true, false, 'success', 'error', 'warning', 'info'].indexOf(
            value
          ) !== -1
        );
      }
    },
    msg: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 5000
    }
  },
  computed: {
    msgDisplay() {
      let result = this.msg;
      if (!this.msg) {
        if (!this.msgType || this.msgType === 'error') result = '處理失敗！';
        else result = '處理成功。';
      }
      return result;
    },
    colorDisplay() {
      let result = this.msgType;
      if (!this.msgType) result = 'error';
      else if (this.msgType === true) result = 'success';
      return result;
    }
  },
  methods: {
    visibleChange(visible) {
      console.log('visible:', visible);
      this.$emit('input', visible);
    }
  }
};
</script>
