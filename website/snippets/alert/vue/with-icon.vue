<script setup lang="ts">
import { Info as InfoIcon } from '@lucide/vue';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/vue/alert';

const alert = {
  title: 'Workspace sync is active',
  description: 'Changes are being synced across all connected devices.',
};
</script>

<template>
  <Alert status="info">
    <AlertIndicator>
      <InfoIcon />
    </AlertIndicator>
    <AlertContent>
      <AlertTitle>{{ alert.title }}</AlertTitle>
      <AlertDescription>{{ alert.description }}</AlertDescription>
    </AlertContent>
  </Alert>
</template>