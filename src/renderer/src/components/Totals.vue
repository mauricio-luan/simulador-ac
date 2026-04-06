<template>
  <v-row class="mt-5">
    <v-col cols="5">
      <v-card variant="tonal">
        <v-card-item>
          <v-card-title>Quantidade produtos</v-card-title>
        </v-card-item>
        <v-card-text class="text-right text-h6">
          {{ qtdItens }}
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="7">
      <v-card variant="tonal">
        <v-card-item>
          <v-card-title>Total</v-card-title>
        </v-card-item>
        <v-card-text class="text-right text-h6">
          R$ {{ valorTotal.toFixed(2) }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      qtdItens: 'quantidadeProdutosNoCarrinho',
      valorTotal: 'valorTotalNoCarrinho'
    })
  }
}
</script>
