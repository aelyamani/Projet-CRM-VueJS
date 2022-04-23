<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <strong>EasySoft CRM</strong>
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <template v-if="this.$store.state.isAuthenticated">
          <router-link to="/dashboard/clients" class="navbar-item"
            ><strong>Clients</strong></router-link
          >
          <router-link to="/dashboard/leads" class="navbar-item"
            ><strong>Leads</strong></router-link
          >
          <router-link to="/dashboard/team" class="navbar-item"
            ><strong>Equipes</strong></router-link
          >
        </template>

        <div class="navbar-item">
          <div class="buttons">
            <template v-if="this.$store.state.isAuthenticated === false">
              <router-link to="/sign-up" class="button is-success"
                ><strong>S'enregistrer</strong></router-link
              >
              <router-link to="/log-in" class="button is-info"
                ><strong>Se connecter</strong></router-link
              >
            </template>
            <template v-if="this.$store.state.isAuthenticated === true">
              <router-link
                to="/dashboard/my-account"
                class="button is-info"
                v-if="this.$store.state.isAuthenticated"
                ><strong>Mon compte</strong></router-link
              >
              <Logout />
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logout from "@/components/buttons/Logout";
export default {
  name: "Navbar",
  components: {
    Logout,
  },
};
</script>
