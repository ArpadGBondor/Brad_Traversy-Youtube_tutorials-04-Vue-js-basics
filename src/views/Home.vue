<template>
  <AddTask v-show="showAddTask" @form-submit="addTask" />
  <Tasks @delete-task="deleteTask" @toggle-reminder="toggleReminder" :tasks="tasks" />
</template>

<script>
import AddTask from '../components/AddTask';
import Tasks from '../components/Tasks';

export default {
  props: {
    showAddTask: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AddTask,
    Tasks,
  },
  methods: {
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id);
      const updTask = {
        ...taskToToggle,
        reminder: !taskToToggle.reminder,
      };

      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updTask),
      });
      const data = await res.json();

      this.tasks = this.tasks.map((task) => (id !== task.id ? task : data));
    },
    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.status === 200) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        } else {
          alert('Error deleting task');
        }
      }
    },
    async addTask(task) {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },
    async fetchTasks() {
      const res = await fetch('/api/tasks');
      console.log(res);
      const data = await res.json();
      console.log(data);

      return data;
    },
    async fetchTask(id) {
      const res = await fetch(`/api/tasks/${id}`);
      const data = await res.json();
      return data;
    },
  },
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>

<style scoped></style>
