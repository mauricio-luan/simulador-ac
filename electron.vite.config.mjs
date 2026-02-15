import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  const aliases = {
    '@': resolve('src'),
    '@renderer': resolve('src/renderer/src'),
    '@shared': resolve('src/shared')
  }

  return {
    renderer: {
      resolve: {
        alias: { ...aliases }
      },
      plugins: [vue()]
    },

    main: {
      resolve: {
        alias: { ...aliases }
      }
    },

    preload: {
      resolve: {
        alias: { ...aliases }
      }
    }
  }
})
