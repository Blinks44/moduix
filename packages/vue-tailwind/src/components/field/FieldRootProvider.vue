<script setup lang="ts">
import { FieldRootProvider as ArkFieldRootProvider } from '@ark-ui/vue/field';
import type { FieldRootProviderProps as ArkFieldRootProviderProps } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ArkFieldRootProviderProps['value'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
const rootClass =
  'box-border flex w-full max-w-none flex-col items-start gap-1 text-foreground data-disabled:opacity-50';
</script>

<template>
  <ArkFieldRootProvider
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="cn(rootClass, props.class)"
    :value="props.value"
    data-slot="field-root-provider"
  >
    <slot />
  </ArkFieldRootProvider>
</template>