<template>
  <div>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
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
import axios from 'axios';

function ApiUtil(url, data, method = 'post', resp) {
  axios({
    url: url,
    method: method,
    data: data,
  })
    .then((response) => {
      resp(null, response.data);
    })
    .catch((error) => {
      resp(error, null);
    });
}

export default {
  data() {
    return {
      loading: false,
      error: null,
      content: null,
    };
  },
  methods: {
    fetchAlbum() {
      this.error = this.content = null;
      this.loading = true;
      const url = 'https://itunes.apple.com/search?term=twice&limit=10';
      ApiUtil(url, null, 'get', (err, data) => {
        this.loading = false;
        if (err) this.error = err.toString();
        else this.content = data.results;
      });
    },
    viewAlbum(link) {
      window.open(link);
    },
  },
  created() {
    // 組件創建完後獲取數據
    this.fetchAlbum();
  },
  watch: {
    // 如果路由有變化，會再次執行該方法
    $route: 'fetchData',
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
