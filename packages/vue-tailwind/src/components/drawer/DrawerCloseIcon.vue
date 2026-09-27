<script setup lang="ts">
import { DrawerCloseTrigger as ArkDrawerCloseTrigger } from '@ark-ui/vue/drawer';
import type { DrawerCloseTriggerProps } from '@ark-ui/vue/drawer';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DrawerCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const closeLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Close drawer');
const closeIconClass =
  'size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground';
</script>

<template>
  <ArkDrawerCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="closeLabel"
      :class="cn(closeIconClass, className)"
      data-slot="drawer-close-icon"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkDrawerCloseTrigger>
</template>