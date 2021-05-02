<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-for="(album, index) in content" :key="index">
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
  </div>
</template>

<script>
// import apiUtil from '../libs/api.util.js';

export default {
  data() {
    return {
      loading: false,
      error: null,
      content: null,
    };
  },
  methods: {
    async fetchAlbum() {
      this.error = this.content = null;
      this.loading = true;
      const url = 'https://itunes.apple.com/search?term=twice&limit=20';
      // const cb = (err, data) => {
      //   this.loading = false;
      //   if (err) this.error = err.toString();
      //   else this.content = data.results;
      // };
      // apiUtil.axiosCb({ cb, url, method: 'GET' });
      const data = await this.$apiUtil.axiosPs({ url, method: 'GET' });
      this.loading = false;
      this.content = data.results;
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
    loading: function(newVal, oldVal) {
      console.log('loading new: %s, old: %s', newVal, oldVal);
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
