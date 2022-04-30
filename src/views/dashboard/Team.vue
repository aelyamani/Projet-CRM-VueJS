<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title" v-if="team.created_by.id === parseInt($store.state.user.id)">
          {{ team.name }}
        </h1>

        <h1 class="title" v-if="team.created_by.id != parseInt($store.state.user.id)">
          Vous n'avez pas créer encore d'équipe
        </h1>

        <hr />

        <template v-if="team.created_by.id === parseInt($store.state.user.id)">
          <router-link :to="{ name: 'AddMember' }" class="button is-primary"
            >Ajouter un membre</router-link
          >
        </template>
        <template v-if="team.created_by.id != parseInt($store.state.user.id)">
          <router-link :to="{ name: 'AddTeam' }" class="button is-primary"
            >Créer une équipe</router-link
          >
        </template>
      </div>

      <div
        class="column is-12"
        v-if="team.created_by.id === parseInt($store.state.user.id)"
      >
        <h2 class="subtitle">Membres</h2>

        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Prénom</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="member in team.members" v-bind:key="member.id">
              <td>{{ member.username }}</td>
              <td>{{ member.last_name }}</td>
              <td>{{ member.first_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Team",
  data() {
    return {
      team: {
        members: [],
        created_by: {},
      },
    };
  },
  mounted() {
    this.getTeam();
  },
  methods: {
    async getTeam() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/api/v1/teams/get_my_team/")
        .then((response) => {
          this.team = response.data;
          console.log("getTeam", response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
