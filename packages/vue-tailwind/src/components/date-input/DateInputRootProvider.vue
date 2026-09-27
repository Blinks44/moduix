<script setup lang="ts">
import { DateInputRootProvider as ArkDateInputRootProvider } from '@ark-ui/vue/date-input';
import type { DateInputRootProviderProps } from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: DateInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50';
</script>

<template>
  <ArkDateInputRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="date-input-root-provider"
  >
    <slot />
  </ArkDateInputRootProvider>
</template>