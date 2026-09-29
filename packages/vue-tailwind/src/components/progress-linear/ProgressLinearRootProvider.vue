<script setup lang="ts">
import { ProgressRootProvider as ArkProgressRootProvider } from '@ark-ui/vue/progress';
import type { ProgressRootProviderProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ProgressRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressRootProvider
    v-bind="attrs"
    :class="
      cn(
        'box-border grid w-48 max-w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2 text-foreground data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
        className,
      )
    "
    :value="value"
    data-slot="progress-linear-root-provider"
  >
    <slot />
  </ArkProgressRootProvider>
</template>