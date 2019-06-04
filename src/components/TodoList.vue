<template>
  <div class="todo-list">
    <form @submit.prevent="addTodo">
      <input type="text" class="todo-input" placeholder="What needs to be done?" v-model.trim="newTodo">
    </form>
    <div v-if="todos.length > 0">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
          <div class="todo-item-content">
            <div v-show="!todo.editing">
              <input type="checkbox" :id="'checkbox-' + index" class="regular-checkbox" v-model="todo.completed">
              <label class="checkbox-label" :for="'checkbox-' + index"></label>
            </div>

            <div v-if="!todo.editing" class="todo-item-label" :class="{ completed: todo.completed }" @dblclick="editTodo(todo)">
              {{ todo.title }}
            </div>

            <input v-else type="text" class="todo-item-edit" size="200" v-model.trim="todo.title" @blur="doneEdit(todo)" @keyup.enter="$event.target.blur()" @keyup.esc="cancelEdit(todo)" v-focus>
          </div>
          <button v-show="!todo.editing" class="remove-item" @click="removeTodo(index)">&times;</button>
        </div>
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
const pluralize = (str, count = 2) => str + ((count === 1) ? '' : 's');

export default {
  name: 'TodoList',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      newTodo: '',
      todoBeforeEditCache: '',
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
    editTodo(todo) {
      this.todoBeforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (!todo.title.length) {
        todo.title = this.todoBeforeEditCache;
      }

      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.todoBeforeEditCache;
      todo.editing = false;
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

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border: 1px solid #eee;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    font-size: 30px;
    color: #ef5350;
    background: transparent;
    border: 0;
    margin-left: 10px;
  }

  .remove-item:hover, .remove-item:focus {
    color: #bb4341;
    outline: 0;
  }

  .lh-1-5 {
    line-height: 1.5 !important;
  }

  .todo-item-content, .checkbox {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
  }

  .todo-item-edit {
    font-size: 16px;
    color: #2c3e50;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif
  }

  .todo-item-edit:focus {
    outline: none;
  }

  label.checkbox-label {
    display: inline;
  }

  .regular-checkbox {
    display: none;
  }

  .regular-checkbox + label {
    background-color: #fafafa;
    border: 1px solid #cacece;
    padding: 13px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }

  .regular-checkbox + label:active,
  .regular-checkbox:checked  +label:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .regular-checkbox:checked + label {
    background-color: #fff;
    border: 1px solid #adb8c0;
    color: #99a1a7;
  }

  .regular-checkbox:checked + label:after {
    content: '\2714';
    font-size: 20px;
    position: absolute;
    top: 0px;
    left: 5px;
    color: #2c3e50;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
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

  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 3px 10px;
    font-size: 13px;
    line-height: 1.5384616;
    user-select: none;
    color: #333;
    background-color: #fcfcfc;
    border-color: #ddd;
    position: relative;
    outline: none;
  }

  .btn:hover, .btn:focus .btn.active {
    background-color: #fcfcfc;
    border-color: #ddd;
    outline: none;
    box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
  }

  .btn.active {
    color: #fff;
    background-color: #2196F3;
    border-color: #2196F3;
  }

  .btn-blue {
    background-color: #2196F3;
    border-color: #2196F3;
    color: #fff;
  }

  .btn-blue:hover, .btn-blue:focus {
    background-color: #2196F3;
    border-color: #2196F3;
  }

  .btn-red {
    background-color: #D32F2F;
    border-color: #D32F2F;
    color: #fff;
  }

  .btn-red:hover, .btn-red:focus {
    background-color: #D32F2F;
    border-color: #D32F2F;
  }

  .position-left {
    margin-right: 10px;
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
