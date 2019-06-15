<template>
  <footer class="footer">
    <div class="container">
      <div class="checkbox">
        <input type="checkbox" id="checkbox-all" class="regular-checkbox" :checked="remaining === 0" @change="checkAllChanged">
        <label class="checkbox-label" for="checkbox-all"></label>
        <span class="todo-item-label">Check All</span>
      </div>

      <div>{{ remaining }} {{ ' item' | pluralize(remaining) }} left</div>
    </div>
    <div class="container px-0">
      <div>
        <button type="button" class="btn position-left" :class="{ active: filter === 'all' }" @click="changeFilter('all')">All</button>
        <button type="button" class="btn position-left" :class="{ active: filter === 'active' }" @click="changeFilter('active')">Active</button>
        <button type="button" class="btn position-left" :class="{ active: filter === 'completed' }" @click="changeFilter('completed')">Completed</button>
      </div>

      <div>
        <transition name="fade">
          <button v-if="showClearCompleted" type="button" class="btn btn-red" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

const pluralize = (str, count = 2) => str + ((count === 1) ? '' : 's');

export default {
  name: 'TodoListMeta',
  filters: {
    pluralize(word, count) {
      return pluralize(word, count);
    }
  },
  computed: {
    ...mapGetters(['remaining', 'showClearCompleted']),
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.commit('UPDATE_FILTER', { filter });
    },
    checkAllChanged($event) {
      this.$store.commit('CHECK_ALL', { checked: $event.target.checked });
    },
    clearCompleted() {
      this.$store.commit('CLEAR_COMPLETED');
    }
  }
}
</script>

<style scoped>
  footer .footer {
    margin-bottom: 14px;
    margin-top: 25px;
  }

  footer .container {
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
