<template>
  <div class="comptest">
    <p>staticProp: {{ staticProp }}</p>
    <p>dynamicProp: {{ dynamicProp }}</p>
    <p>numProp: {{ numProp }}</p>
    <p>boolPropDef: {{ boolPropDef }}</p>
    <p>boolProp: {{ boolProp }}</p>
    <p>arrayProp: {{ arrayProp }}</p>
    <p>objectProp: {{ objectProp }}</p>
    <p>id: {{ id }}, title: {{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'CompTest',
  props: {
    staticProp: String,
    dynamicProp: String,
    numProp: Number,
    boolPropDef: Boolean,
    boolProp: Boolean,
    arrayProp: Array,
    objectProp: Object,
    id: Number,
    title: String,
  },
};
</script>
