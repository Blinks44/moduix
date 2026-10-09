<script setup lang="ts">
import { NumberInputScrubber as ArkNumberInputScrubber } from '@ark-ui/vue/number-input';
import type { NumberInputScrubberProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputScrubberProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputScrubber
    v-bind="attrs"
    :class="
      cn(
        'inline-flex cursor-ew-resize items-center gap-2 text-foreground select-none data-disabled:cursor-default',
        className,
      )
    "
    data-slot="number-input-scrubber"
  >
    <slot />
  </ArkNumberInputScrubber>
</template>