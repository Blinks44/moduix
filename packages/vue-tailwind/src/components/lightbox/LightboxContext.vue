<script setup lang="ts">
import { DialogContext as ArkDialogContext, type UseDialogContext } from '@ark-ui/vue/dialog';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseDialogContext>) => unknown }>();
</script>

<template>
  <ArkDialogContext v-slot="context">
    <slot v-bind="context" />
  </ArkDialogContext>
</template>