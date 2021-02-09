<template>
  <div class="test">
    <h1>This is an test page</h1>
    <span v-bind:title="title">
      v-bind title test
    </span>
    <p v-if="true">v-if test</p>
    <p v-if="true">v-for test</p>
    <ol>
      <li v-for="(item, index) in list" v-bind:key="index">{{ item.text }}</li>
    </ol>
    <button v-on:click="reverseTitle">v-on test</button>
    <p>{{ titleReverse }}</p>
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
