<template>
  <div class="todo-list">
    <div v-if="todosCount > 0">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item
          v-for="todo in todosFiltered"
          :key="todo.id"
          :todo="todo"
          :check="!remaining"
        ></todo-item>
      </transition-group>

      <todo-list-meta></todo-list-meta>
    </div>

    <div v-if="!$store.state.loading && todosCount === 0">
      <p class="text-center lh-1-5">
        No todos yet<br><small> Add a todo to get started.</small>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoItem from './TodoItem'
import TodoListMeta from  './TodoListMeta'

export default {
  name: 'TodoList',
  components: { TodoItem, TodoListMeta },
  computed: {
    ...mapGetters([
      'remaining',
      'todosCount',
      'todosFiltered',
      'showClearCompleted',
    ]),
  },
  created() {
    this.$store.dispatch('initRealTimeListeners');
    
    this.$store.dispatch('retrieveTodos');
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted');
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
