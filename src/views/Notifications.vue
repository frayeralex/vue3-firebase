<template>
  <div class="notifications">
    <h1>Notifications</h1>
    <form @submit.prevent="submitHandler">
      <div class="row">
        <div class="input-field col">
          <input id="username" type="text" v-model="username" required />
          <label for="username">Username</label>
        </div>
      </div>
      <button class="btn" type="submit">Send</button>
    </form>
    <ul class="collection with-header">
      <li class="collection-header">User count {{ users.length }}</li>
      <li class="collection-item" :key="user.id" v-for="(user, index) in users">
        <span class="chip">Likes: {{ user.likes }} </span>
				<input
					class="reset-styles"
					type="text" v-model="user.username" @blur="usernameBlurHandler(index)">
        <button @click="removeUser(index)" class="btn red secondary-content">
          <i class="fa fa-trash"></i>
        </button>
        <button
          @click="decrementUserLike(index)"
          class="btn grey secondary-content"
        >
          <i class="fa fa-thumbs-down"></i>
        </button>
        <button @click="incrementUserLike(index)" class="btn secondary-content">
          <i class="fa fa-thumbs-up"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import { RTDatabase, auth } from "../services/firebase";

export default {
  name: "Notifications",
  data() {
    return {
      username: null,
      users: []
    };
  },
  mounted() {
    this.usersRef = RTDatabase.ref("/users").orderByChild('likes');
    this.usersRef.on("value", this.handleUsersSubscriptionUpdates.bind(this));
    if (auth.currentUser) {
      const myConnectionsRef = RTDatabase.ref(`users/${auth.currentUser.uid}/connections`);
      const lastOnlineRef = firebase.database().ref(`users/${auth.currentUser.uid}/lastOnline`);
      const connectedRef = RTDatabase.ref('.info/connected');
      connectedRef.on('value', function(snap) {
        if (snap.val() === true) {
          const con = myConnectionsRef.push();
          con.onDisconnect().remove();
          con.set(true);
          lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
        }
      });
		}
  },
	beforeDestroy() {
    this.usersRef.off();
	},
  methods: {
    handleUsersSubscriptionUpdates(snapshot) {
      const users = [];
      snapshot.forEach(item => {
        users.push({
          id: item.key,
          ...item.val()
        });
      });
      this.users = users;
    },
    async submitHandler() {
      const userData = {
        username: this.username,
        likes: 0
      };

      const newUserKey = RTDatabase.ref()
        .child("users")
        .push().key;
      const updates = {};
      updates["/users/" + newUserKey] = userData;

      await RTDatabase.ref().update(updates);
      this.username = "";
    },
    async incrementUserLike(index) {
      const { id, likes = 0 } = this.users[index];
      await RTDatabase.ref().update({
        [`/users/${id}/likes`]: likes + 1
      });
    },
		async usernameBlurHandler(index) {
      const { id, username = '' } = this.users[index];
      await RTDatabase.ref().update({
        [`/users/${id}/username`]: username
      });
    },
    async decrementUserLike(index) {
      const { id, likes = 0 } = this.users[index];
      if (likes - 1 >= 0) {
        await RTDatabase.ref().update({
          [`/users/${id}/likes`]: likes - 1
        });
      }
    },
    async removeUser(index) {
      const { id } = this.users[index];
      await RTDatabase.ref(`/users/${id}`).remove();
    }
  }
};
</script>

<style scoped>
.reset-styles {
	display: inline-block;
	width: auto !important;
	padding-left: 15px !important;
}

</style>
