<script setup lang="ts">
import { NumberInputControl as ArkNumberInputControl } from '@ark-ui/vue/number-input';
import type { NumberInputControlProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputControl
    v-bind="attrs"
    :class="cn('inline-flex items-stretch', className)"
    data-slot="number-input-control"
  >
    <slot />
  </ArkNumberInputControl>
</template>