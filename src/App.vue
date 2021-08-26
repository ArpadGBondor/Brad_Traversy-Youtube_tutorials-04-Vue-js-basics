<template>
  <div class="container">
    <Nav />
    <div class="main">
      <Header :showAddTask="showAddTask" @click-toggle-show="toggleShowAddTask" />
      <router-view :showAddTask="showAddTask"></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Nav,
  },
  methods: {
    toggleShowAddTask() {
      this.showAddTask = !this.showAddTask;
    },
  },
  data() {
    return {
      showAddTask: false,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  border-radius: 5px;
}

.main {
  padding: 30px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  margin: 0.25em;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
