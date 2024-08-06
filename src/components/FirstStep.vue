<template>
  <FormContainer>
    <template #form-header>
      <p>Etapa <span class="step-number">{{ store.state.step }}</span> de 4</p>
    </template>

    <template #form-content>
      <div class="form-content">
        <span>Seja bem-vindo(a)</span>
  
        <form>
          <div class="form-content__email">
            <label for="email">Endereço de e-mail</label>
            <Field name="email" v-slot="{ field, errors }">
              <input v-model="form.email" v-bind="field" type="email" />
              <div class="form-errors">{{ errors[0] }}</div>
            </Field>
          </div>

          <div class="form-content__type">
            <label>
              <input type="radio" :value="TypePersonEnum.PESSOA_FISICA" v-model="form.personType" />
              Pessoa Física
            </label>
            <label>
              <input type="radio" :value="TypePersonEnum.PESSOA_JURIDICA" v-model="form.personType" />
              Pessoa Jurídica
            </label>
          </div>
        </form>
      </div>
    </template>

    <template #form-footer>
      <Button 
        :title="'Continuar'"
        :type="'advance'"
        :is-disabled="!isFormValid"
        @click="nextStep" 
      />
    </template>
  </FormContainer>
</template>

<script setup>
import { TypePersonEnum } from '../enums/typePerson'
import { toTypedSchema } from '@vee-validate/yup'
import FormContainer from './FormContainer.vue'
import { useForm, Field } from 'vee-validate'
import { inject, computed } from 'vue'
import Button from './Button.vue'
import * as yup from 'yup'

const store = inject('store')

const emit = defineEmits(['nextStep'])

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
});

const schema = yup.object({
  email: yup.string().email('E-mail inválido.').required('E-mail é obrigatório.'),
});

const { errors, validate } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: props.form,
})

const isFormValid = computed(() => {
  return validate().then(valid => valid)
});

function nextStep () {
  if (!Object.keys(errors.value).length) {
    emit('nextStep')
  }
}
</script>

<style lang="scss" scoped>
.step-number {
  color: $primary-color;
}

.form-content {
  span {
    font-size: 22px;
    font-weight: 700;
  }

  form {
    margin: 36px 0;
    font-weight: 600;
  }

  &__email {
    input {
      width: 465px;
      height: 30px;
      border-radius: 5px;
      border: solid 1px #000;
      margin: 10px 0 2px 0;
      padding: 10px;
      font-size: 20px;
    }

    .form-errors {
      margin-bottom: 15px;
      color: red;
    }
  }

  &__type {
    input, label {
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>