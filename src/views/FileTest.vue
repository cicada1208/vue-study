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
    <v-card
      id="dragZone"
      width="150"
      color="grey lighten-3"
      class="text-center"
    >
      <v-icon large>mdi-cloud-upload-outline</v-icon>
      <br />
      <span>Drag images here</span>
    </v-card>

    <h2 class="mt-4">image display:</h2>
    <div id="displayZone"></div>
  </v-container>
</template>

<script>
export default {
  methods: {
    selectImages(e) {
      this.handleImages(e.target.files);
    },

    handleImages(files) {
      console.log('files:', files);
      let imageType = /image.*/;
      let displayZone = document.getElementById('displayZone');
      let list = document.createElement('ul');
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match(imageType)) continue;

        let li = document.createElement('li');
        list.appendChild(li);

        let img = document.createElement('img');
        img.src = window.URL.createObjectURL(files[i]);
        img.height = 60;
        img.onload = function() {
          window.URL.revokeObjectURL(this.src);
        };
        li.appendChild(img);

        let info = document.createElement('span');
        info.innerHTML = files[i].name + ': ' + files[i].size + ' bytes';
        li.appendChild(info);
      }
      displayZone.appendChild(list);
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
      this.handleImages(files);
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
