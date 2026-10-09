<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { useTemplateRef } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import styles from '@/components/examples/button/button-ref.module.css';

const labels = {
  target: 'Focus target',
  trigger: 'Focus first button',
};
const buttonRef = useTemplateRef<ComponentPublicInstance>('button');

const focusButton = () => {
  const element = buttonRef.value?.$el;
  if (element instanceof HTMLButtonElement) element.focus();
};
</script>

<template>
  <div :class="styles.root">
    <Button ref="button" aria-label="Focus target">{{ labels.target }}</Button>
    <Button size="sm" variant="outline" @click="focusButton">{{ labels.trigger }}</Button>
  </div>
</template>