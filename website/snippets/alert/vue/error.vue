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
  title: 'Payment failed',
  description: 'Your payment could not be processed. Check the payment method and try again.',
};
</script>

<template>
  <Alert status="error">
    <AlertIndicator>
      <InfoIcon />
    </AlertIndicator>
    <AlertContent>
      <AlertTitle>{{ alert.title }}</AlertTitle>
      <AlertDescription>{{ alert.description }}</AlertDescription>
    </AlertContent>
  </Alert>
</template>