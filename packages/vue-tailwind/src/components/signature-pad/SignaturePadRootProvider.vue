<script setup lang="ts">
import { SignaturePadRootProvider as ArkSignaturePadRootProvider } from '@ark-ui/vue/signature-pad';
import type { SignaturePadRootProviderProps as ArkSignaturePadRootProviderProps } from '@ark-ui/vue/signature-pad';
import { computed, provide, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { signaturePadReadOnlyKey } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSignaturePadRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ArkSignaturePadRootProviderProps['value'] & { readOnly?: boolean };
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedReadOnly = computed(() => value.readOnly ?? false);

provide(signaturePadReadOnlyKey, resolvedReadOnly);
</script>

<template>
  <ArkSignaturePadRootProvider
    v-bind="attrs"
    :class="
      cn(
        'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="signature-pad-root-provider"
  >
    <slot />
  </ArkSignaturePadRootProvider>
</template>