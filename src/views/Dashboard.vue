<template>
  <div class="home">
    <h1>Dashboard</h1>
    <Spinner :isShow="isRequestingUsers" />
    <ul v-if="!isRequestingUsers" class="collection with-header">
      <li class="collection-header">Users</li>
      <li v-for="user in users" :key="user.id" class="collection-item">
        <span class="chip">{{ user.position }}</span>
        {{ user.name }}
        <router-link
          class="secondary-content"
          :to="{ name: 'viewUser', params: { userId: user.id } }"
        >
          <button class="btn waves-effect waves-light">
            <span>View </span>
            <i class="fa fa-eye"></i>
          </button>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/users/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Spinner from "../components/Spinner";
import { getUsers } from "../services/api";
import { functions } from "../services/firebase";

export default {
  name: "home",
  data() {
    return {
      users: [],
      isRequestingUsers: false
    };
  },
  components: {
    Spinner
  },
  async created() {
    this.isRequestingUsers = true;
    const users = await getUsers();
    this.users = users;
    this.isRequestingUsers = false;
    const helloWorldFunction = functions.httpsCallable('helloWorld');
    await helloWorldFunction();
  }
};
</script>

<style></style>
