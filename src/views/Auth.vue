<template>
  <div class="auth">
    <div class="row" v-if="isAuthChecked && user">
      <div>Name: {{ user.displayName }}</div>
      <div>email: {{ user.email }}</div>
      <div>emailVerified: {{ user.emailVerified }}</div>
      <div>photoURL: {{ user.photoURL }}</div>
      <img
        v-if="user && user.photoURL"
        :src="user.photoURL"
        :alt="user.displayName"
      />
      <div>Is Anonymous: {{ user.isAnonymous }}</div>
      <button @click="logout" class="btn red">Logout</button>
    </div>
    <form v-if="isAuthChecked && !user" @submit.prevent="handleAuth">
      <div class="row">
        <h3>Sign {{ isSignInMode ? "in" : "up" }} with email and password</h3>
      </div>
      <div class="row">
        <div
          class="input-field col"
          :class="{ s7: isSignInMode, s6: !isSignInMode }"
        >
          <input id="email" type="email" v-model="email" required />
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div
          class="input-field col"
          :class="{ s7: !isSignInMode, s6: isSignInMode }"
        >
          <input id="password" type="password" v-model="password" required />
          <label for="password">Password</label>
        </div>
      </div>
      <div v-if="!isSignInMode" class="row">
        <div class="input-field col s7">
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
          />
          <label for="confirmPassword">Confirm Password</label>
        </div>
      </div>
      <button class="btn" type="submit">Submit</button>
      <span @click="toggleAuthMode" class="btn grey" type="button">
        {{ !isSignInMode ? "Login" : "Register" }}
      </span>
    </form>
    <div class="row">
      <h3>Facebook flow</h3>
      <button @click="loginWithFB" class="btn" type="button">
        Continue with facebook
      </button>
      <h3>Google flow</h3>
      <button @click="loginWithGoogle" class="btn" type="button">
        Continue with google
      </button>
    </div>
    <form @submit.prevent="phoneFormSubmitHandler">
      <div class="row">
        <div class="input-field col s7">
          <input
            :disabled="confirmationResult"
            id="phoneNumber"
            type="text"
            v-model="phoneNumber"
            required
          />
          <label for="phoneNumber">phone number</label>
          <span class="helper-text" data-error="wrong" data-success="right"
            >+380931234567</span
          >
        </div>
      </div>
      <div v-if="confirmationResult" class="row">
        <div class="input-field col s7">
          <input id="confirmCode" type="text" v-model="confirmCode" required />
          <label for="confirmCode">Confirm code</label>
          <span class="helper-text" data-error="wrong" data-success="right"
            >123456</span
          >
        </div>
      </div>
      <div id="recaptcha-container"></div>
      <button class="btn" type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import {
  auth,
  FBProvider,
  GoogleProvider,
  RecaptchaVerifier
} from "../services/firebase";

export default {
  name: "Auth",
  data() {
    return {
      isAuthChecked: false,
      isSignInMode: true,
      email: "",
      password: "",
      confirmPassword: "",
      user: null,
      phoneNumber: null,
      confirmCode: null,
      appVerifier: null,
      confirmationResult: null
    };
  },
  async mounted() {
    auth.useDeviceLanguage();
    auth.onAuthStateChanged(this.onAuthStateChangedHandler.bind(this));
    FBProvider.setCustomParameters({ display: "popup" });
    GoogleProvider.addScope("profile");
    GoogleProvider.addScope("email");
    this.appVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "small"
    });
    await this.appVerifier.render();
  },
  methods: {
    onAuthStateChangedHandler(user) {
      if (user) {
        this.user = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData
        };
      }
      this.isAuthChecked = true;
    },
    toggleAuthMode() {
      this.isSignInMode = !this.isSignInMode;
    },
    async loginWithFB() {
      try {
        await auth.signInWithPopup(FBProvider);
      } catch (e) {
        M.toast({ html: e.message });
      }
    },
    async loginWithGoogle() {
      try {
        await auth.signInWithPopup(GoogleProvider);
      } catch (e) {
        M.toast({ html: e.message });
      }
    },
    async handleAuth() {
      this.isSignInMode ? this.loginRequest() : this.registerRequest();
    },
    async registerRequest() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
      } catch (e) {
        M.toast({ html: e.message });
      }
    },
    async loginRequest() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
      } catch (e) {
        M.toast({ html: e.message });
      }
    },
    async logout() {
      await auth.signOut();
      this.user = null;
    },
    async phoneFormSubmitHandler() {
      if (this.confirmationResult) {
        try {
          await this.confirmationResult.confirm(this.confirmCode);
        } catch (e) {
          M.toast({ html: e.message });
        }
      } else {
        try {
          this.confirmationResult = await auth.signInWithPhoneNumber(
            this.phoneNumber,
            this.appVerifier
          );
        } catch (e) {
          M.toast({ html: e.message });
          this.confirmationResult = null;
        }
      }
    }
  }
};
</script>

<style scoped></style>
