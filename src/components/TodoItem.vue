<template>
  <div class="todo-item">
    <div class="todo-item-content">
      <div v-show="!editing">
        <input type="checkbox" :id="'checkbox-' + index" class="regular-checkbox" v-model="completed" @change="doneEdit">
        <label class="checkbox-label" :for="'checkbox-' + index"></label>
      </div>

      <div v-if="!editing" class="todo-item-label" :class="{ completed: completed }" @dblclick="editTodo">
        {{ title }}
      </div>

      <input v-else type="text" class="todo-item-edit" size="200" v-model.trim="title" @blur="doneEdit" @keyup.enter="$event.target.blur()" @keyup.esc="cancelEdit" v-focus>
    </div>
    <button v-show="!editing" class="remove-item" @click="removeTodo">&times;</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  props: {
    todo: { type: Object, required: true },
    index: { type: Number, required: true },
    checkAll: { type: Boolean, required: true }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ''
    }
  },
  watch: {
    checkAll(value) {
      this.completed = value ? true : this.todo.completed;
    }
  },
  methods: {
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (!this.title.length) {
        this.title = this.beforeEditCache;
      }

      this.editing = false;
      this.$emit('finished-edit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        }
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    removeTodo() {
      this.$emit('removed-todo', this.index)
    }
  }
}
</script>

<style>
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border: 1px solid #eee;
    animation-duration: 0.3s;
  }

  .todo-item-content {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
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
</style>
