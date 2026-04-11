<template>
  <v-btn @click="$store.dispatch('limpaCarrinho')">
    Limpar carrinho
  </v-btn>
  <v-btn
    :disabled="carrinhoVazio"
    @click="isOpen = true"
  >
    Pagar
  </v-btn>

  <v-dialog
    v-model="isOpen"
    max-width="400"
    height="400"
  >
    <v-card
      v-if="!isLoading"
      class="align-center pa-5"
    >
      <v-card-title class="w-100 text-center">
        Escolha o metodo:
      </v-card-title>
      <v-card-text class="w-75 d-flex justify-center flex-column ga-2">
        <v-btn
          v-for="btn in botoes"
          :key="btn.label"
          variant="tonal"
          @click="handleSubmitPayment(btn.value)"
        >
          {{ btn.label }}
        </v-btn>
      </v-card-text>

      <v-card-actions>
        <v-btn
          variant="text"
          color="error"
          prepend-icon="mdi-close"
          @click="isOpen = false"
        >
          Esc
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card
      v-else
      class="align-center justify-center"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="orange"
        indeterminate
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { definePaymentType } from '@renderer/services/service'
import { PaymentMethod, PaymentType } from '@shared/constants'

export default {
  data() {
    return {
      isOpen: false,
      isLoading: false,
      botoes: [
        {
          label: '1 - Debito',
          value: PaymentType.DEBIT
        },
        {
          label: '2 - Credito',
          value: PaymentType.CREDIT
        },
        {
          label: '3 - Pix',
          value: PaymentMethod.PIX
        },
        {
          label: '4 - E-Commerce',
          value: PaymentMethod.LINK
        }
      ]
    }
  },

  computed: {
    carrinhoVazio() {
      return this.$store.getters.carrinhoEstaVazio
    },
    cartTotalValue() {
      return this.$store.getters.valorTotalNoCarrinho
    }
  },

  methods: {
    async handleSubmitPayment(typeOrMethod) {
      this.isLoading = true
      window.api.log.info('Chamou pagamento')

      try {
        if (this.carrinhoVazio) throw new Error('Carrinho vazio paizao')
        const data = await definePaymentType({
          typeOrMethod,
          value: this.cartTotalValue
        })

        window.api.log.info(`response: ${JSON.stringify(data)}`)
        this.$store.dispatch('limpaCarrinho')
      } catch (err) {
        console.error(err)
      } finally {
        this.isOpen = false
        this.isLoading = false
      }
    }
  }
}
</script>
