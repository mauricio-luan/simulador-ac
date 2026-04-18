<template>
  <v-card class="align-center pa-5 box">
    <v-card-title class="w-100 text-center">
      Escolha o metodo:
    </v-card-title>

    <v-card-text class="w-75 d-flex justify-center flex-column ga-2">
      <AppButton
        v-for="btn in buttons"
        :key="btn.label"
        :content="btn.label"
        @click="$emit('select', btn)"
      />
    </v-card-text>

    <v-card-actions>
      <AppButton
        :content="'Cancelar'"
        @click="$emit('close')"
      >
        <template #icon>
          <v-icon>mdi-close</v-icon>
        </template>
      </AppButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import AppButton from './Button.vue';

export default {

  name: 'PaymentMethods',
  components: {
    AppButton
  },

  props: {
    buttons: Array
  },

  emits: ['close', 'select']
}
</script>
