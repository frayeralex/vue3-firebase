<template>
  <div class="user">
    <h1>View User</h1>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">{{ userId }}</li>
      <li class="collection-item">{{ email }}</li>
      <li class="collection-item">{{ position }}</li>
    </ul>
    <router-link to="/" class="btn grey waves-effect waves-light"
    >Back</router-link
    >
    <button @click="openModal" class="btn red waves-effect waves-light">
      Delete
    </button>
    <div class="fixed-action-btn">
      <router-link
              :to="{ name: 'editUser', params: { userId: $route.params.userId } }"
              class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
    <Modal :open="isDeleteModalOpen">
      <h4>Are you sure?</h4>
      <p>It will remove user {{ name }}!</p>
      <template slot="footer">
        <button @click="closeModal" class="btn grey waves-effect waves-light">
          No
        </button>
        <button @click="deleteUser" class="btn red waves-effect waves-light">
          Ok
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import api from "../services/api";
import Modal from "../components/Modal";

export default {
  name: "ViewUser",
  components: {
    Modal
  },
  created() {
    if (this.$route.params.userId && !this.userId) {
      this.fetchData();
    }
  },
  async beforeRouteEnter(to, from, next) {
    const user = await api.user.getById(to.params.userId);
    next(vm => {
      (vm.userId = user.user_id),
        (vm.name = user.name),
        (vm.position = user.position),
        (vm.email = user.email);
    });
  },
  data() {
    return {
      userId: null,
      name: null,
      position: null,
      email: null,
      isDeleteModalOpen: false
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    async fetchData(vm = this) {
      const user = await api.user.getById(this.$route.params.userId);
      vm.userId = user.user_id;
      vm.name = user.name;
      vm.position = user.position;
      vm.email = user.email;
    },
    async deleteUser() {
      try {
        await api.user.deleteById(this.$route.params.userId);
        this.$router.push("/");
      } catch (e) {
        alert(e);
      }
    },
    openModal() {
      this.isDeleteModalOpen = true;
    },
    closeModal() {
      this.isDeleteModalOpen = false;
    }
  }
};
</script>

<style scoped></style>
