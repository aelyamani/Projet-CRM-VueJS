<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Modifier: {{ lead.company }}</h1>
      </div>

      <div class="column is-12">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Entreprise</label>
            <div class="control">
              <input type="text" class="input" v-model="lead.company" />
            </div>
          </div>

          <div class="field">
            <label>Personne a contacter</label>
            <div class="control">
              <input type="text" class="input" v-model="lead.contact_person" />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" class="input" v-model="lead.email" />
            </div>
          </div>

          <div class="field">
            <label>Téléphone</label>
            <div class="control">
              <input type="tel" class="input" v-model="lead.phone" />
            </div>
          </div>

          <div class="field">
            <label>Site web</label>
            <div class="control">
              <input
                type="text"
                placeholder="https://"
                class="input"
                v-model="lead.website"
              />
            </div>
          </div>

          <div class="field">
            <label>Confidence</label>
            <div class="control">
              <input type="number" class="input" v-model="lead.confidence" />
            </div>
          </div>

          <div class="field">
            <label>Valeur estimé</label>
            <div class="control">
              <input type="number" class="input" v-model="lead.estimated_value" />
            </div>
          </div>

          <div class="field">
            <label>Status</label>
            <div class="control">
              <div class="select">
                <select v-model="lead.status">
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
                <select v-model="lead.priority">
                  <option value="Faible">Faible</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Forte">Forte</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>Assigné à:</label>
            <div class="control">
              <div class="select">
                <select v-model="lead.assigned_to">
                  <option value="" selected>Selectionné un membre</option>
                  <option
                    v-for="member in team.members"
                    v-bind:key="member.id"
                    v-bind:value="member.id"
                  >
                    {{ member.username }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Modifier lead</button>
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
  name: "EditLead",
  data() {
    return {
      lead: {},
      team: {
        members: [],
      },
    };
  },
  mounted() {
    this.getLead();
    this.getTeam();
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
    async submitForm() {
      this.$store.commit("setIsLoading", true);
      const leadID = this.$route.params.id;
      console.log(this.lead);
      axios
        .patch(`/api/v1/leads/${leadID}/`, this.lead)
        .then((response) => {
          toast({
            message: "Le lead a bien été modifier",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
          this.$router.push(`/dashboard/leads/${leadID}`);
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
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
