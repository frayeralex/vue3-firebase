<template>
	<div class="auth">
		<div class="row" v-if="isAuthChecked && user">
			<div>Name: {{ user.displayName }}</div>
			<div>email: {{ user.email }}</div>
			<div>emailVerified: {{ user.emailVerified }}</div>
			<div>photoURL: {{ user.photoURL }}</div>
			<img v-if="user && user.photoURL" :src="user.photoURL" :alt="user.displayName">
			<div>Is Anonymous: {{ user.isAnonymous }}</div>
			<button @click="logout" class="btn red">Logout</button>
		</div>
		<form v-if="isAuthChecked && !user" @submit.prevent="handleAuth">
			<div class="row">
				<h3 v-if="isSignInMode">Sign in</h3>
				<h3 v-if="!isSignInMode">Sign up</h3>
			</div>
			<div class="row">
				<div class="input-field col" :class="{ s7: isSignInMode, s6: !isSignInMode }">
					<input id="email" type="email" v-model="email" required />
					<label for="email">Email</label>
				</div>
			</div>
			<div class="row">
				<div class="input-field col" :class="{ s7: !isSignInMode, s6: isSignInMode }">
					<input id="password" type="password" v-model="password" required/>
					<label for="password">Password</label>
				</div>
			</div>
			<div v-if="!isSignInMode" class="row">
				<div class="input-field col s7">
					<input id="confirmPassword" type="password" v-model="v" required/>
					<label for="confirmPassword">Confirm Password</label>
				</div>
			</div>
			<button class="btn" type="submit">Submit</button>
			<button @click="toggleAuthMode" class="btn grey" type="button">{{ !isSignInMode ? 'Login' : 'Register' }}</button>
			<button @click="loginWithFB" class="btn" type="button">Continue with facebook</button>
		</form>

	</div>
</template>

<script>
import { auth, FBProvider } from "../services/firebase";

export default {
	name: "Auth",
	data() {
		return {
			isAuthChecked: false,
			isSignInMode: true,
			email: '',
			password: '',
			confirmPassword: '',
			user: null
		}
	},
	created() {
		auth.useDeviceLanguage();
		FBProvider.setCustomParameters({
			'display': 'popup'
		});
		auth.onAuthStateChanged(this.onAuthStateChangedHandler.bind(this))
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
					providerData: user.providerData,
				};
			}
			this.isAuthChecked = true;
		},
		toggleAuthMode() {
			this.isSignInMode = !this.isSignInMode;
		},
		async loginWithFB() {
			try {
				const result = await auth.signInWithPopup(FBProvider);
				// eslint-disable-next-line
				console.log({ result });
			} catch (e) {
				M.toast({ html: e.message });
			}

		},
		async handleAuth() {
			this.isSignInMode
				? this.loginRequest()
				: this.registerRequest();
		},
		async registerRequest() {
			try {
				const result = await auth.createUserWithEmailAndPassword(this.email, this.password);
				// eslint-disable-next-line
				console.log({ result });
			} catch (e) {
				M.toast({ html: e.message });
			}
		},
		async loginRequest() {
			try {
				const result = await auth.signInWithEmailAndPassword(this.email, this.password);
				// eslint-disable-next-line
				console.log({ result });
			} catch (e) {
				M.toast({ html: e.message });
			}
		},
		async logout() {
			await auth.signOut();
			this.user = null;
		}
	}
}
</script>

<style scoped>

</style>