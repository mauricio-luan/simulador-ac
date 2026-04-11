<template>
  <v-btn
    @click="$store.dispatch('limpaCarrinho')"
  >
    Limpar carrinho
  </v-btn>
  <v-btn
    :disabled="carrinhoEstaVazio"
    @click="isOpen = true"
  >
    Pagar
  </v-btn>

  <v-dialog
    v-model="isOpen"
    max-width="400"
    height="400"
  >
    <PaymentMethods
      v-if="!isLoading"
      :buttons="currentButtons"
      @select="handlePaymentSelection($event)"
      @close="clean()"
    />

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
import { definePaymentType } from '../services/service'
import PaymentMethods from './PaymentMethods.vue'
import { mapGetters } from 'vuex'
import {
  PaymentMethod,
  PaymentType,
  PaymentMethodSubType
} from '../../../shared/constants'

export default {
  components: {
    PaymentMethods
  },

  data() {
    return {
      isOpen: false,
      isLoading: false,
      payload: null,
      buttons: [
        {
          label: '1 - Debito',
          method: PaymentMethod.CARD,
          type: PaymentType.DEBIT,
          subtypes: [
            {
              label: '1 - A vista',
              subType: PaymentMethodSubType.FULL_PAYMENT
            },
            {
              label: '2 - Debito Parcelado',
              subType: PaymentMethodSubType.FINANCED_DEBIT
            },
            {
              label: '3 - Debito Pré-Datado',
              subType: PaymentMethodSubType.PREDATED_DEBIT
            }
          ]
        },
        {
          label: '2 - Credito',
          method: PaymentMethod.CARD,
          type: PaymentType.CREDIT,
          subtypes: [
            {
              label: '1 - A vista',
              subType: PaymentMethodSubType.FULL_PAYMENT
            },
            {
              label: '2 - Parcelado Lojista',
              subType: PaymentMethodSubType.FINANCED_NO_FEES
            },
            {
              label: '3 - Parcelado Admin.',
              subType: PaymentMethodSubType.FINANCED_WITH_FEES
            }
          ]
        },
        {
          label: '3 - Pix',
          method: PaymentMethod.PIX,
          type: PaymentType.DEBIT
        },
        {
          label: '4 - E-Commerce',
          method: PaymentMethod.LINK,
          type: PaymentType.ECOMMERCE
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['valorTotalNoCarrinho', 'carrinhoEstaVazio']),
    currentButtons() {
      return this.payload && this.payload.subtypes
        ? this.payload.subtypes
        : this.buttons
    }
  },

  methods: {
    async handlePaymentSelection(event) {
      if (event.subtypes && event.subtypes.length > 0) {
        this.payload = event
        return
      }

      const finalPayload = { ...this.payload, ...event }
      await this.handleSubmitPayment(finalPayload)
    },
    async handleSubmitPayment(payload) {
      this.isLoading = true

      try {
        if (this.carrinhoEstaVazio) {
          throw new Error('Carrinho vazio paizao')
        }

        const data = await definePaymentType({
          value: this.valorTotalNoCarrinho,
          paymentMethod: payload.method,
          paymentType: payload.type,
          paymentMethodSubType: payload.subType
        })

        window.api.log.info(`[APP] -> Response: ${JSON.stringify(data)}`)
        this.$store.dispatch('limpaCarrinho')
      } catch (err) {
        window.api.log.error(`[APP] -> Error: ${err.message}`)
      } finally {
        this.clean()
      }
    },
    clean() {
      this.payload = null
      this.isOpen = false
      this.isLoading = false
    }
  }
}
</script>
