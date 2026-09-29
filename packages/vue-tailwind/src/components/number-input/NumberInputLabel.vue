<script setup lang="ts">
import { NumberInputLabel as ArkNumberInputLabel } from '@ark-ui/vue/number-input';
import type { NumberInputLabelProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium text-foreground', className)"
    data-slot="number-input-label"
  >
    <slot />
  </ArkNumberInputLabel>
</template>