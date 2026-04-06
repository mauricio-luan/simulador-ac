<template>
  <v-card
    id="logShell"
    ref="logShell"
    class="bg-grey-darken-4 pa-2 mt-8"
    height="250"
  >
    <li
      v-for="log in logContents"
      :key="log"
      class="text-caption mb-1"
    >
      <code>{{ log }}</code>
    </li>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return { stopListening: null }
  },

  computed: {
    ...mapGetters(['logs']),

    logContents() {
      return this.logs.map((log) => {
        return `${log.timestamp} ${log.level} - ${log.message} ${
          Object.keys(log.metadata).length > 0
            ? JSON.stringify(log.metadata)
            : ''
        }`
      })
    }
  },

  watch: {
    logContents() {
      this.adjustLogShellScroll()
    }
  },

  mounted() {
    this.stopListening = window.api.log.onLogAdded((log) => {
      this.$store.commit('adicionaAoLog', log)
    })
  },

  beforeUnmount() {
    if (this.stopListening) this.stopListening()
  },

  methods: {
    adjustLogShellScroll() {
      this.$nextTick(() => {
        const logShell = this.$refs.logShell?.$el || this.$refs.logShell
        if (logShell) logShell.scrollTop = logShell.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
#logShell {
  overflow-y: auto;
}
</style>
