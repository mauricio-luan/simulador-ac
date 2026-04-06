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
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Produto
        </th>
        <th class="text-left">
          Valor
        </th>
        <th class="text-left">
          QTD
        </th>
        <th class="text-left">
          Ação
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
  computed: {
    produtos() {
      return this.$store.getters.getTodosProdutos
    }
  }
}
</script>
