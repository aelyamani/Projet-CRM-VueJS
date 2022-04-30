<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Mon espace</h1>

        <div class="columns">
          <div class="column is-half">
            <!-- <router-link
              :to="{ name: 'EditMember', params: { id: `${$store.state.user.id}` } }"
              class="button is-light"
              >Modifier mes informations</router-link
            > -->
          </div>
          <div class="column is-half">
            <!-- <Logout class="is-pulled-right" /> -->
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Mes leads</h2>
          <hr />
          <ul>
            <li v-for="lead in leads" v-bind:key="lead.id">
              <router-link :to="{ name: 'Lead', params: { id: lead.id } }">
                - {{ lead.company }}</router-link
              >
            </li>
          </ul>
          <hr />
          <router-link class="has-text-success" to="/dashboard/leads"
            >Voir plus...</router-link
          >
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Mes clients</h2>
          <hr />
          <ul>
            <li v-for="client in clients" v-bind:key="client.id">
              <router-link :to="{ name: 'Client', params: { id: client.id } }">
                - {{ client.name }}</router-link
              >
            </li>
          </ul>
          <hr />
          <router-link class="has-text-success" to="/dashboard/clients"
            >Voir plus...</router-link
          >
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Mon équipe</h2>
          <hr />
          <ul>
            <li v-for="member in team.members" v-bind:key="member.id">
              - {{ member.username }}
            </li>
          </ul>

          <hr />
          <router-link class="has-text-success" to="/dashboard/team"
            >Voir plus...</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      leads: [],
      clients: [],
      team: {
        members: [],
        // created_by: {},
      },
    };
  },
  mounted() {
    this.getLeads();
    this.getClients();
    this.getTeam();
  },
  methods: {
    async getLeads() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get(`/api/v1/leads/`)
        .then((response) => {
          this.leads = response.data.results;
          // console.log("test", response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    async getClients() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get(`/api/v1/clients/`)
        .then((response) => {
          this.clients = response.data.results;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
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
