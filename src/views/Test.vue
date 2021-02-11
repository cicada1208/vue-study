<template>
  <div class="test">
    <h4>v-bind:</h4>
    <span v-bind:title="title">
      hover this
    </span>

    <h4>v-if:</h4>
    <span v-if="true">visible</span>

    <h4>v-for:</h4>
    <ol>
      <li v-for="(item, index) in list" v-bind:key="index">
        {{ item.text }}
      </li>
    </ol>

    <h4>v-on:</h4>
    <button v-on:click="reverseTitle">reverse title</button>
    <p>{{ titleReverse }}</p>

    <h4>v-model:</h4>
    <input v-model="title" />
    <p>{{ title }}</p>
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

<style scoped lang="scss">
div {
  text-align: left;
}
</style>
