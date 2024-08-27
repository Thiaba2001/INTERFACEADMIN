import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3000,         // Définit le port 3000 pour l'aperçu de production
    strictPort: true,
    host: '0.0.0.0',    // Si le port 3000 est déjà occupé, le serveur échouera plutôt que d'utiliser un autre port

  },
  server: {
    port: 3000,
    strictPort: true,  // Définit le port 3000 pour le serveur de développement     // Si le port 3000 est déjà occupé, le serveur échouera plutôt que d'utiliser un autre port
    host: '0.0.0.0',
    origin: "http://0.0.0.0:3000",
  }
})
