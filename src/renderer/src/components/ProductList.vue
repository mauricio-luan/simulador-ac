<template>
  <v-table
    class="box border-thin"
    height="250"
    striped="odd"
    fixed-header
    hover
  >
    <thead>
      <tr>
        <th
          v-for="(field, index) in headers"
          :key="index"
          class="text-center"
        >
          {{ field.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="p in produtos"
        :key="p.id"
      >
        <td>{{ p.id }}</td>
        <td>{{ p.produto }}</td>
        <td>R$ {{ p.valorUnitario.toFixed(2) }}</td>
        <td>
          <AppButton
            @click="$store.dispatch('adicionarAoCarrinho', p)"
          >
            <template #icon>
              <v-icon>mdi-plus</v-icon>
            </template>
          </AppButton>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import AppButton from './Button.vue';

export default {
  components: {
    AppButton
  },

  props: {
    produtos: { type: Array, required: true }
  },
  data() {
    return {
      headers: [
        { text: 'Id' },
        { text: 'Produto' },
        { text: 'UN' },
        { text: 'Ação' }
      ]
    }
  }
}
</script>
