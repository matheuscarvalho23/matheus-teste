<template>
  <FormContainer>
    <template #form-header>
      <p>Etapa <span class="step-number">{{ store.state.step }}</span> de 4</p>
    </template>

    <template #form-content>
      <div class="form-content">
        <span>
          Pessoa {{ form.personType ? 'Física' : 'Júridica' }}
        </span>
  
        <form>
          <section v-if="form.personType === TypePersonEnum.PESSOA_FISICA">
            <div class="form-content__name">
              <label for="name">Nome</label>
              <Field name="name" v-slot="{ field, errors }">
                <input v-model="form.name" type="text" v-bind="field" />
                <div class="form-errors">{{ errors[0] }}</div>
              </Field>
            </div>
    
            <div class="form-content__document">
              <label for="document">CPF</label>
              <Field name="document" v-slot="{ field, errors }">
                <input v-model="form.document" v-maska="'###.###.###-##'" type="text" v-bind="field" />
                <div class="form-errors">{{ errors[0] }}</div>
              </Field>
            </div>
    
            <div class="form-content__birth">
              <label for="date">Data de Nascimento</label>
              <Field name="date" v-slot="{ field, errors }">
                <input v-model="form.dateOfBirth" type="date" v-bind="field" />
                <div class="form-errors">{{ errors[0] }}</div>
              </Field>
            </div>
          </section>

          <section v-if="form.personType === TypePersonEnum.PESSOA_JURIDICA">
            <div class="form-content__name">
              <label for="name">Razão Social</label>
              <Field name="name" v-slot="{ field, errors }">
                <input v-model="form.companyName" type="text" v-bind="field" />
                <div class="form-errors">{{ errors[0] }}</div>
              </Field>
            </div>
    
            <div class="form-content__document">
              <label for="document">CNPJ</label>
              <Field name="document" v-slot="{ field, errors }">
                <input v-model="form.document" v-maska="'##.###.###/####-##'" type="text" v-bind="field" />
                <div class="form-errors">{{ errors[0] }}</div>
              </Field>
            </div>
    
            <div class="form-content__birth">
              <label for="birth">Data de abertura</label>
              <Field name="date" v-slot="{ field, errors }">
                <input v-model="form.dateOpenCompany" type="date" v-bind="field" />
                <div class="form-errors">{{ errors[0] }}</div>
              </Field>
            </div>
          </section>
  
          <div class="form-content__phone">
            <label for="phone">Telefone</label>
            <Field name="phone" v-slot="{ field, errors }">
              <input v-model="form.phone" type="text" v-maska="'(##) #####-####'" v-bind="field" />
              <div class="form-errors">{{ errors[0] }}</div>
            </Field>
          </div>
        </form>
      </div>
    </template>

    <template #form-footer>
      <Button 
        :title="'Voltar'"
        :type="'back'"
        @click="$emit('backStep')" 
      />
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
import { vMaska } from "maska/vue"
import Button from './Button.vue'
import * as yup from 'yup'

const store = inject('store')

const emit = defineEmits(['nextStep']);

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
});

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório.'),
  document: yup.string().required('Documento é obrigatório.'),
  date: yup.date().required('Data é obrigatória.').max(new Date(), 'A data é inválida.'),
  phone: yup.string().required('Telefone é obrigatório'),
});

const { errors, validate } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: props.form,
})

const isFormValid = computed(() => {
  return validate().then(valid => valid)
})

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

    .form-errors {
      margin-bottom: 5px;
      color: red;
    }
  }

  input {
    width: 465px;
    height: 35px;
    border-radius: 5px;
    border: solid 1px #000;

    margin: 10px 0 2px 0;

    padding: 10px;
    font-size: 20px;
  }
}
</style>