<script setup lang="ts">
import { CollapsibleRootProvider as ArkCollapsibleRootProvider } from '@ark-ui/vue/collapsible';
import type { CollapsibleRootProviderProps } from '@ark-ui/vue/collapsible';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleRootProviderProps {
  class?: HTMLAttributes['class'];
  value: CollapsibleRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleRootProvider
    v-bind="attrs"
    :class="cn('box-border flex w-full max-w-full min-w-0 flex-col text-foreground', className)"
    :value="value"
    data-slot="collapsible-root-provider"
  >
    <slot />
  </ArkCollapsibleRootProvider>
</template>