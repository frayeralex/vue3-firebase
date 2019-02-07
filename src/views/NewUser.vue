<template>
  <div>
    <h1>New user page</h1>
    <div class="row">
      <form @submit.prevent="save">
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
        <div class="row">
          <button class="btn waves-effect waves-light" type="submit">
            Submit
          </button>
          <router-link to="/" class="btn grey waves-effect waves-light"
            >Back</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "NewUser",
  data() {
    return {
      name: "",
      email: "",
      userId: "",
      position: ""
    };
  },
  methods: {
    async save() {
      try {
        await api.user.create({
          name: this.name,
          email: this.email,
          user_id: this.userId,
          position: this.position
        });
        this.$router.push("/");
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style scoped></style>
