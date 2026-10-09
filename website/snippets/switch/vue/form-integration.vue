<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/vue/switch';
import { ref } from 'vue';
import styles from '@/components/examples/switch/switch-form-integration.module.css';

const checked = ref(false);
const submitted = ref(false);

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  submitted.value = true;
};
</script>

<template>
  <form :class="styles.form" novalidate @submit="handleSubmit">
    <Field :invalid="submitted && !checked" :class="styles.formField">
      <Switch v-model:checked="checked" name="notifications" required>
        <SwitchControl />
        <SwitchLabel>Product updates</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <FieldHelperText>Choose whether to receive product updates.</FieldHelperText>
      <FieldErrorText>Choose a notification preference.</FieldErrorText>
    </Field>
    <div>
      <output>
        {{
          submitted ? (checked ? 'Preference saved.' : 'Choose a preference.') : 'Not submitted.'
        }}
      </output>
      <Button size="sm" type="submit">Save preference</Button>
    </div>
  </form>
</template>