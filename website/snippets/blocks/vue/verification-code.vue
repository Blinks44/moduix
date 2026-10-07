<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldErrorText } from '@/components/ui/field';
import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInputs,
  PinInputLabel,
} from '@/components/ui/pin-input';
import styles from './verification-code-form.module.css';

const emit = defineEmits<{ submit: [event: Event] }>();
const invalid = ref(false);
const handleSubmit = (event: Event) => {
  if (!(event.currentTarget instanceof HTMLFormElement)) return;
  const code = new FormData(event.currentTarget).get('code');
  invalid.value = typeof code !== 'string' || code.length !== 6;
  if (invalid.value) {
    event.preventDefault();
    return;
  }
  emit('submit', event);
};
</script>

<template>
  <Card :class="styles.root">
    <CardHeader :class="styles.header">
      <CardTitle>Verify your email</CardTitle>
      <CardDescription>Enter the 6-digit code from your email.</CardDescription>
    </CardHeader>
    <CardBody>
      <form :class="styles.stack" novalidate @submit="handleSubmit">
        <Field :class="styles.field" :invalid="invalid" required>
          <PinInput :class="styles.code" :count="6" name="code" otp @value-change="invalid = false">
            <PinInputLabel>Verification code</PinInputLabel>
            <PinInputHiddenInput />
            <PinInputControl><PinInputInputs /></PinInputControl>
          </PinInput>
          <FieldErrorText v-if="invalid">Enter all six digits before verifying.</FieldErrorText>
        </Field>
        <Button type="submit" :class="styles.submit">Verify email</Button>
      </form>
    </CardBody>
    <CardFooter :class="styles.footer">
      <p>Wrong email? <a :class="styles.link" href="/sign-in">Use a different one</a></p>
    </CardFooter>
  </Card>
</template>