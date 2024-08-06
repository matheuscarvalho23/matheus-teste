import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'
import { createApp } from 'vue'
import './vee-validate-config'
import App from './App.vue'
import './styles/main.scss'

const options = {
  timeout: 5000,
  position: 'top-right'
}

const app = createApp(App);

app.use(Toast, options);

app.mount('#app');
