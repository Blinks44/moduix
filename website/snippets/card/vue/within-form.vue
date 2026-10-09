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
import styles from '@/components/examples/card/card-within-form.module.css';

const copy = {
  title: 'Create account',
  description: 'Enter the contact details for the new member.',
};
const fields = [
  { label: 'First name', name: 'firstName', autocomplete: 'given-name' },
  { label: 'Last name', name: 'lastName', autocomplete: 'family-name' },
];
</script>

<template>
  <Card as-child :class="styles.root">
    <form>
      <CardHeader>
        <CardTitle>{{ copy.title }}</CardTitle>
        <CardDescription>{{ copy.description }}</CardDescription>
      </CardHeader>
      <CardBody :class="styles.body">
        <label v-for="field in fields" :key="field.name" :class="styles.field">
          {{ field.label }}
          <input :name="field.name" :autocomplete="field.autocomplete" />
        </label>
      </CardBody>
      <CardFooter>
        <Button type="reset" variant="outline">Cancel</Button>
        <Button type="submit">Create account</Button>
      </CardFooter>
    </form>
  </Card>
</template>