<script setup lang="ts">
import { Info as InfoIcon } from '@lucide/vue';
import {
  Alert,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/vue/alert';
import { Button } from '@moduix/vue/button';
import { ref } from 'vue';
import styles from '@/components/examples/alert/alert-custom-composition.module.css';

const alert = {
  title: 'Storage is almost full',
  description:
    'You are using 92% of the available storage. Archive old uploads or upgrade the plan.',
  primaryAction: 'Review uploads',
  secondaryAction: 'Dismiss',
};

const visible = ref(true);
const dismiss = () => (visible.value = false);
</script>

<template>
  <Alert v-if="visible" status="warning" :class="styles.custom">
    <AlertIndicator>
      <InfoIcon />
    </AlertIndicator>
    <AlertContent>
      <AlertTitle>{{ alert.title }}</AlertTitle>
      <AlertDescription>{{ alert.description }}</AlertDescription>
      <AlertActions>
        <Button size="sm">{{ alert.primaryAction }}</Button>
        <Button size="sm" variant="outline" @click="dismiss">
          {{ alert.secondaryAction }}
        </Button>
      </AlertActions>
    </AlertContent>
  </Alert>
</template>