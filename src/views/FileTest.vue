<template>
  <v-container fluid>
    <h2>file input:</h2>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      @change="selectImages($event)"
      style="display:none"
    />
    <v-btn @click="$refs.fileInput.click()">Select images</v-btn>

    <h2 class="mt-4">drag file:</h2>
    <v-card id="dragZone" width="300" height="200"></v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    selectImages(e) {
      console.log('files:', e.target.files);
    },

    dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    },

    dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    },

    drop(e) {
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = dt.files;
      console.log('files:', files);
    }
  },

  mounted() {
    let dragZone = document.getElementById('dragZone');
    dragZone.addEventListener('dragenter', this.dragenter, false);
    dragZone.addEventListener('dragover', this.dragover, false);
    dragZone.addEventListener('drop', this.drop, false);
  }
};
</script>
