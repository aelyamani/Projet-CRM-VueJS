<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">{{ lead.company }}</h1>
        <div class="buttons">
          <router-link
            :to="{ name: 'EditLead', params: { id: `${lead.id}` } }"
            class="button is-light"
            >Modifier</router-link
          >
          <button @click="convertToClient" class="button is-info">
            Convertir en client
          </button>
          <button @click="deleteLead" class="button is-danger">Supprimer</button>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Détails</h2>
          <template v-if="lead.assigned_to">
            <p v-if="lead.assigned_to.first_name || lead.assigned_to.last_name">
              <strong>Assigné a: </strong>{{ lead.assigned_to.first_name }}
              {{ lead.assigned_to.last_name }}
            </p>
            <p v-if="!lead.assigned_to.first_name && !lead.assigned_to.last_name">
              <strong>Assigné a: </strong>{{ lead.assigned_to.username }}
            </p>
          </template>
          <p><strong>Status: </strong>{{ lead.status }}</p>
          <p><strong>Priorité: </strong>{{ lead.priority }}</p>
          <p><strong>Confidence: </strong>{{ lead.confidence }}</p>
          <p><strong>Valeur estimé: </strong>{{ lead.estimated_value }}</p>
          <p><strong>Créer le: </strong>{{ lead.created_at }}</p>
          <p><strong>Modifié le: </strong>{{ lead.modified_at }}</p>
        </div>
      </div>
      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Informations de contact</h2>
          <p><strong>Personne à contacter: </strong>{{ lead.contact_person }}</p>
          <p><strong>Email: </strong>{{ lead.email }}</p>
          <p><strong>Télèphone: </strong>{{ lead.phone }}</p>
          <p><strong>Site web: </strong>{{ lead.website }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Lead",
  data() {
    return {
      lead: {},
      assigned_to: {},
    };
  },
  mounted() {
    this.getLead();
  },
  methods: {
    async getLead() {
      this.$store.commit("setIsLoading", true);
      const leadID = this.$route.params.id;
      axios
        .get(`/api/v1/leads/${leadID}/`)
        .then((response) => {
          this.lead = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    async convertToClient() {
      this.$store.commit("setIsLoading", true);
      const leadID = this.$route.params.id;
      const data = {
        lead_id: leadID,
      };
      axios
        .post(`/api/v1/convert_lead_to_client/`, data)
        .then((response) => {
          this.lead = response.data;
          // console.log(response);

          this.$router.push("/dashboard/clients");
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    async deleteLead() {
      this.$store.commit("setIsLoading", true);
      const leadID = this.$route.params.id;
      axios
        .post(`/api/v1/leads/delete_lead/${leadID}/`)
        .then((response) => {
          // this.lead = response.data;
          this.$router.push("/dashboard/leads");
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
