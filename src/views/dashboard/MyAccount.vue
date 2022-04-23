<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Mon compte</h1>

        <div class="columns">
          <div class="column is-half">
            <router-link
              :to="{ name: 'EditMember', params: { id: `${$store.state.user.id}` } }"
              class="button is-light"
              >Modifier mes informations</router-link
            >
          </div>
          <div class="column is-half">
            <Logout class="is-pulled-right" />
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Mes informations</h2>

          <p><strong>Nom d'utilisateur: </strong>{{ user.username }}</p>
          <p v-if="user.email"><strong>Email: </strong>{{ user.email }}</p>
          <p><strong>Prénom: </strong>{{ user.first_name }}</p>
          <p><strong>Nom: </strong>{{ user.last_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Logout from "@/components/buttons/Logout";

export default {
  name: "MyAccount",
  components: {
    Logout,
  },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      this.$store.commit("setIsLoading", true);
      const userID = this.$store.state.user.id;
      console.log(userID);
      await axios
        .get(`/api/v1/teams/member/${userID}/`, this.user)
        .then((response) => {
          this.user = response.data;
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
