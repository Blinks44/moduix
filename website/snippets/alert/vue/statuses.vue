<script setup lang="ts">
import { Check as CheckIcon, Info as InfoIcon } from '@lucide/vue';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/vue/alert';
import styles from '@/components/examples/alert/alert-statuses.module.css';

const statuses = ['info', 'success', 'warning', 'error'] as const;
</script>

<template>
  <div :class="styles.stack">
    <Alert v-for="status in statuses" :key="status" :status="status">
      <AlertIndicator>
        <CheckIcon v-if="status === 'success'" />
        <InfoIcon v-else />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>{{ status }}</AlertTitle>
        <AlertDescription>Use this alert for {{ status }} feedback.</AlertDescription>
      </AlertContent>
    </Alert>
  </div>
</template>