<script setup lang="ts">
import { Alert, AlertContent, AlertDescription, AlertTitle } from '@moduix/vue/alert';

const alert = {
  title: 'Update available',
  description: 'Install the latest version when your workflow allows it.',
};
</script>

<template>
  <Alert>
    <AlertContent>
      <AlertTitle>{{ alert.title }}</AlertTitle>
      <AlertDescription>{{ alert.description }}</AlertDescription>
    </AlertContent>
  </Alert>
</template>