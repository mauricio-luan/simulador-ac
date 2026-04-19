<template>
  <v-row class="mt-5">
    <v-col cols="5">
      <v-card
        class="box box-freeze"
        variant="tonal"
      >
        <v-card-item>
          <v-card-title>Quantidade produtos</v-card-title>
        </v-card-item>

        <v-card-text
          class="text-title-large"
        >
          {{ qtdItens }}
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="7">
      <v-card
        class="box box-freeze"
        variant="tonal"
      >
        <v-card-item>
          <v-card-title>Total</v-card-title>
        </v-card-item>

        <v-card-text class="text-title-large">
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

.box-freeze {
  border-top-color: black;
  border-left-color: black;
  box-shadow: inset 1.5px 1.5px 0 var(--border-gray);
  background-color: #c3c3c3;
  border-right-color: var(--border-white);
  border-bottom-color: var(--border-white);
  margin: 2px 0 0 2px;
}

.text-title-large {
  font-size: 22px !important;
  font-weight: 400 !important;
  line-height: 30px !important;
  letter-spacing: 0px !important;
}
</style>
