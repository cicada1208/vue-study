<template>
  <v-container fluid>
    {{ 'loading:' + this.testRst.loading }} <br />
    {{ 'content:' + this.testRst.content }} <br />
    {{ 'Code:' + this.testRst.content.Code }} <br />
    {{ 'Succ:' + this.testRst.content.Succ }} <br />
    {{ 'Data:' + this.testRst.content.Data }} <br />
    {{ 'Msg:' + this.testRst.content.Msg }} <br />
    {{ 'content2:' + this.testRst2.content }} <br />
    <v-btn color="success" @click="testclick">text</v-btn>

    <loading-dialog v-model="albumRst.loading" />

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
import apiUtil, { ndbApi, ndbApiPs } from '../libs/api-util';

export default {
  name: 'api-query',

  components: {
    LoadingDialog: () =>
      import(
        /* webpackChunkName: "loading.dialog" */
        '@/components/LoadingDialog.vue'
      )
  },

  data() {
    return {
      albumRst: { loading: false, content: {}, error: '' },
      testRst: { loading: false, content: {} },
      testRst2: { loading: false, content: {} }
    };
  },

  methods: {
    async fetchAlbum() {
      // this.error = this.content = null;
      // this.loading = true;
      const url = 'https://itunes.apple.com/search?term=twice&limit=10';
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

    testclick() {
      this.testRst.content.Msg = 'test';
    },
    async fetchTest() {
      ndbApi.post(this.testRst, 'Users/QueryUser', {
        params: { option: 2 },
        data: {
          userId: '10964',
          isActive: true
        }
      });
      ndbApi.get(this.testRst2, 'Test/GetTest', {
        params: { option: 10 }
      });
      const data = await ndbApiPs.post('Users/QueryUser', {
        params: { option: 2 },
        data: {
          userId: '10964',
          isActive: true
        }
      });
      console.log('data:', data);
    }
  },

  // created: 完成 data observer、property 和方法運算、watch/event事件回調，
  // 然而，掛載階段還沒開始，$el property 尚不可用。
  created() {
    // 組件創建完後獲取數據
    this.fetchAlbum();
    this.fetchTest();
  },

  // watch: 一個對象，鍵是需要觀察的表達式，若需觀察 data property e.f 鍵可為 'e.f'
  watch: {
    // 如果路由有變化，會再次執行該方法 fetchAlbum
    $route: 'fetchAlbum',
    // 如果 data property loading 有變化，會再次執行該方法
    'albumRst.loading': function(newVal, oldVal) {
      console.log('albumRst.loading new: %s, old: %s', newVal, oldVal);
    }
  }
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
