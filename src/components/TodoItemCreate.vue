<template>
  <form @submit.prevent="addTodo">
    <input type="text" class="todo-input" placeholder="What needs to be done?" v-model.trim="newTodo">
  </form>
</template>

<script>
export default {
  name: 'TodoItemCreate',
  data() {
    return {
      newTodo: '',
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo !== '') {
        eventBus.$emit('add-todo-item', { 'newTodo': this.newTodo });

        this.newTodo = '';
      }
    }
  }
}
</script>

<style scoped>
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .todo-input:focus {
    outline: 0;
  }

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .todo-input:focus {
    outline: 0;
  }
</style>
