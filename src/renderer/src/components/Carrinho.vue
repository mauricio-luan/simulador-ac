<template>
  <v-table
    class="border-thin"
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
          <v-btn
            class="cursor-pointer mr-2"
            color="error"
            icon="mdi-trash-can"
            density="comfortable"
            @click="$store.dispatch('removerDoCarrinho', p.id)"
          />
          <v-btn
            class="cursor-pointer"
            color="primary"
            icon="mdi-minus"
            density="comfortable"
            @click="$store.dispatch('decrementaProduto', p.id)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
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
