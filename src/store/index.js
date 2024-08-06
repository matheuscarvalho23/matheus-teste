import { reactive } from 'vue'

const state = reactive({
  step: 1,
})

const advanceStep = () => {
  if (state.step < 4) state.step++
}

const backStep = () => {
  if (state.step > 1) state.step--
}

const resetStep = () => {
  state.step = 1
}

export default {
  state,
  advanceStep,
  backStep,
  resetStep
}