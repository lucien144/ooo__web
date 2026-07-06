import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'ooo-theme'

export const useThemeStore = defineStore('theme', () => {
  // index.html applies the initial .dark class pre-paint; the store adopts it.
  const isDark = ref(document.documentElement.classList.contains('dark'))

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  return { isDark, toggle }
})
