<template>
  <v-container>
    <h2>v-bind:</h2>
    <!--
      v-bind: 後接參數 html attribute，並可綁定 data property
      直接書寫 v-bind:title 或可用動態參數(方括號括起來的 JavaScript 表達式作為一個指令的參數)
      完整語法: v-bind:[attributeName]
      簡寫語法: :[attributeName]
    -->
    <span :[attributeName]="msg">
      hover this show msg
    </span>

    <h2>v-if:</h2>
    <span v-if="Math.random() > 0.5">if >0.5 visible</span>
    <span v-else-if="Math.random() === 0.5">elseif =0.5 visible</span>
    <span v-else>else &lt;0.5 visible</span>

    <h2>v-for iteration array:</h2>
    <!-- v-if 和 v-for 不要同時用在同一個元素上 -->
    <!-- key 的使用最好為唯一鍵值 -->
    <ol>
      <li v-for="(item, index) in textList" :key="index">
        {{ item.text }}
      </li>
    </ol>

    <h2>v-for iteration object:</h2>
    <div v-for="(value, key, index) in textClass" :key="index">
      {{ index }}. {{ key }}: {{ value }}
    </div>

    <h2>v-on:</h2>
    <!--
      v-on: 後接參數 eventName
      直接書寫 v-on:click 或可用動態參數
      完整語法: v-on:[eventName]
      簡寫語法: @[eventName]
    -->
    <v-btn
      @[eventName]="reverseMsg('自定義參數', $event)"
      color="primary"
      class="mx-1"
    >
      reverse msg
    </v-btn>
    <v-btn @[eventName]="clearMsg" color="primary" class="mx-1">
      clear msg
    </v-btn>
    <p id="msgReverseP">
      <!-- Mustache 語法: 僅能單個 JavaScript 表達式 -->
      msgReverse: {{ msgReverse }}
    </p>

    <h2>v-model text & textarea:</h2>
    <!-- v-model: 實現表單輸入和應用狀態之間的雙向綁定，把綁定和事件結合起來 -->
    <!-- ref attribute: 賦予 ID 後，以此引用 element or component。
    避免在模板或計算屬性中訪問$refs。 -->
    <input
      v-model.trim="msg"
      placeholder="single line"
      ref="msgInput"
      @keyup.enter="enterMsg"
    />
    <br />
    <textarea v-model="msg" placeholder="multiple lines" v-focus="msg" />
    <p :class="baseStyle.multiline">msg: {{ msg }}</p>
    <p :class="baseStyle.multiline">msgReverseGetter: {{ msgReverseGetter }}</p>
    <p :class="baseStyleVue.multiline">msgGetter: {{ msgGetterAndSetter }}</p>

    <h2>v-model number:</h2>
    <!-- 即使在type="number"時，HTML輸入元素的值也總會返回字符串。
    如果該值無法被parseFloat()解析，則會返回原始的值。 -->
    <input type="number" v-model.number="num" step="2" />
    <p>num: {{ num }}</p>

    <h2>v-model single checkbox:</h2>
    <input type="checkbox" id="chkbox" v-model="checked" />
    <!-- The <label> for attribute specifies which form element a label is bound to.
      for="element_id"-->
    <label for="chkbox">{{ checked }}</label>
    <br />
    <input
      type="checkbox"
      id="chkboxValue"
      v-model="checkedValue"
      true-value="yes"
      false-value="no"
    />
    <label for="chkboxValue">{{ checkedValue }}</label>

    <h2>v-model mutiple checkbox bind to an array:</h2>
    <template v-for="name in names">
      <input
        type="checkbox"
        :id="name + 'checkbox'"
        :value="name"
        v-model="checkedNames"
        :key="name + 'checkbox'"
      />
      <label :for="name + 'checkbox'" :key="name + 'checkboxlabel'">
        {{ name }}
      </label>
    </template>
    <br />
    <span>checked names: {{ checkedNames }}</span>

    <h2>v-model radio:</h2>
    <template v-for="name in names">
      <input
        type="radio"
        :id="name + 'radio'"
        :value="name"
        v-model="pickedName"
        :key="name + 'radio'"
      />
      <label :for="name + 'radio'" :key="name + 'radiolabel'">{{ name }}</label>
    </template>
    <br />
    <span>picked name: {{ pickedName }}</span>

    <h2>v-model select single selected:</h2>
    <select v-model="selectedName">
      <option disabled value="">請選擇</option>
      <!-- :value="{ number: 123 }" 可為物件，選取後 selectedName.number 結果為 123 -->
      <option v-for="name in names" :value="name" :key="name + 'option'">
        {{ name }}
      </option>
    </select>
    <br />
    <span>selected name: {{ selectedName }}</span>

    <h2>v-model select multiple selected:</h2>
    <select v-model="selectedNames" multiple style="width: 100px">
      <option v-for="name in names" :value="name" :key="name + 'option'">
        {{ name }}
      </option>
    </select>
    <br />
    <span>selected names: {{ selectedNames }}</span>

    <h2>v-html:</h2>
    <!-- v-html: span 內容會被替換成 data property rawHtml -->
    <div class="deepParent">
      <span v-html="rawHtml">test</span>
    </div>

    <h2>class & style:</h2>
    <!--
      若都啟用 {'text-bold': true, 'text-red': true}
      相當於 class="text-bold text-red"
    -->
    <p class="text-size" :class="textClass">class style test</p>
    <p :class="['text-size', { 'text-bold': true, 'text-red': false }]">
      class style test2
    </p>
    <p :style="{ color: 'cornflowerblue', 'font-weight': 'bold' }">
      class style test3
    </p>

    <h2>component prop & slot:</h2>
    <!--
      prop 單向數據流: 父級 prop 的更新會向下流動到子組件中，但是反過來則不行。

      dynamicProp、numProp、boolProp、arrayProp、objectProp:
      以 v-bind 告訴 Vue 是 JavaScript 表達式而非字串。

      boolPropDef: 未賦值，預設為true。

      v-bind="post": 傳入一個對象的所有 property。

      @enlarge-text: 監聽自定義事件。
      @enlarge-text2、@decrease-text: 監聽子組建拋出的第二參數。

      :twoWayProp.sync: prop 雙向綁定。
      v-bind.sync="objProp" 可將 object objProp 所有 property 傳入並雙向綁定。
    -->
    <div :style="{ fontSize: postFontSize + 'em' }">
      <PropSlot
        staticProp="success"
        :dynamicProp="msg"
        :numProp="2"
        boolPropDef
        :boolProp="false"
        :arrayProp="[1, 2, 3]"
        :objectProp="textClass"
        v-bind="post"
        @enlarge-text="postFontSize += 0.1"
        @enlarge-text2="postFontSize += $event"
        @decrease-text="decreaseText"
        :twoWayProp.sync="twoWayProp"
      >
        <!-- 未具名插槽: 未由 template v-slot 包覆的內容，等同 template v-slot:default 包覆的內容 -->
        <!-- <template v-slot:default> -->
        <!-- 若無此內容 default slot，component 則顯示子組建默認 default backup slot -->
        <span style="color: crimson">parent: default slot</span>
        <!-- </template> -->

        <!-- 具名插槽: template v-slot:userName -->
        <!-- <template v-slot:userName="slotProp">
          slotProp: {{ slotProp.user.firstName }}
        </template> -->

        <!-- user 重命名為 person -->
        <!-- <template v-slot:userName="{ user: person }">
          slotProp: {{ person.firstName }}
        </template> -->

        <!-- slot prop undefObj: 因為 child component 並未將 undefObj 傳遞過來，故為 undefined 的情形給予預設值 -->
        <!-- 完整語法: v-slot:[slotName] -->
        <!-- 簡寫語法: #[slotName] -->
        <template #[slotName]="{ user, undefObj={role: 'guest'} }">
          parent: slotProp: name: {{ user.firstName }}, role:
          {{ undefObj.role }}
        </template>
      </PropSlot>
      <p>twoWayProp in parent: {{ twoWayProp }}</p>
    </div>

    <h2>component check v-model:</h2>
    <CheckModelInput v-model="checked" />

    <h2>component text v-model:</h2>
    <TodoList />

    <h2>dynamic component:</h2>
    <!--
      // 也可傳入 prop
      <keep-alive>
        <component v-bind:is="'PropSlot'" staticProp="danger"></component>
      </keep-alive>
    -->
    <button
      v-for="tab in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <!-- component is attribute: 動態組件，多標籤的界面中用來切換不同的組件。 -->
    <!-- <keep-alive>: 組件實例能夠在第一次被創建時緩存下來，保留組件狀態避免重新渲染。
    用在其一個直屬的子組件被開關的情形。如果在其中有v-for則不會工作。
    若為多個條件性的子元素，要求同時只有一個子元素被渲染。 -->
    <!-- transition: 也可用於 dynamic component -->
    <!-- currentTab: 可為已註冊組件的名字或一個組件的選項對象。 -->
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component v-bind:is="currentTab" class="tab">qaq</component>
      </keep-alive>
    </transition>

    <h2>dynamic component2:</h2>
    <button
      v-for="tab in tabs2"
      :key="tab"
      :class="['tab-button', { active: currentTab2 === tab }]"
      @click="currentTab2 = tab"
    >
      {{ tab }}
    </button>
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component :is="lazyLoading" class="tab" />
      </keep-alive>
    </transition>

    <h2>css transition:</h2>
    <!-- css 過渡動畫效果 -->
    <!-- transition:
    應用在單個節點、同一時間渲染多個節點中的一個。
    若有指定 name="slide-fade"，css 類名改前綴為 .slide-fade-enter-active，
    否則使用預設前綴 .v-enter-active。
    mode: 過渡模式，out-in: 當前元素先進行過渡，完成之後新元素過渡進入。 -->
    <transition name="slide-fade" mode="out-in">
      <!-- 因 key 值變更，<button> 會被替換而不是被修改，因此會觸發過渡 -->
      <v-btn @click="show = !show" :key="show" color="primary">
        {{ show }}
      </v-btn>
    </transition>
    <!--
    <button @click="show = !show">
      Toggle render
    </button>
    <transition name="slide-fade">
      <p v-if="show">hello</p>
    </transition>
    -->

    <h2>list transition:</h2>
    <v-btn @click="shuffleNumList" color="primary" class="mx-1">Shuffle</v-btn>
    <v-btn @click="addNumList" color="primary" class="mx-1">Add</v-btn>
    <v-btn @click="removeNumList" color="primary" class="mx-1">Remove</v-btn>
    <!-- transition-group:
    多個元素/組件的過渡效果。
    默認為一個 <span>，也可通過 tag attribute 更換為其他元素。
    不可用過渡模式 mode。
    CSS 過渡的類將會應用在內部的元素中，而不是這個組/容器本身。 -->
    <transition-group name="num-list" tag="p">
      <span v-for="num in nums" :key="num" class="num-list-item">
        {{ num }}
      </span>
    </transition-group>

    <h2>render function:</h2>
    <RenderFunc :level="5">
      heading VNode content from default slot created by render function.
      {{ msg }}
      <template v-slot:anchor>
        anchor VNode
      </template>
      <template #[slotName]="{ user, undefObj={role: 'guest'} }">
        slotProp: name: {{ user.firstName }}, role: {{ undefObj.role }}
      </template>
    </RenderFunc>

    <h2>JSX component:</h2>
    <JSX />

    <h2>JSX functional component:</h2>
    <JSXFunc option="1" />

    <h2>filters:</h2>
    <!-- filters: 可被用於一些常見的文本格式化，用在雙花括號插值和v-bind表達式，可串聯。
    | 前為第一參數 filterText，可再傳入其他參數 msg -->
    <input v-model="filterText" placeholder="write down text to see" />
    text: {{ filterText }} <br />
    <input :value="filterText | capitalize(msg) | digitRemove" />
    text after filters: {{ filterText | capitalize(msg) | digitRemove }}

    <h2>local storage:</h2>
    localStorageTest: <input v-model="localStorageTest" />

    <h2>dom event:</h2>
    <div id="event_div">
      <button id="event_btn">click</button>
    </div>
    <!-- div click.capture.self / @click.self: 點擊的 event.target 是 div 自身，才執行。 -->
    <!-- div @click.capture.prevent: preventDefault() 往下傳遞，即使 <a> 未使用 @click.prevent，一樣不會轉跳。 -->
    <!-- preventDefault(): 為取消瀏覽器的預設行為，事件還是會繼續往下傳遞。 -->
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
        <a @click.prevent href="https://www.google.com/">vue click</a>
      </button>
    </div>
  </v-container>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
// @ is an alias to /src
import PropSlot from '@/components/PropSlot.vue';
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';
import baseStyle from '@/styles/base.module.scss'; // CSS Modules

// 處理組件加載狀態
const Posts = () => ({
  // 需要加載的組件 (應是個 `Promise` 對象)
  component: import(
    /* webpackChunkName: "posts" */
    '@/components/Posts.vue'
  ),
  // 異步組件加載時使用的組件
  loading: Loading,
  // 加載失敗時使用的組件
  error: Error,
  // 展示加載時組件的延時時間。默認值是 200 (毫秒)
  delay: 200,
  // 如果提供了超時時間且組件加載也超時，
  // 則使用加載失敗時使用的組件。默認值是：`Infinity`
  // timeout: 3000,
});

// mixin: 可複用功能
var reuseMixin = {
  methods: {
    // 自定義私有 property 使用$_前綴
    $_reuseMixin_onPrint: function() {
      console.log('reuseMixin created first.');
    },
  },

  created: function() {
    this.$_reuseMixin_onPrint();
  },
};

export default {
  name: 'VueCore',

  data: () => ({
    // data property 是響應式: 即 property 改變，view 會響應。
    // Vue 會在初始化實例時對 property 執行 getter/setter 轉化。
    msg: `${new Date().toLocaleString()}`,
    msgReverse: '',
    textList: [{ text: 'list1' }, { text: 'list2' }],
    attributeName: 'title',
    eventName: 'click',
    rawHtml:
      '<span class="deepChild" style="color: crimson">raw html test. this shold be red.</span>',
    num: 0,
    checked: false,
    checkedValue: '',
    names: ['Jack', 'Mike'],
    checkedNames: [],
    pickedName: '',
    selectedName: '',
    selectedNames: [],
    post: { id: 1, title: 'My Journey with Vue' },
    postFontSize: 1,
    twoWayProp: 0,
    slotName: 'userName',
    tabs: ['Posts', 'RenderFunc'],
    tabs2: ['VBtnTest', 'VBadgeTest'],
    currentTab: 'Posts',
    currentTab2: 'VBtnTest',
    show: true,
    nums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    nextNum: 10,
    filterText: '',
    localStorageTest: '',
  }),

  computed: {
    // computed property 是響應式:
    // msgReverseGetter is a computed property getter.
    // msgReverseGetter 依賴 msg，當響應式 msg 改變，
    // 所有依賴 msgReverseGetter 的綁定也會更新；
    // 當響應式 msg 沒變，msgReverseGetter 會返回之前的緩存而不重算。
    msgReverseGetter: function() {
      return this.msg
        .split('')
        .reverse()
        .join('');
    },

    msgGetterAndSetter: {
      get: function() {
        return this.msg;
      },
      set: function(value) {
        this.msg = value;
      },
    },

    textClass: function() {
      return {
        'text-bold': true,
        'text-red': true,
      };
    },

    baseStyle() {
      return baseStyle;
    },

    lazyLoading() {
      const name = this.currentTab2;
      return () => ({
        // [request] 會依據 ${name}-vue 命名
        component: import(
          /* webpackChunkName: "[request]" */
          `@/components/${name}.vue`
        ),
        loading: Loading,
        error: Error,
      });
    },

    eventPhase() {
      return {
        1: 'CAPTURING_PHASE',
        2: 'AT_TARGET',
        3: 'BUBBLING_PHASE',
      };
    },
  },

  methods: {
    // methods 不是響應式:方法每次都會重算，不會緩存。
    reverseMsg: function(param, event) {
      this.msgReverse = this.msg
        .split('')
        .reverse()
        .join('');
      alert(`tag name: ${event.target.tagName}, param: ${param}`);
      this.$refs.msgInput.focus();
    },

    clearMsg: function(event) {
      // 延遲一秒清空
      var debounce = _.debounce(() => $('#msgReverseP').html(''), 1000);
      debounce();
      alert(`tag name: ${event.target.tagName}`);
    },

    enterMsg: function() {
      alert(`msg: ${this.msg}`);
    },

    decreaseText: function(size) {
      this.postFontSize += size;
    },

    randomIndex: function() {
      return Math.floor(Math.random() * this.nums.length);
    },

    addNumList: function() {
      this.nums.splice(this.randomIndex(), 0, this.nextNum++);
    },

    removeNumList: function() {
      this.nums.splice(this.randomIndex(), 1);
    },

    shuffleNumList: function() {
      this.nums = _.shuffle(this.nums);
    },

    domEventTest() {
      // 原則：
      // 1. 先捕獲再冒泡。
      // 2. 當事件傳到 target 本身，無分捕獲跟冒泡，
      // 執行順序根據 addEventListener 的順序而定，
      // 但 chrome 新版改為 target 本身，一樣先捕獲再冒泡。
      var div = document.getElementById('event_div');
      var btn = document.getElementById('event_btn');

      btn.addEventListener(
        'click',
        (e) => {
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
        (e) => {
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
        (e) => {
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
        (e) => {
          console.log(
            'div',
            'capture',
            this.eventPhase[e.eventPhase],
            `target:${e.target.tagName}`
          );

          //e.stopPropagation(); // 取消傳遞事件: 同一事件執行至此，事件不再往下傳遞，但若在此節點上有不只一個 listener，此節點所有 listener 都會被執行。

          //e.stopImmediatePropagation(); // 同 e.stopPropagation()，但會使同一層級(同事件及同捕獲或冒泡)的其他 listener 也不被執行。
        },
        true
      );
      div.addEventListener(
        'click',
        (e) => {
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
    },
  },

  created: function() {
    // lifecycle hook created: vm 實例被創建之後執行此代碼
    // `this` 指向 vm 實例
    console.log(`vm created, msg is ${this.msg}.`);

    if (localStorage.localStorageTest) {
      this.localStorageTest = localStorage.localStorageTest;
    }
  },

  mounted() {
    this.domEventTest();
  },

  watch: {
    localStorageTest(newVal) {
      localStorage.localStorageTest = newVal;
    },
  },

  components: {
    // components: 模塊局部註冊
    PropSlot,

    // async component: Posts、RenderFunc...
    // 只在需要的時候才加載模塊，返回 Promise 的函式
    Posts,

    RenderFunc: () =>
      import(
        /* webpackChunkName: "render.func" */
        '@/components/RenderFunc.vue'
      ),

    JSX: () =>
      import(
        /* webpackChunkName: "jsx" */
        '@/components/JSX.vue'
      ),

    JSXFunc: () =>
      import(
        /* webpackChunkName: "jsx.func" */
        '@/components/JSXFunc.vue'
      ),

    CheckModelInput: () =>
      import(
        /* webpackChunkName: "check.model.input" */
        '@/components/CheckModelInput.vue'
      ),

    TodoList: () =>
      import(
        /* webpackChunkName: "todo.list" */
        '@/components/TodoList.vue'
      ),
  },

  // 當組件使用 mixin 時，所有 mixin 的選項將被“混合”進入該組件本身的選項。
  mixins: [reuseMixin],

  // directives: 自定義指令，局部註冊
  directives: {
    // 自定義指令 v-focus
    focus: {
      // Hook Functions: bind、inserted...
      // bind: 只調用一次，指令第一次綁定到元素時調用。在這裡可以進行一次性的初始化設置。
      bind: function(el, binding, vnode) {
        // 除了el之外，其它參數都應只讀，勿進行修改
        console.log('Hook Arguments binding: ' + JSON.stringify(binding));
        console.log(
          'Hook Arguments vnode keys: ' + Object.keys(vnode).join(', ')
        );
      },

      // inserted: 當被綁定的元素插入到 DOM 時調用。
      inserted: function(el) {
        el.focus();
      },
    },
  },

  filters: {
    capitalize: function(value, msg) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1) + msg;
    },

    digitRemove: function(value) {
      var pat = /\d/g;
      value = value.replace(pat, '');
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
// scoped 樣式中，類選擇器比元素選擇器更好，因為大量使用元素選擇器效能很慢。

// 類選擇器
.text-bold {
  font-weight: bold;
}

.text-red {
  color: crimson;
}

.text-size {
  font-size: 20px;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}

.tab-button:hover {
  background: #e0e0e0;
}

.tab-button.active {
  background: #e0e0e0;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}

// 深度作用選擇器：例如影響子組件或動態生成的內容(v-html)
.deepParent ::v-deep .deepChild {
  font-weight: bold;
}
</style>

<style lang="scss" module="baseStyleVue" src="@/styles/base.module.scss">
// module: Vue 提供的 CSS Modules。
// 若未指定計算屬性名稱 baseStyleVue，取用方式為 <p :class="$style.multiline">
// 若有指定計算屬性名稱 baseStyleVue，取用方式為 <p :class="baseStyleVue.multiline">
</style>
