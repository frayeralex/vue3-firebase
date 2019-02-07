<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper green">
				<router-link class="brand-logo" to="/"> Vue + Firebase</router-link>
				<ul id="nav-mobile" class="right hide-on-med-and-down">
					<li><router-link to="/auth">Auth</router-link></li>

				</ul>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.btn {
  margin-right: 10px;
}
</style>
