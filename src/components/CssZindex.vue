<template>
  <v-container>
    <div class="relative" id="z" style="height:150px">
      <div class="item success absolute"></div>
      <div class="item error absolute"></div>
      <div class="item info absolute"></div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.item {
  width: 100px;
  height: 100px;
}

#z {
  .item:nth-child(1) {
    left: 10px;
    z-index: 1;
  }
  .item:nth-child(2) {
    top: 10px;
    left: 20px;
    z-index: 2;
  }
  .item:nth-child(3) {
    top: 20px;
    left: 30px;
    z-index: 3;
  }
}
</style>
