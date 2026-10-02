<script setup lang="ts">
import { Check as CheckIcon } from '@lucide/vue';
import { ToggleGroupItem, useToggleGroupContext } from '@moduix/vue/toggle-group';
defineProps<{ value: string }>();
const toggleGroup = useToggleGroupContext();
</script>

<template>
  <ToggleGroupItem :value="value">
    <slot />
    <CheckIcon v-if="toggleGroup.value.includes(value)" aria-hidden="true" focusable="false" />
  </ToggleGroupItem>
</template>