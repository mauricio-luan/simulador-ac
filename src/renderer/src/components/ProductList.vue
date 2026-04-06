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
          v-for="(field, index) in headers"
          :key="index"
          :class="field.class"
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
          <v-btn
            class="cursor-pointer"
            color="primary"
            density="compact"
            icon="mdi-plus"
            @click="$store.dispatch('adicionarAoCarrinho', p)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    produtos: { type: Array, required: true }
  },
  data() {
    return {
      headers: [
        { class: 'text-left', text: 'Id' },
        { class: 'text-left', text: 'Produto' },
        { class: 'text-left', text: 'UN' },
        { class: 'text-left', text: 'Ação' }
      ]
    }
  }
}
</script>
