<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import styles from './reset-password-form.module.css';

const emit = defineEmits<{ submit: [event: Event] }>();
</script>

<template>
  <Card :class="styles.root">
    <CardHeader :class="styles.header">
      <CardTitle>Create a new password</CardTitle>
      <CardDescription>Choose a strong password you don&apos;t use elsewhere.</CardDescription>
    </CardHeader>

    <CardBody>
      <form :class="styles.stack" @submit="emit('submit', $event)">
        <Field required>
          <FieldLabel>New password</FieldLabel>
          <Input name="password" type="password" autocomplete="new-password" />
        </Field>

        <Field required>
          <FieldLabel>Confirm new password</FieldLabel>
          <Input name="confirm-password" type="password" autocomplete="new-password" />
        </Field>

        <Button type="submit" :class="styles.submit"> Reset password </Button>
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