<script setup lang="ts">
import { CollapsibleRoot as ArkCollapsibleRoot } from '@ark-ui/vue/collapsible';
import type { CollapsibleRootEmits, CollapsibleRootProps } from '@ark-ui/vue/collapsible';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ CollapsibleRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleRoot
    v-bind="attrs"
    :class="cn('box-border flex w-full max-w-full min-w-0 flex-col text-foreground', className)"
    data-slot="collapsible-root"
  >
    <slot />
  </ArkCollapsibleRoot>
</template>