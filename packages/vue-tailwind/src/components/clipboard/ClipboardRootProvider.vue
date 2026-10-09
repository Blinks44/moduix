<script setup lang="ts">
import { ClipboardRootProvider as ArkClipboardRootProvider } from '@ark-ui/vue/clipboard';
import type { ClipboardRootProviderProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ClipboardRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'flex w-full flex-col gap-1.5 text-foreground';
</script>

<template>
  <ArkClipboardRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="clipboard-root-provider"
  >
    <slot />
  </ArkClipboardRootProvider>
</template>