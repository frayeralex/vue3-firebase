<template>
  <div class="edit-user">
    <h1>Edit User page</h1>
    <div class="row">
      <form @submit.prevent="update">
        <div class="row">
          <div class="input-field col s6">
            <input id="name" type="text" v-model="name" required />
            <label for="name">User name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s7">
            <input id="position" type="text" v-model="position" required />
            <label for="position">Position</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <input id="userId" type="text" v-model="userId" required />
            <label for="userId">User ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s9">
            <input id="email" type="email" v-model="email" required />
            <label for="email">Email</label>
          </div>
        </div>
        <button class="btn" type="submit">Submit</button>
        <router-link to="/" class="btn grey">Back</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { auth } from "../services/firebase";

export default {
  name: "EditUser",
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
  mounted() {
    setImmediate(M.updateTextFields);
  },
  data() {
    return {
      userId: null,
      name: null,
      position: null,
      email: null
    };
  },
  watch: {
    $route: "fetchData",
    userID: function() {
      setImmediate(M.updateTextFields);
    }
  },
  methods: {
    async fetchData() {
      const user = await api.user.getById(this.$route.params.userId);
      this.userId = user.user_id;
      this.name = user.name;
      this.position = user.position;
      this.email = user.email;
    },
    async update() {
      try {
        await api.user.update(this.$route.params.userId, {
          user_id: this.userId,
          name: this.name,
          position: this.position,
          email: this.email,
          ownerID: auth.currentUser.uid
        });
        this.$router.back();
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style scoped></style>
