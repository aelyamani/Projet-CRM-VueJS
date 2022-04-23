<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Ajouter un lead</h1>
      </div>

      <div class="column is-12">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Entreprise</label>
            <div class="control">
              <input type="text" class="input" v-model="company" />
            </div>
          </div>

          <div class="field">
            <label>Personne a contacter</label>
            <div class="control">
              <input type="text" class="input" v-model="contact_person" />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" class="input" v-model="email" />
            </div>
          </div>

          <div class="field">
            <label>Téléphone</label>
            <div class="control">
              <input type="tel" class="input" v-model="phone" />
            </div>
          </div>

          <div class="field">
            <label>Site web</label>
            <div class="control">
              <input type="text" placeholder="https://" class="input" v-model="website" />
            </div>
          </div>

          <div class="field">
            <label>Confidence</label>
            <div class="control">
              <input type="number" class="input" v-model="confidence" />
            </div>
          </div>

          <div class="field">
            <label>Valeur estimé</label>
            <div class="control">
              <input type="number" class="input" v-model="estimated_value" />
            </div>
          </div>

          <div class="field">
            <label>Status</label>
            <div class="control">
              <div class="select">
                <select v-model="status">
                  <option value="Nouveau">Nouveau</option>
                  <option value="Contacter">Contacter</option>
                  <option value="En cours">En cours</option>
                  <option value="Perdu">Perdu</option>
                  <option value="Gagner">Gagner</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>Priorité</label>
            <div class="control">
              <div class="select">
                <select v-model="priority">
                  <option value="Faible">Faible</option>
                  <option value="Moyenne">Moyen</option>
                  <option value="Forte">Fort</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Ajouter lead</button>
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
  name: "AddLead",
  data() {
    return {
      compagny: "",
      contact_person: "",
      email: "",
      phone: "",
      website: "",
      confidence: 0,
      estimated_value: 0,
      status: "Nouveau",
      priority: "",
    };
  },
  methods: {
    async submitForm() {
      this.$store.commit("setIsLoading", true);
      const lead = {
        company: this.company,
        contact_person: this.contact_person,
        email: this.email,
        phone: this.phone,
        website: this.website,
        confidence: this.confidence,
        estimated_value: this.estimated_value,
        status: this.status,
        priority: this.priority,
      };

      await axios
        .post("/api/v1/leads/", lead)
        .then((response) => {
          toast({
            message: "Le lead a bien été ajouté",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
          // console.log(response);
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
