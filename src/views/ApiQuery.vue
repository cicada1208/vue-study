<template>
  <v-container fluid>
    <loading-dialog :loading="albumRst.loading" />

    <div v-if="albumRst.error">
      {{ albumRst.error }}
    </div>

    <div v-for="(album, index) in albumRst.content.results" :key="index">
      <div class="album">
        <img
          class="album-img"
          :src="album.artworkUrl100"
          @click="viewAlbum(album.collectionViewUrl)"
        />
        <div>
          <p>{{ album.artistName }}</p>
          <p>{{ album.collectionName }}</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import apiUtil from '../libs/api.util';

export default {
  name: 'ApiQuery',

  components: {
    LoadingDialog: () =>
      import(
        /* webpackChunkName: "loading.dialog" */
        '@/components/LoadingDialog.vue'
      ),
  },

  data() {
    return {
      albumRst: { loading: false, content: {}, error: '' },
    };
  },

  methods: {
    async fetchAlbum() {
      // this.error = this.content = null;
      // this.loading = true;
      const url = 'https://itunes.apple.com/search?term=twice&limit=150';
      // // const cb = (err, data) => {
      // //   this.loading = false;
      // //   if (err) this.error = err.toString();
      // //   else this.content = data.results;
      // // };
      // // apiUtil.axiosCb({ cb, url, method: 'GET' });
      // const data = await apiUtil.axiosPs({ url, method: 'GET' });
      // this.content = data.results;
      // this.loading = false;
      apiUtil.axiosRs(this.albumRst, { url, method: 'GET' });
    },
    viewAlbum(link) {
      window.open(link);
    },
  },

  // created: 完成 data observer、property 和方法運算、watch/event事件回調，
  // 然而，掛載階段還沒開始，$el property 尚不可用。
  created() {
    // 組件創建完後獲取數據
    this.fetchAlbum();
  },

  // watch: 一個對象，鍵是需要觀察的表達式，若需觀察 data property e.f 鍵可為 'e.f'
  watch: {
    // 如果路由有變化，會再次執行該方法 fetchAlbum
    $route: 'fetchAlbum',
    // 如果 data property loading 有變化，會再次執行該方法
    'albumRst.loading': function(newVal, oldVal) {
      console.log('albumRst.loading new: %s, old: %s', newVal, oldVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.album {
  display: inline-flex;
  margin: 25px;
  width: 100%;
}

.album-img {
  cursor: pointer;
  margin-right: 10px;
}
</style>
