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
    dragenter(e) {
      e.target.style.opacity = 0.5;
      // e.target.classList.add('dragenter');
    },

    dragleave(e) {
      e.target.style.opacity = 1;
      // e.target.classList.remove('dragenter');
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
      let files = dt.files; // 若拖曳的項目非文件則為空
      console.log('files:', files);
      this.displayImages(files);
      this.downloadFirstFile(files?.[0]);
      this.handleDataTransferItems(dt.items);

      // DataTransfer.getData(format): 快捷地獲取拖曳內容
      // format: DataTransfer.items 中的 type 值，以此選擇要讀取的值
      let text = dt.getData('text/plain'); //  此方法為同步，此處可省略為 dt.getData('text')
      console.log('getData[text/plain]:', text);
    },

    selectImages(e) {
      this.displayImages(e.target.files);
    },

    displayImages(files) {
      if (files.length === 0) return;
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

    handleDataTransferItems(dtItems) {
      console.log('items:');
      // array-like 並不一定有 forEach，可透過 spread syntax 轉換為 array
      const items = [...dtItems];
      items.forEach(item => {
        // console.log(`kind:${item.kind}, type:${item.type}`);
        switch (item.kind) {
          case 'string':
            if (item.type.includes('text/plain')) {
              // 此方法為非同步
              item.getAsString(str => {
                // str 是存文本，於此處理
                console.log(`getAsString[text/plain]: ${str}`);
              });
            } else if (item.type.includes('text/html')) {
              item.getAsString(str => {
                // str 是富文本，於此處理
                console.log(`getAsString[text/html]: ${str}`);
              });
            } else if (item.type.includes('text/uri-list')) {
              item.getAsString(str => {
                // str 是 uri，於此處理
                console.log(`getAsString[text/uri-list]: ${str}`);
              });
            }
            break;
          case 'file':
            if (item.type.match(/image.*/)) {
              // file 是圖片，可上傳或其他處理
              let file = item.getAsFile(); // File object
              console.log(`getAsFile[image/*]:`, file);
            }
            break;
        }
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
