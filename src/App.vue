<template>
  <FirsStep 
    v-if="store.state.step === 1" 
    :form="form" 
    @nextStep="store.advanceStep" 
  />

  <SecondStep 
    v-if="store.state.step === 2" 
    :form="form" 
    @nextStep="store.advanceStep"
    @backStep="store.backStep"
  />

  <ThirdStep 
    v-if="store.state.step === 3" 
    :form="form" 
    @nextStep="store.advanceStep"
    @backStep="store.backStep"
  />

  <FourthStep
    v-if="store.state.step === 4" 
    :form="form" 
    @register="handleRegister"
    @backStep="store.backStep"
  />
</template>

<script setup>
import SecondStep from './components/SecondStep.vue'
import FourthStep from './components/FourthStep.vue'
import { TypePersonEnum } from './enums/typePerson'
import ThirdStep from './components/ThirdStep.vue'
import FirsStep from './components/FirstStep.vue'
import { useToast } from 'vue-toastification'
import { ref, provide } from 'vue'
import store from './store/index'

provide('store', store)

const form = ref({
  email: '',
  personType: TypePersonEnum.PESSOA_FISICA,
  name: '',
  companyName: '',
  document: '',
  dateOfBirth: '',
  dateOpenCompany: '',
  phone: '',
  password: ''
})

const toast = useToast();

async function handleRegister () {
  try {
    const response = await fetch('/registration', {
      method: 'POST',
      body: form.value
    })

    if (response.ok) {
      toast.success('Cadastro realizado com sucesso !')
      store.resetStep()
    }

    if (!response.ok) {
      toast.error('Houve um erro ao realizar o cadastro, tente novamente!')
    }

  } catch (error) {
    toast.error(error)
  }
}
</script>
