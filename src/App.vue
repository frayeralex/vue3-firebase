<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper green">
        <div class="container">
          <router-link class="brand-logo" to="/"> Vue + Firebase</router-link>
        </div>
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
