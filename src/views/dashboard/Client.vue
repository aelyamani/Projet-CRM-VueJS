<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">{{ client.name }}</h1>

        <div class="buttons">
          <router-link
            :to="{ name: 'EditClient', params: { id: `${client.id}` } }"
            class="button is-light"
            >Modifer</router-link
          >

          <button class="button is-danger" @click="deleteClient">Supprimer</button>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Détails</h2>

          <p><strong>Créer le: </strong>{{ client.created_at }}</p>
          <p><strong>Modifier le: </strong>{{ client.modified_at }}</p>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h2 class="subtitle">Information de contact</h2>

          <p><strong>Personne à contacter: </strong>{{ client.contact_person }}</p>
          <p><strong>Email: </strong>{{ client.email }}</p>
          <p><strong>Téléphone: </strong>{{ client.phone }}</p>
          <p><strong>Site web: </strong>{{ client.website }}</p>
        </div>
      </div>

      <hr />

      <div class="column is-12 box">
        <h2 class="subtitle">Notes</h2>

        <router-link
          :to="{ name: 'AddNote', params: { id: `${client.id}` } }"
          class="button is-success mb-6"
          >Ajouter note</router-link
        >

        <div class="box" v-for="note in notes" v-bind:key="note.id">
          <h3 class="is-size-4">{{ note.name }}</h3>

          <p class="mt-2">
            {{ note.body }}
          </p>
          <div class="buttons mt-6">
            <router-link
              :to="{
                name: 'EditNote',
                params: { id: `${client.id}`, note_id: `${note.id}` },
              }"
              class="button is-light"
              >Modifer note</router-link
            >
            <button class="button is-danger" @click="deleteNote">Supprimer note</button>
          </div>
        </div>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Documents</h2>
        <router-link
          :to="{ name: 'AddDocument', params: { id: `${client.id}` } }"
          class="button is-success mb-6"
          >Ajouter un document</router-link
        >
        <template v-if="documents.length">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Nom du document</th>
                <th>Type du fichier</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="document in documents" v-bind:key="document.id">
                <td>{{ document.name }}</td>
                <td>{{ document.type }}</td>
                <td><a :href="`${document.file}`">Voir</a></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Client",
  data() {
    return {
      client: {},
      notes: [],
      documents: [],
    };
  },
  mounted() {
    this.getClient();
  },
  methods: {
    async deleteClient() {
      this.$store.commit("setIsLoading", true);

      const clientID = this.$route.params.id;

      await axios
        .post(`/api/v1/clients/delete_client/${clientID}/`)
        .then((response) => {
          console.log(response.data);

          this.$router.push("/dashboard/clients");
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
    // async deleteNote() {
    //   this.$store.commit("setIsLoading", true);

    //   const noteID = this.notes.id;
    //   const clientID = this.$route.params.id;
    //   console.log(noteID);
    //   await axios
    //     .post(`/api/v1/notes/delete_note/${this.notes.id}/`)
    //     .then((response) => {
    //       console.log(response.data);

    //       this.$router.push("/dashboard/clients");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    //   this.$store.commit("setIsLoading", false);
    // },
    async getClient() {
      this.$store.commit("setIsLoading", true);

      const clientID = this.$route.params.id;

      await axios
        .get(`/api/v1/clients/${clientID}/`)
        .then((response) => {
          this.client = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(`/api/v1/notes/?client_id=${clientID}`)
        .then((response) => {
          this.notes = response.data;
          console.log("note", response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
      await axios
        .get(`/api/v1/documents/?client_id=${clientID}`)
        .then((response) => {
          this.documents = response.data;
          console.log("document", response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
