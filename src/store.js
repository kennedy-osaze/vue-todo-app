import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      { id: 1, title: 'Finish Vue set up', completed: false },
      { id: 2, title: 'Become a rock star overnight', completed: false }
    ]
  },
  getters: {
    remaining (state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    todosFiltered (state) {
      if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      }

      if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }

      return state.todos
    },
    showClearCompleted (state) {
      return state.todos.filter(todo => todo.completed).length > 0
    },
    todosCount (state) {
      return state.todos.length
    }
  },
  mutations: {
    ADD_TODO (state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed
      })
    },
    UPDATE_TODO (state, editedTodo) {
      const index = state.todos.findIndex(todo => todo.id === editedTodo.id)
      state.todos.splice(index, 1, {
        id: editedTodo.id,
        title: editedTodo.title,
        completed: editedTodo.completed
      })
    },
    DELETE_TODO (state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      state.todos.splice(index, 1)
    },
    UPDATE_FILTER (state, payload) {
      state.filter = payload.filter
    },
    CHECK_ALL (state, payload) {
      state.todos.forEach(function (todo) {
        todo.completed = payload.checked
      })
    },
    CLEAR_COMPLETED (state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  },
  actions: {

  }
})
