<template>
  <v-btn
    flat
    tile
    :disabled="disabled"
    :ripple="false"
    class="box"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />

    {{ content }}
  </v-btn>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    content: String,
    disabled: Boolean,
  },

  emits: ['click']
}
</script>

<style scoped>
.box:active {
  border-top-color: black;
  border-left-color: black;
  box-shadow: inset 1.5px 1.5px 0 var(--border-gray);
  background-color: var(--border-gray);
  border-right-color: var(--border-white);
  border-bottom-color: var(--border-white);
  margin: 2px 0 0 2px;
}

.box.v-btn--disabled {
  color: var(--border-gray) !important;
  border: none;
}

.v-btn {
  padding: 8px;
}
</style>
