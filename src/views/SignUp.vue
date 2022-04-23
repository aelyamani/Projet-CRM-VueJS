<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">S'enregistrer</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Nom d'utilisateur</label>
            <div class="control">
              <input type="text" name="username" class="input" v-model="username" />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" name="email" class="input" v-model="email" />
            </div>
          </div>

          <div class="field">
            <label>Mot de passe</label>
            <div class="control">
              <input type="password" name="password1" class="input" v-model="password1" />
            </div>
          </div>

          <div class="field">
            <label>Répéter le mot de passe</label>
            <div class="control">
              <input type="password" name="password2" class="input" v-model="password2" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Inscription</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password1: "",
      password2: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];
      if (this.username === "") {
        this.errors.push("Le nom d'utilisateur est manquant");
      }
      if (this.email === "") {
        this.errors.push("Le nom d'utilisateur est manquant");
      }
      if (this.password1 === "") {
        this.errors.push("Le mot de passe est court");
      }
      if (this.password1 !== this.password2) {
        this.errors.push("Les mot de passe ne correspondent pas");
      }
      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);
        const formData = {
          username: this.username,
          email: this.email,
          password: this.password1,
        };
        await axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            toast({
              message: "Le compte a été créé veuillez vous connecter",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`);
              }
            } else if (error.message) {
              this.errors.push("Quelque chose ne va pas. Veuillez réessayer SVP!");
            }
          });

        this.$store.commit("setIsLoading", false);
      }
    },
  },
};
</script>
