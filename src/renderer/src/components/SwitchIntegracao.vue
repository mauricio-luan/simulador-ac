<template>
  <v-card
    class="pa-4 ma-0"
    flat
  >
    <label for="integrationMode">Modo de integração</label>
    <v-switch
      id="integrationMode"
      v-model="mode"
      :label="mode"
      :true-value="integrationModes.GATEWAY"
      :false-value="integrationModes.LOCALHOST"
    />
    <v-btn
      class="ma-0 pa-0 h-25 w-25"
      color="primary"
      style="position: absolute; top: 100px; right: 16px"
      @click="isOpen = true"
    >
      <v-icon left>
        mdi-cog
      </v-icon>
    </v-btn>
  </v-card>

  <v-dialog
    v-model="isOpen"
    width="400"
  >
    <v-form>
      <v-card>
        <v-card-title class="text-h5 d-flex justify-center">
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
          <v-btn
            color="success"
            @click="atualizarConfig"
          >
            Atualizar
          </v-btn>
          <v-btn
            color="primary"
            @click="isOpen = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { integrationModes } from '@shared/constants'

export default {
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
