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
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from './login-simple-form.module.css';

const emit = defineEmits<{ submit: [event: Event] }>();
</script>

<template>
  <Card :class="styles.root">
    <CardHeader :class="styles.header">
      <CardTitle>Welcome back</CardTitle>
      <CardDescription>Sign in to continue to your workspace.</CardDescription>
    </CardHeader>

    <CardBody>
      <form :class="styles.stack" @submit="emit('submit', $event)">
        <Field required>
          <FieldLabel>Email address</FieldLabel>
          <Input name="email" type="email" autocomplete="email" placeholder="you@example.com" />
        </Field>

        <Field required>
          <div :class="styles.passwordLabel">
            <FieldLabel>Password</FieldLabel>
            <a :class="styles.link" href="/forgot-password"> Forgot password? </a>
          </div>
          <Input name="password" type="password" autocomplete="current-password" />
        </Field>

        <Checkbox name="remember">
          <CheckboxHiddenInput />
          <CheckboxControl />
          <CheckboxLabel>Remember me</CheckboxLabel>
        </Checkbox>

        <Button type="submit" :class="styles.submit"> Sign in </Button>
      </form>
    </CardBody>

    <CardFooter :class="styles.footer">
      <p>
        New here?
        <a :class="styles.link" href="/sign-up"> Create an account </a>
      </p>
    </CardFooter>
  </Card>
</template>