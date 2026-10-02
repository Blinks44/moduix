<script setup lang="ts">
import { PopoverCloseTrigger as ArkPopoverCloseTrigger } from '@ark-ui/vue/popover';
import type { PopoverCloseTriggerProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import { computed } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../internal/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<PopoverCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const closeLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Close popover');
</script>

<template>
  <ArkPopoverCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="closeLabel"
      :class="
        cn(
          'absolute end-3 top-3 size-7 rounded-sm bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
          className,
        )
      "
      data-slot="popover-close-icon"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkPopoverCloseTrigger>
</template>