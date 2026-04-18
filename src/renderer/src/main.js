import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import vuetify from './plugins/vuetify'
import 'vue-toastification/dist/index.css'
import 'vuetify/styles'
import '../../assets/global.css'

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.mount('#app')
