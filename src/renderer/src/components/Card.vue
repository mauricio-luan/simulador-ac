<template>
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
</template>

<script>
export default {
  name: 'AppCard',

  props: {
    title: String

  }
}
</script>
<style scoped></style>
