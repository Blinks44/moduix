<script setup lang="ts">
import { usePasswordInputContext } from '@ark-ui/vue/password-input';
import type { UsePasswordInputContext } from '@ark-ui/vue/password-input';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UsePasswordInputContext>) => unknown }>();

const context = usePasswordInputContext();
</script>

<template>
  <slot v-bind="context" />
</template>