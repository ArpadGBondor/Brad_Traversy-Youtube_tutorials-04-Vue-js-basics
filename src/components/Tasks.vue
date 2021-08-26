<template>
  <div :key="task.id" v-for="task in tasks">
    <Task
      @delete-task="(id) => this.$emit('delete-task', id)"
      @toggle-reminder="(id) => this.$emit('toggle-reminder', id)"
      :task="task"
    />
  </div>
</template>

<script>
import Task from './Task';

export default {
  name: 'Tasks',
  emits: ['delete-task', 'toggle-reminder'],
  components: {
    Task,
  },
  props: {
    tasks: {
      type: Array,
      default: [],
    },
  },
};
</script>
