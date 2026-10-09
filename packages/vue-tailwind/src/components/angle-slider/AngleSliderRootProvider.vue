<script setup lang="ts">
import { AngleSliderRootProvider as ArkAngleSliderRootProvider } from '@ark-ui/vue/angle-slider';
import type { AngleSliderRootProviderProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderRootProviderProps {
  class?: HTMLAttributes['class'];
  value: AngleSliderRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderRootProvider
    v-bind="attrs"
    :class="
      cn(
        'box-border inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="angle-slider-root-provider"
  >
    <slot />
  </ArkAngleSliderRootProvider>
</template>