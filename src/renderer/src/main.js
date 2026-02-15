import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'vuetify/styles'

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeButton: true,
  pauseOnHover: true
})
app.mount('#app')
