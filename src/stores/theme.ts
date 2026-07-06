import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'ooo-theme'

export const useThemeStore = defineStore('theme', () => {
  // index.html applies the initial .dark class pre-paint; the store adopts it.
  const isDark = ref(document.documentElement.classList.contains('dark'))

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    // localStorage can throw in privacy modes; the toggle still works this session.
    try {
      localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    } catch {
      // ignore — preference just won't persist
    }
  }

  return { isDark, toggle }
})
