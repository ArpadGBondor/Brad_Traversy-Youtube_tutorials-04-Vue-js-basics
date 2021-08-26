<template>
  <div class="nav">
    <ul>
      <li>
        <router-link to="/"><a>Home</a></router-link>
      </li>
      <li>
        <router-link to="/about"><a>About</a></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.nav {
  height: 50px;
  padding: 10px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.nav ul li a {
  margin: 5px 15px;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
}

.nav ul li a:hover {
  color: #ddd;
}
</style>
