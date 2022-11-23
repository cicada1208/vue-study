<template>
  <v-container fluid>
    <h2>file input:</h2>
    <!-- accept: 除了 MIME type 也可為副檔名 -->
    <!-- accept=".jpg, .png"-->
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
      this.displayImages(e.target.files);
    },

    displayImages(files) {
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

    downloadFirstFile(file) {
      if (!file) return;
      let blobURL = URL.createObjectURL(file);
      let a = document.createElement('a');
      a.href = blobURL;
      a.download = file.name;
      a.click();
      // a.style.display = 'none';
      document.body.appendChild(a);
      window.URL.revokeObjectURL(blobURL);
    },

    dragenter(e) {
      e.target.classList.add('dragenter');
    },

    dragleave(e) {
      e.target.classList.remove('dragenter');
    },

    dragover(e) {
      // prevent default to allow drop
      e.preventDefault();
    },

    drop(e) {
      // prevent default action (open as link for some elements)
      e.preventDefault();

      e.target.classList.remove('dragenter');
      let dt = e.dataTransfer;
      let files = dt.files;
      console.log('files:', files);
      this.displayImages(files);
      this.downloadFirstFile(files?.[0]);

      console.log('items:');
      const items = [...dt.items]; // array-like 並不一定有 forEach，可透過 spread syntax 轉換為 array
      items.forEach(item => {
        console.log(`kind:${item.kind}, type:${item.type}`);
        item.getAsString(str => console.log(`getAsString:${str}`));
      });
    }
  },

  mounted() {
    let dragZone = document.getElementById('dragZone');
    dragZone.addEventListener('dragover', this.dragover);
    dragZone.addEventListener('dragenter', this.dragenter);
    dragZone.addEventListener('dragleave', this.dragleave);
    dragZone.addEventListener('drop', this.drop);
  }
};
</script>

<style lang="scss" scoped>
#dragZone.dragenter {
  opacity: 0.5;
}
</style>
