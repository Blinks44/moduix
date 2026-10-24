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
  'inline-flex max-w-full flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
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