<template>
  <div>
    <TextModelInput
      v-model="newTodoText"
      placeholder="New todo"
      @keydown.enter="addTodo"
    />
    <ul v-if="todos.length">
      <TodoListItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
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
    addTodo() {
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText,
        });
        this.newTodoText = '';
      }
    },

    removeTodo(idToRemove) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== idToRemove;
      });
    },
  },

  components: {
    TextModelInput: () =>
      import(
        /* webpackChunkName: "text.model.input" */
        '@/components/TextModelInput.vue'
      ),

    TodoListItem: () =>
      import(
        /* webpackChunkName: "todo.list.item" */
        '@/components/TodoListItem.vue'
      ),
  },
};
</script>
