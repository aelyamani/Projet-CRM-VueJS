<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Ajouter une note</h1>
      </div>

      <div class="column is-12">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Nom du fichier</label>
            <div class="control">
              <input type="text" class="input" v-model="name" />
            </div>
          </div>
          <div class="field">
            <label>Type de fichier</label>
            <div class="control">
              <div class="select">
                <select v-model="type">
                  <option selected></option>
                  <option value="Facture">Facture</option>
                  <option value="Devis">Devis</option>
                  <option value="Kbis">Kbis</option>
                  <option value="Rib">Rib</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label>fichier</label>
            <div class="control">
              <div class="file">
                <label class="file-label">
                  <input
                    class="file-input"
                    type="file"
                    id="file"
                    @change="onFileChange"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choisir un fichier… </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="field">
            <label>Description</label>
            <div class="control">
              <textarea class="textarea" v-model="description"></textarea>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Ajouter note</button>
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
  name: "AddDocument",
  data() {
    return {
      name: "",
      type: "",
      file: "",
      description: "",
    };
  },
  methods: {
    async submitForm() {
      this.$store.commit("setIsLoading", true);

      const document = {
        name: this.name,
        type: this.type,
        file: this.file,
        description: this.description,
        client_id: this.$route.params.id,
      };

      await axios
        .post("/api/v1/documents/", document)
        .then((response) => {
          toast({
            message: "Le document a bien été ajouté",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });

          this.$router.push({ name: "Client", params: { id: this.$route.params.id } });
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
