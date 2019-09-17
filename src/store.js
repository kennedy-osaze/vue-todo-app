import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [],
    loading: false
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
    RETRIEVE_TODOS (state, todos) {
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
    retrieveTodos ({ commit, state }) {
      const todos = []

      state.loading = true

      db.collection('todos').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            todos.push({ id: doc.id, ...doc.data() })
          })

          const orderedTodos = todos.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds
          })

          state.loading = false

          commit('RETRIEVE_TODOS', orderedTodos)
        })
        .catch(error => {
          state.loading = false

          console.log(error)
        })
    },
    addTodo ({ commit, state }, todo) {
      state.loading = true

      db.collection('todos').add({
        title: todo.title,
        completed: todo.completed,
        timestamp: new Date()
      })
        .then((docRef) => {
          state.loading = false

          commit('ADD_TODO', {
            id: docRef.id,
            title: todo.title,
            completed: todo.completed
          })
        })
        .catch(error => {
          state.loading = false

          console.log(error)
        })
    },
    updateTodo ({ commit, state }, editedTodo) {
      state.loading = true

      db.collection('todos').doc(editedTodo.id).set({
        title: editedTodo.title,
        completed: editedTodo.completed,
        timestamp: new Date()
      })
        .then(() => {
          state.loading = false

          commit('UPDATE_TODO', editedTodo)
        })
        .catch(error => {
          state.loading = false

          console.log(error)
        })
    },
    deleteTodo ({ commit, state }, payload) {
      state.loading = true

      db.collection('todos').doc(payload.id).delete()
        .then(() => {
          state.loading = false

          commit('DELETE_TODO', payload)
        })
        .catch(error => {
          state.loading = false

          console.log(error)
        })
    },
    checkAll ({ commit, state }, payload) {
      state.loading = true

      const batch = db.batch()

      state.todos.forEach(todo => {
        const todoRef = db.collection('todos').doc(todo.id)
        batch.update(todoRef, { completed: payload.checked })
      })

      batch.commit()
        .then(() => {
          state.loading = false

          commit('CHECK_ALL', payload)
        })
        .catch(error => {
          state.loading = false

          console.log(error)
        })
    },
    updateFilter ({ commit }, payload) {
      commit('UPDATE_FILTER', payload)
    },
    clearCompleted ({ commit, state }) {
      const batch = db.batch()
      const completedTodos = state.todos.filter(todo => todo.completed)

      state.loading = true

      completedTodos.forEach(todo => {
        const todoRef = db.collection('todos').doc(todo.id)
        batch.delete(todoRef)
      })

      batch.commit()
        .then(() => {
          state.loading = false

          commit('CLEAR_COMPLETED')
        })
        .catch(error => {
          state.loading = false

          console.log(error)
        })
    }
  }
})
