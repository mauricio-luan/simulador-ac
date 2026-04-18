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
          v-for="label in labels"
          :key="label"
          class="text-left"
        >
          {{ label }}
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
        <td>{{ p.quantidade }}</td>
        <td>
          <AppButton
            @click="$store.dispatch('removerDoCarrinho', p.id)"
          >
            <template #icon>
              <v-icon>mdi-trash-can</v-icon>
            </template>
          </AppButton>

          <AppButton
            @click="$store.dispatch('decrementaProduto', p.id)"
          >
            <template #icon>
              <v-icon>mdi-minus</v-icon>
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

  data() {
    return {
      labels: ['Id', 'Produto', 'Valor', 'QTD', 'Ação']
    }
  },
  computed: {
    produtos() {
      return this.$store.getters.getTodosProdutos
    }
  }
}
</script>
