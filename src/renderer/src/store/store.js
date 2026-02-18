import { createStore } from 'vuex'

const store = createStore({
  state: {
    carrinho: [],
    logs: [],
    integrationMode: 'localhost',
    apiGatewayConfig: {
      callbackUrl: null,
      automationName: null,
      companyId: null,
      storeId: null,
      terminalId: null
    }
  },

  mutations: {
    adicionarAoCarrinho(state, produto) {
      const produtoNoCarrinho = state.carrinho.find((p) => p.id === produto.id)

      produtoNoCarrinho
        ? produtoNoCarrinho.quantidade++
        : state.carrinho.push({ ...produto, quantidade: 1 })
    },

    removerDoCarrinho(state, produtoId) {
      const index = state.carrinho.findIndex((p) => p.id === produtoId)
      if (index != -1) state.carrinho.splice(index, 1)
    },

    decrementaProduto(state, produtoId) {
      const produto = state.carrinho.find((p) => p.id === produtoId)

      if (produto) {
        if (produto.quantidade > 1) produto.quantidade--
        else this.commit('removerDoCarrinho', produto.id)
      }
    },

    limpaCarrinho(state) {
      state.carrinho = []
      window.api.log.info('[STORE] -> Carrinho foi limpo')
    },

    adicionaAoLog(state, log) {
      state.logs.push(log)
    },

    setIntegrationMode(state, mode) {
      state.integrationMode = mode
      window.api.log.info(`[STORE] -> Modo de integracao alterado para: ${mode}`)
    },

    setApiGatewayConfig(state, config) {
      state.apiGatewayConfig = { ...state.apiGatewayConfig, ...config }
    },

    setToken(state, token) {
      state.IdToken = token
    }
  },

  actions: {
    adicionarAoCarrinho(context, produto) {
      context.commit('adicionarAoCarrinho', produto)
    },

    removerDoCarrinho(context, produtoId) {
      context.commit('removerDoCarrinho', produtoId)
    },

    decrementaProduto(context, produtoId) {
      context.commit('decrementaProduto', produtoId)
    },

    limpaCarrinho(context) {
      context.commit('limpaCarrinho')
    },

    async getToken() {
      try {
        const response = await window.api.payment.getToken()
        window.api.electronStore.set('IdToken', response)
        window.api.log.info(`[STORE] -> Token de acesso atualizado com sucesso: ${response}`)
      } catch (error) {
        window.api.log.error(`[STORE] -> Erro ao obter token de acesso: ${error.message}`)
        throw error
      }
    },

    saveApiGatewayConfig(context, config) {
      try {
        window.api.electronStore.set('apiGatewayConfig', { ...config })
        context.commit('setApiGatewayConfig', config)
      } catch (error) {
        window.api.log.error(`[STORE] -> Erro ao salvar configuração API Gateway: ${error.message}`)
      }
    },

    async fetchApiGatewayConfig(context) {
      const config = await window.api.electronStore.get('apiGatewayConfig')
      context.commit('setApiGatewayConfig', config)
      window.api.log.info('[STORE] -> Configuração API Gateway recuperada e atualizada')
    }
  },

  getters: {
    getTodosProdutos(state) {
      return state.carrinho
    },

    quantidadeProdutosNoCarrinho(state) {
      return state.carrinho.reduce((soma, produto) => {
        const total = soma + produto.quantidade
        return total
      }, 0)
    },

    valorTotalNoCarrinho(state) {
      return state.carrinho.reduce((soma, produto) => {
        const valorTotalPorProduto = produto.valorUnitario * produto.quantidade
        const total = soma + valorTotalPorProduto
        return total
      }, 0)
    },

    carrinhoEstaVazio(state) {
      return state.carrinho.length === 0
    },

    logs(state) {
      return state.logs
    },

    integrationMode(state) {
      return state.integrationMode
    },

    apiGatewayConfig(state) {
      return state.apiGatewayConfig
    }
  }
})

export default store
