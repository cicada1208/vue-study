<!--
<template>
  <div>render function component</div>
</template>
-->

<script>
var getChildrenTextContent = function(children) {
  return children
    .map((node) =>
      node.children ? getChildrenTextContent(node.children) : node.text
    )
    .join('');
};

export default {
  name: 'RenderFuncComp',
  props: {
    level: {
      type: Number,
      default: 2,
    },
  },
  data: () => ({
    textList: [{ text: 'list1' }, { text: 'list2' }],
  }),
  computed: {
    anchorName: function() {
      return getChildrenTextContent(this.$slots.anchor)
        .toLowerCase()
        .replace(/\W+/g, '-')
        .replace(/(^-|-$)/g, '');
    },
  },
  render: function(createElement) {
    // createElement: return virtual node(VNode)
    return createElement(
      'div', // html tag(String)、component options(Object)、
      // resolve 上述任一的 async function, 必選項
      [
        createElement('h' + this.level, this.$slots.default),
        createElement('h' + this.level, 'second heading element.'),
        'text element.',
        createElement('br'),
        this.$slots.anchor &&
          createElement(
            'a',
            {
              attrs: {
                name: this.anchorName,
                href: '#' + this.anchorName,
              },
            }, // a data object corresponding to the attributes, 可選項
            this.$slots.anchor // children VNodes, 可選項
          ),
        createElement(
          'div',
          Array.apply(null, { length: 2 }).map(function() {
            return createElement('p', 'VNode 必須唯一');
          }) // VNode 必須唯一: 故都從 createElement 產生
        ),
        this.textList.length &&
          createElement(
            'ul',
            this.textList.map((item) => createElement('li', item.text))
          ),
      ].filter(Boolean) // children VNodes, 可選項
    );
  },
};
</script>
