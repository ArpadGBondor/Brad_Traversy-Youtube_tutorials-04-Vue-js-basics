<template>
  <div @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task', 'noselect']">
    <h3>
      {{ task.text }}
      <fa class="times" icon="times" @click="$emit('delete-task', task.id)" />
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
import Button from './Button';

export default {
  name: 'Task',
  emits: ['delete-task', 'toggle-reminder'],
  components: {
    Button,
  },
  props: {
    task: {
      type: Object,
      default: {
        id: 0,
        text: 'default text',
        day: 'default day',
        reminder: false,
      },
    },
  },
};
</script>

<style scoped>
.times {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
