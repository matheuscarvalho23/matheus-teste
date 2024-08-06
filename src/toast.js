import { createToastInterface } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  timeout: 5000,
  position: 'top-right'
}

export const toast = createToastInterface(options);