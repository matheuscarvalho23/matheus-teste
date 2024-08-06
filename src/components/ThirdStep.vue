<template>
  <FormContainer>
    <template #form-header>
      <p>Etapa <span class="step-number">{{ store.state.step }}</span> de 4</p>
    </template>

    <template #form-content>
      <div class="form-content">
        <span>
          Senha de Acesso
        </span>
  
        <form>
          <label for="password">Senha de Acesso</label>
          <div class="form-content__password">
            <Field name="password" v-slot="{ field, errors }">
              <input v-model="form.password" type="password" v-bind="field" />
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
import { toTypedSchema } from '@vee-validate/yup'
import FormContainer from './FormContainer.vue'
import { useForm, Field } from 'vee-validate'
import { inject, computed } from 'vue'
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
  password: yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('Nome é obrigatório.'),
});

const { errors, validate } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: props.form,
})

const isFormValid = computed(() => {
  return validate().then(valid => valid);
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
    width: 466px;
    height: 30px;
    border-radius: 5px;
    border: solid 1px #000;
    margin: 10px 0 2px 0;

    padding: 10px;
    font-size: 20px;
  }
}
</style>
