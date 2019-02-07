<template>
  <div id="app">
		<NavBar/>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
	import NavBar from './components/Navbar'
	export default {
		name: "App",
		components: {
			NavBar
		}
	}
</script>

<style lang="scss">
.btn {
  margin-right: 10px;
}
</style>
