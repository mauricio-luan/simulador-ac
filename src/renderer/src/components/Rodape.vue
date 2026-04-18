<template>
  <v-footer
    app
    color="grey-darken-4"
    height="40"
  >
    <v-row
      no-gutters
      class="w-100 d-flex justify-space-between align-center"
    >
      <div>
        <v-icon
          size="small"
          :color="apiStatusProperties.color"
          @click="getApiStatus"
        >
          {{ apiStatusProperties.icon }}
        </v-icon>
        <span>
          API {{ apiStatusProperties.message }}
        </span>
      </div>
      <div>
        <span>
          © 2026 Simulador de PDV integrado de pagamentos, via API
        </span>
      </div>
      <div>
        <span>1.0</span>
      </div>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      status: null
    }
  },
  computed: {
    apiStatusProperties() {
      return {
        message: this.status ? 'online' : 'offline',
        icon: this.status ? 'mdi-circle-medium' : 'mdi-circle-medium',
        color: this.status ? 'success' : 'error'
      }
    }
  },
  mounted() {
    this.getApiStatus()
  },

  methods: {
    async getApiStatus() {
      this.status = await window.api.payment.apiStatus()
    }
  }
}
</script>

<style scoped>
span {
  font-family: 'W95FA', sans-serif;
  color: white;
  font-size: small;
}
</style>
