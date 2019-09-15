import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8081'

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: []
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
    RETRIEVE_TODO (state, todos) {
      state.todos = todos
    },
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
    retrieveTodos ({ commit }) {
      axios.get('todos')
        .then(response => {
          commit('RETRIEVE_TODO', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo ({ commit }, todo) {
      axios.post('todos', {
        'title': todo.title, completed: false
      })
        .then(response => {
          commit('ADD_TODO', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTodo ({ commit }, editedTodo) {
      axios.put(`todos/${editedTodo.id}`, {
        'title': editedTodo.title, completed: Boolean(editedTodo.completed)
      })
        .then(response => {
          commit('UPDATE_TODO', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTodo ({ commit }, payload) {
      axios.delete(`todos/${payload.id}`)
        .then(response => {
          commit('DELETE_TODO', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkAll ({ commit }, payload) {
      axios.put('todos', {
        completed: Boolean(payload.checked)
      })
        .then(response => {
          commit('CHECK_ALL', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateFilter ({ commit }, payload) {
      commit('UPDATE_FILTER', payload)
    },
    clearCompleted ({ commit, state }) {
      const completed = state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id)

      axios.delete('todos/completed', {
        data: {
          todos: completed
        }
      })
        .then(response => {
          commit('CLEAR_COMPLETED')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
