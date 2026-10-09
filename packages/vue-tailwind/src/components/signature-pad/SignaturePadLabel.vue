<script setup lang="ts">
import { SignaturePadLabel as ArkSignaturePadLabel } from '@ark-ui/vue/signature-pad';
import type { SignaturePadLabelProps } from '@ark-ui/vue/signature-pad';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium text-foreground select-none', className)"
    data-slot="signature-pad-label"
  >
    <slot />
  </ArkSignaturePadLabel>
</template>