<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from './forgot-password-form.module.css';

const emit = defineEmits<{ submit: [event: Event] }>();
</script>

<template>
  <Card :class="styles.root">
    <CardHeader :class="styles.header">
      <CardTitle>Reset your password</CardTitle>
      <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
    </CardHeader>

    <CardBody>
      <form :class="styles.stack" @submit="emit('submit', $event)">
        <Field required>
          <FieldLabel>Email address</FieldLabel>
          <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
        </Field>

        <Button type="submit" :class="styles.submit"> Send reset link </Button>
      </form>
    </CardBody>

    <CardFooter :class="styles.footer">
      <p>
        Remembered your password?
        <a :class="styles.link" href="/sign-in"> Sign in </a>
      </p>
    </CardFooter>
  </Card>
</template>