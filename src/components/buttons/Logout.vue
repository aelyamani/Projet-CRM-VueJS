<template>
  <div>
    <button
      @click="logout()"
      class="button is-danger"
      v-if="this.$store.state.isAuthenticated === true"
    >
      Déconnexion
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Logout",
  methods: {
    async logout() {
      await axios
        .post("/api/v1/token/logout")
        .then((reponse) => {
          console.log("logged out");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      localStorage.removeItem("team_name");
      localStorage.removeItem("team_id");

      this.$store.commit("removeToken");

      this.$router.push("/");
    },
  },
};
</script>
