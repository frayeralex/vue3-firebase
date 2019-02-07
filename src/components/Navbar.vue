<template>
  <div>
    <nav>
      <div class="nav-wrapper green">
        <router-link class="brand-logo" to="/"> Vue + Firebase</router-link>
        <a href="#" data-target="mobile-sidebar" class="sidenav-trigger">
          <i class="fa fa-bars" />
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/auth">Auth</router-link></li>
          <li><router-link to="/upload">Upload</router-link></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-sidebar">
      <li><router-link to="/auth">Auth</router-link></li>
      <li><router-link to="/upload">Upload</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      mobileMenu: null
    };
  },
  mounted() {
    const node = document.getElementById("mobile-sidebar");
    this.mobileMenu = M.Sidenav.init(node, this.options);
    $(node).sidenav();
  }
};
</script>

<style scoped></style>
