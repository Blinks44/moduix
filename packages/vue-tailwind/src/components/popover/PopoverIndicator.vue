<script setup lang="ts">
import { PopoverIndicator as ArkPopoverIndicator } from '@ark-ui/vue/popover';
import type { PopoverIndicatorProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverIndicatorProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverIndicator v-bind="attrs" data-slot="popover-indicator">
    <slot />
  </ArkPopoverIndicator>
</template>