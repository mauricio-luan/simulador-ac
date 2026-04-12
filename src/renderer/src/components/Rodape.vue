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
        <span
          class="text-caption"
        >
          API {{ apiStatusProperties.message }}
        </span>
      </div>
      <div>
        <span class="text-caption">
          © 2026 Simulador Automação Comercial Integrada com Sistema Pgto
        </span>
      </div>
      <div>
        <span class="text-caption">1.0</span>
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
