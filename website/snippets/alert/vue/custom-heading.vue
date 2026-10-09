<script setup lang="ts">
import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/vue/alert';

const alert = {
  title: 'Billing issue',
  description: 'Use asChild when the surrounding page needs a different heading level.',
};
</script>

<template>
  <Alert status="info">
    <AlertContent>
      <AlertTitle as-child>
        <h2>{{ alert.title }}</h2>
      </AlertTitle>
      <AlertDescription>{{ alert.description }}</AlertDescription>
    </AlertContent>
  </Alert>
</template>