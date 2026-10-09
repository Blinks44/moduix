<script setup lang="ts">
import { FieldsetRootProvider as ArkFieldsetRootProvider } from '@ark-ui/vue/fieldset';
import type { FieldsetRootProviderProps } from '@ark-ui/vue/fieldset';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetRootProviderProps {
  class?: HTMLAttributes['class'];
  value: FieldsetRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'flex w-full max-w-none min-w-0 flex-col gap-4 border-transparent data-disabled:opacity-50 data-invalid:border-destructive';
</script>

<template>
  <ArkFieldsetRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="fieldset-root-provider"
  >
    <slot />
  </ArkFieldsetRootProvider>
</template>