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
  <Card class="w-[min(100%,26rem)]">
    <CardHeader class="flex flex-col gap-2 text-center">
      <CardTitle>Verify your email</CardTitle>
      <CardDescription>Enter the 6-digit code from your email.</CardDescription>
    </CardHeader>
    <CardBody>
      <form class="grid gap-4" novalidate @submit="handleSubmit">
        <Field class="items-center" :invalid="invalid" required>
          <PinInput
            class="w-full items-center"
            :count="6"
            name="code"
            otp
            @value-change="invalid = false"
          >
            <PinInputLabel>Verification code</PinInputLabel>
            <PinInputHiddenInput />
            <PinInputControl><PinInputInputs /></PinInputControl>
          </PinInput>
          <FieldErrorText v-if="invalid">Enter all six digits before verifying.</FieldErrorText>
        </Field>
        <Button type="submit" class="w-full">Verify email</Button>
      </form>
    </CardBody>
    <CardFooter
      class="justify-center text-center [&_p]:m-0 [&_p]:text-sm [&_p]:text-muted-foreground"
    >
      <p>
        Wrong email?
        <a
          class="text-sm font-medium text-primary underline-offset-[0.2em] hover:text-foreground hover:underline focus-visible:rounded-xs focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
          href="/sign-in"
          >Use a different one</a
        >
      </p>
    </CardFooter>
  </Card>
</template>