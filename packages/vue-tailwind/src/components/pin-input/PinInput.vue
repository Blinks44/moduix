<script setup lang="ts">
import { PinInputRoot as ArkPinInputRoot } from '@ark-ui/vue/pin-input';
import type { PinInputRootEmits, PinInputRootProps } from '@ark-ui/vue/pin-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputRootProps {
  class?: HTMLAttributes['class'];
  placeholder?: PinInputRootProps['placeholder'];
}

export interface Emits extends /* @vue-ignore */ PinInputRootEmits {}

const { class: className, placeholder = '' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPinInputRoot
    v-bind="attrs"
    :class="
      cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        className,
      )
    "
    :placeholder="placeholder"
    data-slot="pin-input-root"
  >
    <slot />
  </ArkPinInputRoot>
</template>