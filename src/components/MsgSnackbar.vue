<template>
  <!-- or using @input="visibleChange" -->
  <v-snackbar
    :value="msgShow"
    :color="msgColor"
    :timeout="timeout"
    @input="$emit('input', $event)"
    :centered="centered"
    :top="top"
    :bottom="bottom"
  >
    <span class="text-break">{{ msgText }}</span>
    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="$emit('input', false)">
        mdi-close-circle
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'msg-snackbar',
  model: {
    prop: 'msgShow',
    event: 'input'
  },
  props: {
    msgShow: {
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
    },
    centered: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    msgText() {
      let result = this.msg;
      if (!this.msg) {
        if (!this.msgType || this.msgType === 'error') result = '處理失敗！';
        else result = '處理成功。';
      }
      return result;
    },
    msgColor() {
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
