<template>
  <footer class="footer">
    <div class="container">
      <div class="checkbox">
        <input type="checkbox" id="checkbox-all" class="regular-checkbox" :checked="remaining === 0" @change="$emit('all-todos-checked')">
        <label class="checkbox-label" for="checkbox-all"></label>
        <span class="todo-item-label">Check All</span>
      </div>

      <div>{{ remaining }} {{ ' item' | pluralize(remaining) }} left</div>
    </div>
    <div class="container px-0">
      <div>
        <button type="button" class="btn position-left" :class="{ active: currentFilter === 'all' }" @click="currentFilter = 'all'">All</button>
        <button type="button" class="btn position-left" :class="{ active: currentFilter === 'active' }" @click="currentFilter = 'active'">Active</button>
        <button type="button" class="btn position-left" :class="{ active: currentFilter === 'completed' }" @click="currentFilter = 'completed'">Completed</button>
      </div>

      <div>
        <transition name="fade">
          <button v-if="showClearCompleted" type="button" class="btn btn-red" @click="$emit('completed-cleared')">Clear Completed</button>
        </transition>
      </div>
    </div>
  </footer>
</template>

<script>
const pluralize = (str, count = 2) => str + ((count === 1) ? '' : 's');

export default {
  name: 'TodoListMeta',
  filters: {
    pluralize(word, count) {
      return pluralize(word, count);
    }
  },
  props: {
    remaining: {
      type: Number,
      required: true
    },
    showClearCompleted: {
      type: Boolean,
      required: true
    },
    filter: {
      type: String,
      required: true,
      validator: value => ['all', 'active', 'completed'].includes(value)
    }
  },
  data() {
    return {
      currentFilter: this.filter
    }
  },
  watch: {
    currentFilter(filter) {
      this.$emit('update:filter', this.currentFilter)
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
