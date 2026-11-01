<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { useTemplateRef } from 'vue';
import type { ComponentPublicInstance } from 'vue';

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
  <Stack align="center" gap="3">
    <Button ref="button" aria-label="Focus target">{{ labels.target }}</Button>
    <Button size="sm" variant="outline" @click="focusButton">{{ labels.trigger }}</Button>
  </Stack>
</template>