<template>
  <div
    class="pa-0 ma-0"
  >
    <v-btn
      flat
      tile
      :disabled="disable"
      :ripple="false"
      color="primary"
      class="box"
    >
      {{ content }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    content: String,
    disable: Boolean
  }
}
</script>

<style scoped>
.box:active {
  border-top-color: black;
  border-left-color: black;
  box-shadow: inset 1.5px 1.5px 0 var(--border-gray);
  background-color: var(--box-background-disable);
  border-right-color: var(--border-white);
  border-bottom-color: var(--border-white);
  margin: 1px 0 0 1px;
}

.box.v-btn--disabled {
  color: #818181 !important;
  background-color: var(--box-background-disable);
  border: none;
}
</style>
