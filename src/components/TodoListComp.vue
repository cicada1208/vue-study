<template>
  <div>
    <TextModelInputComp
      v-model="newTodoText"
      placeholder="New todo"
      @keydown.enter="onAddTodo"
    />
    <ul v-if="todos.length">
      <TodoListItemComp
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="onRemoveTodo"
      />
    </ul>
    <p v-else>
      Nothing left in the list. Add a new todo in the input above.
    </p>
  </div>
</template>

<script>
let nextTodoId = 1;

export default {
  data() {
    return {
      newTodoText: '',
      todos: [
        {
          id: nextTodoId++,
          text: 'Learn Vue',
        },
      ],
    };
  },
  methods: {
    onAddTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText,
        });
        this.newTodoText = '';
      }
    },
    onRemoveTodo(idToRemove) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== idToRemove;
      });
    },
  },
  components: {
    TextModelInputComp: () =>
      import(
        /* webpackChunkName: "text-model-input-comp" */
        '@/components/TextModelInputComp.vue'
      ),
    TodoListItemComp: () =>
      import(
        /* webpackChunkName: "todo-list-item-comp" */
        '@/components/TodoListItemComp.vue'
      ),
  },
};
</script>
