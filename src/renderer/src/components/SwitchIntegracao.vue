<template>
  <v-select
    v-model="mode"
    label="Modo de integração"
    :items="Object.values(integrationModes)"
    density="compact"
    variant="outlined"
    class="mt-2"
  />

  <AppButton
    @click="isOpen = true"
  >
    <template #icon>
      <v-icon>mdi-cog</v-icon>
    </template>
  </AppButton>

  <v-dialog
    v-model="isOpen"
    width="400"
  >
    <v-form>
      <v-card class="box">
        <v-card-title class="d-flex justify-center">
          Configuração Terminal
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-for="field in fields"
            :key="field.model"
            v-model="form[field.model]"
            :label="field.label"
          />
        </v-card-text>

        <v-card-actions>
          <AppButton
            :content="'Atualizar'"
            @click="atualizarConfig"
          />

          <AppButton
            :content="'Cancelar'"
            @click="isOpen = false"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { integrationModes } from '@shared/constants'
import AppButton from './Button.vue';

export default {
  components: {
    AppButton
  },

  data() {
    return {
      integrationModes,
      mode: this.$store.state.integrationMode,
      isOpen: false,
      form: {},
      fields: [
        { label: 'Callback URL', model: 'callbackUrl' },
        { label: 'Automation name', model: 'automationName' },
        { label: 'Company ID', model: 'companyId' },
        { label: 'Store ID', model: 'storeId' },
        { label: 'Terminal ID', model: 'terminalId' }
      ]
    }
  },

  computed: {
    ...mapGetters(['apiGatewayConfig'])
  },

  watch: {
    mode(newMode) {
      this.$store.commit('setIntegrationMode', newMode)
    },
    async isOpen(newValue) {
      if (newValue) {
        await this.$store.dispatch('fetchApiGatewayConfig')
        this.form = { ...this.apiGatewayConfig }
      }
    }
  },

  methods: {
    atualizarConfig() {
      this.$store.dispatch('saveApiGatewayConfig', this.form)
      this.isOpen = false
    }
  }
}
</script>
