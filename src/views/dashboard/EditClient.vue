<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Modifier: {{ client.name }}</h1>
      </div>

      <div class="column is-12">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Nom</label>
            <div class="control">
              <input type="text" class="input" v-model="client.name" />
            </div>
          </div>

          <div class="field">
            <label>Personne à contacter</label>
            <div class="control">
              <input type="text" class="input" v-model="client.contact_person" />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" class="input" v-model="client.email" />
            </div>
          </div>

          <div class="field">
            <label>Téléphone</label>
            <div class="control">
              <input type="tel" class="input" v-model="client.phone" />
            </div>
          </div>

          <div class="field">
            <label>Site web</label>
            <div class="control">
              <input
                type="text"
                placeholder="https://"
                class="input"
                v-model="client.website"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Modifier client</button>
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
  name: "EditClient",
  data() {
    return {
      client: {},
    };
  },
  mounted() {
    this.getClient();
  },
  methods: {
    async getClient() {
      this.$store.commit("setIsLoading", true);

      const clientID = this.$route.params.id;

      axios
        .get(`/api/v1/clients/${clientID}/`)
        .then((response) => {
          this.client = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
    async submitForm() {
      this.$store.commit("setIsLoading", true);

      const clientID = this.$route.params.id;

      axios
        .patch(`/api/v1/clients/${clientID}/`, this.client)
        .then((response) => {
          toast({
            message: "Le client a bien été modifier",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });

          this.$router.push(`/dashboard/clients/${clientID}`);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
