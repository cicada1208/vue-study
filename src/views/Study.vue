<template>
  <div class="study">
    <!--
      v-bind: 後接參數 html attribute 能綁定 data property
      直接書寫 v-bind:title 或可用動態參數(方括號括起來的 JavaScript 表達式作為一個指令的參數)
      完整語法: v-bind:[attributeName]
      簡寫語法: :[attributeName]
    -->
    <h4>v-bind:</h4>
    <span :[attributeName]="msg">
      hover this show msg
    </span>

    <h4>v-if:</h4>
    <span v-if="Math.random() > 0.5">if >0.5 visible</span>
    <span v-else-if="Math.random() === 0.5">elseif =0.5 visible</span>
    <span v-else>else &lt;0.5 visible</span>

    <h4>v-for iteration array:</h4>
    <ol>
      <li v-for="(item, index) in textList" v-bind:key="index">
        {{ item.text }}
      </li>
    </ol>

    <h4>v-for iteration object:</h4>
    <div v-for="(value, name, index) in textClass" :key="index">
      {{ index }}. {{ name }}: {{ value }}
    </div>

    <!--
      v-on: 後接參數 eventName
      直接書寫 v-on:click 或可用動態參數
      完整語法: v-on:[eventName]
      簡寫語法: @[eventName]
    -->
    <h4>v-on:</h4>
    <button @[eventName]="onReverseMsg('自定義參數', $event)">
      reverse msg
    </button>
    <button @[eventName]="onClearMsg">clear msg</button>
    <p id="msgReverseP">
      <!-- Mustache 語法: 僅能單個 JavaScript 表達式 -->
      msgReverse: {{ msgReverse }}
    </p>

    <!-- v-model: 實現表單輸入和應用狀態之間的雙向綁定 -->
    <h4>v-model text & textarea:</h4>
    <!-- ref attribute: 賦予 ID 後，以此引用 element or component。
    避免在模板或計算屬性中訪問$refs。 -->
    <input v-model.trim="msg" placeholder="single line" ref="msgInput" />
    <br />
    <textarea v-model="msg" placeholder="multiple lines" />
    <p class="multi-line">msg: {{ msg }}</p>
    <p class="multi-line">msgReverseGetter: {{ msgReverseGetter }}</p>
    <p class="multi-line">msgGetter: {{ msgGetterAndSetter }}</p>

    <h4>v-model number:</h4>
    <!-- 即使在type="number"時，HTML輸入元素的值也總會返回字符串。
    如果該值無法被parseFloat()解析，則會返回原始的值。 -->
    <input type="number" v-model.number="num" />
    <p>num: {{ num }}</p>

    <h4>v-model single checkbox:</h4>
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

    <h4>v-model mutiple checkbox bind to an array:</h4>
    <template v-for="name in names">
      <input
        type="checkbox"
        :id="name + 'checkbox'"
        :value="name"
        v-model="checkedNames"
        :key="name + 'checkbox'"
      />
      <label :for="name + 'checkbox'" :key="name + 'checkboxlabel'">{{
        name
      }}</label>
    </template>
    <br />
    <span>checked names: {{ checkedNames }}</span>

    <h4>v-model radio:</h4>
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

    <h4>v-model select single selected:</h4>
    <select v-model="selectedName">
      <option disabled value="">請選擇</option>
      <!-- :value="{ number: 123 }" 可為物件，選取後 selectedName.number 結果為 123 -->
      <option v-for="name in names" :value="name" :key="name + 'option'">{{
        name
      }}</option>
    </select>
    <br />
    <span>selected name: {{ selectedName }}</span>

    <h4>v-model select multiple selected:</h4>
    <select v-model="selectedNames" multiple style="width: 100px">
      <option v-for="name in names" :value="name" :key="name + 'option'">{{
        name
      }}</option>
    </select>
    <br />
    <span>selected names: {{ selectedNames }}</span>

    <!-- v-html: span 內容會被替換成 data property rawHtml -->
    <h4>v-html:</h4>
    <span v-html="rawHtml">test</span>

    <!--
      若都啟用 {'text-bold': true, 'text-red': true}
      相當於 class="text-bold text-red"
    -->
    <h4>class & style:</h4>
    <p class="text-size" v-bind:class="textClass">class style test</p>
    <p v-bind:class="['text-size', { 'text-bold': true, 'text-red': false }]">
      class style test2
    </p>
    <p v-bind:style="{ color: 'cornflowerblue', 'font-weight': 'bold' }">
      class style test3
    </p>

    <!--
      prop 單向數據流: 父級 prop 的更新會向下流動到子組件中，但是反過來則不行。
      dynamicProp、numProp、boolProp、arrayProp、objectProp:
      以 v-bind 告訴 Vue 是 JavaScript 表達式而非字串。
      boolPropDef: 未賦值，預設為true。
      post: 傳入一個對象的所有 property。

      @enlarge-text: 監聽自定義事件。
      @enlarge-text2、@decrease-text: 監聽子組建拋出的第二參數。

      v-model="checked": component v-model。

      twowayProp: prop 雙向綁定。
      v-bind.sync="objProp" 可將 object objProp 所有 property 傳入並雙向綁定。
    -->
    <h4>component:</h4>
    <div :style="{ fontSize: postFontSize + 'em' }">
      <TestComp
        staticProp="success"
        :dynamicProp="msg"
        :numProp="100"
        boolPropDef
        :boolProp="false"
        :arrayProp="[1, 2, 3]"
        :objectProp="textClass"
        v-bind="post"
        @enlarge-text="postFontSize += 0.1"
        @enlarge-text2="postFontSize += $event"
        @decrease-text="onDecreaseText"
        v-model="checked"
        :twowayProp.sync="twowayProp"
      >
        <!-- 未具名插槽: 未由 template v-slot 包覆的內容，等同 template v-slot:default 包覆的內容 -->
        <!-- <template v-slot:default> -->
        <!-- 若無此內容 default slot，component 則顯示子組建默認 default backup slot -->
        <span style="color: crimson">default slot </span>
        <!-- </template> -->

        <!-- 具名插槽: template v-slot:userName -->
        <!-- <template v-slot:userName="slotProp">
          slotProp: {{ slotProp.user.firstName }}
        </template> -->

        <!-- user 重命名為 person -->
        <!-- <template v-slot:userName="{ user: person }">
          slotProp: {{ person.firstName }}
        </template> -->

        <!-- slot prop undefObj: 因為 component 並未將 undefObj 傳遞過來，故為 undefined 的情形給予預設值 -->
        <!-- 完整語法: v-slot:[slotName] -->
        <!-- 簡寫語法: #[slotName] -->
        <template #[slotName]="{ user, undefObj={role: 'guest'} }">
          slotProp: name: {{ user.firstName }}, role: {{ undefObj.role }}
        </template>
      </TestComp>
      <p>twowayProp in parent: {{ twowayProp }}</p>
    </div>

    <h4>dynamic component:</h4>
    <!--
      // 也可傳入 prop
      <keep-alive>
        <component v-bind:is="'TestComp'" staticProp="danger"></component>
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
    <!-- transition 也可用於 dynamic component -->
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component v-bind:is="currentTabComponent" class="tab" />
      </keep-alive>
    </transition>

    <!-- css 過渡動畫效果 -->
    <h4>css transition:</h4>
    <!-- transition: 應用在單個節點、同一時間渲染多個節點中的一個。
    若有指定 name="slide-fade"，css 類名改前綴為 .slide-fade-enter-active，
    否則使用預設前綴 .v-enter-active。
    mode: 過渡模式，out-in: 當前元素先進行過渡，完成之後新元素過渡進入。 -->
    <transition name="slide-fade" mode="out-in">
      <button @click="show = !show" :key="show">
        {{ show }}
      </button>
    </transition>
    <!--
    <button @click="show = !show">
      Toggle render
    </button>
    <transition name="slide-fade">
      <p v-if="show">hello</p>
    </transition>
    -->

    <h4>list transition:</h4>
    <button @click="onShuffleNumList">Shuffle</button>
    <button @click="onAddNumList">Add</button>
    <button @click="onRemoveNumList">Remove</button>
    <!-- 默認為一個 <span>，也可通過 tag attribute 更換為其他元素。 -->
    <!-- 不可用過渡模式 mode。 -->
    <!-- CSS 過渡的類將會應用在內部的元素中，而不是這個組/容器本身。 -->
    <transition-group name="num-list" tag="p">
      <span v-for="num in numList" :key="num" class="num-list-item">
        {{ num }}
      </span>
    </transition-group>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import TestComp from '@/components/TestComp.vue';
import LoadingComp from '@/components/LoadingComp.vue';
import ErrorComp from '@/components/ErrorComp.vue';

// 處理加載狀態
const PostsComp = () => ({
  // 需要加載的組件 (應是個 `Promise` 對象)
  component: import(
    /* webpackChunkName: "postscomp" */
    '@/components/PostsComp.vue'
  ),
  // 異步組件加載時使用的組件
  loading: LoadingComp,
  // 加載失敗時使用的組件
  error: ErrorComp,
  // 展示加載時組件的延時時間。默認值是 200 (毫秒)
  delay: 200,
  // 如果提供了超時時間且組件加載也超時，
  // 則使用加載失敗時使用的組件。默認值是：`Infinity`
  // timeout: 3000,
});

export default {
  name: 'Study',
  data: () => ({
    // data property 才會是響應式: 即 property 改變，view 會響應
    // Vue 會在初始化實例時對 property 執行 getter/setter 轉化
    msg: `${new Date().toLocaleString()}`,
    msgReverse: '',
    textList: [{ text: 'list1' }, { text: 'list2' }],
    attributeName: 'title',
    eventName: 'click',
    rawHtml:
      '<span style="color: crimson">raw html test. this shold be red.</span>',
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
    twowayProp: 0,
    slotName: 'userName',
    tabs: ['Posts', 'Archive'],
    currentTab: 'Posts',
    show: true,
    numList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    nextNum: 10,
  }),
  computed: {
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
    currentTabComponent: function() {
      return this.currentTab + 'Comp';
    },
  },
  methods: {
    // 方法每次都會重算，不會緩存
    onReverseMsg: function(param, event) {
      this.msgReverse = this.msg
        .split('')
        .reverse()
        .join('');
      alert(`tag name: ${event.target.tagName}, param: ${param}`);
      this.$refs.msgInput.focus();
    },
    onClearMsg: function(event) {
      // 延遲一秒清空
      var debounce = _.debounce(() => $('#msgReverseP').html(''), 1000);
      debounce();
      alert(`tag name: ${event.target.tagName}`);
    },
    onDecreaseText: function(size) {
      this.postFontSize += size;
    },
    onRandomIndex: function() {
      return Math.floor(Math.random() * this.numList.length);
    },
    onAddNumList: function() {
      this.numList.splice(this.onRandomIndex(), 0, this.nextNum++);
    },
    onRemoveNumList: function() {
      this.numList.splice(this.onRandomIndex(), 1);
    },
    onShuffleNumList: function() {
      this.numList = _.shuffle(this.numList);
    },
  },
  components: {
    // components: 模塊局部註冊
    TestComp,
    // async component: PostsComp、ArchiveComp
    // 只在需要的時候才加載模塊，返回 Promise 的函式
    PostsComp,
    ArchiveComp: () =>
      import(
        /* webpackChunkName: "archivecomp" */
        '@/components/ArchiveComp.vue'
      ),
  },
  created: function() {
    // lifecycle hook created: vm 實例被創建之後執行此代碼
    // `this` 指向 vm 實例
    console.log(`vm created, msg is ${this.msg}`);
  },
};
</script>

<style scoped lang="scss">
h4 {
  color: cadetblue;
}

div {
  text-align: left;
}

.text-bold {
  font-weight: bold;
}

.text-red {
  color: crimson;
}

.text-size {
  font-size: 20px;
}

.multi-line {
  white-space: pre-wrap;
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

/* 可以設置不同的進入和離開動畫 */
/* 設置持續時間和動畫函數 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}

.num-list-item {
  transition: all 1s;
  display: inline-block; // 因 Vue 使用的 FLIP 動畫，過渡元素不能設置為 display: inline
  margin-right: 10px;
}

.num-list-enter, .num-list-leave-to
/* .num-list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.num-list-leave-active {
  position: absolute;
}
</style>
