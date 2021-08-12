<template>
  <v-snackbar v-model="visible" :color="colorDisplay" timeout="3000" centered>
    <span>{{ msgDisplay }}</span>
    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="snackbar = !snackbar">
        mdi-close-circle
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'MsgSnackbar',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    msgType: {
      type: [Boolean, String],
      default: undefined
      // success error warnning info
    },
    msg: {
      type: String,
      default: ''
    }
  },
  computed: {
    msgDisplay() {
      let result = this.msg;
      if (!this.msg) {
        if (!this.msgType) result = '處理失敗！';
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
  }
};
</script>
