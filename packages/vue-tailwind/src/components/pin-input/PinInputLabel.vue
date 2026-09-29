<script setup lang="ts">
import { PinInputLabel as ArkPinInputLabel } from '@ark-ui/vue/pin-input';
import type { PinInputLabelProps } from '@ark-ui/vue/pin-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputLabel
    v-bind="attrs"
    :class="cn('text-sm font-medium text-foreground', className)"
    data-slot="pin-input-label"
  >
    <slot />
  </ArkPinInputLabel>
</template>