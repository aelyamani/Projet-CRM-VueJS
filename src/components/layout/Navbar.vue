<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <strong>Workyspace CRM</strong>
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu is-pulled-right" id="navMenu">
      <div class="navbar-end">
        <template v-if="this.$store.state.isAuthenticated">
          <router-link to="/dashboard/clients" class="navbar-item"
            ><strong>Clients</strong></router-link
          >
          <router-link to="/dashboard/leads" class="navbar-item"
            ><strong>Leads</strong></router-link
          >
          <router-link to="/dashboard/team" class="navbar-item"
            ><strong>Équipes</strong></router-link
          >
        </template>

        <div class="navbar-item">
          <div class="buttons">
            <template v-if="this.$store.state.isAuthenticated === false">
              <!-- <router-link to="/sign-up" class="button is-success"
                ><strong>S'enregistrer</strong></router-link
              > -->
              <router-link to="/log-in" class="button is-info"
                ><strong>Se connecter</strong></router-link
              >
            </template>
            <template v-if="this.$store.state.isAuthenticated === true">
              <router-link
                to="/dashboard"
                class="button is-success"
                v-if="this.$store.state.isAuthenticated"
                ><strong>Mon espace</strong></router-link
              >
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
document.addEventListener("DOMContentLoaded", function () {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener("click", function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
</script>

<style lang="scss">
@media screen and (max-width: 1023px) {
  .navbar-menu.is-active {
    display: block;
    position: absolute;
    right: 0;
  }
}
</style>
