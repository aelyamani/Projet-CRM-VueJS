<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-half">
        <h1 class="title">Clients</h1>
      </div>
      <div class="column is-half">
        <router-link
          class="button is-success is-pulled-right mt-2"
          to="/dashboard/clients/add"
          >Ajouter un client</router-link
        >
      </div>
      <div class="column is-12">
        <hr />
      </div>
      <div class="column is-12" v-if="clients.length">
        <form @submit.prevent="getClients">
          <div class="field has-addons">
            <div class="control">
              <input type="text" class="input" v-model="query" />
            </div>
            <div class="control">
              <button class="button is-success">Recherche</button>
            </div>
          </div>
        </form>
      </div>

      <div class="column is-12">
        <template v-if="clients.length">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Personne a contacter</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="client in clients" v-bind:key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.contact_person }}</td>
                <td>
                  <router-link :to="{ name: 'Client', params: { id: client.id } }"
                    >Details</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <template v-else>
          <p class="has-text-centered">Vous n'avez pas encore de clients</p>
        </template>

        <div class="buttons">
          <button
            class="button is-light"
            @click="goToPreviousPage()"
            v-if="showPreviousButton"
          >
            Précédent
          </button>
          <button class="button is-light" @click="goToNextPage()" v-if="showNextButton">
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// console.log(clients)
export default {
  name: "Clients",
  data() {
    return {
      clients: [],
      showPreviousButton: false,
      showNextButton: false,
      currentPage: 1,
      query: "",
    };
  },
  mounted() {
    this.getClients();
  },
  methods: {
    goToNextPage() {
      this.currentPage += 1;
      this.getClients();
    },
    goToPreviousPage() {
      this.currentPage -= 1;
      this.getClients();
    },
    async getClients() {
      this.$store.commit("setIsLoading", true);

      this.showNextButton = false;
      this.showPreviousButton = false;

      await axios
        .get(`/api/v1/clients/?page=${this.currentPage}&search=${this.query}`)
        .then((response) => {
          this.clients = response.data.results;
          console.log(response.data);
          if (response.data.next) {
            this.showNextButton = true;
          }
          if (response.data.previous) {
            this.showPreviousButton = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    submitForm() {
      this.getClients();
    },
  },
};
</script>
