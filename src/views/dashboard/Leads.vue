<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-half">
        <h1 class="title">Leads</h1>

       
      </div>
      <div class="column is-half">
 <router-link class="button is-success is-pulled-right" to="/dashboard/leads/add"
          >Ajouter un lead</router-link
        >
       
      </div>

      <div class="column is-12">
        <hr />
      </div>
      <div class="column is-12" v-if="leads.length">
        <form @submit.prevent="getLeads">
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
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Personne à contacter</th>
              <th>Assigné à</th>
              <th>Valeur estimé</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in leads" v-bind:key="lead.id">
              <td>{{ lead.company }}</td>
              <td>{{ lead.contact_person }}</td>
              <td>
                <template v-if="lead.assigned_to">
                  {{ lead.assigned_to.first_name }}
                  {{ lead.assigned_to.last_name }}
                  <p v-if="!lead.assigned_to.first_name & !lead.assigned_to.last_name">
                    {{ lead.assigned_to.username }}
                  </p>
                </template>
              </td>
              <td>{{ lead.estimated_value }}</td>
              <td>{{ lead.status }}</td>
              <td>
                <router-link :to="{ name: 'Lead', params: { id: lead.id } }"
                  >Détails</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
</template>

<script>
import axios from "axios";
// console.log(leads)
export default {
  name: "Leads",
  data() {
    return {
      leads: [],
      showNextButton: false,
      showPreviousButton: false,
      currentPage: 1,
      query: '',
    };
  },
  mounted() {
    this.getLeads();
  },
  methods: {
    goToNextPage() {
      this.currentPage += 1;
      this.getLeads();
    },
    goToPreviousPage() {
      this.currentPage -= 1;
      this.getLeads();
    },
    async getLeads() {
      this.$store.commit("setIsLoading", true);

      this.showNextButton = false;
      this.showPreviousButton = false;

      await axios
        .get(`/api/v1/leads/?page=${this.currentPage}&search=${this.query}`)
        .then((response) => {
          this.leads = response.data.results;
          console.log("test", response);
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

    submitForm(){
      this.getLeads();
    }
  },
};
</script>
