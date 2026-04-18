import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'simuladorAcW95',
    themes: {
      simuladorAcW95: {
        dark: false,
        colors: {
          primary: '#c3c3c3',
          secondary: '#000ea3',
          background: '#008282',
          surface: '#c3c3c3',
          error: '#ff0000',
          success: '#00ff00',
          warning: '#ffd700',
          info: '#000ea3'
        }
      }
    }
  }
})

export default vuetify
