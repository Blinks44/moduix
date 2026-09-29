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
        'inline-grid w-max max-w-full min-w-0 justify-items-center gap-2 text-foreground',
        className,
      )
    "
    :value="value"
    data-slot="progress-circular-root-provider"
  >
    <slot />
  </ArkProgressRootProvider>
</template>