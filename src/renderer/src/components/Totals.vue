<template>
  <v-row class="mt-5">
    <v-col cols="5">
      <v-card
        class="box"
        variant="tonal"
      >
        <v-card-item>
          <v-card-title>Quantidade produtos</v-card-title>
        </v-card-item>

        <v-card-text>
          {{ qtdItens }}
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="7">
      <v-card
        class="box"
        variant="tonal"
      >
        <v-card-item>
          <v-card-title>Total</v-card-title>
        </v-card-item>

        <v-card-text>
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

<style scoped>
body {
  font-family: 'W95FA', sans-serif !important;
}

.box {
  background-color: var(--border-white);
}
</style>
