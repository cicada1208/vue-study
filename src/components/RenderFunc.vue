<!--
<template>
  <div>render function component</div>
</template>
-->

<script>
var getChildrenTextContent = function(children) {
  return children
    .map(node =>
      node.children ? getChildrenTextContent(node.children) : node.text
    )
    .join('');
};

export default {
  name: 'render-func',

  props: {
    level: {
      type: Number,
      default: 2
    }
  },

  data: () => ({
    textList: [{ text: 'list1' }, { text: 'list2' }],
    user: { firstName: 'H', lastName: 'W' }
  }),

  computed: {
    anchorName: function() {
      return getChildrenTextContent(this.$slots.anchor)
        .toLowerCase()
        .replace(/\W+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  },

  render: function(createElement) {
    // var self = this;

    // createElement: return virtual node(VNode)
    return createElement(
      'div', // 第一參數為 html tag(String)、component options(Object)、
      // resolve 上述任一的 async function, 必選項
      [
        createElement(
          'h' + this.level,
          {
            on: {
              // 事件修飾符在 render function 不支援 click.once 寫法。
              // 改為 '~click':() => {...}
              click: () => {
                // .self: 如果觸發事件的元素不是綁定到事件的元素則返回
                if (event.target !== event.currentTarget) return;
                // 如果沒有同時按下shift鍵則返回
                // if (!event.shiftKey) return;
                // 阻止事件冒泡
                // event.stopPropagation();
                // 阻止該元素默認的keyup事件
                // event.preventDefault();
                alert(`default slot: ${JSON.stringify(this.$slots.default)}`);
              }
            }
          }, // a data object corresponding to the attributes, 可選項
          this.$slots.default // children VNodes, 可選項
        ), // 該 createElement 相當於 `<h5><slot></slot></h5>`
        createElement('h' + this.level, 'second heading VNode.'),
        'text VNode.',
        createElement('br'),
        this.$slots.anchor &&
          createElement(
            'a',
            {
              attrs: {
                name: this.anchorName,
                href: '#' + this.anchorName
              }
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
            this.textList.map(item => createElement('li', item.text))
          ),
        this.$scopedSlots.userName &&
          createElement(
            'div',
            // slot prop user 傳遞至父級
            this.$scopedSlots.userName({
              user: this.user
            })
          ) // 該 createElement 相當於 `<div><slot name="userName" :user="user"></slot></div>`
      ] // children VNodes, 可選項
    );
  }
};
</script>
