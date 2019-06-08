<template>
  <div class="todo-list">
    <form @submit.prevent="addTodo">
      <input type="text" class="todo-input" placeholder="What needs to be done?" v-model.trim="newTodo">
    </form>
    <div v-if="todos.length > 0">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item
          v-for="(todo, index) in todosFiltered"
          :key="todo.id"
          :todo="todo"
          :index="index"
          :checkAll="!remaining"
          @finished-edit="finishedEdit"
          @removed-todo="removeTodo"
        ></todo-item>
      </transition-group>

      <footer class="footer">
        <div class="container">
          <div class="checkbox">
            <input type="checkbox" id="checkbox-all" class="regular-checkbox" :checked="remaining === 0" @change="checkAllTodos">
            <label class="checkbox-label" for="checkbox-all"></label>
            <span class="todo-item-label">Check All</span>
          </div>

          <div>{{ remaining + pluralize(' item', remaining) }} left</div>
        </div>
        <div class="container px-0">
          <div>
            <button type="button" class="btn position-left" :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
            <button type="button" class="btn position-left" :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
            <button type="button" class="btn position-left" :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
          </div>

          <div>
            <transition name="fade">
              <button v-if="showClearCompleted" type="button" class="btn btn-red" @click="clearCompleted">Clear Completed</button>
            </transition>
          </div>
        </div>
      </footer>
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

const pluralize = (str, count = 2) => str + ((count === 1) ? '' : 's');

export default {
  name: 'TodoList',
  components: {
    'todo-item': TodoItem
  },
  data() {
    return {
      newTodo: '',
      filter: 'all',
      todos: [
        { id: 1, title: 'Finish Vue set up', completed: false, editing: false },
        { id: 2, title: 'Become a rock star overnight', completed: false, editing: false }
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
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    addTodo() {
      if (this.newTodo !== '') {
        this.todos.push({ id: this.todos.length + 1, title: this.newTodo, completed: false })
        this.newTodo = ''
      }
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo)
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
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

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .todo-input:focus {
    outline: 0;
  }

  .lh-1-5 {
    line-height: 1.5 !important;
  }

  .checkbox {
    display: flex;
    align-items: center;
  }

  .footer {
    margin-bottom: 14px;
    margin-top: 25px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border-top: 1px solid #eeeeee;
    padding: 10px 15px;
  }

  footer .container a {
    text-decoration: none;
    color: #2c3e50;
  }

  .px-0 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    transition: opacity;
  }
</style>
