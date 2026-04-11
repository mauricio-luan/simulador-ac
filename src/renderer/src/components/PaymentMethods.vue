<template>
  <v-card class="align-center pa-5">
    <v-card-title class="w-100 text-center">
      Escolha o metodo:
    </v-card-title>

    <v-card-text class="w-75 d-flex justify-center flex-column ga-2">
      <v-btn
        v-for="btn in buttons"
        :key="btn.label"
        variant="tonal"
        @click="$emit('select', btn)"
      >
        {{ btn.label }}
      </v-btn>
    </v-card-text>

    <v-card-actions>
      <v-btn
        variant="text"
        color="error"
        prepend-icon="mdi-close"
        @click="$emit('close')"
      >
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PaymentMethods',

  props: {
    buttons: Array
  },

  emits: ['close', 'select']
}
</script>
<style scoped></style>
