import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // activa esto para crear una conexión proxy, es decir si tu api
  // va estar en el mismo dominio entonces entonces no es necesario
  // cors sino puedes usar simplemente proxy, pero en este caso no lo haré
  // server: {
  //   proxy: {
  //     '/socket.io': {
  //       target: 'http://localhost:3000',
  //       ws: true        
  //     }
  //   }
  // }
})
