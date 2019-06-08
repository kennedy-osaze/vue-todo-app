<template>
  <div class="home">
    <!-- <img alt="Vue logo" class="logo" src="../assets/logo.png"> -->
    <h1 class="header">Hello, Kennedy</h1>
    <todo-item-create></todo-item-create>
    <todo-list></todo-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from '@/components/TodoList.vue'
import TodoItemCreate from '@/components/TodoItemCreate.vue'

export default {
  name: 'home',
  components: { TodoList, TodoItemCreate }
}
</script>

<style scoped>
  .header {
    font-weight: 100;
    font-size: 3em;
    text-align: center;
    margin-top: 1.5em;
  }
</style>
