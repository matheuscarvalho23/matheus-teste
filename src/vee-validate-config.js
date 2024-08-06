import { defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import ptBR from '@vee-validate/i18n/dist/locale/pt_BR.json';

defineRule('required', required);
defineRule('email', email);

configure({
  generateMessage: localize({
    pt_BR: ptBR,
  }),
  validateOnInput: true,
});