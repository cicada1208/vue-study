<template>
  <v-container fluid>
    <h2>dom event:</h2>
    <div id="event_div">
      <button id="event_btn">click</button>
    </div>

    <h2>vue event:</h2>
    <!-- div click.capture.self / @click.self: 點擊的 event.target 是 div 自身，才執行。 -->
    <!-- div @click.capture.prevent: preventDefault() 會往下傳遞，即使 <a> 未使用 @click.prevent，一樣不會轉跳。 -->
    <!-- preventDefault(): 為取消瀏覽器的預設行為，事件還是會繼續執行並往下傳遞。 -->
    <div
      id="vue_event_div"
      @click.self="vueEventTest('vue div bubble', $event)"
      @click.capture.self="vueEventTest('vue div capture', $event)"
    >
      <button
        id="vue_event_btn"
        @click="vueEventTest('vue btn bubble', $event)"
        @click.capture="vueEventTest('vue btn capture', $event)"
      >
        <a
          @click.prevent="vueEventTest('vue a bubble', $event)"
          href="https://www.google.com/"
          >vue click</a
        >
      </button>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    eventPhase: {
      1: 'CAPTURING_PHASE',
      2: 'AT_TARGET',
      3: 'BUBBLING_PHASE'
    }
  }),

  methods: {
    domEventTest() {
      // 原則：
      // 1. 先捕獲再冒泡。
      // 2. 當事件傳到 target 本身，e.eventPhase 無分捕獲跟冒泡，
      // 執行順序根據 addEventListener 的順序而定，
      // 但 chrome 新版改為 target 本身，一樣先捕獲再冒泡。
      var div = document.getElementById('event_div');
      var btn = document.getElementById('event_btn');

      btn.addEventListener(
        'click',
        e => {
          console.log(
            'btn',
            'bubble',
            this.eventPhase[e.eventPhase],
            `target:${e.target.tagName}`
          );
        },
        false
      );
      btn.addEventListener(
        'click',
        e => {
          console.log(
            'btn',
            'capture',
            this.eventPhase[e.eventPhase],
            `target:${e.target.tagName}`
          );
        },
        true
      );
      div.addEventListener(
        'click',
        e => {
          console.log(
            'div',
            'bubble',
            this.eventPhase[e.eventPhase],
            `target:${e.target.tagName}`
          );
        },
        false
      );
      div.addEventListener(
        'click',
        e => {
          console.log(
            'div',
            'capture',
            this.eventPhase[e.eventPhase],
            `target:${e.target.tagName}`
          );

          // e.stopPropagation(); // 取消傳遞事件: 同一事件執行至此，事件不再往下傳遞，但若在此節點上有不只一個 listener，此節點所有 listener 還是會被執行。

          // e.stopImmediatePropagation(); // 同 e.stopPropagation()，但會使同一層級(同事件及同捕獲或冒泡)的其他 listener 也不被執行。
        },
        true
      );
      div.addEventListener(
        'click',
        e => {
          console.log(
            'div',
            'capture2',
            this.eventPhase[e.eventPhase],
            `target:${e.target.tagName}`
          );
        },
        true
      );
    },

    vueEventTest(desp, e) {
      // 訪問原生事件 e
      console.log(
        desp,
        this.eventPhase[e.eventPhase],
        `target:${e.target.tagName}`
      );
      // 原生事件可執行 e.preventDefault();
    }
  },

  mounted() {
    this.domEventTest();
  }
};
</script>
