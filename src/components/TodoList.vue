<template>
  <div class="todo-list">
    <div v-if="todos.length > 0">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item
          v-for="todo in todosFiltered"
          :key="todo.id"
          :todo="todo"
          :checkAll="!remaining"
          @finished-edit="finishedEdit"
          @removed-todo="removeTodo"
        ></todo-item>
      </transition-group>

      <todo-list-meta
        :remaining="remaining"
        :filter.sync="filter"
        :show-clear-completed="showClearCompleted"
        @all-todos-checked="checkAllTodos"
        @completed-cleared="clearCompleted"
      ></todo-list-meta>
    </div>

    <div v-else>
      <p class="text-center lh-1-5">
        No todos yet<br><small> Add a todo to get started.</small>
      </p>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoListMeta from  './TodoListMeta'

export default {
  name: 'TodoList',
  components: { TodoItem, TodoListMeta },
  data() {
    return {
      filter: 'all',
      todos: [
        { id: 1, title: 'Finish Vue set up', completed: false },
        { id: 2, title: 'Become a rock star overnight', completed: false }
      ]
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    todosFiltered() {
      if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      }

      if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed)
      }

      return this.todos;
    },
    showClearCompleted() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  created() {
    eventBus.$on('add-todo-item', this.addTodo);
  },
  beforeDestroy() {
    eventBus.$off('add-todo-item', this.addTodo);
  },
  methods: {
    addTodo(data) {
      this.todos.push({ id: this.todos.length + 1, title: data.newTodo, completed: false })
    },
    finishedEdit({ modifiedTodo }) {
      const todoIndex = this.todos.findIndex(todo => todo.id === modifiedTodo.id);

      this.todos.splice(todoIndex, 1, modifiedTodo)
    },
    removeTodo({ todoId }) {
      const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

      this.todos.splice(todoIndex, 1);
    },
    checkAllTodos() {
      this.todos.forEach(todo => todo.completed = event.target.checked);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>

<style scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

  .lh-1-5 {
    line-height: 1.5 !important;
  }

  .checkbox {
    display: flex;
    align-items: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    transition: opacity;
  }
</style>
