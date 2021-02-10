<template>
  <div class="test">
    <h1>This is an test page</h1>
    <table>
      <tr>
        <td>v-bind:</td>
        <td>
          <span v-bind:title="title">
            hover this
          </span>
        </td>
      </tr>
      <tr>
        <td>v-if:</td>
        <td><span v-if="true">visible</span></td>
      </tr>
      <tr>
        <td>v-for:</td>
        <td>
          <ol>
            <li v-for="(item, index) in list" v-bind:key="index">
              {{ item.text }}
            </li>
          </ol>
        </td>
      </tr>
      <tr>
        <td>v-on:</td>
        <td>
          <button v-on:click="reverseTitle">reverse title</button>
          <p>{{ titleReverse }}</p>
        </td>
      </tr>
      <tr>
        <!-- 實現表單輸入和應用狀態之間的雙向綁定 -->
        <td>v-model:</td>
        <td>
          <input v-model="title" />
          <p>{{ title }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    title: `v-bind title ${new Date().toLocaleString()}`,
    list: [{ text: 'list1' }, { text: 'list2' }],
    titleReverse: '',
  }),
  methods: {
    reverseTitle: function() {
      this.titleReverse = this.title
        .split('')
        .reverse()
        .join('');
    },
  },
};
</script>
